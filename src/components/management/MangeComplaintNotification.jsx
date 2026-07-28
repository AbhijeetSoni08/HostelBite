import React from "react";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageComplaintNotification = () => {
    const navigate = useNavigate();
    const viewComplaintHandler = () => {
        // Logic to view complaints
        navigate("/all-complaints");
    };

    const sendNotificationHandler = ()=>{
        navigate("/send-notification")
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="flex items-center mb-4">
                <div className="bg-indigo-50 p-3 rounded-full mr-4 text-indigo-600">
                    <MessageSquare size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Complaints & Comm</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
                Review student complaints and broadcast notifications to users.
            </p>

            <div className="flex flex-col gap-2 mt-auto">
                <button onClick={viewComplaintHandler} className="w-full bg-gray-50 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 shadow-sm font-medium border border-gray-200 whitespace-nowrap">
                    View Complaints
                </button>
                <button onClick={sendNotificationHandler} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm font-medium whitespace-nowrap">
                    Send Notice
                </button>
            </div>
        </div>
    );
}
export default ManageComplaintNotification;