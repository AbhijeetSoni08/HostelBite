import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed", err);
    }
    localStorage.clear();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const getDashboardRoute = () => {
    if (role === "student") return "/student-dashboard";
    if (role === "admin") return "/admin-dashboard";
    if (role === "staff") return "/staff-dashboard";
    return "/login";
  };

  // Do not show full navbar if on dashboard routes (dashboards should have their own sidebars)
  // But wait, App.js includes <Navbar /> on all routes right now. 
  // We can just keep it slim or let dashboards handle their own navigation layout. 
  // The prompt asks for an app-like feel. Usually, logged-in SaaS apps hide the marketing navbar.
  const isDashboard = location.pathname.includes("-dashboard") || 
                      location.pathname.includes("/admin/") || 
                      location.pathname.includes("/student/") ||
                      location.pathname.includes("/management/");

  if (isDashboard) {
    return null; // Return null so dashboards can render their own Header/Sidebar layout
  }

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-bold text-dark text-lg">
                H
              </div>
              <span className="text-xl font-bold text-dark tracking-tight">
                HostelBite
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-brand-600"
                      : "text-gray-600 hover:text-dark"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
              {!role ? (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-gray-700 hover:text-dark transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/login"
                    className="btn btn-primary text-sm px-5 py-2"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={getDashboardRoute()}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-brand-600 transition-colors"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-status-error transition-colors"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-dark focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-4 mt-4">
              {!role ? (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 text-base font-medium bg-brand-500 text-dark hover:bg-brand-600 rounded-md"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to={getDashboardRoute()}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <LayoutDashboard size={20} className="text-brand-500" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-red-50 hover:text-status-error"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
