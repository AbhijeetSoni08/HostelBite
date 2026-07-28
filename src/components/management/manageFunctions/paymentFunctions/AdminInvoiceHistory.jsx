import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock, Trash2, Edit2 } from "lucide-react";

const AdminInvoiceHistory = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchInvoices = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:4000/api/invoices/");
            setInvoices(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch invoice history.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this invoice?")) return;
        try {
            await axios.delete(`http://localhost:4000/api/invoices/${id}`);
            setInvoices(invoices.filter((inv) => inv.invoice_id !== id));
        } catch (err) {
            alert("Error deleting invoice.");
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus.toLowerCase() === "paid" ? "Unpaid" : "Paid";
        try {
            await axios.put(`http://localhost:4000/api/invoices/${id}/status`, { status: newStatus });
            fetchInvoices(); // Refetch to get updated timestamp
        } catch (err) {
            alert("Error updating status.");
        }
    };

    if (loading && invoices.length === 0) return <p className="text-center mt-10">Loading invoices...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">All Student Invoices</h2>

            {invoices.length === 0 ? (
                <p className="text-center text-gray-500">No invoices found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3 border-b">ID</th>
                                <th className="p-3 border-b">Student</th>
                                <th className="p-3 border-b">Issue Date</th>
                                <th className="p-3 border-b">Due Date</th>
                                <th className="p-3 border-b">Amount</th>
                                <th className="p-3 border-b">Status</th>
                                <th className="p-3 border-b">Paid At</th>
                                <th className="p-3 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv) => (
                                <tr key={inv.invoice_id} className="hover:bg-gray-50 transition">
                                    <td className="p-3 border-b">#{inv.invoice_id}</td>
                                    <td className="p-3 border-b font-medium text-indigo-700">
                                        {inv.student_name}
                                        <div className="text-xs text-gray-500 font-normal">{inv.student_email}</div>
                                    </td>
                                    <td className="p-3 border-b">{new Date(inv.issue_date).toLocaleDateString()}</td>
                                    <td className="p-3 border-b">{new Date(inv.due_date).toLocaleDateString()}</td>
                                    <td className="p-3 border-b font-medium text-gray-900">₹{inv.amount}</td>
                                    <td className="p-3 border-b">
                                        {inv.status.toLowerCase() === "paid" ? (
                                            <span className="inline-flex items-center text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-semibold">
                                                <CheckCircle size={14} className="mr-1" /> Paid
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs font-semibold">
                                                <Clock size={14} className="mr-1" /> {inv.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3 border-b text-sm text-gray-600">
                                        {inv.paid_at ? new Date(inv.paid_at).toLocaleString() : "-"}
                                    </td>
                                    <td className="p-3 border-b">
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleUpdateStatus(inv.invoice_id, inv.status)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                title={`Mark as ${inv.status.toLowerCase() === 'paid' ? 'Unpaid' : 'Paid'}`}
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(inv.invoice_id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                title="Delete Invoice"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
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

export default AdminInvoiceHistory;
