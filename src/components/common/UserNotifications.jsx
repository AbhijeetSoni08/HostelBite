import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./Skeleton";
import { EmptyState, ErrorState } from "./StateDisplays";

const UserNotifications = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchNotifications = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await axios.get(
                `/api/notification/${userId}/${role}`,
                { withCredentials: true }
            );
            setNotifications(res.data);
        } catch (err) {
            console.error("Error fetching notifications:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, [userId, role]);

    return (
        <div className="max-w-4xl mx-auto pb-12 w-full animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
                <button 
                    onClick={() => navigate(-1)} 
                    className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-dark hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-dark flex items-center gap-2">
                        <Bell className="text-brand-500" size={28} /> Announcements
                    </h1>
                    <p className="text-gray-500 mt-1">Important updates from hostel management</p>
                </div>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="card p-5">
                            <Skeleton className="h-5 w-1/3 mb-3" />
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                    ))}
                </div>
            ) : error ? (
                <ErrorState 
                    title="Could not load notifications" 
                    description="We're having trouble reaching the server."
                    onRetry={fetchNotifications}
                />
            ) : notifications.length === 0 ? (
                <EmptyState 
                    icon={Bell}
                    title="You're all caught up"
                    description="There are no new announcements at this time."
                />
            ) : (
                <div className="space-y-4">
                    {notifications.map((n) => (
                        <div
                            key={n.notification_id}
                            className="card card-hover p-6 border-l-4 border-l-brand-500"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                                <h3 className="text-lg font-bold text-gray-800 leading-tight">
                                    {n.title}
                                </h3>
                                <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-pill whitespace-nowrap">
                                    {new Date(n.sent_at).toLocaleDateString(undefined, { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {n.message}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserNotifications;
