import React from "react";
import { FileText, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentInvoiceHub = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto pb-12 font-sans animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Payments & Invoices</h1>
                <p className="text-gray-500">Generate student invoices and track fee collection.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-emerald-500">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                        <FileText size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Generate Invoice</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Issue new monthly or semester fee invoices to all registered students in the system.
                    </p>
                    <button 
                        onClick={() => navigate("/admin/generate-invoice")} 
                        className="btn btn-secondary w-full py-3 hover:text-emerald-700 hover:border-emerald-200"
                    >
                        Create New Invoice
                    </button>
                </div>

                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-brand-500">
                    <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-6">
                        <Receipt size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Invoice History</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        View all generated invoices, track pending payments, and verify successful student transactions.
                    </p>
                    <button 
                        onClick={() => navigate("/admin/invoice-history")} 
                        className="btn btn-primary w-full py-3"
                    >
                        View Payment History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentInvoiceHub;
