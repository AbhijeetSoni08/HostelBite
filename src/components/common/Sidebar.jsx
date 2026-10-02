import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Bell,
  FileText,
  CreditCard,
  BookOpen,
  Utensils,
  Users,
  Wallet,
  MessageSquare,
  LogOut,
  UserCircle
} from "lucide-react";
import axios from "axios";

const Sidebar = ({ role }) => {
  const location = useLocation();

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
    window.location.href = "/login";
  };

  const studentLinks = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/student-dashboard" },
    { label: "Menu", icon: Utensils, path: "/student-dashboard/menu-section" },
    { label: "Attendance", icon: BookOpen, path: "/student-dashboard/feedback-section" },
    { label: "Payments", icon: CreditCard, path: "/student-dashboard/payment-section" },
    { label: "Complaints", icon: MessageSquare, path: "/student-dashboard/complaint-section" },
    { label: "Notices", icon: Bell, path: "/student-dashboard/notification-section" },
  ];

  const staffLinks = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/staff-dashboard" },
    { label: "Menu", icon: Utensils, path: "/staff-dashboard/menu-section" },
    { label: "Attendance", icon: BookOpen, path: "/staff-dashboard/feedback-section" },
    { label: "Complaints", icon: MessageSquare, path: "/staff-dashboard/complaints-section" },
    { label: "Salary", icon: Wallet, path: "/staff-dashboard/salary-section" },
  ];

  const adminLinks = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin-dashboard" },
    { label: "Users", icon: Users, path: "/admin-dashboard/users-section" },
    { label: "Attendance", icon: BookOpen, path: "/admin-dashboard/feedback-section" },
    { label: "Menu", icon: Utensils, path: "/admin-dashboard/menu-section" },
    { label: "Finances", icon: Wallet, path: "/admin-dashboard/payments-section" },
    { label: "Payroll", icon: CreditCard, path: "/admin-dashboard/salary-section" },
    { label: "Issues", icon: FileText, path: "/admin-dashboard/complaints-section" },
  ];

  let links = [];
  if (role === "student") links = studentLinks;
  else if (role === "staff") links = staffLinks;
  else if (role === "admin") links = adminLinks;

  const activeIndex = links.findIndex(l => l.path === location.pathname);

  return (
    <>
      {/* Spacer to push main layout content */}
      <div className="hidden md:block w-[260px] flex-shrink-0"></div>

      <div
        className="fixed left-0 top-0 bottom-0 bg-surface-dark border-r border-gray-100/60 flex flex-col justify-between shadow-sm z-50 w-[260px] hidden md:flex overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Brand Area */}
          <div className="px-8 h-24 flex items-center shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center font-bold text-dark text-xl shadow-sm">
                H
              </div>
              <span className="text-2xl font-bold text-dark tracking-tight font-heading">
                HostelBite
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="mt-2 flex flex-col px-4 flex-1 overflow-y-auto custom-scrollbar relative">
            
            {/* Sliding Indicator Background */}
            {activeIndex !== -1 && (
              <div 
                className="absolute left-4 right-4 h-11 bg-brand-500/10 rounded-lg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                style={{ transform: `translateY(${activeIndex * 48}px)` }}
              >
                {/* Vertical Accent Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-brand-500 rounded-r-full"></div>
              </div>
            )}

            {links.map((link, i) => {
              const isActive = activeIndex === i;
              return (
                <Link
                  key={i}
                  to={link.path}
                  className={`flex items-center gap-3.5 h-11 px-4 rounded-lg font-medium text-sm transition-colors duration-200 relative z-10 mb-1 ${
                    isActive
                      ? "text-brand-700 font-semibold"
                      : "text-gray-500 hover:text-dark hover:bg-gray-100/50"
                  }`}
                >
                  <link.icon
                    size={20}
                    className={`flex-shrink-0 transition-colors ${
                      isActive
                        ? "text-brand-600"
                        : "text-gray-400"
                    }`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User & Logout Area */}
          <div className="p-4 border-t border-gray-100/50 shrink-0 mx-4 mb-4 mt-2">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                <UserCircle size={22} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-dark capitalize leading-tight">
                  {role} Account
                </p>
                <p className="text-xs text-gray-500">
                  Online
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-3.5 w-full h-11 px-4 rounded-lg font-medium text-sm text-gray-500 hover:bg-rose-50/50 hover:text-status-error transition-all duration-200"
            >
              <LogOut size={20} className="text-gray-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
