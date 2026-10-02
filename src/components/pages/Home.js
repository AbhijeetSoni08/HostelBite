import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, UtensilsCrossed, Smartphone, CreditCard, ShieldCheck } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-50 rounded-bl-[100px] -z-10 transform translate-x-10 -translate-y-10 opacity-50"></div>
        <div className="absolute top-1/2 left-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Hero Content */}
            <div className="max-w-2xl animation-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 font-medium text-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                Hostel Management, Modernized
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark leading-tight tracking-tight mb-6">
                Smarter Hostel Dining. <br/>
                <span className="text-brand-500">Simplified for Everyone.</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 mb-8 max-w-lg leading-relaxed">
                HostelBite is the all-in-one platform for institutional dining. Manage mess attendance, process fee payments, and handle complaints with an intuitive, startup-grade experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="btn btn-primary px-8 py-4 text-base font-semibold shadow-soft hover:-translate-y-1 transition-transform">
                  Get Started for Free
                </Link>
                <Link to="/about" className="btn btn-secondary px-8 py-4 text-base font-semibold group flex items-center justify-center">
                  Explore Platform <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </div>
              
              <div className="mt-10 flex items-center gap-6 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  Bank-grade security
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                    ))}
                  </div>
                  Trusted by 50+ campuses
                </div>
              </div>
            </div>

            {/* Hero Image / Mockup representation */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none animation-fade-in delay-200">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative h-[400px] flex items-center justify-center flex-col p-8">
                  <div className="absolute top-4 left-4 w-20 h-4 bg-gray-200 rounded-full"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-brand-100 rounded-full"></div>
                  
                  {/* Abstract Dashboard UI */}
                  <div className="w-full space-y-4">
                    <div className="w-1/2 h-8 bg-gray-200 rounded-lg"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 mb-2"></div>
                        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-24 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                        <div className="w-8 h-8 rounded-lg bg-brand-100 mb-2"></div>
                        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="h-32 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between">
                      <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                      <div className="w-full h-12 bg-blue-50 rounded flex items-center px-4 justify-between">
                        <div className="w-1/4 h-3 bg-blue-200 rounded"></div>
                        <div className="w-16 h-6 bg-blue-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Element */}
              <div className="absolute -left-10 bottom-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 animate-[slideUp_3s_ease-in-out_infinite_alternate]">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                  <UtensilsCrossed size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Attendance</p>
                  <p className="font-bold text-dark text-lg">Checked In</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">Everything you need to run your hostel mess</h2>
            <p className="text-gray-500 text-lg">Designed specifically for the unique operational challenges of institutional dining facilities.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow">
              <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Dynamic QR Attendance</h3>
              <p className="text-gray-500 leading-relaxed">
                Replace paper registers with secure, real-time QR code scanning. Prevent proxy attendance and track exact meal consumption.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <CreditCard size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Seamless Digital Payments</h3>
              <p className="text-gray-500 leading-relaxed">
                Automated invoicing and Razorpay integration allows students to pay dues instantly with UPI, cards, or net banking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-card-hover transition-shadow">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <UtensilsCrossed size={28} />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">Smart Menu & Operations</h3>
              <p className="text-gray-500 leading-relaxed">
                Publish weekly menus visually. Track daily expenses, manage staff payroll, and resolve student grievances from one dashboard.
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to digitize your hostel?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join modern campuses that have eliminated paperwork and improved student satisfaction using HostelBite.
              </p>
              <Link to="/contact" className="btn btn-primary px-10 py-4 text-lg font-bold">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-100 pt-16 pb-8">
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

export default Home;