import React, { useState } from "react";
import axios from "axios";
import { useToast } from "../../../common/ToastContext";
import { PenTool, Loader2, Save } from "lucide-react";

const UpdateMenu = () => {
    const { addToast } = useToast();
    const [day, setDay] = useState("");
    const [mealType, setMealType] = useState("");
    const [items, setItems] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!day || !mealType || !items) {
            addToast("warning", "Please fill out all fields before updating.");
            return;
        }

        setIsUpdating(true);
        try {
            const res = await axios.put("/api/menu/updateMenu", {
                day,
                meal_type: mealType,
                items,
            });
            addToast("success", res.data.message || "Menu updated successfully!");
            setDay("");
            setMealType("");
            setItems("");
        } catch (error) {
            console.error("Error updating menu:", error);
            if (error.response && error.response.status === 404) {
                addToast("info", "Menu not found for the specified day.");
            } else {
                addToast("error", "Failed to update menu. Please try again.");
            }
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-10 font-sans animation-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Edit Daily Menu</h1>
                <p className="text-gray-500">Target a specific day and meal to make rapid corrections.</p>
            </div>

            <div className="card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
                        <PenTool size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-dark">Modification Details</h2>
                </div>

                <form onSubmit={handleUpdate} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Day Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Target Day</label>
                            <select
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="input-field w-full"
                            >
                                <option value="">Select day</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>

                        {/* Meal Type Dropdown */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Meal Time</label>
                            <select
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)}
                                className="input-field w-full"
                            >
                                <option value="">Select meal type</option>
                                <option value="breakfast">🌅 Breakfast</option>
                                <option value="lunch">☀️ Lunch</option>
                                <option value="snacks">🌤️ Snacks</option>
                                <option value="dinner">🌙 Dinner</option>
                            </select>
                        </div>
                    </div>

                    {/* Items Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Updated Items</label>
                        <textarea
                            value={items}
                            onChange={(e) => setItems(e.target.value)}
                            placeholder="e.g. Rajma Chawal, Roti, Salad"
                            className="input-field w-full h-24 py-3"
                        />
                    </div>

                    {/* Update Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="w-full btn btn-primary py-3 flex items-center justify-center gap-2"
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" /> Updating...
                                </>
                            ) : (
                                <>
                                    <Save size={18} /> Apply Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMenu;
