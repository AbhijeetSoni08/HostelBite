import React, { useState, useEffect } from "react";
import axios from "axios";
import { Megaphone, Users, User, LayoutGrid, Loader2, Send } from "lucide-react";
import { useToast } from "../../../common/ToastContext";

const SendNotification = () => {
    const { addToast } = useToast();
    const [students, setStudents] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        targetType: "all",
        user_id: "",
        course: "",
        year: "",
        title: "",
        message: ""
    });

    useEffect(() => {
        axios.get("/api/students/getAll")
            .then(res => setStudents(res.data))
            .catch(err => console.error("Error fetching students:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title.trim() || !formData.message.trim()) {
            addToast("warning", "Please provide both a title and a message.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await axios.post("/api/notification/createNotification", formData);
            addToast("success", res.data.message || "Notification broadcast sent successfully!");
            setFormData({
                targetType: "all",
                user_id: "",
                course: "",
                year: "",
                title: "",
                message: ""
            });
        } catch (error) {
            console.error("Error sending notification:", error);
            addToast("error", "Failed to broadcast notification.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-10 font-sans animation-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Broadcast Notification</h1>
                <p className="text-gray-500">Push urgent alerts and general announcements to students.</p>
            </div>

            <div className="card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
                        <Megaphone size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-dark">Message Details</h2>
                        <p className="text-sm text-gray-500">Configure your alert targeting and content.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Select Target Type */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center gap-2 ${formData.targetType === 'all' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                <input type="radio" name="targetType" value="all" className="hidden" checked={formData.targetType === 'all'} onChange={handleChange} />
                                <Users size={24} />
                                <span className="font-semibold text-sm">Everyone</span>
                            </label>
                            
                            <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center gap-2 ${formData.targetType === 'group' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                <input type="radio" name="targetType" value="group" className="hidden" checked={formData.targetType === 'group'} onChange={handleChange} />
                                <LayoutGrid size={24} />
                                <span className="font-semibold text-sm">Course Batch</span>
                            </label>
                            
                            <label className={`border-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center gap-2 ${formData.targetType === 'single' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                <input type="radio" name="targetType" value="single" className="hidden" checked={formData.targetType === 'single'} onChange={handleChange} />
                                <User size={24} />
                                <span className="font-semibold text-sm">Specific Student</span>
                            </label>
                        </div>
                    </div>

                    {/* Single Student Selection */}
                    {formData.targetType === "single" && (
                        <div className="animation-slide-up">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Student</label>
                            <select
                                name="user_id"
                                value={formData.user_id}
                                onChange={handleChange}
                                className="input-field w-full"
                                required
                            >
                                <option value="">-- Choose recipient --</option>
                                {students.map((s) => (
                                    <option key={s.student_id} value={s.student_id}>
                                        {s.name} ({s.course}-{s.year})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Group Selection */}
                    {formData.targetType === "group" && (
                        <div className="grid grid-cols-2 gap-4 animation-slide-up">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Course</label>
                                <input
                                    type="text"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    className="input-field w-full"
                                    placeholder="e.g. BTech"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Year</label>
                                <input
                                    type="text"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="input-field w-full"
                                    placeholder="e.g. 2"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Notification Title <span className="text-rose-500">*</span></label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input-field w-full font-medium"
                            placeholder="e.g. Urgent: Water Supply Interruption"
                            required
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Detailed Message <span className="text-rose-500">*</span></label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="input-field w-full h-32 py-3"
                            placeholder="Type your announcement here..."
                            required
                        />
                    </div>

                    <div className="pt-4 flex justify-end border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary px-8 py-3 w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" /> Broadcasting...
                                </>
                            ) : (
                                <>
                                    <Send size={18} /> Send Notification
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SendNotification;
