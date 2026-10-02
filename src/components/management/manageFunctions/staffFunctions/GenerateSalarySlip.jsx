import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileCheck2, ArrowLeft, Loader2, IndianRupee, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../common/ToastContext";

const GenerateSalarySlip = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [staffList, setStaffList] = useState([]);
    const [formData, setFormData] = useState({
        staff_id: "",
        amount: "",
        month: "",
        status: "Paid"
    });
    const [loading, setLoading] = useState(false);
    const [fetchingStaff, setFetchingStaff] = useState(true);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const res = await axios.get("/api/staff", {
                    withCredentials: true
                });
                setStaffList(res.data);
            } catch (err) {
                console.error("Failed to fetch staff", err);
                addToast("Failed to fetch staff list", "error");
            } finally {
                setFetchingStaff(false);
            }
        };
        fetchStaff();
    }, [addToast]);

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

        if (!formData.staff_id || !formData.amount || !formData.month) {
            addToast("Please fill all required fields", "warning");
            setLoading(false);
            return;
        }

        try {
            await axios.post("/api/salary/", formData, {
                withCredentials: true
            });
            addToast("Salary slip generated successfully", "success");
            setFormData({ staff_id: "", amount: "", month: "", status: "Paid" });
        } catch (err) {
            console.error(err);
            addToast("Failed to generate salary slip", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8 font-sans animate-fade-in">
            <button onClick={() => navigate("/admin-dashboard/salary-section")} className="flex items-center text-gray-500 hover:text-dark transition-colors mb-6 font-medium text-sm">
                <ArrowLeft size={16} className="mr-1" /> Back to Payroll
            </button>

            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-brand-50 rounded-xl text-brand-600 shadow-sm">
                    <FileCheck2 size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-dark">Process Payroll</h1>
                    <p className="text-gray-500">Generate a new monthly salary slip for staff.</p>
                </div>
            </div>

            <div className="card p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div>
                        <label className="label-text">Select Staff Member</label>
                        {fetchingStaff ? (
                            <div className="h-11 bg-gray-100 animate-pulse rounded-md w-full"></div>
                        ) : (
                            <select
                                name="staff_id"
                                value={formData.staff_id}
                                onChange={handleChange}
                                className="input-field bg-gray-50/50"
                                required
                            >
                                <option value="">-- Choose Staff --</option>
                                {staffList.map(staff => (
                                    <option key={staff.staff_id} value={staff.staff_id}>
                                        {staff.name} — {staff.role || "No Role"}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="label-text">Disbursement Amount</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <IndianRupee size={16} />
                                </div>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    className="input-field pl-9 bg-gray-50/50 font-mono"
                                    placeholder="0.00"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="label-text">Billing Month</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                                    <Calendar size={16} />
                                </div>
                                <input
                                    type="month"
                                    name="month"
                                    value={formData.month}
                                    onChange={handleChange}
                                    className="input-field pl-9 bg-gray-50/50"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="label-text">Payment Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="input-field bg-gray-50/50"
                        >
                            <option value="Paid">Paid (Funds Disbursed)</option>
                            <option value="Pending">Pending (Scheduled for later)</option>
                        </select>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || fetchingStaff}
                            className="btn btn-primary px-8 py-2.5 min-w-[200px]"
                        >
                            {loading ? (
                                <><Loader2 size={18} className="mr-2 animate-spin" /> Processing...</>
                            ) : (
                                "Generate Salary Slip"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenerateSalarySlip;
