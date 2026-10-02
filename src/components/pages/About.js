import React from "react";
import { Utensils, Users, Heart, Lightbulb, Star, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import nizam from '../../assets/nizam.jpg';
import abhijeet from '../../assets/Abhijeet.jpg';
import amarjeet from "../../assets/amarjeet.jpeg";
const About = () => {
    return (
        <div className="min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-50 rounded-bl-[100px] -z-10 transform translate-x-10 -translate-y-10 opacity-50"></div>
                <div className="absolute top-1/2 left-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10"></div>
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animation-slide-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 font-medium text-sm mb-6">
                        <Star size={14} className="text-brand-500 fill-brand-500" /> Our Story
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark leading-tight tracking-tight mb-6">
                        We're transforming <span className="text-brand-500">hostel dining.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
                        HostelBite was born out of a simple frustration: institutional dining is chaotic, opaque, and hard to manage. We've built the modern operating system to fix it.
                    </p>
                </div>
            </section>

            {/* Mission, Vision, Values */}
            <section className="py-20 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Mission */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow text-center">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Lightbulb size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Our Mission</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                To revolutionize hostel dining by using digital tools that bring efficiency, transparency, and convenience for both students and staff.
                            </p>
                        </div>

                        {/* Vision */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow text-center md:-translate-y-4">
                            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Utensils size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Our Vision</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                To become the standard digital infrastructure for mess and food management in educational institutions across the country.
                            </p>
                        </div>

                        {/* Values */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow text-center">
                            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Heart size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">Our Values</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                We prioritize zero-waste tracking, financial accountability, and creating a feedback loop that respects the student voice.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Metrics Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-brand-50 rounded-full blur-[120px] -z-10 opacity-50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-dark mb-4">Built for Scale</h2>
                        <p className="text-gray-500 text-lg">We are powering the next generation of institutional dining facilities with unprecedented transparency.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        <div className="text-center">
                            <div className="text-5xl font-black text-dark mb-2">10k+</div>
                            <div className="text-brand-600 font-semibold mb-1">Meals Tracked</div>
                            <p className="text-sm text-gray-500">Every single day</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-black text-dark mb-2">50+</div>
                            <div className="text-indigo-600 font-semibold mb-1">Campuses</div>
                            <p className="text-sm text-gray-500">Trusting HostelBite</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-black text-dark mb-2">0%</div>
                            <div className="text-emerald-600 font-semibold mb-1">Paper Waste</div>
                            <p className="text-sm text-gray-500">Completely digital</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-black text-dark mb-2">99%</div>
                            <div className="text-blue-600 font-semibold mb-1">Uptime</div>
                            <p className="text-sm text-gray-500">Enterprise reliability</p>
                        </div>
                    </div>
                    
                    <div className="mt-20 max-w-4xl mx-auto bg-dark rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500 rounded-full blur-[80px] opacity-20"></div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 relative z-10">
                            "HostelBite eliminated the chaos of meal tracking and fee collection overnight. It's the operating system every mess needs."
                        </h3>
                        <p className="text-brand-400 font-semibold relative z-10">— Hostel Administrators</p>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-24 bg-dark text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's build together.</h2>
                    <p className="text-gray-400 text-lg mb-10">
                        Interested in deploying HostelBite at your campus or want to collaborate with the team? We'd love to chat.
                    </p>
                    <a
                        href="mailto:hostelbite.team@gmail.com"
                        className="btn btn-primary px-8 py-4 inline-flex items-center text-lg"
                    >
                        <Mail className="mr-3" size={20} /> hostelbite.team@gmail.com
                    </a>
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
};

export default About;