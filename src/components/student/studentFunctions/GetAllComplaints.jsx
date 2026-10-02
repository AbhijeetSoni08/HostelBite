import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, MessageSquare, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { TableSkeleton } from "../../common/Skeleton";
import { EmptyState, ErrorState } from "../../common/StateDisplays";

const ViewComplaints = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchComplaints = async () => {
        setLoading(true);
        setError(false);
        try {
            const student_id = localStorage.getItem("userId");
            const res = await axios.get(`/api/complaints/complaint/${student_id}`, {
                withCredentials: true
            });
            setComplaints(res.data.complaints || []);
        } catch (err) {
            console.error("Failed to fetch complaints", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const getStatusBadge = (status) => {
        if (status === "Pending") return <span className="badge badge-warning">Pending</span>;
        if (status === "Resolved") return <span className="badge badge-success">Resolved</span>;
        return <span className="badge badge-neutral">{status}</span>;
    };

    return (
        <div className="max-w-6xl mx-auto pb-12 w-full animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-dark hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-dark flex items-center gap-2">
                            <MessageSquare className="text-brand-500" size={28} /> My Complaints
                        </h1>
                        <p className="text-gray-500 mt-1">Track issues and maintenance requests</p>
                    </div>
                </div>
                
                <Link to="/submit-complaint" className="btn btn-primary px-4 py-2 whitespace-nowrap">
                    <Plus size={18} className="mr-2" /> New Complaint
                </Link>
            </div>

            {loading ? (
                <TableSkeleton rows={5} />
            ) : error ? (
                <ErrorState 
                    title="Unable to load complaints" 
                    description="There was a problem reaching our servers." 
                    onRetry={fetchComplaints} 
                />
            ) : complaints.length === 0 ? (
                <EmptyState 
                    icon={MessageSquare}
                    title="No complaints filed"
                    description="Everything looks good! You haven't raised any issues yet."
                    actionLabel="Raise an Issue"
                    onAction={() => navigate('/submit-complaint')}
                />
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Submitted On</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complaints.map((c) => (
                                <tr key={c.complaint_id}>
                                    <td className="text-gray-500 font-medium tabular-nums">#{c.complaint_id}</td>
                                    <td className="font-semibold text-gray-800">{c.title}</td>
                                    <td className="max-w-xs truncate text-gray-600" title={c.description}>
                                        {c.description}
                                    </td>
                                    <td className="tabular-nums">
                                        {new Date(c.submitted_at).toLocaleDateString(undefined, { 
                                            month: 'short', day: 'numeric', year: 'numeric' 
                                        })}
                                    </td>
                                    <td>{getStatusBadge(c.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewComplaints;
