import React from "react";
import { MessageSquare, BellRing } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminComplaintHub = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto pb-12 font-sans animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Complaints & Communications</h1>
                <p className="text-gray-500">Resolve student issues and broadcast announcements.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-brand-500">
                    <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-6">
                        <MessageSquare size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Issue Resolution</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Review, assign, and resolve complaints submitted by students regarding mess facilities and food quality.
                    </p>
                    <button 
                        onClick={() => navigate("/all-complaints")} 
                        className="btn btn-secondary w-full py-3"
                    >
                        Manage Complaints
                    </button>
                </div>

                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-indigo-500">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                        <BellRing size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Broadcast Announcements</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Send targeted notifications to students and staff regarding menu changes, fee deadlines, or general updates.
                    </p>
                    <button 
                        onClick={() => navigate("/send-notification")} 
                        className="btn bg-indigo-600 text-white hover:bg-indigo-700 shadow-level-1 w-full py-3"
                    >
                        Send Notification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminComplaintHub;
