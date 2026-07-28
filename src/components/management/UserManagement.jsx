import React from "react";
import { User, ClipboardList } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
    const navigate = useNavigate();

    const removeHandler = ()=>{
        navigate("/remove-students");

    }


    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="flex items-center mb-4">
                <div className="bg-indigo-50 p-3 rounded-full mr-4 text-indigo-600">
                    <User size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">User Management</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
                Manage Students and Staff accounts across the platform.
            </p>

            <div className="flex flex-col gap-2 mt-auto">
                <button onClick={() => navigate("/admin/create-user")} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm font-medium whitespace-nowrap">
                    Add User
                </button>
                <button onClick={removeHandler} className="w-full bg-gray-50 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 shadow-sm font-medium border border-gray-200 whitespace-nowrap">
                    Remove Student
                </button>
                <button onClick={() => navigate("/admin/update-staff")} className="w-full bg-indigo-50 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-100 transition duration-200 shadow-sm font-medium border border-indigo-200 whitespace-nowrap">
                    Manage Staff
                </button>
            </div>
        </div>
    );
}
export default UserManagement;
