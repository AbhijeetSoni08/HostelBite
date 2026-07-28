import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AlertCircle, PartyPopper } from "lucide-react";

const TrackPayment = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const student_id = localStorage.getItem("userId");
                if (!student_id) throw new Error("Student ID not found");

                const res = await axios.get(`http://localhost:4000/api/invoices/student/${student_id}`);
                // Filter only unpaid invoices
                const unpaid = res.data.filter(inv => inv.status.toLowerCase() !== "paid");
                setInvoices(unpaid);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch pending payments.");
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const handlePayNow = (invoice) => {
        navigate("/student/make-payment", { state: { invoice_id: invoice.invoice_id, amount: invoice.amount } });
    };

    if (loading) return <p className="text-center mt-10">Checking payment status...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Track Payment Status</h2>

            {invoices.length === 0 ? (
                <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    <p className="font-semibold text-lg flex items-center justify-center">You are all caught up! <PartyPopper className="ml-2" size={24} /></p>
                    <p className="mt-1">No pending payments found.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center text-red-600 mb-4 bg-red-50 p-3 rounded-lg border border-red-200">
                        <AlertCircle size={20} className="mr-2" />
                        <span className="font-medium">You have {invoices.length} pending payment(s).</span>
                    </div>

                    {invoices.map((inv) => (
                        <div key={inv.invoice_id} className="border border-gray-200 p-5 rounded-xl flex flex-col sm:flex-row justify-between items-center bg-gray-50 hover:bg-white transition shadow-sm">
                            <div className="mb-4 sm:mb-0">
                                <h3 className="font-semibold text-lg text-gray-800">Invoice #{inv.invoice_id}</h3>
                                <p className="text-sm text-gray-600">Issue Date: {new Date(inv.issue_date).toLocaleDateString()}</p>
                                <p className="text-sm text-red-500 font-medium mt-1">Due Date: {new Date(inv.due_date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
                                <span className="text-2xl font-bold text-gray-900 mb-2">₹{inv.amount}</span>
                                <button
                                    onClick={() => handlePayNow(inv)}
                                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-medium transition w-full sm:w-auto"
                                >
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TrackPayment;
