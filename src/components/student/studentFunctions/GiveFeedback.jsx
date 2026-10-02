import React, { useState } from "react";
import axios from "axios";
import { Star, MessageSquareHeart, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GiveFeedback = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const student_id = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() && rating === 0) {
      setStatus("error");
      setStatusMessage("Please provide a rating or a message.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setStatusMessage("");

    try {
      const res = await axios.post("/api/feedbacks/", {
        student_id: student_id,
        message,
        rating,
      });

      setStatus("success");
      setStatusMessage(res.data.message || "Feedback submitted successfully. Thank you!");
      setMessage("");
      setRating(0);
      
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStatusMessage("Failed to submit feedback. Try again.");
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
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
          <MessageSquareHeart size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-dark">Give Feedback</h1>
          <p className="text-gray-500">Rate the food quality and share your thoughts.</p>
        </div>
      </div>

      {status === "success" && (
        <div className="mb-6 p-4 bg-status-successBg border border-status-success/20 rounded-xl flex items-center gap-3 animate-slide-up">
          <CheckCircle2 size={24} className="text-status-success shrink-0" />
          <p className="font-medium text-status-success">{statusMessage}</p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 bg-status-errorBg border border-status-error/20 rounded-xl flex items-center gap-3 animate-slide-up">
          <AlertCircle size={24} className="text-status-error shrink-0" />
          <p className="font-medium text-status-error">{statusMessage}</p>
        </div>
      )}

      <div className="card p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <label className="block font-semibold text-gray-900 mb-4 text-lg">How was your recent meal?</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className={`p-2 transition-transform hover:scale-110 focus:outline-none ${
                    (hoverRating || rating) >= star 
                      ? "text-brand-500" 
                      : "text-gray-300"
                  }`}
                >
                  <Star size={40} fill={(hoverRating || rating) >= star ? "currentColor" : "none"} strokeWidth={1.5} />
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              {rating === 1 && "Terrible"}
              {rating === 2 && "Poor"}
              {rating === 3 && "Average"}
              {rating === 4 && "Good"}
              {rating === 5 && "Excellent"}
              {rating === 0 && "Select a rating"}
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-900">Additional Comments (Optional)</label>
            <textarea
              className="input-field min-h-[120px] resize-y"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What did you like? What could be improved?"
            />
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
                "Submit Feedback"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiveFeedback;
