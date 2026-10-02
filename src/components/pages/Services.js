import React from "react";
import { Link } from "react-router-dom";
import {
    Utensils,
    CreditCard,
    Bell,
    ClipboardList,
    MessageSquare,
    Users,
    BarChart3,
    FileText,
    ArrowRight
} from "lucide-react";

export default function Services() {
    return (
        <div className="min-h-screen font-sans">
            
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-brand-50 rounded-br-[100px] -z-10 transform -translate-x-10 -translate-y-10 opacity-50"></div>
                <div className="absolute top-1/2 right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10"></div>
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animation-slide-up">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark leading-tight tracking-tight mb-6">
                        Everything you need to <span className="text-brand-500">run a modern mess.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-500 mb-8 max-w-3xl mx-auto leading-relaxed">
                        We provide a complete digital mess management solution designed for hostel administrators, staff, and students — making daily dining efficient, transparent, and connected.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Menu Management */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow">
                            <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6">
                                <ClipboardList size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Menu Management</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Students and staff can view daily, weekly, and monthly menus online. Admins can update menus instantly.
                            </p>
                        </div>

                        {/* Online Payment System */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                <CreditCard size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Online Payments</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Secure and fast online payment integration for mess fees. Students can pay instantly using UPI or cards.
                            </p>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                                <Bell size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Notifications</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Send targeted push notifications to students and staff regarding menu changes, fee deadlines, or updates.
                            </p>
                        </div>

                        {/* Attendance Tracking */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow">
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                                <Utensils size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">QR Attendance</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Eliminate paper registers with live QR code scanning. Prevent proxy attendance and track exact meal consumption.
                            </p>
                        </div>

                        {/* Feedback System */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow">
                            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
                                <MessageSquare size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Feedback & Complaints</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Let students submit ratings and grievances securely. Track issue resolution directly from the admin dashboard.
                            </p>
                        </div>

                        {/* Invoice Generation */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow">
                            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                                <FileText size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Automated Invoicing</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Auto-generate monthly invoices for students. Track financial summaries, pending dues, and completed settlements.
                            </p>
                        </div>

                        {/* Staff & Expense Management */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow md:col-span-2 lg:col-span-1">
                            <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                                <Users size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Staff Payroll</h3>
                            <p className="text-gray-500 leading-relaxed">
                                Maintain a digital directory of your mess staff, manage roles, and process monthly salary slips effortlessly.
                            </p>
                        </div>

                        {/* Analytics Dashboard */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow md:col-span-2">
                            <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                                <BarChart3 size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Operational Analytics</h3>
                            <p className="text-gray-500 leading-relaxed">
                                View powerful insights like food usage trends, peak attendance patterns, and cost efficiency reports to optimize your mess budget and reduce food waste.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-dark rounded-[40px] p-10 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-[80px] opacity-20 transform translate-x-20 -translate-y-20"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to streamline your operations?</h2>
                            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                                Join modern campuses that have eliminated paperwork and improved student satisfaction using HostelBite.
                            </p>
                            <Link to="/login" className="btn btn-primary px-10 py-4 text-lg font-bold">
                                Get Started Today
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="border-t border-gray-100 pt-16 pb-8 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-bold text-dark text-lg">
                            H
                        </div>
                        <span className="text-xl font-bold text-dark tracking-tight">HostelBite</span>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                        © {new Date().getFullYear()} HostelBite. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
