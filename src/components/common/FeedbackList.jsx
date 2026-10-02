import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, ArrowLeft, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TableSkeleton } from "./Skeleton";
import { EmptyState, ErrorState } from "./StateDisplays";

const FeedbackList = () => {
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchFeedbacks = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await axios.get("/api/feedbacks/getAll", {
                withCredentials: true
            });
            setFeedbacks(res.data);
        } catch (err) {
            console.error("Failed to fetch feedback", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const renderStars = (rating) => {
        return (
            <div className="flex items-center gap-0.5 text-brand-500">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        size={16} 
                        fill={i < rating ? "currentColor" : "none"} 
                        className={i < rating ? "text-brand-500" : "text-gray-300"} 
                    />
                ))}
            </div>
        );
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
                            <Star className="text-brand-500" size={28} /> Mess Feedback
                        </h1>
                        <p className="text-gray-500 mt-1">Review student ratings and comments</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="card p-5 animate-pulse">
                            <div className="flex justify-between mb-3">
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-16 w-full bg-gray-100 rounded mb-3"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <ErrorState 
                    title="Unable to load feedback" 
                    description="There was a problem reaching our servers." 
                    onRetry={fetchFeedbacks} 
                />
            ) : feedbacks.length === 0 ? (
                <EmptyState 
                    icon={MessageSquare}
                    title="No feedback yet"
                    description="Students haven't submitted any feedback for the mess."
                />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {feedbacks.map((fb) => (
                        <div key={fb.id} className="card p-5 hover:shadow-card-hover transition-all">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{fb.student_name || "Anonymous Student"}</h3>
                                    <span className="text-xs text-gray-500 font-medium">
                                        {new Date(fb.submitted_at).toLocaleDateString(undefined, { 
                                            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <div className="bg-brand-50 px-2 py-1 rounded-md border border-brand-100">
                                    {renderStars(fb.rating)}
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-3">
                                <p className="text-gray-700 italic text-sm">
                                    "{fb.message}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeedbackList;
