import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen font-sans">
    
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-50 rounded-bl-[100px] -z-10 transform translate-x-10 -translate-y-10 opacity-50"></div>
                <div className="absolute top-1/2 left-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10"></div>
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animation-slide-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 font-medium text-sm mb-6">
                        <MessageSquare size={14} className="text-brand-500 fill-brand-500" /> Support & Sales
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark leading-tight tracking-tight mb-6">
                        We're here to <span className="text-brand-500">help.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Have questions about implementing HostelBite at your campus? Need technical support? Our team is always ready to assist you.
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-20 bg-gray-50 border-y border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
                        
                        {/* Contact Form */}
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-dark mb-6">
                                Send us a message
                            </h3>

                            <form className="flex flex-col space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Message
                                    </label>
                                    <textarea
                                        placeholder="How can we help you?"
                                        rows="5"
                                        className="input-field resize-y"
                                    ></textarea>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-primary w-full py-4 text-base font-semibold mt-2"
                                >
                                    <Send size={18} className="mr-2" />
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="flex flex-col justify-center p-4 lg:p-10">
                            <h3 className="text-2xl font-bold text-dark mb-8">
                                Get in touch directly
                            </h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark text-lg mb-1">Email</h4>
                                        <p className="text-gray-500 mb-2">Our friendly team is here to help.</p>
                                        <a href="mailto:hostelbite.team@gmail.com" className="text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                                            hostelbite.team@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark text-lg mb-1">Phone</h4>
                                        <p className="text-gray-500 mb-2">Mon-Fri from 9am to 6pm.</p>
                                        <a href="tel:+919876543210" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                                            +91 98765 43210
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark text-lg mb-1">Office</h4>
                                        <p className="text-gray-500 mb-2">Come say hello at our HQ.</p>
                                        <p className="text-dark font-medium leading-relaxed">
                                            Maulana Azad National Institute of Technology,<br/>
                                            Bhopal, Madhya Pradesh, India
                                        </p>
                                    </div>
                                </div>
                            </div>
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
