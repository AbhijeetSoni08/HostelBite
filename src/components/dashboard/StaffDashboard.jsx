import React from "react";
import { Handshake } from "lucide-react";
import Sidebar from "../common/Sidebar";
import SalarySection from "../staff/SalarySection";
import NotificationSection from "../staff/ComplaintNotification";
import MenuSection from "../common/Menu";
import FeedbackSection from "../staff/FeedbackAttendance";

const StaffDashboard =()=> {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 pb-24 pt-10 px-8 text-white text-center shadow-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center">
                    Welcome, Staff Member! <Handshake className="ml-3 mb-1" size={40} />
                </h1>
                <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                    View your salary slips, check the mess menu, and manage daily hostel tasks efficiently.
                </p>
            </div>

            {/* Dashboard Grid */}
            <div className="flex-1 flex flex-col -mt-16 px-4 md:px-10 pb-10">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <SalarySection />
                    <MenuSection />
                    <FeedbackSection />
                    <NotificationSection />
                </div>
            </div>
        </div>
    );
}

export default StaffDashboard;  
