import React from "react";
import { FileSpreadsheet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageStaffSalary = ({ role }) => {
    const isAdmin = localStorage.getItem("role") === "admin";
    const navigate = useNavigate();

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="flex items-center mb-4">
                <div className="bg-indigo-50 p-3 rounded-full mr-4 text-indigo-600">
                    <FileSpreadsheet size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Staff Salary</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
                {isAdmin
                    ? "Manage staff details, and generate monthly salary slips."
                    : "View your salary details and payslips."}
            </p>

            <div className="flex flex-col gap-2 mt-auto">
                {isAdmin && (
                    <button onClick={() => navigate("/admin/update-staff")} className="w-full bg-indigo-50 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-100 transition duration-200 shadow-sm font-medium border border-indigo-200 whitespace-nowrap">
                        Update Staff
                    </button>
                )}
                {isAdmin && (
                    <button onClick={() => navigate("/admin/generate-salary")} className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-sm font-medium whitespace-nowrap">
                        New Salary Slip
                    </button>
                )}
                <button onClick={() => navigate("/view-salary")} className={`w-full bg-gray-50 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 shadow-sm font-medium border border-gray-200 whitespace-nowrap`}>
                    View Salaries
                </button>
            </div>
        </div>
    );
}

export default ManageStaffSalary;