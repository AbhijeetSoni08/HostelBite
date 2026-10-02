import React from "react";
import { Star, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeedbackAttendanceHub = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto pb-12 font-sans animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Feedback & Attendance</h1>
                <p className="text-gray-500">Manage student feedback and daily meal attendance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-brand-500">
                    <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-6">
                        <Star size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Student Feedback</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Review ratings, suggestions, and complaints submitted by students regarding the mess food and facilities.
                    </p>
                    <button 
                        onClick={() => navigate("/feedback-list")} 
                        className="btn btn-secondary w-full py-3"
                    >
                        View All Feedback
                    </button>
                </div>

                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-indigo-500">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                        <QrCode size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Live Attendance</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Generate and broadcast a live QR code for students to scan during meal times.
                    </p>
                    <button 
                        onClick={() => navigate("/get-attendance-qr")} 
                        className="btn bg-indigo-600 text-white hover:bg-indigo-700 shadow-level-1 w-full py-3"
                    >
                        Launch QR Display
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackAttendanceHub;
