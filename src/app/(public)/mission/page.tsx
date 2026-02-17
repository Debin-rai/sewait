"use client";

import React from "react";

export default function MissionPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a355b] tracking-tight mb-6">
                        Our Mission
                    </h1>
                    <div className="h-2 w-24 bg-[#10b981] rounded-full mb-8"></div>
                </header>

                {/* Content */}
                <div className="space-y-12 text-slate-700 leading-relaxed text-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    <section className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-500">
                        <p className="mb-6 font-medium">
                            At SewaIT, our mission is to empower every Nepali citizen with a "trust-first" digital toolkit that is accurate, accessible, and exceptionally secure.
                        </p>
                        <p className="mb-0"> We strive to achieve this by:</p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Prioritizing Accuracy",
                                desc: "Providing reliable daily information manually verified or pulled from trusted sources like the Nepal Panchanga Nirnayak Samiti.",
                                icon: "verified",
                                color: "bg-blue-50 text-blue-600"
                            },
                            {
                                title: "Ensuring Security",
                                desc: "Operating on a \"Zero Trust\" architecture where all backend logic and API keys are hidden from the frontend to protect user integrity.",
                                icon: "security",
                                color: "bg-indigo-50 text-indigo-600"
                            },
                            {
                                title: "Simplifying Complexity",
                                desc: "Delivering step-by-step Sarkari Guides for essential processes like passports and driving licenses to make government services more accessible.",
                                icon: "account_balance",
                                color: "bg-teal-50 text-teal-600"
                            },
                            {
                                title: "Optimizing Performance",
                                desc: "Maintaining a lightweight interface that loads in under 3 seconds to ensure essential data is always at your fingertips.",
                                icon: "speed",
                                color: "bg-amber-50 text-amber-600"
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
                </div>
            </div>
        </div>
    );
}
