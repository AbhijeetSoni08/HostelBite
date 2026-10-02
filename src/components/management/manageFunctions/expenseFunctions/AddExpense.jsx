import React, { useState } from "react";
import axios from "axios";
import { useToast } from "../../../common/ToastContext";
import { Receipt, Calculator, Save, Loader2, IndianRupee } from "lucide-react";

const AddExpense = () => {
    const { addToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        date: "",
        description: "",
        qty: "",
        rate_kg: "",
    });

    const [amount, setAmount] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value };

        const qty = parseFloat(updatedData.qty) || 0;
        const rate = parseFloat(updatedData.rate_kg) || 0;
        setAmount(qty * rate);
        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const management_id = localStorage.getItem("userId");
        const { title, category, date, qty, rate_kg } = formData;
        
        if (!title || !category || !date || !qty || !rate_kg) {
            addToast("warning", "Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post("/api/expenses/", {
                ...formData,
                amount,
                management_id: management_id, 
            });

            addToast("success", response.data.message || "Expense added successfully!");
            setFormData({ title: "", category: "", date: "", description: "", qty: "", rate_kg: "" });
            setAmount(0);
        } catch (error) {
            console.error("Error:", error);
            addToast("error", "Failed to add expense. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-10 font-sans animation-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Record Expense</h1>
                <p className="text-gray-500">Log new inventory purchases and operating costs.</p>
            </div>

            <div className="card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
                        <Receipt size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-dark">Purchase Details</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Item Title <span className="text-rose-500">*</span></label>
                            <input
                                type="text"
                                name="title"
                                placeholder="e.g. Basmati Rice"
                                value={formData.title}
                                onChange={handleChange}
                                className="input-field w-full"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Category <span className="text-rose-500">*</span></label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="input-field w-full"
                                required
                            >
                                <option value="">Select category...</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Meat">Meat/Poultry</option>
                                <option value="Cleaning">Cleaning Supplies</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Purchase Date <span className="text-rose-500">*</span></label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="input-field w-full"
                                required
                            />
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Quantity <span className="text-rose-500">*</span></label>
                            <div className="relative">
                                <input
                                    type="number"
                                    step="0.01"
                                    name="qty"
                                    placeholder="0.00"
                                    value={formData.qty}
                                    onChange={handleChange}
                                    className="input-field w-full pr-12"
                                    required
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">
                                    Units
                                </span>
                            </div>
                        </div>

                        {/* Rate per Unit */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Rate per Unit <span className="text-rose-500">*</span></label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <IndianRupee size={16} />
                                </div>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="rate_kg"
                                    placeholder="0.00"
                                    value={formData.rate_kg}
                                    onChange={handleChange}
                                    className="input-field w-full pl-9"
                                    required
                                />
                            </div>
                        </div>

                        {/* Auto-Calculated Amount */}
                        <div>
                            <label className="block text-sm font-semibold text-brand-700 mb-1 flex items-center gap-1.5">
                                <Calculator size={14} /> Total Amount
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-600">
                                    <IndianRupee size={16} />
                                </div>
                                <input
                                    type="text"
                                    name="amount"
                                    value={amount.toFixed(2)}
                                    readOnly
                                    className="input-field w-full pl-9 bg-brand-50 border-brand-200 text-brand-900 font-bold focus:border-brand-200 focus:ring-0 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Notes / Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="input-field w-full h-24 py-3"
                            placeholder="Add vendor name, invoice number, or any other details..."
                        ></textarea>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary px-8 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" /> Processing...
                                </>
                            ) : (
                                <>
                                    <Save size={18} /> Add Expense Record
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
