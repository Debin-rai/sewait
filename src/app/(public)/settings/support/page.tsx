"use client";

import React from "react";
import { useTheme, THEMES } from "@/context/ThemeContext";

export default function SupportSettings() {
    const { theme } = useTheme();

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="mb-10">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-4">How can we help you?</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Search our knowledge base or contact our support team directly for immediate assistance.</p>
            </div>

            {/* How it works Section */}
            <section className="mb-12">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ color: THEMES[theme].primary }}>menu_book</span>
                    How it works
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { title: "Getting Started Guide", desc: "Learn the basics of using Sewa IT", icon: "rocket_launch" },
                        { title: "Troubleshooting Tips", desc: "Common solutions for technical issues", icon: "build" },
                        { title: "Billing & Subscriptions", desc: "Manage your payments and invoices", icon: "payments" },
                        { title: "Security Best Practices", desc: "Keep your assets safe and secure", icon: "verified_user" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-lg transition-all cursor-pointer group">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform" style={{ color: THEMES[theme].primary, backgroundColor: `${THEMES[theme].primary}10` }}>
                                <span className="material-symbols-outlined">{item.icon}</span>
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-slate-900 dark:text-white">{item.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Support Section */}
            <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ color: THEMES[theme].primary }}>contact_support</span>
                    Contact Support
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* WhatsApp Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all">
                        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-green-600 text-3xl">chat</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">WhatsApp Support</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 flex-1">Chat with our technical team in real-time for urgent queries.</p>
                        <button className="w-full py-4 px-4 bg-green-600 hover:bg-green-700 text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all shadow-lg shadow-green-500/20 active:scale-95">
                            Chat on WhatsApp
                        </button>
                    </div>
                    {/* Email Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6" style={{ backgroundColor: `${THEMES[theme].primary}10` }}>
                            <span className="material-symbols-outlined text-primary text-3xl" style={{ color: THEMES[theme].primary }}>mail</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Email Support</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 flex-1">Typical response time: Within 24 hours for detailed inquiries.</p>
                        <button className="w-full py-4 px-4 bg-primary text-white font-black uppercase text-[10px] tracking-widest rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95" style={{ backgroundColor: THEMES[theme].primary }}>
                            Send Email
                        </button>
                    </div>
                    {/* Report Issue Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all">
                        <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-red-600 text-3xl">bug_report</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Report an Issue</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 flex-1">Found a bug? Let us know so we can fix it immediately.</p>
                        <button className="w-full py-4 px-4 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-black uppercase text-[10px] tracking-widest rounded-xl transition-all active:scale-95">
                            Submit Report
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ Quick Link */}
            <div className="mt-12 p-10 bg-primary rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative shadow-2xl" style={{ backgroundColor: THEMES[theme].primary }}>
                <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-2 tracking-tight">Looking for quick answers?</h3>
                    <p className="text-white/70 font-medium">Browse our comprehensive FAQ library for instant solutions.</p>
                </div>
                <button className="relative z-10 px-10 py-4 bg-white text-primary font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-xl active:scale-95" style={{ color: THEMES[theme].primary }}>
                    Browse FAQs
                </button>
                <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            </div>
        </div>
    );
}
