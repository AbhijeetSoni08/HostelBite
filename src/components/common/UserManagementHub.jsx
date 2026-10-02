import React from "react";
import { UserPlus, UserMinus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserManagementHub = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto pb-12 font-sans animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">User Management</h1>
                <p className="text-gray-500">Manage student and staff accounts across the platform.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-brand-500">
                    <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-6">
                        <UserPlus size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Add New User</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Onboard new students, staff members, or administrators to the HostelBite platform.
                    </p>
                    <button 
                        onClick={() => navigate("/admin/create-user")} 
                        className="btn btn-primary w-full py-3"
                    >
                        Create Account
                    </button>
                </div>

                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-rose-500">
                    <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6">
                        <UserMinus size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Remove Students</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Batch remove students by course or graduation year to maintain a clean database.
                    </p>
                    <button 
                        onClick={() => navigate("/remove-students")} 
                        className="btn bg-rose-600 text-white hover:bg-rose-700 shadow-level-1 w-full py-3"
                    >
                        Batch Delete
                    </button>
                </div>

                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-indigo-500 md:col-span-2 md:w-[calc(50%-0.75rem)] md:mx-auto">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                        <Users size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Manage Staff Directory</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Update staff records, modify roles, and manage their system access.
                    </p>
                    <button 
                        onClick={() => navigate("/admin/update-staff")} 
                        className="btn btn-secondary w-full py-3"
                    >
                        Staff Directory
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserManagementHub;
