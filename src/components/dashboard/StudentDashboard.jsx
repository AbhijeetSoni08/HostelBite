

import React from "react";
import { GraduationCap } from "lucide-react";
import ComplaintSection from "../student/ComplaintSection";
import FeedbackSection from "../student/FeedbackSection";
import MenuSection from "../common/Menu";
import NotificationSection from "../student/NotificationSection";
import PaymentSection from "../student/PaymentSection";



const StudentDashboard =()=>{
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 pb-24 pt-10 px-8 text-white text-center shadow-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center">
                    Welcome to your Dashboard <GraduationCap className="ml-3 mb-1" size={40} />
                </h1>
                <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                    Check the mess menu, pay fees, raise complaints, and stay updated with hostel announcements.
                </p>
            </div>

            {/* Dashboard Grid */}
            <div className="flex-1 flex flex-col -mt-16 px-4 md:px-10 pb-10">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <MenuSection />
                    <PaymentSection />
                    <ComplaintSection />
                    <FeedbackSection />
                    <NotificationSection />
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;

