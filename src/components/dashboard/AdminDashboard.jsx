

import React from "react";
import { Rocket } from "lucide-react";
import ManageFeedbackAttendance  from "../management/ManageFeedbackAttendance";
import ManageMenuExpenses from "../management/ManageMenuExpenses";
import ManagePaymentInvoice from "../management/ManagePaymentInvoice";
import ManageStaffSalary from "../management/ManageStaffSalary";
import ManageComplaintNotification from "../management/MangeComplaintNotification";
import UserManagement from "../management/UserManagement";


const AdminDashboard =()=> {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-indigo-700 to-blue-600 pb-24 pt-10 px-8 text-white text-center shadow-lg">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center">
                    Welcome back, Admin! <Rocket className="ml-3 mb-1" size={40} />
                </h1>
                <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                    Here is your control center. Manage users, track expenses, handle feedback, and oversee hostel operations seamlessly.
                </p>
            </div>

            {/* Dashboard Grid */}
            <div className="flex-1 flex flex-col -mt-16 px-4 md:px-10 pb-10">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ManageFeedbackAttendance />
                    <ManageMenuExpenses />
                    <ManagePaymentInvoice />
                    <ManageStaffSalary />
                    <ManageComplaintNotification />
                    <UserManagement />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;