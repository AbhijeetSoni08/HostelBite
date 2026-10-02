const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/Database");  // MySQL connection

// SIGNUP controller
exports.signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role, room_number, staffRole, course, year } = req.body;

        if (!name || !email || !password || !confirmPassword || !role)  {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        if(password !== confirmPassword){
            return res.status(401).json({
                message:"password not matched",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === "student") {
            if (!room_number || !course || !year) {
                return res.status(400).json({ message: "All required fields must be provided" });
            }

            const sql = `INSERT INTO student (name, email, password, room_number,course,year) VALUES (?, ?, ?, ?, ?, ?)`;
            db.query(sql, [name, email, hashedPassword, room_number, course, year], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: "Email is already in use" });
                    return res.status(500).json({ message: "DB Error", error: err });
                }
                res.status(201).json({ message: "Student registered", studentId: result.insertId });
            });
        } else if (role === "staff") {
            if (!staffRole) {
                return res.status(400).json({ message: "fill staff role" });
            }
            const sql = `INSERT INTO staff (name, role, email, password, salary_amount) VALUES (?, ?, ?, ?, ?)`;
            db.query(sql, [name, staffRole, email, hashedPassword, 0], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: "Email is already in use" });
                    return res.status(500).json({ message: "DB Error", error: err });
                }
                res.status(201).json({ message: "Staff registered", staffId: result.insertId });
            });
        } else if (role === "admin") {
            const sql = `INSERT INTO management (name, email, password) VALUES (?, ?, ?)`;
            db.query(sql, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: "Email is already in use" });
                    return res.status(500).json({ message: "DB Error", error: err });
                }
                res.status(201).json({ message: "Admin registered", adminId: result.insertId });
            });
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// LOGIN controller
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email, password and role required" });
        }

        // SQL Query based on role (using lowercase table names for MySQL compatibility)
        let sql = "";
        if (role === "student") {
            sql = "SELECT * FROM student WHERE email = ?";
        } else if (role === "staff") {
            sql = "SELECT * FROM staff WHERE email = ?";
        } else if (role === "admin") {
            sql = "SELECT * FROM management WHERE email = ?";
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        db.query(sql, [email], async (err, results) => {
            if (err) {
                console.error("Login DB Error:", err);
                return res.status(500).json({ message: "DB Error", error: err.message || err });
            }
            if (results.length === 0) return res.status(404).json({ message: "User not found" });

            const user = results[0];
            console.log("Logged in user:", user.email, "role:", role);

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

            // Generate JWT
            const token = jwt.sign(
                { id: user[`${role}_id`] || user.staff_id || user.management_id, role },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            // Cross-domain cookie support between Vercel and Render
            const isProd = process.env.NODE_ENV === "production";
            res.cookie("token", token, {
                httpOnly: true,
                secure: isProd,
                sameSite: isProd ? "none" : "lax",
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            res.status(200).json({
                message: "Login successful",
                role,
                user: { id: user[`${role}_id`] || user.staff_id || user.management_id, name: user.name, email: user.email }
            });
        });
    } catch (error) {
        console.error("Login Server Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message || error });
    }
};

exports.logout = (req, res) => {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
    });
    res.status(200).json({ message: "Logged out successfully" });
};

exports.getMe = (req, res) => {
    // This requires the auth middleware to be executed first, which sets req.user
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    res.status(200).json({
        user: req.user
    });
};

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const { id, role } = req.user;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: "Current and new password are required" });
        }

        let tableName = "";
        let idColumn = "";
        if (role.toLowerCase() === "student") {
            tableName = "student";
            idColumn = "student_id";
        } else if (role.toLowerCase() === "staff") {
            tableName = "staff";
            idColumn = "staff_id";
        } else if (role.toLowerCase() === "admin") {
            tableName = "management";
            idColumn = "management_id";
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        db.query(`SELECT password FROM ${tableName} WHERE ${idColumn} = ?`, [id], async (err, results) => {
            if (err) return res.status(500).json({ message: "DB Error", error: err });
            if (results.length === 0) return res.status(404).json({ message: "User not found" });

            const isMatch = await bcrypt.compare(currentPassword, results[0].password);
            if (!isMatch) return res.status(401).json({ message: "Incorrect current password" });

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            db.query(`UPDATE ${tableName} SET password = ? WHERE ${idColumn} = ?`, [hashedNewPassword, id], (updateErr) => {
                if (updateErr) return res.status(500).json({ message: "Error updating password", error: updateErr });
                res.status(200).json({ message: "Password updated successfully" });
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
