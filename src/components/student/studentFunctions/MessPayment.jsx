import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, Receipt, ArrowLeft, Loader2, CreditCard, ChevronRight } from "lucide-react";

const MessPayment = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const amount = location.state?.amount || null;
  const invoice_id = location.state?.invoice_id || null;
  const dueDate = location.state?.due_date || null; 

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const id = localStorage.getItem("userId");
        if (!id) throw new Error("User ID not found in localStorage");

        const res = await axios.get(`/api/students/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStudent(res.data);
      } catch (err) {
        console.error("Error fetching student details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [token]);

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!student) return;
    setPaymentProcessing(true);

    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      setPaymentProcessing(false);
      return;
    }

    try {
      // Create order on backend
      const orderRes = await axios.post("/api/payments/create-order", {
        amount,
        name: student.name,
        email: student.email,
      });

      const { order } = orderRes.data;

      // Configure Razorpay Checkout
      const options = {
        key: "rzp_test_ReQ4Bym2jP3in9", // fallback for dev
        amount: order.amount,
        currency: "INR",
        name: "HostelBite",
        description: "Mess Fee Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment on backend
            await axios.post("/api/payments/verify-payment", {
              ...response,
              email: student.email,
              name: student.name,
              amount,
              invoice_id
            });
            // Show custom success screen or alert for now, but navigate away
            navigate("/student/invoice-history", { state: { success: true, paymentId: response.razorpay_payment_id } });
          } catch (error) {
            alert("Payment verification failed! Please contact administration.");
          }
        },
        prefill: {
          name: student.name,
          email: student.email,
        },
        theme: {
          color: "#f7c948", // Brand Yellow
        },
        modal: {
          ondismiss: function () {
            setPaymentProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Error starting payment.");
      setPaymentProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="text-brand-500 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading secure checkout...</p>
      </div>
    );
  }

  if (!amount) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-dark mb-2">No Payment Selected</h2>
        <p className="text-gray-500 mb-6">Please select a pending invoice from your history to make a payment.</p>
        <button onClick={() => navigate("/student/invoice-history")} className="btn btn-primary px-6 py-2.5">
          View Invoices
        </button>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-status-error font-medium mb-4">Could not fetch student details.</p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 font-sans animation-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-dark transition-colors mb-6 font-medium text-sm">
        <ArrowLeft size={16} className="mr-1" /> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side: Invoice Details */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 text-brand-600 mb-6">
            <ShieldCheck size={24} />
            <span className="font-semibold tracking-wide uppercase text-sm">Secure Checkout</span>
          </div>

          <h1 className="text-3xl font-bold text-dark mb-2">Complete your payment</h1>
          <p className="text-gray-500 mb-8">Review your invoice details below before proceeding to pay.</p>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm">
                  <Receipt size={24} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Hostel Mess Fees</h3>
                  <p className="text-sm text-gray-500">Invoice {invoice_id ? `#INV-${invoice_id}` : 'Standard Payment'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-dark">₹{amount.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Due: {dueDate ? new Date(dueDate).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Billed to</span>
                <span className="font-medium text-gray-900">{student.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email address</span>
                <span className="font-medium text-gray-900">{student.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Room Number</span>
                <span className="font-medium text-gray-900">{student.room_number || "Not specified"}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between">
                <span className="font-medium text-gray-900">Total Amount</span>
                <span className="font-bold text-dark text-lg">₹{amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Payment Action */}
        <div className="w-full lg:w-96">
          <div className="card p-6 shadow-soft sticky top-24">
            <h3 className="font-bold text-dark mb-4">Payment Method</h3>
            
            <div className="border border-brand-500 bg-brand-50 rounded-xl p-4 flex items-center gap-4 mb-6 cursor-pointer relative">
              <div className="absolute -right-1 -top-1 w-3 h-3 bg-brand-500 rounded-full border-2 border-white"></div>
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-brand-600">
                <CreditCard size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Razorpay</p>
                <p className="text-xs text-gray-500">UPI, Cards, Netbanking</p>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>

            <button
              onClick={handlePayment}
              disabled={paymentProcessing}
              className={`w-full btn py-3.5 shadow-sm text-base ${
                paymentProcessing ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" : "btn-primary"
              }`}
            >
              {paymentProcessing ? (
                <><Loader2 size={18} className="mr-2 animate-spin" /> Processing...</>
              ) : (
                `Pay ₹${amount.toLocaleString()}`
              )}
            </button>
            
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={14} /> Payments are secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessPayment;
