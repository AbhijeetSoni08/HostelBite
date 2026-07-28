import React from "react";
import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManagePaymentInvoice = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="flex items-center mb-4">
                <div className="bg-indigo-50 p-3 rounded-full mr-4 text-indigo-600">
                    <CreditCard size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Payment & Invoice</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
                Manage student payments, generate new invoices, and track overall payment status.
            </p>

            <div className="flex flex-col gap-2 mt-auto">
                <button onClick={() => navigate("/admin/generate-invoice")} className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-sm font-medium whitespace-nowrap">
                    New Invoice
                </button>
                <button onClick={() => navigate("/admin/invoice-history")} className="w-full bg-indigo-50 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-100 transition duration-200 shadow-sm font-medium border border-indigo-200 whitespace-nowrap">
                    Payment Status
                </button>
                <button onClick={() => navigate("/admin/invoice-history")} className="w-full bg-gray-50 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 shadow-sm font-medium border border-gray-200 whitespace-nowrap">
                    View Full History
                </button>
            </div>
        </div>
    );
}

export default ManagePaymentInvoice;