"use client";

import React from "react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a355b] tracking-tight mb-6">
                        About SewaIT
                    </h1>
                    <div className="h-2 w-24 bg-[#10b981] rounded-full mb-8"></div>
                </header>

                {/* Content */}
                <div className="space-y-12 text-slate-700 leading-relaxed text-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    <section className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-500">
                        <p className="mb-6">
                            SewaIT is a utility-first daily web application dedicated to providing essential Nepali daily tools and local information in one secure location. Founded by <span className="font-bold text-[#1a355b]">Debin Rai</span>, the platform was born from a vision to create a "cleaner, faster, and no-bloat" digital companion for the Nepali community.
                        </p>
                        <p>
                            Whether you are a student, a professional, or a general user, SewaIT centralizes the information you need most—from the Nepali Calendar and location-based weather to Gold/NEPSE rates and comprehensive Sarkari Guides.
                        </p>
                    </section>

                    {/* Mission Section */}
                    <section>
                        <h2 className="text-2xl font-black text-[#1a355b] uppercase tracking-widest mb-8 flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#10b981]">rocket_launch</span>
                            Our Mission
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Accuracy & Reliability",
                                    desc: "Providing location-based weather, official festival dates, and manually verified market rates from trusted associations.",
                                    icon: "verified_user",
                                    color: "bg-blue-50 text-blue-600"
                                },
                                {
                                    title: "Security & Privacy",
                                    desc: "Building a 'Zero Trust' environment where backend logic and user data are strictly protected via high-level encryption.",
                                    icon: "shield_lock",
                                    color: "bg-indigo-50 text-indigo-600"
                                },
                                {
                                    title: "Simplicity",
                                    desc: "Maintaining a professional, crisp UI using modern typography and a focus on essential information.",
                                    icon: "auto_awesome",
                                    color: "bg-teal-50 text-teal-600"
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 hover:bg-[#1a355b] hover:text-white transition-all group duration-500">
                                    <div className={`size-12 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white ${item.color}`}>
                                        <span className="material-symbols-outlined font-black">{item.icon}</span>
                                    </div>
                                    <h3 className="font-black text-lg mb-3 tracking-tight">{item.title}</h3>
                                    <p className="text-sm opacity-80 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
