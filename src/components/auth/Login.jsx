import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, Mail, Lock, ShieldAlert, ArrowLeft } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    localStorage.clear();
  }, []);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.role) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "/api/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      localStorage.setItem("role", response.data.role);
      if (response.data.user && response.data.user.id) {
        localStorage.setItem("userId", response.data.user.id);
      }

      // Navigate based on role
      if (response.data.role === "student") {
        navigate("/student-dashboard");
      } else if (response.data.role === "admin") {
        navigate("/admin-dashboard");
      } else if (response.data.role === "staff") {
        navigate("/staff-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      
      {/* Left Side - Brand/Marketing */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-brand-500 p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-400 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-600 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 opacity-50"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-dark rounded-xl flex items-center justify-center font-bold text-brand-500 text-xl">
            H
          </div>
          <span className="text-2xl font-bold text-dark tracking-tight">HostelBite</span>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold text-dark leading-tight mb-6">
            Your hostel, <br/> managed better.
          </h1>
          <p className="text-brand-900 text-lg font-medium">
            Join thousands of students and administrators using HostelBite to streamline institutional dining.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-brand-900 text-sm font-semibold">
          <p>© {new Date().getFullYear()} HostelBite Platform</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:px-24 bg-white relative">
        <Link to="/" className="absolute top-8 left-8 lg:left-12 flex items-center text-gray-400 hover:text-dark font-medium transition-colors text-sm">
          <ArrowLeft size={16} className="mr-2" /> Back to home
        </Link>

        <div className="max-w-md w-full mx-auto animation-fade-in">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-dark mb-2">Welcome back</h2>
            <p className="text-gray-500">Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-status-errorBg border border-status-error/20 rounded-xl flex items-start gap-3 animate-slide-up">
              <ShieldAlert size={20} className="text-status-error shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-status-error">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-gray-50 rounded-xl mb-6 border border-gray-100">
              {['student', 'staff', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({...formData, role: r})}
                  className={`py-2 text-sm font-semibold rounded-lg capitalize transition-all ${
                    formData.role === r 
                      ? "bg-white text-dark shadow-sm" 
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

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
                  placeholder="name@example.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

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

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary py-3 shadow-soft"
              >
                {loading ? (
                  <><Loader2 size={18} className="mr-2 animate-spin" /> Signing in...</>
                ) : (
                  "Sign in to account"
                )}
              </button>
            </div>
            
            <div className="text-center pt-6">
              <p className="text-sm text-gray-500 font-medium">
                Protected by secure institutional login.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
