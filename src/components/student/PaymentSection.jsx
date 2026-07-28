import React from "react";
import { CreditCard, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSection =()=> {

    const navigate = useNavigate();
    
    const makePaymentHandler = () => {
        navigate("/student/make-payment");
    }
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="flex items-center mb-4">
                <div className="bg-indigo-50 p-3 rounded-full mr-4 text-indigo-600">
                    <CreditCard size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Payment & Invoice</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
                Manage your hostel fee payments, track invoice status, and view history.
            </p>

            <div className="flex flex-col gap-2 mt-auto">
                <button onClick={makePaymentHandler} className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 shadow-sm font-medium whitespace-nowrap">
                    Make Payment
                </button>
                <button onClick={() => navigate("/student/track-payment")} className="w-full bg-indigo-50 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-100 transition duration-200 shadow-sm font-medium border border-indigo-200 whitespace-nowrap">
                    Track Payment
                </button>
                <button onClick={() => navigate("/student/invoice-history")} className="w-full bg-gray-50 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-200 shadow-sm font-medium border border-gray-200 whitespace-nowrap">
                    View History
                </button>
            </div>
            <div className="mt-4 flex gap-2 text-sm text-gray-500 justify-center">
                <Clock className="text-indigo-400" size={16} />
                Supports <span className="font-semibold text-indigo-600 mx-1">UPI</span>
                and <span className="font-semibold text-indigo-600 mx-1">Cards</span>
            </div>
        </div>
    );
}

export default PaymentSection;