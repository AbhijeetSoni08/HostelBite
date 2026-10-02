import React from "react";
import { UsersRound, FileCheck2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminSalaryHub = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto pb-12 font-sans animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Staff Payroll</h1>
                <p className="text-gray-500">Manage mess staff records and process salary slips.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-indigo-500">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                        <UsersRound size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Update Staff Info</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Modify staff records, update bank details, and manage roles within the mess administration.
                    </p>
                    <button 
                        onClick={() => navigate("/admin/update-staff")} 
                        className="btn btn-secondary w-full py-3"
                    >
                        Manage Staff Directory
                    </button>
                </div>

                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-brand-500">
                    <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-6">
                        <FileCheck2 size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Salary Processing</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Generate monthly salary slips for staff, track payments, and maintain payroll history.
                    </p>
                    <button 
                        onClick={() => navigate("/admin/generate-salary")} 
                        className="btn btn-primary w-full py-3"
                    >
                        Process Payroll
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSalaryHub;
