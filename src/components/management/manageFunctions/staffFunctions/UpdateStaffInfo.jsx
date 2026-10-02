import React, { useState, useEffect } from "react";
import axios from "axios";
import { UsersRound, Save, X, Edit2, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TableSkeleton } from "../../../common/Skeleton";
import { ErrorState, EmptyState } from "../../../common/StateDisplays";
import { useToast } from "../../../common/ToastContext";

const UpdateStaffInfo = () => {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    const [editingStaffId, setEditingStaffId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        role: "",
        salary_amount: ""
    });
    const [isSaving, setIsSaving] = useState(false);

    const fetchStaff = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await axios.get("/api/staff", {
                withCredentials: true
            });
            setStaffList(res.data);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleEditClick = (staff) => {
        setEditingStaffId(staff.staff_id);
        setEditFormData({
            name: staff.name,
            email: staff.email,
            role: staff.role || "",
            salary_amount: staff.salary_amount || ""
        });
    };

    const handleCancelEdit = () => {
        setEditingStaffId(null);
    };

    const handleEditFormChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveClick = async (staffId) => {
        setIsSaving(true);
        try {
            await axios.put(`/api/staff/${staffId}`, editFormData, {
                withCredentials: true
            });
            setEditingStaffId(null);
            addToast("Staff updated successfully", "success");
            fetchStaff();
        } catch (err) {
            console.error(err);
            addToast("Failed to update staff info", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteClick = async (staffId) => {
        if (!window.confirm("Are you sure you want to permanently remove this staff member?")) return;
        try {
            await axios.delete(`/api/staff/${staffId}`, {
                withCredentials: true
            });
            addToast("Staff removed successfully", "success");
            setStaffList(staffList.filter(s => s.staff_id !== staffId));
        } catch (err) {
            console.error("Error deleting staff:", err);
            addToast("Failed to remove staff", "error");
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-12 w-full animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate("/admin-dashboard/salary-section")} 
                        className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-dark hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-dark flex items-center gap-2">
                            <UsersRound className="text-indigo-500" size={28} /> Staff Directory
                        </h1>
                        <p className="text-gray-500 mt-1">Manage staff roles and salary bands.</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <TableSkeleton rows={6} />
            ) : error ? (
                <ErrorState 
                    title="Failed to load staff" 
                    description="There was a problem reaching the directory service." 
                    onRetry={fetchStaff} 
                />
            ) : staffList.length === 0 ? (
                <EmptyState 
                    icon={UsersRound}
                    title="No staff members found"
                    description="You haven't onboarded any staff members yet."
                    actionLabel="Add Staff Member"
                    onAction={() => navigate("/admin/create-user")}
                />
            ) : (
                <div className="card overflow-hidden border border-gray-100 shadow-sm">
                    <div className="table-container">
                        <table className="data-table min-w-[800px]">
                            <thead>
                                <tr>
                                    <th className="w-16">ID</th>
                                    <th>Staff Details</th>
                                    <th>Role / Designation</th>
                                    <th>Base Salary</th>
                                    <th className="text-right w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffList.map((staff) => (
                                    <tr key={staff.staff_id} className={`group transition-colors ${editingStaffId === staff.staff_id ? 'bg-indigo-50/30' : 'hover:bg-gray-50/80'}`}>
                                        <td className="font-semibold text-gray-500 font-mono text-sm">
                                            #{staff.staff_id}
                                        </td>
                                        
                                        {editingStaffId === staff.staff_id ? (
                                            <>
                                                <td>
                                                    <div className="space-y-2">
                                                        <input 
                                                            type="text" 
                                                            name="name" 
                                                            value={editFormData.name} 
                                                            onChange={handleEditFormChange} 
                                                            className="input-field py-1.5 px-3 text-sm h-auto bg-white" 
                                                            placeholder="Full Name"
                                                        />
                                                        <input 
                                                            type="email" 
                                                            name="email" 
                                                            value={editFormData.email} 
                                                            onChange={handleEditFormChange} 
                                                            className="input-field py-1.5 px-3 text-sm h-auto bg-white" 
                                                            placeholder="Email Address"
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <input 
                                                        type="text" 
                                                        name="role" 
                                                        value={editFormData.role} 
                                                        onChange={handleEditFormChange} 
                                                        className="input-field py-1.5 px-3 text-sm h-auto bg-white" 
                                                        placeholder="Role"
                                                    />
                                                </td>
                                                <td>
                                                    <div className="relative">
                                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-sm font-bold">₹</div>
                                                        <input 
                                                            type="number" 
                                                            name="salary_amount" 
                                                            value={editFormData.salary_amount} 
                                                            onChange={handleEditFormChange} 
                                                            className="input-field py-1.5 pl-7 text-sm h-auto bg-white font-mono" 
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="text-right align-top pt-4">
                                                    <div className="flex justify-end gap-1">
                                                        <button 
                                                            onClick={() => handleSaveClick(staff.staff_id)} 
                                                            disabled={isSaving}
                                                            className="p-2 text-status-success hover:bg-status-successBg rounded-lg transition-colors inline-flex"
                                                            title="Save changes"
                                                        >
                                                            <Save size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={handleCancelEdit} 
                                                            disabled={isSaving}
                                                            className="p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-lg transition-colors inline-flex"
                                                            title="Cancel"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>
                                                    <div className="font-semibold text-dark">{staff.name}</div>
                                                    <div className="text-xs text-gray-500">{staff.email}</div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-neutral capitalize font-medium">
                                                        {staff.role || "Unassigned"}
                                                    </span>
                                                </td>
                                                <td className="font-bold text-dark tabular-nums">
                                                    ₹{staff.salary_amount ? Number(staff.salary_amount).toLocaleString() : "0"}
                                                </td>
                                                <td className="text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <button 
                                                            onClick={() => handleEditClick(staff)} 
                                                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex"
                                                            title="Edit staff info"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteClick(staff.staff_id)} 
                                                            className="p-2 text-gray-400 hover:text-status-error hover:bg-status-errorBg rounded-lg transition-colors inline-flex"
                                                            title="Remove staff"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateStaffInfo;
