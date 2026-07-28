import React, { useState, useEffect } from "react";
import axios from "axios";

const GenerateInvoice = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        student_id: "",
        amount: "",
        due_date: "",
        status: "Unpaid"
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/students/getAll");
                setStudents(res.data);
            } catch (err) {
                console.error("Failed to fetch students", err);
            }
        };
        fetchStudents();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (!formData.student_id || !formData.amount || !formData.due_date) {
            setMessage("Please fill all required fields.");
            setLoading(false);
            return;
        }

        try {
            await axios.post("http://localhost:4000/api/invoices/", formData);
            setMessage("✅ Invoice generated successfully!");
            setFormData({ student_id: "", amount: "", due_date: "", status: "Unpaid" });
        } catch (err) {
            console.error(err);
            setMessage("❌ Failed to generate invoice. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Generate Invoice</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Select Student *</label>
                    <select
                        name="student_id"
                        value={formData.student_id}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                        required
                    >
                        <option value="">-- Choose a student --</option>
                        {students.map(student => (
                            <option key={student.student_id} value={student.student_id}>
                                {student.name} ({student.email})
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
                        placeholder="e.g. 2000"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-700 mb-1">Due Date *</label>
                    <input
                        type="date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
                >
                    {loading ? "Generating..." : "Generate Invoice"}
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

export default GenerateInvoice;
