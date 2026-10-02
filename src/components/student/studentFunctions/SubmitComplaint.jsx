import React, { useState } from "react";
import axios from "axios";
import { MessageSquareWarning, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, success, error
  const [message, setMessage] = useState("");

  const student_id = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setStatus("error");
      setMessage("All fields are required to submit a complaint.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await axios.post("/api/complaints/complaint", {
        student_id,
        title,
        description,
      });

      setStatus("success");
      setMessage(res.data.message || "Complaint registered successfully");
      setTitle("");
      setDescription("");
      
      // Auto-dismiss success message after 3s
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 font-sans animation-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-dark transition-colors mb-6 font-medium text-sm">
        <ArrowLeft size={16} className="mr-1" /> Back
      </button>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-rose-50 rounded-xl text-rose-600">
          <MessageSquareWarning size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-dark">Raise a Complaint</h1>
          <p className="text-gray-500">Report an issue to the hostel management team.</p>
        </div>
      </div>

      {status === "success" && (
        <div className="mb-6 p-4 bg-status-successBg border border-status-success/20 rounded-xl flex items-center gap-3 animate-slide-up">
          <CheckCircle2 size={24} className="text-status-success shrink-0" />
          <p className="font-medium text-status-success">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 bg-status-errorBg border border-status-error/20 rounded-xl flex items-center gap-3 animate-slide-up">
          <AlertCircle size={24} className="text-status-error shrink-0" />
          <p className="font-medium text-status-error">{message}</p>
        </div>
      )}

      <div className="card p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-gray-900">Issue Title</label>
            <input
              type="text"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken tap in common washroom"
            />
            <p className="text-xs text-gray-500 mt-2">Keep it short and descriptive.</p>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-900">Description</label>
            <textarea
              className="input-field min-h-[150px] resize-y"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide details about the issue..."
            />
            <p className="text-xs text-gray-500 mt-2">Include location details, when you noticed it, etc.</p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary px-8 py-2.5 min-w-[160px]"
            >
              {loading ? (
                <><Loader2 size={18} className="mr-2 animate-spin" /> Submitting...</>
              ) : (
                "Submit Complaint"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitComplaint;
