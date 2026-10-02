import React, { useEffect, useState } from "react";
import axios from "axios";
import { Plus, TrendingDown, IndianRupee, PieChart, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TableSkeleton } from "../../common/Skeleton";
import { ErrorState, EmptyState } from "../../common/StateDisplays";

const ExpenseItems = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [categoryBreakdown, setCategoryBreakdown] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    // Example budget (could be fetched from backend)
    const totalBudget = 50000; 

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get("/api/expenses/viewAllExpenses", {
                withCredentials: true
            });
            setExpenses(response.data.expenses);
            setTotalAmount(response.data.totalAmount);
            setCategoryBreakdown(response.data.categoryBreakdown);
        } catch (err) {
            console.error("Error fetching expenses:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const remainingBudget = totalBudget - totalAmount;
    const isOverBudget = remainingBudget < 0;

    return (
        <div className="max-w-7xl mx-auto pb-12 w-full animate-fade-in">
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
                            <TrendingDown className="text-rose-500" size={28} /> Expense Tracker
                        </h1>
                        <p className="text-gray-500 mt-1">Monitor operational costs and mess budget.</p>
                    </div>
                </div>
                
                <button 
                    onClick={() => navigate("/add-expense")}
                    className="btn bg-rose-600 text-white hover:bg-rose-700 shadow-level-1 px-4 py-2 whitespace-nowrap"
                >
                    <Plus size={18} className="mr-2" /> Record Expense
                </button>
            </div>

            {loading ? (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="card p-6 h-32 animate-pulse flex flex-col justify-between">
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                    <TableSkeleton rows={5} />
                </div>
            ) : error ? (
                <ErrorState 
                    title="Failed to load expenses" 
                    description="There was a problem reaching our servers." 
                    onRetry={fetchData} 
                />
            ) : (
                <>
                    {/* Metrics Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="card p-6 flex flex-col border-t-4 border-t-blue-500">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-500">Total Budget</h3>
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <IndianRupee size={20} />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-dark">₹{totalBudget.toLocaleString()}</p>
                        </div>

                        <div className="card p-6 flex flex-col border-t-4 border-t-rose-500">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-500">Total Spent</h3>
                                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                                    <TrendingDown size={20} />
                                </div>
                            </div>
                            <p className="text-3xl font-bold text-dark">₹{totalAmount.toLocaleString()}</p>
                        </div>

                        <div className={`card p-6 flex flex-col border-t-4 ${isOverBudget ? 'border-t-status-error' : 'border-t-status-success'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-500">Remaining Budget</h3>
                                <div className={`p-2 rounded-lg ${isOverBudget ? 'bg-status-errorBg text-status-error' : 'bg-status-successBg text-status-success'}`}>
                                    <PieChart size={20} />
                                </div>
                            </div>
                            <p className={`text-3xl font-bold ${isOverBudget ? 'text-status-error' : 'text-status-success'}`}>
                                ₹{remainingBudget.toLocaleString()}
                            </p>
                            {isOverBudget && <p className="text-xs text-status-error mt-2 font-medium">Budget exceeded</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Categories List */}
                        <div className="lg:col-span-1">
                            <div className="card overflow-hidden">
                                <div className="p-5 border-b border-gray-100 bg-gray-50/50">
                                    <h3 className="font-bold text-dark">Category Breakdown</h3>
                                </div>
                                <div className="p-2">
                                    {categoryBreakdown.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500 text-sm">No categorical data.</div>
                                    ) : (
                                        <ul className="divide-y divide-gray-100">
                                            {categoryBreakdown.map((cat, index) => (
                                                <li key={index} className="p-3 flex justify-between items-center hover:bg-gray-50 rounded-lg transition-colors">
                                                    <span className="font-medium text-gray-700 capitalize">{cat.category}</span>
                                                    <span className="font-bold text-dark">₹{cat.categoryTotal.toLocaleString()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Transactions Table */}
                        <div className="lg:col-span-2">
                            <div className="card overflow-hidden">
                                <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                    <h3 className="font-bold text-dark">Recent Transactions</h3>
                                </div>
                                
                                {expenses.length === 0 ? (
                                    <EmptyState 
                                        icon={TrendingDown}
                                        title="No expenses recorded"
                                        description="You haven't added any operational expenses yet."
                                        actionLabel="Add Expense"
                                        onAction={() => navigate('/add-expense')}
                                    />
                                ) : (
                                    <div className="table-container">
                                        <table className="data-table">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Title</th>
                                                    <th>Category</th>
                                                    <th>Details</th>
                                                    <th className="text-right">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {expenses.map((exp) => (
                                                    <tr key={exp.id}>
                                                        <td className="text-gray-500 text-sm tabular-nums whitespace-nowrap">
                                                            {new Date(exp.date).toLocaleDateString(undefined, { 
                                                                month: 'short', day: 'numeric', year: 'numeric' 
                                                            })}
                                                        </td>
                                                        <td className="font-semibold text-gray-900">{exp.title}</td>
                                                        <td>
                                                            <span className="badge badge-neutral capitalize">
                                                                {exp.category}
                                                            </span>
                                                        </td>
                                                        <td className="text-gray-500 text-sm max-w-[150px] truncate" title={exp.description}>
                                                            {exp.qty > 0 && <span className="mr-1">{exp.qty}kg @ ₹{exp.rate_kg}</span>}
                                                            {exp.description}
                                                        </td>
                                                        <td className="text-right font-bold text-dark tabular-nums">
                                                            ₹{exp.amount.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ExpenseItems;
