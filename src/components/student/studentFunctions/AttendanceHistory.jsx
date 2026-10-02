import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookOpen, Search, ArrowLeft, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { TableSkeleton } from "../../common/Skeleton";
import { EmptyState, ErrorState } from "../../common/StateDisplays";

const AttendanceHistory = () => {
    const navigate = useNavigate();
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchAttendance = async () => {
        setLoading(true);
        setError(false);
        try {
            const student_id = localStorage.getItem("userId");
            const res = await axios.get(`/api/attendance/student/${student_id}`, {
                withCredentials: true
            });
            setAttendance(res.data);
        } catch (err) {
            console.error("Failed to fetch attendance history", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

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
                            <BookOpen className="text-brand-500" size={28} /> Attendance History
                        </h1>
                        <p className="text-gray-500 mt-1">Review your past meal check-ins</p>
                    </div>
                </div>
                
                <Link to="/mark-attendance" className="btn btn-primary px-4 py-2 whitespace-nowrap">
                    <Plus size={18} className="mr-2" /> Mark Attendance
                </Link>
            </div>

            {loading ? (
                <TableSkeleton rows={5} />
            ) : error ? (
                <ErrorState 
                    title="Unable to load attendance" 
                    description="There was a problem reaching our servers." 
                    onRetry={fetchAttendance} 
                />
            ) : attendance.length === 0 ? (
                <EmptyState 
                    icon={BookOpen}
                    title="No attendance records"
                    description="You haven't marked any meal attendance yet."
                    actionLabel="Mark Attendance"
                    onAction={() => navigate('/mark-attendance')}
                />
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Meal Type</th>
                                <th>Menu Items</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((record) => (
                                <tr key={record.attendance_id}>
                                    <td className="font-medium text-gray-900 tabular-nums">
                                        {new Date(record.date).toLocaleDateString(undefined, { 
                                            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' 
                                        })}
                                    </td>
                                    <td className="capitalize font-semibold text-gray-700">{record.meal_type}</td>
                                    <td className="text-gray-600 max-w-sm truncate" title={record.menu_items}>
                                        {record.menu_items}
                                    </td>
                                    <td>
                                        <span className={`badge ${record.status.toLowerCase() === 'present' ? 'badge-success' : 'badge-neutral'}`}>
                                            {record.status}
                                        </span>
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

export default AttendanceHistory;
