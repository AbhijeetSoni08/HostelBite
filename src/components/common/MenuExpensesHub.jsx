import React from "react";
import { UtensilsCrossed, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MenuExpensesHub = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto pb-12 font-sans animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">Menu & Expenses</h1>
                <p className="text-gray-500">Manage the mess menu and track operational costs.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-brand-500">
                    <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-6">
                        <UtensilsCrossed size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Menu Management</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Create, update, and delete weekly meal plans. Students and staff will see these updates in real-time.
                    </p>
                    <button 
                        onClick={() => navigate("/management/menu/menu-items")} 
                        className="btn btn-secondary w-full py-3"
                    >
                        Manage Menu
                    </button>
                </div>

                <div className="card p-8 hover:shadow-card-hover transition-all flex flex-col items-start border-t-4 border-t-rose-500">
                    <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6">
                        <TrendingDown size={28} />
                    </div>
                    <h2 className="text-xl font-bold text-dark mb-3">Operational Expenses</h2>
                    <p className="text-gray-600 mb-8 flex-grow">
                        Track daily inventory costs, vendor payments, and overall mess expenditures.
                    </p>
                    <button 
                        onClick={() => navigate("/management/expense/expense-items")} 
                        className="btn bg-rose-600 text-white hover:bg-rose-700 shadow-level-1 w-full py-3"
                    >
                        Manage Expenses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuExpensesHub;
