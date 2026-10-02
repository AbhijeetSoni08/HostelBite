import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ClipboardCheck, 
  Wallet, 
  UtensilsCrossed, 
  MessageSquareWarning,
  Clock,
  Bell,
  UserCircle,
  LogOut,
  ArrowRight
} from "lucide-react";
import axios from "axios";

const StaffDashboard = () => {
  const [userName, setUserName] = useState("Staff");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

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
      
      {/* Click outside to close dropdown */}
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
            Ready for your shift? Here are your quick actions for today.
          </p>
        </div>
        
        {/* User Profile Area */}
        <div className="flex items-center gap-4 bg-white px-3 py-2 rounded-2xl border border-gray-100 shadow-level-1 relative z-50">
          <button 
            className="p-2 text-gray-400 hover:text-dark hover:bg-gray-50 rounded-xl transition-colors relative group"
            title="Notifications"
          >
            <Bell size={20} className="group-hover:text-dark transition-colors" />
            {/* Optional dot if notifications exist */}
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
                  <p className="text-xs text-gray-500">Staff Member</p>
                </div>
                <button 
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/staff-dashboard');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-dark transition-colors flex items-center gap-2"
                >
                  <UserCircle size={16} /> My Dashboard
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
         <div className="flex items-center text-gray-400 text-sm font-medium gap-2">
           <Clock size={16} />
           {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
         </div>
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0 animate-slide-up" style={{ animationDelay: '120ms' }}>
        
        <Link 
          to="/staff-dashboard/menu-section"
          className="bg-white border border-gray-100 rounded-[16px] p-6 flex flex-col gap-4 hover:shadow-level-2 hover:-translate-y-[2px] hover:border-gray-200 transition-all duration-200 group relative overflow-hidden h-full"
        >
          <div className="p-3.5 rounded-xl bg-amber-50 text-amber-600 w-fit group-hover:bg-amber-100 transition-colors duration-200 shrink-0">
              <UtensilsCrossed size={24} />
          </div>
          <div className="mt-auto pt-2">
            <h4 className="font-semibold text-gray-900 text-lg mb-1 tracking-tight">Today's Menu</h4>
            <p className="text-sm text-gray-500 font-medium">Check what needs to be prepared</p>
          </div>
          <ArrowRight size={18} className="text-gray-300 absolute right-6 bottom-6 group-hover:text-amber-500 group-hover:translate-x-1 transition-all duration-200" />
        </Link>

        <Link 
          to="/staff-dashboard/feedback-section"
          className="bg-white border border-gray-100 rounded-[16px] p-6 flex flex-col gap-4 hover:shadow-level-2 hover:-translate-y-[2px] hover:border-gray-200 transition-all duration-200 group relative overflow-hidden h-full"
        >
          <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-600 w-fit group-hover:bg-emerald-100 transition-colors duration-200 shrink-0">
              <ClipboardCheck size={24} />
          </div>
          <div className="mt-auto pt-2">
            <h4 className="font-semibold text-gray-900 text-lg mb-1 tracking-tight">Attendance</h4>
            <p className="text-sm text-gray-500 font-medium">View student meal check-ins</p>
          </div>
          <ArrowRight size={18} className="text-gray-300 absolute right-6 bottom-6 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-200" />
        </Link>

        <Link 
          to="/staff-dashboard/complaints-section"
          className="bg-white border border-gray-100 rounded-[16px] p-6 flex flex-col gap-4 hover:shadow-level-2 hover:-translate-y-[2px] hover:border-gray-200 transition-all duration-200 group relative overflow-hidden h-full"
        >
          <div className="p-3.5 rounded-xl bg-rose-50 text-rose-600 w-fit group-hover:bg-rose-100 transition-colors duration-200 shrink-0">
              <MessageSquareWarning size={24} />
          </div>
          <div className="mt-auto pt-2">
            <h4 className="font-semibold text-gray-900 text-lg mb-1 tracking-tight">Complaints</h4>
            <p className="text-sm text-gray-500 font-medium">Review issues reported by students</p>
          </div>
          <ArrowRight size={18} className="text-gray-300 absolute right-6 bottom-6 group-hover:text-rose-500 group-hover:translate-x-1 transition-all duration-200" />
        </Link>

        <Link 
          to="/staff-dashboard/salary-section"
          className="bg-white border border-gray-100 rounded-[16px] p-6 flex flex-col gap-4 hover:shadow-level-2 hover:-translate-y-[2px] hover:border-gray-200 transition-all duration-200 group relative overflow-hidden h-full"
        >
          <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600 w-fit group-hover:bg-blue-100 transition-colors duration-200 shrink-0">
              <Wallet size={24} />
          </div>
          <div className="mt-auto pt-2">
            <h4 className="font-semibold text-gray-900 text-lg mb-1 tracking-tight">My Salary</h4>
            <p className="text-sm text-gray-500 font-medium">View your salary slips</p>
          </div>
          <ArrowRight size={18} className="text-gray-300 absolute right-6 bottom-6 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
        </Link>

      </div>
    </div>
  );
};

export default StaffDashboard;
