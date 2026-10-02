import React, { useState } from "react";
import axios from "axios";
import { useToast } from "../../../common/ToastContext";
import { UtensilsCrossed, CalendarDays, Loader2, Save } from "lucide-react";

const CreateMenu = () => {
    const { addToast } = useToast();
    const [mealType, setMealType] = useState("breakfast");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [menuItems, setMenuItems] = useState([
        { day: "Monday", items: "" },
        { day: "Tuesday", items: "" },
        { day: "Wednesday", items: "" },
        { day: "Thursday", items: "" },
        { day: "Friday", items: "" },
        { day: "Saturday", items: "" },
        { day: "Sunday", items: "" },
    ]);

    const handleChange = (index, value) => {
        const updated = [...menuItems];
        updated[index].items = value;
        setMenuItems(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emptyFields = menuItems.some((m) => !m.items.trim());
        if (emptyFields) {
            addToast("warning", "Please fill out the menu for all 7 days before saving.");
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post("/api/menu/", {
                meal_type: mealType,
                menuItems,
            });
            addToast("success", `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} menu updated successfully!`);
            // Optional: reset form
            setMenuItems(menuItems.map(m => ({ ...m, items: "" })));
        } catch (error) {
            console.error(error);
            addToast("error", error.response?.data?.error || "Error saving weekly menu");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-10 font-sans animation-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Publish Weekly Menu</h1>
                <p className="text-gray-500">Configure the meals served across the entire week.</p>
            </div>

            <div className="card p-6 md:p-8">
                <form onSubmit={handleSubmit}>
                    {/* Meal Type Selection */}
                    <div className="mb-8 p-4 bg-brand-50 rounded-2xl border border-brand-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-brand-500 rounded-xl text-dark shadow-sm">
                                <UtensilsCrossed size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Select Meal Time</h3>
                                <p className="text-sm text-gray-500">Which menu are you publishing?</p>
                            </div>
                        </div>
                        <div className="sm:w-64">
                            <select
                                className="input-field w-full font-medium"
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)}
                                required
                            >
                                <option value="breakfast">🌅 Breakfast</option>
                                <option value="lunch">☀️ Lunch</option>
                                <option value="snacks">🌤️ Snacks</option>
                                <option value="dinner">🌙 Dinner</option>
                            </select>
                        </div>
                    </div>

                    {/* Weekly Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                        {menuItems.map((menu, index) => (
                            <div key={menu.day} className={`group ${menu.day === "Sunday" ? 'md:col-span-2 md:w-[calc(50%-0.75rem)]' : ''}`}>
                                <label className="flex items-center gap-2 mb-1.5 font-semibold text-sm text-gray-700">
                                    <CalendarDays size={14} className="text-gray-400 group-focus-within:text-brand-500 transition-colors" /> 
                                    {menu.day}
                                </label>
                                <input
                                    type="text"
                                    placeholder={`e.g. Aloo Paratha, Curd`}
                                    className="input-field w-full"
                                    value={menu.items}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary px-8 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Publish {mealType.charAt(0).toUpperCase() + mealType.slice(1)} Menu
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMenu;
