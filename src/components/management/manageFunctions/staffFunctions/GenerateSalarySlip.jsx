import React, { useState, useEffect } from "react";
import axios from "axios";

const GenerateSalarySlip = () => {
    const [staffList, setStaffList] = useState([]);
    const [formData, setFormData] = useState({
        staff_id: "",
        amount: "",
        month: "",
        status: "Paid"
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/staff");
                setStaffList(res.data);
            } catch (err) {
                console.error("Failed to fetch staff", err);
            }
        };
        fetchStaff();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Auto-fill amount based on selected staff
        if (name === "staff_id") {
            const selectedStaff = staffList.find(s => s.staff_id.toString() === value);
            if (selectedStaff) {
                setFormData(prev => ({ ...prev, amount: selectedStaff.salary_amount || "" }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!formData.staff_id || !formData.amount || !formData.month) {
            setMessage("Please fill all required fields.");
            setLoading(false);
            return;
        }

        try {
            await axios.post("http://localhost:4000/api/salary/", formData);
            setMessage("✅ Salary slip generated successfully!");
            setFormData({ staff_id: "", amount: "", month: "", status: "Paid" });
        } catch (err) {
            console.error(err);
            setMessage("❌ Failed to generate salary slip.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Generate Salary Slip</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Select Staff *</label>
                    <select
                        name="staff_id"
                        value={formData.staff_id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                        required
                    >
                        <option value="">-- Choose Staff --</option>
                        {staffList.map(staff => (
                            <option key={staff.staff_id} value={staff.staff_id}>
                                {staff.name} ({staff.role})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Amount (₹) *</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Month / Year *</label>
                    <input
                        type="month"
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                    >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
                >
                    {loading ? "Generating..." : "Generate Salary Slip"}
                </button>
            </form>

            {message && (
                <p className={`mt-4 text-center font-medium ${message.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default GenerateSalarySlip;
