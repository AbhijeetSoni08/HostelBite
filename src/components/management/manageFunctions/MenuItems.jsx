import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Coffee, Utensils, UtensilsCrossed, Settings, Trash2, Edit2, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TableSkeleton } from "../../common/Skeleton";
import { ErrorState, EmptyState } from "../../common/StateDisplays";
import { useToast } from "../../common/ToastContext";

const MenuItems = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    // Modal states
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingMeal, setEditingMeal] = useState(null);
    const [editItems, setEditItems] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchMenu = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get("/api/menu/getAll", {
                withCredentials: true
            });
            setMenuData(response.data);
        } catch (err) {
            console.error("Error fetching menu:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const handleDeleteAll = async () => {
        if (!window.confirm("WARNING: This will permanently delete the entire menu. Are you absolutely sure?")) {
            return;
        }

        try {
            await axios.delete("/api/menu/delete", { withCredentials: true });
            addToast("Menu completely cleared", "success");
            fetchMenu();
        } catch (error) {
            addToast("Failed to clear menu", "error");
        }
    };

    const handleEditClick = (meal) => {
        setEditingMeal(meal);
        setEditItems(meal.items);
        setIsEditModalOpen(true);
    };

    const handleUpdateMenu = async (e) => {
        e.preventDefault();
        if (!editItems.trim()) return;

        setIsSubmitting(true);
        try {
            await axios.put("/api/menu/updateMenu", {
                day: editingMeal.day,
                meal_type: editingMeal.meal_type,
                items: editItems
            }, { withCredentials: true });
            
            addToast("Menu updated successfully", "success");
            setIsEditModalOpen(false);
            fetchMenu(); // Refresh data
        } catch (error) {
            addToast("Failed to update menu", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Helper to group and sort days logically
    const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const mealOrder = ["breakfast", "lunch", "snacks", "dinner"];
    
    const getMealIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'breakfast': return <Coffee size={16} className="text-amber-500" />;
            case 'lunch': return <Utensils size={16} className="text-emerald-500" />;
            case 'snacks': return <UtensilsCrossed size={16} className="text-orange-500" />;
            case 'dinner': return <Utensils size={16} className="text-indigo-500" />;
            default: return <Utensils size={16} />;
        }
    };

    // Sort menu data for logical display
    const sortedMenu = [...menuData].sort((a, b) => {
        if (a.day !== b.day) {
            return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
        }
        return mealOrder.indexOf(a.meal_type.toLowerCase()) - mealOrder.indexOf(b.meal_type.toLowerCase());
    });

    return (
        <div className="max-w-7xl mx-auto pb-12 w-full animate-fade-in relative">
            
            {/* Edit Modal */}
            {isEditModalOpen && editingMeal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-slide-up">
                        <h3 className="text-xl font-bold text-dark mb-1">Edit {editingMeal.day} {editingMeal.meal_type}</h3>
                        <p className="text-gray-500 text-sm mb-6">Update the dishes served for this meal.</p>
                        
                        <form onSubmit={handleUpdateMenu}>
                            <div className="mb-6">
                                <label className="block mb-2 text-sm font-semibold text-gray-700">Menu Items (comma separated)</label>
                                <textarea
                                    value={editItems}
                                    onChange={(e) => setEditItems(e.target.value)}
                                    className="input-field resize-y min-h-[100px]"
                                    placeholder="e.g. Poha, Jalebi, Tea"
                                    required
                                />
                            </div>
                            
                            <div className="flex gap-3">
                                <button 
                                    type="button" 
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 flex-1 py-3"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="btn btn-primary flex-1 py-3"
                                >
                                    {isSubmitting ? <RefreshCw className="animate-spin" size={18} /> : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate("/admin-dashboard/menu-section")} 
                        className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-dark hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-dark flex items-center gap-2">
                            <UtensilsCrossed className="text-brand-500" size={28} /> Menu Master
                        </h1>
                        <p className="text-gray-500 mt-1">Configure the weekly dining schedule and meal items.</p>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button 
                        onClick={handleDeleteAll}
                        className="btn bg-white border border-gray-200 text-status-error hover:bg-status-errorBg hover:border-status-error/30 px-4 py-2"
                        title="Clear entire menu"
                    >
                        <Trash2 size={18} className="mr-2" /> Reset All
                    </button>
                    <button 
                        onClick={() => navigate("/add-menu")}
                        className="btn btn-primary px-4 py-2"
                    >
                        <Plus size={18} className="mr-2" /> Add Meal
                    </button>
                </div>
            </div>

            {loading ? (
                <TableSkeleton rows={8} />
            ) : error ? (
                <ErrorState 
                    title="Failed to load menu" 
                    description="There was a problem reaching our servers." 
                    onRetry={fetchMenu} 
                />
            ) : sortedMenu.length === 0 ? (
                <EmptyState 
                    icon={Utensils}
                    title="No menu configured"
                    description="The weekly menu is currently empty. Start by adding a new meal schedule."
                    actionLabel="Configure Menu"
                    onAction={() => navigate('/add-menu')}
                />
            ) : (
                <div className="card overflow-hidden border border-gray-100 shadow-sm">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-dark flex items-center gap-2">
                            <Settings size={18} className="text-gray-400" /> Operating Schedule
                        </h3>
                    </div>
                    
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Day of Week</th>
                                    <th>Meal Service</th>
                                    <th>Menu Items</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedMenu.map((meal, index) => (
                                    <tr key={`${meal.day}-${meal.meal_type}-${index}`} className="group hover:bg-gray-50/80 transition-colors">
                                        <td className="font-bold text-dark">
                                            {meal.day}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                {getMealIcon(meal.meal_type)}
                                                <span className="font-semibold text-gray-700 capitalize">{meal.meal_type}</span>
                                            </div>
                                        </td>
                                        <td className="text-gray-600 font-medium">
                                            {meal.items.split(',').map((item, i) => (
                                                <span key={i} className="inline-block mr-2 mb-1 px-2 py-0.5 bg-white border border-gray-200 rounded-md text-xs shadow-sm">
                                                    {item.trim()}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="text-right">
                                            <button 
                                                onClick={() => handleEditClick(meal)}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex"
                                                title="Edit items"
                                            >
                                                <Edit2 size={18} />
                                            </button>
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

export default MenuItems;
