import React from "react";
import { UtensilsCrossed, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageMenuExpenses = () => {
    const navigate = useNavigate();

    const expenseHandler = () => {
        navigate("/management/expense/expense-items");
    }

    const menuHandler = () => {
        navigate("/management/menu/menu-items");
    };
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div className="flex items-center mb-4">
                <div className="bg-indigo-50 p-3 rounded-full mr-4 text-indigo-600">
                    <UtensilsCrossed size={24} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Menu & Expenses</h2>
            </div>
            
            <p className="text-gray-600 mb-6 flex-grow">
                View the daily menu and track mess expenses efficiently.
            </p>

            <div className="flex flex-col gap-2 mt-auto">
                <button onClick={menuHandler} className="w-full bg-indigo-50 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-100 transition duration-200 shadow-sm font-medium border border-indigo-200 whitespace-nowrap">
                    Menu
                </button>
                <button onClick={expenseHandler} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-sm font-medium whitespace-nowrap">
                    Expenses
                </button>
            </div>
        </div>
    );
}

export default ManageMenuExpenses;
