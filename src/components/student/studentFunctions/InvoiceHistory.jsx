import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock } from "lucide-react";

const InvoiceHistory = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const student_id = localStorage.getItem("userId");
                if (!student_id) throw new Error("Student ID not found");

                const res = await axios.get(`http://localhost:4000/api/invoices/student/${student_id}`);
                setInvoices(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch invoice history.");
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading invoice history...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Invoice History</h2>

            {invoices.length === 0 ? (
                <p className="text-center text-gray-500">No invoices found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3 border-b">Invoice ID</th>
                                <th className="p-3 border-b">Issue Date</th>
                                <th className="p-3 border-b">Due Date</th>
                                <th className="p-3 border-b">Amount</th>
                                <th className="p-3 border-b">Status</th>
                                <th className="p-3 border-b">Paid At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv) => (
                                <tr key={inv.invoice_id} className="hover:bg-gray-50 transition">
                                    <td className="p-3 border-b">#{inv.invoice_id}</td>
                                    <td className="p-3 border-b">{new Date(inv.issue_date).toLocaleDateString()}</td>
                                    <td className="p-3 border-b">{new Date(inv.due_date).toLocaleDateString()}</td>
                                    <td className="p-3 border-b font-medium">₹{inv.amount}</td>
                                    <td className="p-3 border-b">
                                        {inv.status.toLowerCase() === "paid" ? (
                                            <span className="flex items-center text-green-600 font-semibold">
                                                <CheckCircle size={16} className="mr-1" /> Paid
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-yellow-600 font-semibold">
                                                <Clock size={16} className="mr-1" /> {inv.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3 border-b">
                                        {inv.paid_at ? new Date(inv.paid_at).toLocaleString() : "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InvoiceHistory;
