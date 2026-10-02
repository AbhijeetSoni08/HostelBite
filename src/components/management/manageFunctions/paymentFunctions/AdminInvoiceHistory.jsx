import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock, Trash2, FileText, ArrowLeft, RotateCcw, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TableSkeleton } from "../../../common/Skeleton";
import { ErrorState, EmptyState } from "../../../common/StateDisplays";
import { useToast } from "../../../common/ToastContext";

const AdminInvoiceHistory = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchInvoices = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await axios.get("/api/invoices/", {
                withCredentials: true
            });
            setInvoices(res.data);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this invoice?")) return;
        try {
            await axios.delete(`/api/invoices/${id}`, { withCredentials: true });
            setInvoices(invoices.filter((inv) => inv.invoice_id !== id));
            addToast("Invoice deleted", "success");
        } catch (err) {
            addToast("Error deleting invoice", "error");
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus.toLowerCase() === "paid" ? "Unpaid" : "Paid";
        try {
            await axios.put(`/api/invoices/${id}/status`, { status: newStatus }, { withCredentials: true });
            addToast(`Invoice marked as ${newStatus}`, "success");
            fetchInvoices(); 
        } catch (err) {
            addToast("Failed to update status", "error");
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-12 w-full animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate("/admin-dashboard/payments-section")} 
                        className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-dark hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-dark flex items-center gap-2">
                            <FileText className="text-emerald-500" size={28} /> Billing History
                        </h1>
                        <p className="text-gray-500 mt-1">Manage student fee invoices and payment status.</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => navigate("/generate-invoice")}
                    className="btn btn-primary px-4 py-2"
                >
                    <Plus size={18} className="mr-2" /> Generate Invoice
                </button>
            </div>

            {loading ? (
                <TableSkeleton rows={8} />
            ) : error ? (
                <ErrorState 
                    title="Failed to load invoices" 
                    description="There was a problem communicating with our billing servers." 
                    onRetry={fetchInvoices} 
                />
            ) : invoices.length === 0 ? (
                <EmptyState 
                    icon={FileText}
                    title="No invoices found"
                    description="You haven't generated any fee invoices yet."
                    actionLabel="Generate First Invoice"
                    onAction={() => navigate("/generate-invoice")}
                />
            ) : (
                <div className="card overflow-hidden border border-gray-100 shadow-sm">
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Invoice ID</th>
                                    <th>Student</th>
                                    <th>Issue Date</th>
                                    <th>Due Date</th>
                                    <th className="text-right">Amount</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((inv) => (
                                    <tr key={inv.invoice_id} className="group hover:bg-gray-50/80 transition-colors">
                                        <td className="font-semibold text-gray-500 font-mono text-sm">
                                            INV-{inv.invoice_id.toString().padStart(4, '0')}
                                        </td>
                                        <td>
                                            <div className="font-semibold text-dark">{inv.student_name}</div>
                                            <div className="text-xs text-gray-500">{inv.student_email}</div>
                                        </td>
                                        <td className="text-gray-600 text-sm tabular-nums">
                                            {new Date(inv.issue_date).toLocaleDateString()}
                                        </td>
                                        <td className="text-gray-600 text-sm tabular-nums">
                                            {new Date(inv.due_date).toLocaleDateString()}
                                        </td>
                                        <td className="text-right font-bold text-dark tabular-nums">
                                            ₹{inv.amount.toLocaleString()}
                                        </td>
                                        <td className="text-center">
                                            {inv.status.toLowerCase() === "paid" ? (
                                                <span className="badge badge-success">
                                                    <CheckCircle size={12} className="mr-1" /> Paid
                                                </span>
                                            ) : (
                                                <span className="badge badge-warning">
                                                    <Clock size={12} className="mr-1" /> Pending
                                                </span>
                                            )}
                                            {inv.paid_at && inv.status.toLowerCase() === "paid" && (
                                                <div className="text-[10px] text-gray-400 mt-1">
                                                    {new Date(inv.paid_at).toLocaleDateString()}
                                                </div>
                                            )}
                                        </td>
                                        <td className="text-right">
                                            <div className="flex justify-end gap-1">
                                                <button 
                                                    onClick={() => handleUpdateStatus(inv.invoice_id, inv.status)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex"
                                                    title={`Mark as ${inv.status.toLowerCase() === 'paid' ? 'Unpaid' : 'Paid'}`}
                                                >
                                                    <RotateCcw size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(inv.invoice_id)}
                                                    className="p-2 text-gray-400 hover:text-status-error hover:bg-status-errorBg rounded-lg transition-colors inline-flex"
                                                    title="Delete Invoice"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminInvoiceHistory;
