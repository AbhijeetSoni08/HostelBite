import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock, Trash2, RotateCcw, Wallet } from "lucide-react";
import { TableSkeleton } from "../../../common/Skeleton";
import { ErrorState, EmptyState } from "../../../common/StateDisplays";
import { useToast } from "../../../common/ToastContext";

const ViewSalary = () => {
    const { addToast } = useToast();
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    const fetchSalaries = async () => {
        setLoading(true);
        setError(false);
        try {
            const url = role === "admin" 
                ? "/api/salary/"
                : `/api/salary/staff/${userId}`;
                
            const res = await axios.get(url, { withCredentials: true });
            setSalaries(res.data);
        } catch (err) {
            console.error(err);
            setError(true);
            addToast("error", "Failed to fetch salary records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, [addToast]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this salary record?")) return;
        try {
            await axios.delete(`/api/salary/${id}`, { withCredentials: true });
            setSalaries(salaries.filter((s) => s.id !== id));
            addToast("success", "Salary record deleted.");
        } catch (err) {
            addToast("error", "Error deleting salary record.");
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus.toLowerCase() === "paid" ? "Pending" : "Paid";
        try {
            await axios.put(`/api/salary/${id}/status`, { status: newStatus }, { withCredentials: true });
            addToast("success", `Salary marked as ${newStatus}.`);
            fetchSalaries();
        } catch (err) {
            addToast("error", "Error updating status.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-12 w-full animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-dark flex items-center gap-2">
                        <Wallet className="text-brand-500" size={28} /> 
                        {role === "admin" ? "All Salary Slips" : "My Salary Slips"}
                    </h1>
                    <p className="text-gray-500 mt-1">Review payroll disbursements and history.</p>
                </div>
            </div>

            {loading ? (
                <TableSkeleton rows={8} />
            ) : error ? (
                <ErrorState 
                    title="Failed to load salaries" 
                    description="There was a problem communicating with our payroll servers." 
                    onRetry={fetchSalaries} 
                />
            ) : salaries.length === 0 ? (
                <EmptyState 
                    icon={Wallet}
                    title="No salary records found"
                    description={role === "admin" ? "You haven't generated any salary slips yet." : "No salary records have been issued for you yet."}
                />
            ) : (
                <div className="card overflow-hidden border border-gray-100 shadow-sm">
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Ref ID</th>
                                    {role === "admin" && <th>Staff</th>}
                                    <th>Billing Cycle</th>
                                    <th className="text-right">Amount</th>
                                    <th className="text-center">Status</th>
                                    <th>Generated On</th>
                                    {role === "admin" && <th className="text-right">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {salaries.map((s) => (
                                    <tr key={s.id} className="group hover:bg-gray-50/80 transition-colors">
                                        <td className="font-semibold text-gray-500 font-mono text-sm">
                                            PAY-{s.id.toString().padStart(4, '0')}
                                        </td>
                                        {role === "admin" && (
                                            <td>
                                                <div className="font-semibold text-dark">{s.staff_name}</div>
                                                <div className="text-xs text-gray-500">{s.role || "Unassigned"}</div>
                                            </td>
                                        )}
                                        <td className="text-gray-600 font-medium">
                                            {s.month}
                                        </td>
                                        <td className="text-right font-bold text-dark tabular-nums">
                                            ₹{s.amount.toLocaleString()}
                                        </td>
                                        <td className="text-center">
                                            {s.status.toLowerCase() === "paid" ? (
                                                <span className="badge badge-success">
                                                    <CheckCircle size={12} className="mr-1" /> Paid
                                                </span>
                                            ) : (
                                                <span className="badge badge-warning">
                                                    <Clock size={12} className="mr-1" /> {s.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-gray-500 text-sm">
                                            {new Date(s.created_at).toLocaleDateString()}
                                        </td>
                                        {role === "admin" && (
                                            <td className="text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button 
                                                        onClick={() => handleUpdateStatus(s.id, s.status)}
                                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex"
                                                        title={`Mark as ${s.status.toLowerCase() === 'paid' ? 'Pending' : 'Paid'}`}
                                                    >
                                                        <RotateCcw size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(s.id)}
                                                        className="p-2 text-gray-400 hover:text-status-error hover:bg-status-errorBg rounded-lg transition-colors inline-flex"
                                                        title="Delete Salary Slip"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
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

export default ViewSalary;
