import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2, Clock, Receipt, Download, ArrowRight, AlertCircle, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const successPaymentId = location.state?.success ? location.state?.paymentId : null;

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const student_id = localStorage.getItem("userId");
        if (!student_id) throw new Error("Student ID not found");

        const res = await axios.get(`/api/invoices/student/${student_id}`);
        setInvoices(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch invoice history.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handlePayNow = (inv) => {
    navigate("/student/make-payment", { 
      state: { 
        amount: inv.amount, 
        invoice_id: inv.invoice_id,
        due_date: inv.due_date 
      } 
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 font-sans animation-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Invoice History</h1>
          <p className="text-gray-500 mt-1">Track your past payments and pending dues.</p>
        </div>
      </div>

      {successPaymentId && (
        <div className="mb-6 p-4 bg-status-successBg border border-status-success/20 rounded-xl flex items-start gap-3 animate-slide-up">
          <CheckCircle2 size={24} className="text-status-success shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-status-success">Payment Successful!</h4>
            <p className="text-sm text-status-success/80 mt-1">Your payment (ID: {successPaymentId}) was received and verified.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-status-errorBg text-status-error rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-10 flex justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-10 w-10 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : invoices.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Receipt size={32} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No invoices found</h3>
            <p className="text-gray-500 max-w-sm">Your payment history is completely clear. Any future invoices will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Invoice</th>
                  <th className="p-4">Issue Date</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((inv) => {
                  const isPaid = inv.status.toLowerCase() === "paid";
                  
                  return (
                    <tr key={inv.invoice_id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isPaid ? 'bg-status-successBg text-status-success' : 'bg-status-warningBg text-status-warning'}`}>
                            <FileText size={18} />
                          </div>
                          <span className="font-medium text-gray-900">#INV-{inv.invoice_id}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500 text-sm">
                        {new Date(inv.issue_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="p-4 text-gray-500 text-sm">
                        {new Date(inv.due_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-gray-900">₹{inv.amount.toLocaleString()}</span>
                      </td>
                      <td className="p-4">
                        {isPaid ? (
                          <span className="badge badge-success px-3 py-1">
                            <CheckCircle2 size={14} className="mr-1.5" /> Paid
                          </span>
                        ) : (
                          <span className="badge badge-warning px-3 py-1">
                            <Clock size={14} className="mr-1.5" /> Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        {isPaid ? (
                          <button className="text-brand-600 hover:text-brand-700 font-medium text-sm flex items-center justify-end w-full gap-1 transition-colors">
                            <Download size={16} /> Receipt
                          </button>
                        ) : (
                          <button 
                            onClick={() => handlePayNow(inv)}
                            className="bg-dark text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-black transition-colors flex items-center justify-end w-full gap-1 ml-auto max-w-fit"
                          >
                            Pay <ArrowRight size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceHistory;
