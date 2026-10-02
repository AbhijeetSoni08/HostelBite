import React, { useState, useEffect } from "react";
import axios from "axios";
import { Play, Hourglass, Square, ArrowLeft, ScanLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QRDisplay = () => {
    const navigate = useNavigate();
    const [qrCode, setQrCode] = useState("");
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const fetchQR = async () => {
        try {
            const res = await axios.get("/api/qr/get-qr", {
                withCredentials: true
            });
            setQrCode(res.data.qrUrl);
            setTimer(30);
        } catch (err) {
            console.error("QR Fetch Error:", err);
        }
    };

    const startQR = () => {
        if (isRunning) return;
        setIsRunning(true);
        fetchQR();

        const qrUpdater = setInterval(fetchQR, 30000);
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 1 ? prev - 1 : 30));
        }, 1000);

        setIntervalId({ qrUpdater, countdown });
    };

    const stopQR = () => {
        if (intervalId) {
            clearInterval(intervalId.qrUpdater);
            clearInterval(intervalId.countdown);
        }
        setIsRunning(false);
        setQrCode("");
        setTimer(0);
    };

    useEffect(() => {
        return () => stopQR();
        // eslint-disable-next-line
    }, []);

    const goBack = () => {
        stopQR();
        navigate(-1);
    }

    return (
        <div className="max-w-4xl mx-auto pb-12 w-full animate-fade-in flex flex-col items-center justify-center min-h-[80vh]">
            <div className="w-full flex items-center justify-between mb-8 self-start">
                <button 
                    onClick={goBack}
                    className="btn btn-ghost px-3 py-2 -ml-3 text-gray-500"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back
                </button>
            </div>

            <div className="card w-full max-w-md p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-6">
                    <ScanLine size={32} />
                </div>
                <h2 className="text-2xl font-bold text-dark mb-2">Live Attendance QR</h2>
                <p className="text-gray-500 mb-8">
                    Display this code for students to scan with their HostelBite app to mark meal attendance.
                </p>

                {!isRunning ? (
                    <button
                        onClick={startQR}
                        className="btn btn-primary w-full py-3 text-lg"
                    >
                        <Play className="mr-2" size={20} /> Generate QR Code
                    </button>
                ) : (
                    <div className="flex flex-col items-center w-full animate-pop-in">
                        <div className="p-4 bg-white rounded-2xl shadow-level-2 border border-gray-100 mb-6 relative overflow-hidden group">
                            {/* Animated scanner line effect */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-500 shadow-[0_0_10px_#f7c948] opacity-50 animate-[slideDown_3s_ease-in-out_infinite_alternate]"></div>
                            <img src={qrCode} alt="Attendance QR Code" className="w-64 h-64 object-contain" />
                        </div>
                        
                        <div className="flex items-center gap-2 text-status-warning font-medium mb-6 bg-status-warningBg px-4 py-2 rounded-pill">
                            <Hourglass className="animate-spin-slow" size={18} /> 
                            Refreshing in {timer}s
                        </div>

                        <button
                            onClick={stopQR}
                            className="btn btn-danger w-full py-3"
                        >
                            <Square className="mr-2" size={20} /> Stop Broadcasting
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRDisplay;
