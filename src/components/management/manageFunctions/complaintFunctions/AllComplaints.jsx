import React, { useEffect, useState } from "react";
import axios from "axios";
import { MessageSquareWarning, CheckCircle2, Clock, MessageSquare, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TableSkeleton } from "../../../common/Skeleton";
import { ErrorState, EmptyState } from "../../../common/StateDisplays";
import { useToast } from "../../../common/ToastContext";

const AllComplaints = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchComplaints = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await axios.get("/api/complaints/", {
                withCredentials: true
            });
            setComplaints(res.data);
        } catch (error) {
            console.error("Error fetching complaints:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async (complaint_id) => {
        if (!window.confirm("Mark this complaint as resolved?")) return;
        try {
            await axios.put(`/api/complaints/${complaint_id}/resolve`, {
                complaint_id: complaint_id,
                response: "Your complaint has been resolved."
            }, { withCredentials: true });
            
            addToast("Complaint resolved successfully", "success");
            fetchComplaints();
        } catch (error) {
            console.error("Error resolving complaint:", error);
            addToast("Failed to resolve complaint", "error");
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    return (
        <div className="max-w-7xl mx-auto pb-12 w-full animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate("/admin-dashboard/complaints-section")} 
                        className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-dark hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-dark flex items-center gap-2">
                            <MessageSquareWarning className="text-rose-500" size={28} /> Complaints Inbox
                        </h1>
                        <p className="text-gray-500 mt-1">Review and resolve issues reported by students.</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <TableSkeleton rows={8} />
            ) : error ? (
                <ErrorState 
                    title="Failed to load complaints" 
                    description="There was a problem fetching the inbox data." 
                    onRetry={fetchComplaints} 
                />
            ) : complaints.length === 0 ? (
                <EmptyState 
                    icon={MessageSquareWarning}
                    title="Inbox Zero"
                    description="There are no student complaints at the moment. Great job!"
                />
            ) : (
                <div className="card overflow-hidden border border-gray-100 shadow-sm">
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th className="w-20">ID</th>
                                    <th>Student ID</th>
                                    <th className="w-1/2">Complaint Description</th>
                                    <th>Date Submitted</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {complaints.map((c) => (
                                    <tr key={c.complaint_id} className="group hover:bg-gray-50/80 transition-colors">
                                        <td className="font-semibold text-gray-500 font-mono text-sm">
                                            #{c.complaint_id.toString().padStart(4, '0')}
                                        </td>
                                        <td className="font-medium text-dark">
                                            {c.student_id}
                                        </td>
                                        <td>
                                            <div className="flex items-start gap-2">
                                                <MessageSquare size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                                <p className="text-gray-700 font-medium line-clamp-2" title={c.description}>
                                                    {c.title ? <span className="font-bold text-dark block mb-0.5">{c.title}</span> : null}
                                                    {c.description}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="text-gray-500 text-sm tabular-nums whitespace-nowrap">
                                            {new Date(c.submitted_at).toLocaleDateString(undefined, { 
                                                month: 'short', day: 'numeric', year: 'numeric' 
                                            })}
                                        </td>
                                        <td className="text-center">
                                            {c.status.toLowerCase() === "resolved" ? (
                                                <span className="badge badge-success">
                                                    <CheckCircle2 size={12} className="mr-1" /> Resolved
                                                </span>
                                            ) : (
                                                <span className="badge badge-error">
                                                    <Clock size={12} className="mr-1" /> Pending
                                                </span>
                                            )}
                                        </td>
                                        <td className="text-right align-middle">
                                            {c.status.toLowerCase() !== "resolved" ? (
                                                <button 
                                                    onClick={() => handleResolve(c.complaint_id)}
                                                    className="btn btn-primary py-1.5 px-3 text-xs shadow-sm"
                                                >
                                                    Mark Resolved
                                                </button>
                                            ) : (
                                                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-md inline-block">
                                                    Closed
                                                </span>
                                            )}
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

export default AllComplaints;
