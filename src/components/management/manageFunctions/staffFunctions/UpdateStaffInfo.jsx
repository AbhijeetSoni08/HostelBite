import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateStaffInfo = () => {
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingStaffId, setEditingStaffId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        role: "",
        salary_amount: ""
    });

    const fetchStaff = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/staff");
            setStaffList(res.data);
        } catch (err) {
            console.error(err);
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
            role: staff.role,
            salary_amount: staff.salary_amount
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
        try {
            await axios.put(`http://localhost:4000/api/staff/${staffId}`, editFormData);
            setEditingStaffId(null);
            fetchStaff();
        } catch (err) {
            console.error(err);
            alert("Error updating staff info");
        }
    };

    const handleDeleteClick = async (staffId) => {
        if (!window.confirm("Are you sure you want to remove this staff member?")) return;
        try {
            await axios.delete(`http://localhost:4000/api/staff/${staffId}`);
            alert("Staff removed successfully!");
            fetchStaff();
        } catch (err) {
            console.error("Error deleting staff:", err);
            alert("Error deleting staff");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Update Staff Info</h2>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-3 border-b">ID</th>
                            <th className="p-3 border-b">Name</th>
                            <th className="p-3 border-b">Email</th>
                            <th className="p-3 border-b">Role</th>
                            <th className="p-3 border-b">Salary</th>
                            <th className="p-3 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList.map((staff) => (
                            <tr key={staff.staff_id} className="hover:bg-gray-50 transition">
                                <td className="p-3 border-b">#{staff.staff_id}</td>
                                {editingStaffId === staff.staff_id ? (
                                    <>
                                        <td className="p-3 border-b">
                                            <input type="text" name="name" value={editFormData.name} onChange={handleEditFormChange} className="border p-1 rounded w-full" />
                                        </td>
                                        <td className="p-3 border-b">
                                            <input type="email" name="email" value={editFormData.email} onChange={handleEditFormChange} className="border p-1 rounded w-full" />
                                        </td>
                                        <td className="p-3 border-b">
                                            <input type="text" name="role" value={editFormData.role} onChange={handleEditFormChange} className="border p-1 rounded w-full" />
                                        </td>
                                        <td className="p-3 border-b">
                                            <input type="number" name="salary_amount" value={editFormData.salary_amount} onChange={handleEditFormChange} className="border p-1 rounded w-full" />
                                        </td>
                                        <td className="p-3 border-b flex gap-2">
                                            <button onClick={() => handleSaveClick(staff.staff_id)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Save</button>
                                            <button onClick={handleCancelEdit} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">Cancel</button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-3 border-b">{staff.name}</td>
                                        <td className="p-3 border-b">{staff.email}</td>
                                        <td className="p-3 border-b">{staff.role}</td>
                                        <td className="p-3 border-b">₹{staff.salary_amount}</td>
                                        <td className="p-3 border-b flex gap-2">
                                            <button onClick={() => handleEditClick(staff)} className="text-blue-600 hover:underline">Edit</button>
                                            <button onClick={() => handleDeleteClick(staff.staff_id)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UpdateStaffInfo;
