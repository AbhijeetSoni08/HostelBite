import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ScanLine, 
  UtensilsCrossed, 
  CreditCard, 
  MessageSquare,
  Clock,
  CheckCircle2,
  Bell,
  ArrowRight,
  Coffee,
  Sun,
  Sunset,
  Moon,
  UserCircle
} from "lucide-react";
import axios from "axios";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Student");
  
  // Simulated or fetched data
  const [attendancePercent, setAttendancePercent] = useState(85);
  const [pendingFees, setPendingFees] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch user details from auth me endpoint
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/auth/me", { withCredentials: true });
        if(response.data.user?.name) {
          setUserName(response.data.user.name);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
    
    // Fetch pending invoices to calculate pendingFees
    const fetchInvoices = async () => {
      try {
        const student_id = localStorage.getItem("userId");
        if (!student_id) return;
        const res = await axios.get(`/api/invoices/student/${student_id}`);
        const unpaidInvoices = res.data.filter(inv => inv.status.toLowerCase() !== "paid");
        const totalPending = unpaidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
        setPendingFees(totalPending);
      } catch (err) {
        console.error("Failed to fetch invoices", err);
      }
    };
    fetchInvoices();
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

  const getNextMeal = () => {
    const hour = new Date().getHours();
    if (hour < 10) return { name: "Breakfast", time: "8:00 AM – 10:00 AM", icon: Coffee, color: "text-amber-500", bg: "bg-amber-50" };
    if (hour < 14) return { name: "Lunch", time: "12:30 PM – 2:00 PM", icon: Sun, color: "text-brand-500", bg: "bg-brand-50" };
    if (hour < 18) return { name: "Snacks", time: "4:30 PM – 6:00 PM", icon: Sunset, color: "text-orange-500", bg: "bg-orange-50" };
    return { name: "Dinner", time: "7:30 PM – 9:30 PM", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-50" };
  };

  const nextMeal = getNextMeal();

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
            Here's what's happening at HostelBite today.
          </p>
        </div>
        
        {/* User Profile Area */}
        <div className="flex items-center gap-4 bg-white px-3 py-2 rounded-2xl border border-gray-100 shadow-level-1 relative z-50">
          <button 
            onClick={() => navigate('/student-dashboard/notification-section')}
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
                  <p className="text-xs text-gray-500">Student</p>
                </div>
                <button 
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/student-dashboard');
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-dark transition-colors flex items-center gap-2"
                >
                  <UserCircle size={16} /> My Dashboard
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2 mt-1"
                >
                  <MessageSquare size={16} className="hidden" /> {/* Spacer basically, wait I'll just use text */}
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Next Meal Card */}
        <div className="card p-7 hover:shadow-level-2 hover:-translate-y-[2px] transition-all duration-200 relative overflow-hidden group opacity-0 animate-slide-up" style={{ animationDelay: '60ms' }}>
          {/* Subtle background visual */}
          <div className="absolute -right-6 -top-6 opacity-[0.03] transform group-hover:scale-110 transition-transform duration-700">
            <nextMeal.icon size={160} />
          </div>
          
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
            Next Meal
          </p>
          <h3 className="text-[28px] font-bold text-dark mb-2 tracking-tight">
            {nextMeal.name}
          </h3>
          
          <div className="flex items-center text-gray-500 text-sm font-medium gap-1.5 mb-8">
            <Clock size={16} />
            {nextMeal.time}
          </div>
          
          <button 
            onClick={() => navigate('/mark-attendance')}
            className="w-full h-[48px] bg-dark text-white rounded-[12px] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ScanLine size={18} /> Scan QR to Check In
          </button>
        </div>

        {/* Attendance Summary Card */}
        <div className="card p-7 hover:shadow-level-2 hover:-translate-y-[2px] transition-all duration-200 flex flex-col opacity-0 animate-slide-up" style={{ animationDelay: '120ms' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Weekly Attendance
            </p>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 size={18} />
            </div>
          </div>
          
          <div className="mb-auto">
            <span className="text-[36px] font-bold text-dark tracking-tight">{attendancePercent}%</span>
            <p className="text-gray-500 text-sm font-medium mt-1">Good streak this week</p>
          </div>
          
          <div className="mt-6">
            <div className="w-full bg-gray-100 rounded-full h-[6px] mb-4 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all ease-out" 
                style={{ width: mounted ? `${attendancePercent}%` : '0%', transitionDuration: '900ms' }}
              ></div>
            </div>
            <Link 
              to="/student-dashboard/feedback-section"
              className="text-sm font-semibold text-gray-900 hover:text-brand-600 flex items-center transition-colors group/link"
            >
              View attendance history 
              <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200" />
            </Link>
          </div>
        </div>

        {/* Mess Fees Card */}
        <div className="card p-7 hover:shadow-level-2 hover:-translate-y-[2px] transition-all duration-200 flex flex-col opacity-0 animate-slide-up" style={{ animationDelay: '180ms' }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Mess Fees
            </p>
            <div className={`p-2 rounded-xl ${pendingFees > 0 ? 'bg-orange-50 text-orange-600' : 'bg-gray-50 text-gray-400'}`}>
              <CreditCard size={18} />
            </div>
          </div>
          
          <div className="mb-auto">
            <span className="text-[36px] font-bold text-dark tracking-tight">₹{pendingFees.toLocaleString()}</span>
            {pendingFees > 0 ? (
               <p className="text-orange-600 text-sm font-semibold mt-1">Payment pending</p>
            ) : (
               <p className="text-gray-500 text-sm font-medium mt-1">All dues cleared</p>
            )}
          </div>
          
          <div className="mt-6">
            <p className="text-xs text-gray-400 font-medium mb-3">Last updated today</p>
            <button 
              onClick={() => navigate('/student/invoice-history')}
              className={`w-full h-[44px] rounded-[12px] font-semibold text-sm transition-all duration-200 flex items-center justify-center ${
                pendingFees > 0 
                  ? 'bg-brand-500 text-dark hover:bg-brand-400 shadow-sm' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pendingFees > 0 ? 'Pay Dues' : 'View Invoices →'}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <h2 className="text-[18px] font-bold text-dark mb-4 opacity-0 animate-slide-up" style={{ animationDelay: '240ms' }}>Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 opacity-0 animate-slide-up" style={{ animationDelay: '300ms' }}>
        {[
          { 
            label: "View Menu", 
            desc: "Check today's meals", 
            icon: UtensilsCrossed, 
            path: "/view-menu", 
            color: "text-indigo-600", 
            bg: "bg-indigo-50",
            hoverBg: "group-hover:bg-indigo-100"
          },
          { 
            label: "Raise Complaint", 
            desc: "Report maintenance issues", 
            icon: MessageSquare, 
            path: "/submit-complaint", 
            color: "text-rose-600", 
            bg: "bg-rose-50",
            hoverBg: "group-hover:bg-rose-100"
          },
          { 
            label: "Announcements", 
            desc: "Latest hostel notices", 
            icon: Bell, 
            path: "/student-dashboard/notification-section", 
            color: "text-purple-600", 
            bg: "bg-purple-50",
            hoverBg: "group-hover:bg-purple-100"
          },
          { 
            label: "Give Feedback", 
            desc: "Rate your recent meals", 
            icon: CheckCircle2, 
            path: "/submit-feedback", 
            color: "text-emerald-600", 
            bg: "bg-emerald-50",
            hoverBg: "group-hover:bg-emerald-100"
          },
        ].map((action, i) => (
          <Link 
            key={i} 
            to={action.path}
            className="bg-white border border-gray-100 rounded-[16px] p-5 flex items-start gap-4 hover:shadow-level-2 hover:-translate-y-[2px] hover:border-gray-200 transition-all duration-200 group relative overflow-hidden"
          >
            <div className={`p-3 rounded-xl ${action.bg} ${action.color} ${action.hoverBg} transition-colors duration-200 shrink-0`}>
              <action.icon size={20} />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{action.label}</h3>
              <p className="text-xs text-gray-500 font-medium">{action.desc}</p>
            </div>
            <ArrowRight size={16} className="text-gray-300 absolute right-5 top-1/2 -translate-y-1/2 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
          </Link>
        ))}
      </div>

    </div>
  );
};

export default StudentDashboard;
