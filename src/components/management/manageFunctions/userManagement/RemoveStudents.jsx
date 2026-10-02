import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
    Search,
    Filter,
    Trash2,
    Users,
    AlertTriangle,
} from "lucide-react";
import { useToast } from "../../../common/ToastContext";
import { EmptyState } from "../../../common/StateDisplays";
import { TableSkeleton } from "../../../common/Skeleton";

const RemoveStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");

    const { addToast } = useToast();

    const fetchStudents = useCallback(async () => {
        try {
            setLoading(true);

            const res = await axios.get("/api/students/getAll");
            setStudents(res.data);
        } catch (err) {
            console.error("Error fetching students:", err);
            addToast("error", "Failed to load students database");
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const deleteStudent = async (student_id, name) => {
        if (
            !window.confirm(
                `Are you sure you want to permanently remove ${name}?`
            )
        ) {
            return;
        }

        try {
            await axios.delete(`/api/students/${student_id}`);

            addToast(
                "success",
                `Student ${name} removed successfully`
            );

            fetchStudents();
        } catch (err) {
            console.error("Error deleting student:", err);
            addToast("error", "Failed to remove student");
        }
    };

    const deleteByCourseAndYear = async () => {
        if (!course || !year) {
            addToast(
                "warning",
                "Please enter both Course and Year to batch delete."
            );
            return;
        }

        if (
            !window.confirm(
                `WARNING: This will permanently remove ALL students in ${course} - Year ${year}. Proceed?`
            )
        ) {
            return;
        }

        try {
            await axios.delete("/api/students/deleteCourseYear", {
                data: {
                    course,
                    year,
                },
            });

            addToast(
                "success",
                `Batch deletion successful for ${course} (Year ${year})`
            );

            setCourse("");
            setYear("");

            fetchStudents();
        } catch (err) {
            console.error(
                "Error deleting students by course/year:",
                err
            );

            addToast(
                "error",
                "Failed to perform batch deletion"
            );
        }
    };

    const filteredStudents = students.filter((student) => {
        const matchesName = (student.name ?? "")
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCourse = course
            ? (student.course ?? "")
                .toLowerCase()
                .includes(course.toLowerCase())
            : true;

        const matchesYear = year
            ? (student.year ?? "").toString().includes(year)
            : true;

        return matchesName && matchesCourse && matchesYear;
    });

    return (
        <div className="max-w-7xl mx-auto pb-10 font-sans animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-dark mb-2">
                    Student Directory
                </h1>

                <p className="text-gray-500">
                    Search, filter, and manage active student accounts.
                </p>
            </div>

            {/* Controls */}
            <div className="card p-6 mb-8 border-t-4 border-t-brand-500">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    {/* Search */}
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Search Students
                        </label>

                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />

                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="input-field pl-10 w-full"
                            />
                        </div>
                    </div>

                    {/* Course Filter */}
                    <div className="w-full md:w-48">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Course Filter
                        </label>

                        <div className="relative">
                            <Filter
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={18}
                            />

                            <input
                                type="text"
                                placeholder="e.g. BTech"
                                value={course}
                                onChange={(e) =>
                                    setCourse(e.target.value)
                                }
                                className="input-field pl-10 w-full"
                            />
                        </div>
                    </div>

                    {/* Year Filter */}
                    <div className="w-full md:w-32">
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Year Filter
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. 2"
                            value={year}
                            onChange={(e) =>
                                setYear(e.target.value)
                            }
                            className="input-field w-full text-center"
                        />
                    </div>

                    {/* Batch Delete */}
                    <div className="w-full md:w-auto">
                        <button
                            onClick={deleteByCourseAndYear}
                            className="btn btn-danger w-full md:w-auto flex items-center justify-center gap-2 group"
                        >
                            <AlertTriangle
                                size={18}
                                className="group-hover:animate-pulse"
                            />

                            Batch Remove
                        </button>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="card overflow-hidden">
                {loading ? (
                    <div className="p-6">
                        <TableSkeleton
                            rows={5}
                            columns={6}
                        />
                    </div>
                ) : filteredStudents.length > 0 ? (
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Contact</th>
                                    <th>Course</th>
                                    <th>Year</th>
                                    <th>Room</th>
                                    <th className="text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr
                                        key={student.student_id}
                                        className="group"
                                    >
                                        {/* Student */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
                                                    {student.name
                                                        ? student.name
                                                            .charAt(0)
                                                            .toUpperCase()
                                                        : "S"}
                                                </div>

                                                <div className="font-semibold text-gray-900">
                                                    {student.name}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Contact */}
                                        <td className="text-gray-600">
                                            {student.email}
                                        </td>

                                        {/* Course */}
                                        <td>
                                            <span className="badge badge-primary">
                                                {student.course}
                                            </span>
                                        </td>

                                        {/* Year */}
                                        <td className="font-medium text-gray-700">
                                            {student.year}
                                        </td>

                                        {/* Room */}
                                        <td className="font-medium text-gray-700">
                                            {student.room_number ||
                                                "N/A"}
                                        </td>

                                        {/* Actions */}
                                        <td className="text-right">
                                            <button
                                                onClick={() =>
                                                    deleteStudent(
                                                        student.student_id,
                                                        student.name
                                                    )
                                                }
                                                className="btn btn-ghost text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Remove Student"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-12">
                        <EmptyState
                            icon={Users}
                            title="No students found"
                            message="No students match the current filters or the directory is empty."
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RemoveStudents;