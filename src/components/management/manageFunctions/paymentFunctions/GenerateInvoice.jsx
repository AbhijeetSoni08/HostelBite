import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../../../common/ToastContext";
import { FilePlus, IndianRupee, Calendar, User, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GenerateInvoice = () => {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        student_id: "",
        amount: "",
        due_date: "",
        status: "Unpaid"
    });
    const [loading, setLoading] = useState(false);
    const [fetchingStudents, setFetchingStudents] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get("/api/students/getAll");
                setStudents(res.data);
            } catch (err) {
                console.error("Failed to fetch students", err);
                addToast("error", "Failed to load student directory");
            } finally {
                setFetchingStudents(false);
            }
        };
        fetchStudents();
    }, [addToast]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.student_id || !formData.amount || !formData.due_date) {
            addToast("warning", "Please fill out all required fields.");
            return;
        }

        setLoading(true);
        try {
            await axios.post("/api/invoices/", formData);
            addToast("success", "Invoice generated and issued successfully!");
            setFormData({ student_id: "", amount: "", due_date: "", status: "Unpaid" });
        } catch (err) {
            console.error(err);
            addToast("error", "Failed to generate invoice. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-10 font-sans animation-fade-in">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <button 
                    onClick={() => navigate("/admin-dashboard/payments-section")} 
                    className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-dark hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-dark mb-1">Issue New Invoice</h1>
                    <p className="text-gray-500">Bill students for mess fees, damages, or custom charges.</p>
                </div>
            </div>

            <div className="card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center">
                        <FilePlus size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-dark">Invoice Details</h2>
                        <p className="text-sm text-gray-500">Specify billing amounts and deadlines.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Student Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                            <User size={16} /> Bill To <span className="text-rose-500">*</span>
                        </label>
                        <select
                            name="student_id"
                            value={formData.student_id}
                            onChange={handleChange}
                            className="input-field w-full"
                            required
                            disabled={fetchingStudents}
                        >
                            <option value="">{fetchingStudents ? "Loading students..." : "-- Select a Student --"}</option>
                            {students.map(student => (
                                <option key={student.student_id} value={student.student_id}>
                                    {student.name} ({student.email})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                                <IndianRupee size={16} /> Amount <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    ₹
                                </div>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="input-field w-full pl-8"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
                                <Calendar size={16} /> Due Date <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="due_date"
                                value={formData.due_date}
                                onChange={handleChange}
                                className="input-field w-full"
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading || fetchingStudents}
                            className="w-full btn btn-primary py-3 text-lg flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" /> Issuing...
                                </>
                            ) : (
                                <>
                                    <FilePlus size={20} /> Generate & Issue Invoice
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenerateInvoice;
