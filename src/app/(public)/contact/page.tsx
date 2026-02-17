"use client";

import React from "react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a355b] tracking-tight mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-slate-500 font-medium text-lg">We value the feedback of our community.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Contact Info */}
                    <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
                            <div className="size-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-3xl font-black">person</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Founder</p>
                                <p className="text-xl font-black text-[#1a355b]">Debin Rai</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
                            <div className="size-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-3xl font-black">mail</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Inquiries</p>
                                <p className="text-xl font-black text-[#1a355b] break-all">contact@sewait.com</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6">
                            <div className="size-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-3xl font-black">alternate_email</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Direct Contact</p>
                                <p className="text-xl font-black text-[#1a355b] break-all">reedweveen@gmail.com</p>
                            </div>
                        </div>

                        <div className="bg-[#1a355b] p-8 rounded-[32px] text-white shadow-xl shadow-blue-900/10">
                            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#10b981]">monitoring</span>
                                Activity Monitoring
                            </h3>
                            <p className="text-sm text-blue-100/80 leading-relaxed font-medium">
                                Our administrative team monitors System Logs daily to ensure all support requests and platform interactions remain secure and efficient.
                            </p>
                        </div>
                    </div>

                    {/* Support Message */}
                    <div className="bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-sm animate-in fade-in slide-in-from-right-8 duration-1000">
                        <h2 className="text-2xl font-black text-[#1a355b] mb-6">Support Portal</h2>
                        <p className="text-slate-600 leading-relaxed mb-8 font-medium">
                            We are committed to maintaining an open line of communication with the SewaIT community. Whether you have a question about a government process or feedback on our utility modules, we are here to help.
                        </p>

                        <div className="space-y-4">
                            <button className="w-full py-4 bg-[#1a355b] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:scale-[1.02] transition-all active:scale-95">
                                Access Support Portal
                            </button>
                            <p className="text-center text-xs font-bold text-slate-500">
                                Accessible via the "Support" button on public and admin interfaces.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
