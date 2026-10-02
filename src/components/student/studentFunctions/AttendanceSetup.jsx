import React, { useState, useEffect } from "react";
import { QrCode, Settings2, Loader2, ArrowRight } from "lucide-react";

const AttendanceSetup = ({ onSave }) => {
    const [details, setDetails] = useState({
        student_id: "",
        menu_id: "",
        meal_type: "",
    });
    const [isSaving, setIsSaving] = useState(false);

    // Auto-fill student_id if available in local storage
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const savedDetails = localStorage.getItem("studentDetails");
        
        if (savedDetails) {
            setDetails(JSON.parse(savedDetails));
        } else if (userId) {
            setDetails(prev => ({ ...prev, student_id: userId }));
        }
    }, []);

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        // Simulate network delay for UX
        setTimeout(() => {
            localStorage.setItem("studentDetails", JSON.stringify(details));
            setIsSaving(false);
            if (onSave) onSave(details);
        }, 600);
    };

    return (
        <div className="max-w-md mx-auto min-h-[80vh] flex flex-col justify-center px-4 font-sans animate-fade-in">
            <div className="card p-8 md:p-10 shadow-xl border-t-4 border-t-brand-500 relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-500 rounded-full blur-[60px] opacity-20"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                        <Settings2 size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-dark mb-2">
                        Device Setup
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Before scanning, please configure your device for the current meal service.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Student ID
                        </label>
                        <input
                            type="text"
                            name="student_id"
                            placeholder="Enter your student ID"
                            value={details.student_id}
                            onChange={handleChange}
                            className="input-field bg-gray-50/50 font-mono"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Menu ID
                            </label>
                            <input
                                type="text"
                                name="menu_id"
                                placeholder="e.g. 101"
                                value={details.menu_id}
                                onChange={handleChange}
                                className="input-field bg-gray-50/50 tabular-nums"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Meal Type
                            </label>
                            <select
                                name="meal_type"
                                value={details.meal_type}
                                onChange={handleChange}
                                className="input-field bg-gray-50/50 capitalize"
                                required
                            >
                                <option value="">Select</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="snacks">Snacks</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="btn btn-primary w-full py-3.5 shadow-soft group"
                        >
                            {isSaving ? (
                                <><Loader2 size={18} className="mr-2 animate-spin" /> Saving Configuration...</>
                            ) : (
                                <>
                                    <QrCode size={18} className="mr-2" /> 
                                    Continue to Scanner
                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform opacity-70" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
            
            <p className="text-center text-gray-400 text-xs mt-6 font-medium">
                This configuration will be saved on your device for future scans.
            </p>
        </div>
    );
};

export default AttendanceSetup;
