import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, XCircle, Loader2, ScanLine, ArrowLeft } from "lucide-react";
import QrReader from "react-qr-scanner";
import AttendanceSetup from "./AttendanceSetup";

const ScanQR = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle"); // idle, scanning, processing, success, error
  const [message, setMessage] = useState("");
  const [hasDetails, setHasDetails] = useState(!!localStorage.getItem("studentDetails"));
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token || !hasDetails) return;

    const markAttendance = async () => {
      setStatus("processing");
      try {
        const saved = JSON.parse(localStorage.getItem("studentDetails"));
        const payload = {
          student_id: saved.student_id,
          menu_id: saved.menu_id,
          meal_type: saved.meal_type,
          date: new Date().toISOString().split("T")[0],
          status: "present",
          token,
        };

        const res = await axios.post("/api/attendance/mark", payload);
        setStatus("success");
        setMessage(res.data.message || "Attendance marked successfully");
      } catch (error) {
        console.error("Error:", error);
        setStatus("error");
        setMessage(error.response?.data?.message || "Failed to mark attendance");
      }
    };

    markAttendance();
  }, [hasDetails, token]);

  const handleScan = (data) => {
    if (data && data.text) {
      // Expecting data.text to be a URL like http://localhost:3000/mark-attendance?token=abc
      try {
        const url = new URL(data.text);
        const scannedToken = url.searchParams.get("token");
        if (scannedToken) {
          window.location.href = data.text; // Navigate to trigger token logic
        }
      } catch (e) {
        console.error("Invalid QR code format");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  if (!hasDetails) {
    return <AttendanceSetup onSave={() => setHasDetails(true)} />;
  }

  return (
    <div className="max-w-md mx-auto min-h-[80vh] flex flex-col pt-6 pb-12 font-sans animation-fade-in">
      <div className="flex items-center mb-8 px-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-dark">Mess Attendance</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {!token && status === "idle" && (
          <div className="w-full flex flex-col items-center">
            <div className="bg-white p-4 rounded-3xl shadow-card w-full aspect-square relative overflow-hidden mb-8 border border-gray-100 flex flex-col items-center justify-center bg-gray-50">
              {/* QR Scanner Container */}
              <div className="absolute inset-0 z-0">
                 <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                 />
              </div>
              
              {/* Scanning Overlay UI */}
              <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
                 <div className="w-64 h-64 border-2 border-brand-500 rounded-2xl relative shadow-[0_0_0_4000px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-brand-500 rounded-tl-xl -m-1"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-brand-500 rounded-tr-xl -m-1"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-brand-500 rounded-bl-xl -m-1"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-brand-500 rounded-br-xl -m-1"></div>
                    
                    {/* Scanning animation line */}
                    <div className="w-full h-0.5 bg-brand-500 absolute top-1/2 shadow-[0_0_8px_2px_rgba(245,195,36,0.6)] animate-[slideUp_2s_ease-in-out_infinite_alternate]"></div>
                 </div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-dark mb-2 text-center">Scan Meal QR</h2>
            <p className="text-gray-500 text-center max-w-[280px]">
              Align the QR code displayed at the mess counter within the frame to check in.
            </p>
          </div>
        )}

        {status === "processing" && (
          <div className="card p-10 flex flex-col items-center w-full max-w-sm text-center">
            <Loader2 size={48} className="text-brand-500 animate-spin mb-6" />
            <h2 className="text-xl font-bold text-dark mb-2">Verifying...</h2>
            <p className="text-gray-500">Please wait while we confirm your attendance.</p>
          </div>
        )}

        {status === "success" && (
          <div className="card p-10 flex flex-col items-center w-full max-w-sm text-center border-t-4 border-t-status-success animate-fade-in">
            <div className="w-20 h-20 bg-status-successBg rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-status-success" />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">Checked In!</h2>
            <p className="text-gray-500 mb-8">{message}</p>
            <button onClick={() => navigate('/student-dashboard')} className="btn btn-primary w-full py-3">
              Return to Dashboard
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="card p-10 flex flex-col items-center w-full max-w-sm text-center border-t-4 border-t-status-error animate-fade-in">
            <div className="w-20 h-20 bg-status-errorBg rounded-full flex items-center justify-center mb-6">
              <XCircle size={40} className="text-status-error" />
            </div>
            <h2 className="text-2xl font-bold text-dark mb-2">Check-in Failed</h2>
            <p className="text-gray-500 mb-8">{message}</p>
            <button onClick={() => navigate('/mark-attendance')} className="btn btn-secondary w-full py-3">
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
