import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Hourglass } from "lucide-react";
import AttendanceSetup from "./AttendanceSetup";

const ScanQR = () => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState(null);
    const [hasDetails, setHasDetails] = useState(
        !!localStorage.getItem("studentDetails")
    );

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token || !hasDetails) return;

        const markAttendance = async () => {
            try {
                const saved = JSON.parse(localStorage.getItem("studentDetails"));
                console.log(saved);

                const payload = {
                    student_id: saved.student_id,
                    menu_id: saved.menu_id,
                    meal_type: saved.meal_type,
                    date: new Date().toISOString().split("T")[0],
                    status: "present",
                    token, // from QR
                };

                const res = await axios.post(
                    "http://localhost:4000/api/attendance/mark",
                    payload
                );

                setMessage(
                    <span className="flex items-center justify-center text-green-600">
                        <CheckCircle className="mr-2" size={20} /> {res.data.message}
                    </span>
                );
            } catch (error) {
                console.error("Error:", error);
                setMessage(
                    <span className="flex items-center justify-center text-red-600">
                        <XCircle className="mr-2" size={20} /> {error.response?.data?.message || "Failed to mark attendance"}
                    </span>
                );
            }
        };

        markAttendance();
    }, [hasDetails, searchParams]);

    const token = searchParams.get("token");

    if (!token) {
        return (
            <div className="p-6 bg-white rounded-2xl shadow-md text-center max-w-md mx-auto mt-10">
                <h2 className="text-xl font-semibold mb-3">Mess Attendance</h2>
                <p className="text-gray-700">Please scan the QR code provided at the mess to mark your attendance.</p>
            </div>
        );
    }

    if (!hasDetails) {
        return <AttendanceSetup onSave={() => setHasDetails(true)} />;
    }

    return (
        <div className="p-6 bg-white rounded-2xl shadow-md text-center max-w-md mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-3">Mess Attendance</h2>
            <div className="text-gray-700 font-medium">
                {message || (
                    <span className="flex items-center justify-center text-gray-600">
                        <Hourglass className="mr-2" size={20} /> Verifying your attendance...
                    </span>
                )}
            </div>
        </div>
    );
};

export default ScanQR;
