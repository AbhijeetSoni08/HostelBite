import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, Mail, Lock, ShieldAlert, ArrowLeft, User, Building, BookOpen, GraduationCap, CheckCircle2 } from "lucide-react";

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "student",
        room_number: "",
        staffRole: "",
        course: "",
        year: "",
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isStrongPassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, confirmPassword } = formData;

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill all required fields.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!isStrongPassword(password)) {
            setError(
                "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            await axios.post(
                "/api/auth/signup",
                formData,
                { withCredentials: true }
            );

            setSuccess(true);
            
        } catch (error) {
            setError(error.response?.data?.message || "Failed to create user account.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "student",
            room_number: "",
            staffRole: "",
            course: "",
            year: "",
        });
        setSuccess(false);
        setError("");
    };

    const { role } = formData;

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center font-sans p-6 animate-fade-in bg-gray-50/50">
                <div className="card max-w-md w-full p-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-status-successBg text-status-success rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-dark mb-2">Account Created!</h2>
                    <p className="text-gray-500 mb-8">
                        The new {formData.role} account has been successfully provisioned. What would you like to do next?
                    </p>
                    
                    <div className="w-full space-y-3">
                        <button onClick={() => navigate("/admin-dashboard")} className="btn btn-primary w-full py-3">
                            Back to Dashboard
                        </button>
                        <button onClick={resetForm} className="btn btn-secondary w-full py-3">
                            Create Another Account
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex font-sans">
            
            {/* Left Side - Contextual Branding */}
            <div className="hidden lg:flex flex-col justify-between w-1/3 bg-dark p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 opacity-20"></div>
                
                <div className="relative z-10">
                    <Link to="/admin-dashboard" className="flex items-center text-gray-400 hover:text-white font-medium transition-colors text-sm mb-12">
                        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center font-bold text-dark text-xl">
                            H
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">HostelBite</span>
                    </div>
                </div>

                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                        Provision New Users
                    </h1>
                    <p className="text-gray-400 text-lg font-medium leading-relaxed">
                        Create accounts for students, assign staff roles, or grant administrative access to the platform.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 text-gray-500 text-sm font-semibold">
                    <p>HostelBite Administrative Portal</p>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24 relative py-12 h-screen overflow-y-auto custom-scrollbar">
                
                {/* Mobile Back Button */}
                <Link to="/admin-dashboard" className="lg:hidden absolute top-6 left-6 flex items-center text-gray-500 hover:text-dark font-medium transition-colors text-sm">
                    <ArrowLeft size={16} className="mr-2" /> Back
                </Link>

                <div className="max-w-xl w-full mx-auto animation-fade-in my-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-dark mb-2">Create Account</h2>
                        <p className="text-gray-500">Fill in the details to onboard a new user.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-status-errorBg border border-status-error/20 rounded-xl flex items-start gap-3 animate-slide-up">
                            <ShieldAlert size={20} className="text-status-error shrink-0 mt-0.5" />
                            <p className="text-sm font-medium text-status-error">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        
                        {/* Role Selection Tabs */}
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">Account Type</label>
                            <div className="grid grid-cols-3 gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100">
                                {['student', 'staff', 'admin'].map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setFormData({...formData, role: r})}
                                        className={`py-2 text-sm font-semibold rounded-lg capitalize transition-all ${
                                            formData.role === r 
                                            ? "bg-white text-dark shadow-sm border border-gray-200" 
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                                        }`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block mb-1.5 text-sm font-semibold text-gray-700">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="input-field pl-10"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block mb-1.5 text-sm font-semibold text-gray-700">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="input-field pl-10"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block mb-1.5 text-sm font-semibold text-gray-700">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="input-field pl-10"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block mb-1.5 text-sm font-semibold text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="input-field pl-10"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Conditional Inputs based on Role */}
                        {role === "student" && (
                            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-5 animate-slide-up">
                                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Student Details</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block mb-1.5 text-sm font-semibold text-gray-700">Room Number</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <Building size={18} className="text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="room_number"
                                                value={formData.room_number}
                                                onChange={handleChange}
                                                placeholder="e.g. A-101"
                                                className="input-field pl-10 bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-1.5 text-sm font-semibold text-gray-700">Course</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <BookOpen size={18} className="text-gray-400" />
                                            </div>
                                            <select
                                                name="course"
                                                value={formData.course}
                                                onChange={handleChange}
                                                className="input-field pl-10 bg-white"
                                            >
                                                <option value="">Select course</option>
                                                <option value="MCA">MCA</option>
                                                <option value="Btech">B.Tech</option>
                                                <option value="Mtech">M.Tech</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {formData.course && (
                                    <div className="animate-fade-in">
                                        <label className="block mb-1.5 text-sm font-semibold text-gray-700">Academic Year</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <GraduationCap size={18} className="text-gray-400" />
                                            </div>
                                            <select
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                                className="input-field pl-10 bg-white"
                                            >
                                                <option value="">Choose year</option>
                                                {formData.course === "Btech" && (
                                                    <>
                                                        <option value="1">1st Year</option>
                                                        <option value="2">2nd Year</option>
                                                        <option value="3">3rd Year</option>
                                                        <option value="4">4th Year</option>
                                                    </>
                                                )}
                                                {formData.course === "MCA" && (
                                                    <>
                                                        <option value="1">1st Year</option>
                                                        <option value="2">2nd Year</option>
                                                        <option value="3">3rd Year</option>
                                                    </>
                                                )}
                                                {formData.course === "Mtech" && (
                                                    <>
                                                        <option value="1">1st Year</option>
                                                        <option value="2">2nd Year</option>
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {role === "staff" && (
                            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 animate-slide-up">
                                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Staff Details</h3>
                                <div>
                                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Designation / Role</label>
                                    <input
                                        type="text"
                                        name="staffRole"
                                        value={formData.staffRole}
                                        onChange={handleChange}
                                        placeholder="e.g. Head Cook, Warden"
                                        className="input-field bg-white"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn btn-primary py-3.5 shadow-soft"
                            >
                                {loading ? (
                                    <><Loader2 size={18} className="mr-2 animate-spin" /> Provisioning Account...</>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
