import React, { useState, useEffect } from "react";
import { 
  Users, 
  Wallet, 
  UtensilsCrossed, 
  MessageSquareWarning, 
  TrendingUp, 
  UserCheck, 
  ArrowRight,
  Receipt,
  QrCode,
  Bell,
  LogOut,
  Settings
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [userName, setUserName] = useState("Admin");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Simulated metrics for premium feel
  const metrics = [
    { label: "Total Students", value: "842", icon: Users, trend: "+12 this month", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Today's Attendance", value: "78%", icon: UserCheck, trend: "420 present", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Pending Payments", value: "₹45.2k", icon: Wallet, trend: "15 overdue", color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Open Complaints", value: "8", icon: MessageSquareWarning, trend: "-3 from yesterday", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/me", { withCredentials: true });
        if(response.data.user?.name) setUserName(response.data.user.name);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
    localStorage.clear();
    window.location.href = "/login";
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="max-w-[1400px] mx-auto pb-12 font-sans px-4 sm:px-6 lg:px-8 relative">
      
      {/* Click outside to close dropdown (invisible overlay) */}
      {showDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}></div>
      )}

      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pt-4 opacity-0 animate-slide-up" style={{ animationDelay: '0ms' }}>
        <div>
          <h1 className="text-[32px] sm:text-[36px] font-bold text-dark mb-1 tracking-[-0.025em] leading-tight">
            {getGreeting()}, {userName.split(' ')[0]}
          </h1>
          <p className="text-[15px] text-gray-500 font-medium">
            Here is your daily operational summary for HostelBite.
          </p>
        </div>
        
        {/* User Profile Area */}
        <div className="flex items-center gap-4 bg-white px-3 py-2 rounded-2xl border border-gray-100 shadow-level-1 relative z-50">
          <button 
            className="p-2 text-gray-400 hover:text-dark hover:bg-gray-50 rounded-xl transition-colors relative group"
            title="Notifications"
          >
            <Bell size={20} className="group-hover:text-dark transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-status-error rounded-full ring-2 ring-white"></span>
          </button>
          <div className="w-px h-6 bg-gray-100"></div>
          
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-1 hover:opacity-80 transition-opacity focus:outline-none"
              title="Profile Menu"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center border border-brand-200 shadow-sm">
                <span className="font-bold text-brand-700 text-sm">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            </button>
            
            {/* Profile Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-level-3 border border-gray-100 py-2 animate-fade-in origin-top-right">
                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button 
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/admin-dashboard');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-dark transition-colors flex items-center gap-2"
                >
                  <Settings size={16} /> Admin Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2 mt-1"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mb-6 opacity-0 animate-slide-up" style={{ animationDelay: '60ms' }}>
         <button 
            onClick={() => navigate('/get-attendance-qr')}
            className="h-[44px] px-6 bg-dark text-white rounded-[12px] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <QrCode size={18} /> Generate QR
          </button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 opacity-0 animate-slide-up" style={{ animationDelay: '120ms' }}>
        {metrics.map((m, i) => (
          <div key={i} className="card p-7 hover:shadow-level-2 hover:-translate-y-[2px] transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-xl ${m.bg} ${m.color}`}>
                <m.icon size={20} />
              </div>
              <TrendingUp size={16} className="text-gray-400" />
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
            <p className="text-[32px] font-bold text-dark mb-2 tracking-tight">{m.value}</p>
            <p className="text-sm font-medium text-gray-500">{m.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 opacity-0 animate-slide-up" style={{ animationDelay: '180ms' }}>
        
        {/* Main Operations Area */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-[18px] font-bold text-dark mb-4">Quick Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <Link to="/admin-dashboard/users-section" className="bg-white border border-gray-100 rounded-[16px] p-5 flex items-start gap-4 hover:shadow-level-2 hover:-translate-y-[2px] hover:border-gray-200 transition-all duration-200 group relative overflow-hidden">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors duration-200 shrink-0">
                  <Users size={20} />
              </div>
              <div className="flex-1 pt-1">
                <h4 className="font-semibold text-gray-900 text-sm mb-0.5">User Management</h4>
                <p className="text-xs text-gray-500 font-medium">Add/remove students & staff</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 absolute right-5 top-1/2 -translate-y-1/2 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
            </Link>

            <Link to="/admin-dashboard/menu-section" className="bg-white border border-gray-100 rounded-[16px] p-5 flex items-start gap-4 hover:shadow-level-2 hover:-translate-y-[2px] hover:border-gray-200 transition-all duration-200 group relative overflow-hidden">
              <div className="p-3 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors duration-200 shrink-0">
                  <UtensilsCrossed size={20} />
              </div>
              <div className="flex-1 pt-1">
                <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Menu & Expenses</h4>
                <p className="text-xs text-gray-500 font-medium">Update meals & track costs</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 absolute right-5 top-1/2 -translate-y-1/2 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
            </Link>

            <Link to="/admin-dashboard/payments-section" className="bg-white border border-gray-100 rounded-[16px] p-5 flex items-start gap-4 hover:shadow-level-2 hover:-translate-y-[2px] hover:border-gray-200 transition-all duration-200 group relative overflow-hidden">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 transition-colors duration-200 shrink-0">
                  <Receipt size={20} />
              </div>
              <div className="flex-1 pt-1">
                <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Invoices & Payments</h4>
                <p className="text-xs text-gray-500 font-medium">Generate bills & view history</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 absolute right-5 top-1/2 -translate-y-1/2 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
            </Link>

            <Link to="/admin-dashboard/complaints-section" className="bg-white border border-gray-100 rounded-[16px] p-5 flex items-start gap-4 hover:shadow-level-2 hover:-translate-y-[2px] hover:border-gray-200 transition-all duration-200 group relative overflow-hidden">
              <div className="p-3 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-rose-100 transition-colors duration-200 shrink-0">
                  <MessageSquareWarning size={20} />
              </div>
              <div className="flex-1 pt-1">
                <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Issues & Alerts</h4>
                <p className="text-xs text-gray-500 font-medium">Resolve complaints & broadcast</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 absolute right-5 top-1/2 -translate-y-1/2 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
            </Link>

          </div>
        </div>

        {/* Right Sidebar Activity Area */}
        <div className="space-y-6">
          <div className="card overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-900">Recent Payments</h3>
              <Link to="/admin/invoice-history" className="text-xs font-medium text-brand-600 hover:text-brand-700">View all</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { name: "Rahul Sharma", amt: "₹2,500", time: "10 mins ago" },
                { name: "Priya Singh", amt: "₹1,800", time: "1 hour ago" },
                { name: "Amit Kumar", amt: "₹2,500", time: "3 hours ago" },
              ].map((p, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-0.5">{p.name}</p>
                      <p className="text-xs text-gray-500 font-medium">{p.time}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-sm text-emerald-600">{p.amt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;