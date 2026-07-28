import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock, Trash2, Edit2 } from "lucide-react";

const ViewSalary = () => {
    const [salaries, setSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    const fetchSalaries = async () => {
        setLoading(true);
        try {
            const url = role === "admin" 
                ? "http://localhost:4000/api/salary/"
                : `http://localhost:4000/api/salary/staff/${userId}`;
                
            const res = await axios.get(url);
            setSalaries(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch salary records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this salary record?")) return;
        try {
            await axios.delete(`http://localhost:4000/api/salary/${id}`);
            setSalaries(salaries.filter((s) => s.id !== id));
        } catch (err) {
            alert("Error deleting salary record.");
        }
    };

    const handleUpdateStatus = async (id, currentStatus) => {
        const newStatus = currentStatus.toLowerCase() === "paid" ? "Pending" : "Paid";
        try {
            await axios.put(`http://localhost:4000/api/salary/${id}/status`, { status: newStatus });
            fetchSalaries();
        } catch (err) {
            alert("Error updating status.");
        }
    };

    if (loading && salaries.length === 0) return <p className="text-center mt-10">Loading salaries...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                {role === "admin" ? "All Salary Slips" : "My Salary Slips"}
            </h2>

            {salaries.length === 0 ? (
                <p className="text-center text-gray-500">No salary records found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3 border-b">ID</th>
                                {role === "admin" && <th className="p-3 border-b">Staff</th>}
                                <th className="p-3 border-b">Month / Year</th>
                                <th className="p-3 border-b">Amount</th>
                                <th className="p-3 border-b">Status</th>
                                <th className="p-3 border-b">Generated On</th>
                                {role === "admin" && <th className="p-3 border-b">Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {salaries.map((s) => (
                                <tr key={s.id} className="hover:bg-gray-50 transition">
                                    <td className="p-3 border-b">#{s.id}</td>
                                    {role === "admin" && (
                                        <td className="p-3 border-b font-medium text-indigo-700">
                                            {s.staff_name}
                                            <div className="text-xs text-gray-500 font-normal">{s.role}</div>
                                        </td>
                                    )}
                                    <td className="p-3 border-b">{s.month}</td>
                                    <td className="p-3 border-b font-medium text-gray-900">₹{s.amount}</td>
                                    <td className="p-3 border-b">
                                        {s.status.toLowerCase() === "paid" ? (
                                            <span className="inline-flex items-center text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-semibold">
                                                <CheckCircle size={14} className="mr-1" /> Paid
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs font-semibold">
                                                <Clock size={14} className="mr-1" /> {s.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3 border-b text-sm text-gray-600">
                                        {new Date(s.created_at).toLocaleDateString()}
                                    </td>
                                    {role === "admin" && (
                                        <td className="p-3 border-b">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleUpdateStatus(s.id, s.status)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                                    title={`Mark as ${s.status.toLowerCase() === 'paid' ? 'Pending' : 'Paid'}`}
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(s.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                                    title="Delete Salary Slip"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewSalary;
