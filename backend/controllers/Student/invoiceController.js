const db = require("../../config/Database");

// Create new invoice
exports.createInvoice = (req, res) => {
    const { student_id, amount, due_date, status } = req.body;

    if (!student_id || !amount || !due_date) {
        return res.status(400).json({ error: "Student ID, amount, and due date are required" });
    }

    const issue_date = new Date().toISOString().split('T')[0];

    const sql = "INSERT INTO invoice (student_id, amount, due_date, status, issue_date) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [student_id, amount, due_date, status || "Unpaid", issue_date], (err, result) => {
        if (err) {
            console.error("Error inserting invoice:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({ message: "Invoice created successfully", invoiceId: result.insertId });
    });
};

// Get all invoices
exports.getAllInvoices = (req, res) => {
    const sql = `
        SELECT i.invoice_id, i.amount, i.due_date, i.status, i.issue_date, i.paid_at, 
               s.name AS student_name, s.email AS student_email, s.student_id
        FROM invoice i 
        JOIN student s ON i.student_id = s.student_id
        ORDER BY i.issue_date DESC
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching invoices:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Get invoice by ID
exports.getInvoiceById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM invoice WHERE invoice_id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching invoice:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        res.status(200).json(result[0]);
    });
};

// Get invoices by student
exports.getInvoicesByStudent = (req, res) => {
    const { studentId } = req.params;
    const sql = "SELECT * FROM invoice WHERE student_id = ? ORDER BY issue_date DESC";
    db.query(sql, [studentId], (err, results) => {
        if (err) {
            console.error("Error fetching student invoices:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json(results);
    });
};

// Update invoice status (paid/unpaid)
exports.updateInvoiceStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ error: "Status is required" });
    }

    let paid_at = null;
    if (status.toLowerCase() === 'paid') {
        paid_at = new Date().toISOString().slice(0, 19).replace('T', ' '); // MySQL datetime format
    }

    const sql = "UPDATE invoice SET status = ?, paid_at = ? WHERE invoice_id = ?";
    db.query(sql, [status, paid_at, id], (err, result) => {
        if (err) {
            console.error("Error updating invoice:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        res.status(200).json({ message: "Invoice status updated successfully" });
    });
};

// Delete invoice
exports.deleteInvoice = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM invoice WHERE invoice_id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting invoice:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Invoice not found" });
        }
        res.status(200).json({ message: "Invoice deleted successfully" });
    });
};
