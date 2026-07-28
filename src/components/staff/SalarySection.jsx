import React from "react";
import { FileSpreadsheet } from "lucide-react";

const SalarySection =({ role })=> {
    const isAdmin = localStorage.getItem("role") === "admin";

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="flex items-center mb-4">
                <div className="bg-indigo-50 p-3 rounded-full mr-4 text-indigo-600">
                    <FileSpreadsheet size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">My Salary</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
                View your monthly salary details, track payment status, and download payslips.
            </p>

            <div className="flex flex-col gap-2 mt-auto">
                <button onClick={() => window.location.href = "/view-salary"} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm font-medium whitespace-nowrap">
                    View Salary Slips
                </button>
            </div>
        </div>
    );
}
export default SalarySection;