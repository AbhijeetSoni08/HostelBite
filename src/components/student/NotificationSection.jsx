import React from "react";
import { Bell, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationSection =()=> {
    const navigate = useNavigate();
    const viewNotificationHandler = ()=>{
        navigate("/userNotification");
    }
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="flex items-center mb-4">
                <div className="bg-indigo-50 p-3 rounded-full mr-4 text-indigo-600">
                    <Bell size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
                Stay updated! View the latest important announcements from hostel management.
            </p>

            <div className="flex flex-col gap-2 mt-auto">
                <button onClick={viewNotificationHandler} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm font-medium whitespace-nowrap">
                    View Notifications
                </button>
            </div>
        </div>
    );
}

export default NotificationSection;
