import React, { useEffect, useState } from "react";
import axios from "axios";
import { EmptyState } from "../../../common/StateDisplays";
import { TableSkeleton } from "../../../common/Skeleton";
import { Receipt, IndianRupee, PieChart, TrendingDown, Target, Wallet } from "lucide-react";
import { useToast } from "../../../common/ToastContext";

const ViewExpenses = () => {
    const { addToast } = useToast();
    const [expenses, setExpenses] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [categoryBreakdown, setCategoryBreakdown] = useState([]);
    const [loading, setLoading] = useState(true);
    const totalBudget = 50000; // Example budget (you can make it dynamic later)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/expenses/viewAllExpenses");
                setExpenses(response.data.expenses);
                setTotalAmount(response.data.totalAmount);
                setCategoryBreakdown(response.data.categoryBreakdown);
            } catch (err) {
                console.error("Error fetching expenses:", err);
                addToast("error", "Failed to load expenses. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [addToast]);

    const budgetRemaining = totalBudget - totalAmount;
    const budgetPercent = Math.min((totalAmount / totalBudget) * 100, 100);

    return (
        <div className="max-w-6xl mx-auto pb-10 font-sans animation-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Expense Analytics</h1>
                <p className="text-gray-500">Track and manage your mess budget allocations.</p>
            </div>

            {loading ? (
                <div className="space-y-6">
                    <TableSkeleton rows={1} columns={3} />
                    <TableSkeleton rows={5} columns={6} />
                </div>
            ) : (
                <>
                    {/* ===== Summary Section ===== */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="card p-6 card-hover">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Target size={20} />
                                </div>
                                <h3 className="font-semibold text-gray-700">Monthly Budget</h3>
                            </div>
                            <p className="text-3xl font-bold text-dark">₹{totalBudget.toLocaleString()}</p>
                        </div>

                        <div className="card p-6 card-hover border-b-4 border-b-rose-500">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                                    <TrendingDown size={20} />
                                </div>
                                <h3 className="font-semibold text-gray-700">Total Spent</h3>
                            </div>
                            <p className="text-3xl font-bold text-dark">₹{totalAmount.toLocaleString()}</p>
                        </div>

                        <div className="card p-6 card-hover">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <Wallet size={20} />
                                </div>
                                <h3 className="font-semibold text-gray-700">Remaining</h3>
                            </div>
                            <p className="text-3xl font-bold text-dark">₹{budgetRemaining.toLocaleString()}</p>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-4">
                                <div 
                                    className={`h-1.5 rounded-full ${budgetPercent > 90 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                                    style={{ width: `${budgetPercent}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* ===== Category Breakdown ===== */}
                        <div className="lg:col-span-1">
                            <div className="card p-6 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                                        <PieChart size={20} />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Spending by Category</h3>
                                </div>
                                
                                {categoryBreakdown.length > 0 ? (
                                    <div className="space-y-4">
                                        {categoryBreakdown.map((cat, index) => {
                                            const catPercent = ((cat.categoryTotal / totalAmount) * 100).toFixed(0);
                                            return (
                                                <div key={index}>
                                                    <div className="flex justify-between text-sm mb-1">
                                                        <span className="font-medium text-gray-700">{cat.category}</span>
                                                        <span className="font-bold text-dark">₹{cat.categoryTotal.toLocaleString()}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                        <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${catPercent}%` }}></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm text-center py-4">No category data available.</p>
                                )}
                            </div>
                        </div>

                        {/* ===== All Expenses Table ===== */}
                        <div className="lg:col-span-2">
                            <div className="card overflow-hidden h-full flex flex-col">
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                                            <Receipt size={20} />
                                        </div>
                                        <h3 className="font-bold text-gray-900">Recent Transactions</h3>
                                    </div>
                                </div>
                                
                                {expenses.length > 0 ? (
                                    <div className="overflow-x-auto custom-scrollbar flex-grow">
                                        <table className="data-table">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Title</th>
                                                    <th>Category</th>
                                                    <th>Qty / Rate</th>
                                                    <th className="text-right">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {expenses.map((exp) => (
                                                    <tr key={exp.id} className="group hover:bg-gray-50/50 transition-colors">
                                                        <td className="text-gray-500 font-medium whitespace-nowrap">
                                                            {new Date(exp.date).toLocaleDateString("en-IN", { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </td>
                                                        <td>
                                                            <div className="font-semibold text-gray-900">{exp.title}</div>
                                                            {exp.description && <div className="text-xs text-gray-500 max-w-[200px] truncate">{exp.description}</div>}
                                                        </td>
                                                        <td>
                                                            <span className="badge badge-secondary">{exp.category}</span>
                                                        </td>
                                                        <td className="text-gray-600">
                                                            {exp.qty} × ₹{exp.rate_kg}
                                                        </td>
                                                        <td className="text-right font-bold text-rose-600 whitespace-nowrap flex items-center justify-end gap-1">
                                                            - <IndianRupee size={12} />{exp.amount.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="p-12">
                                        <EmptyState 
                                            icon={Receipt}
                                            title="No expenses logged"
                                            message="When you add new expenses, they will appear here."
                                        />
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

export default ViewExpenses;
