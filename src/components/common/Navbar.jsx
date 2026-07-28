import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:4000/api/auth/logout");
        } catch (err) {
            console.error("Logout failed", err);
        }
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="flex justify-between items-center bg-blue-600 text-white p-4">
            {/* Left: Logo */}
            <div className="text-xl font-bold">HostelBite</div>

            {/* Middle: Links */}
            <div className="space-x-6">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/contact">Contact</Link>
            </div>

            {/* Right: Auth Buttons */}
            <div className="space-x-4">
                {!role ? (
                    <>
                        <Link to="/login">Login</Link>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => {
                                if (role === "student") navigate("/student-dashboard");
                                else if (role === "admin") navigate("/admin-dashboard");
                                else if (role === "staff") navigate("/staff-dashboard");
                                else navigate("/login");
                            }}
                            className="bg-white text-blue-600 px-3 py-1 rounded-md"
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 px-3 py-1 rounded-md"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
