"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useState } from "react";

export default function GuidesClient() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");

    const categories = [
        {
            title: "Citizenship & ID",
            icon: "badge",
            description: "Comprehensive guides for obtaining National ID cards, E-Passports, and new or replacement Citizenship certificates.",
            links: ["National ID Card", "E-Passport Application", "Citizenship Certificate"]
        },
        {
            title: "Transport & Vehicles",
            icon: "directions_car",
            description: "Everything you need for driving licenses, vehicle tax payments, and the bluebook renewal process.",
            links: ["Smart Driving License", "Bluebook Renewal", "Annual Vehicle Tax"]
        },
        {
            title: "Tax & Finance",
            icon: "payments",
            description: "Instructions for PAN/VAT registration, annual tax filing for individuals, and business entity registrations.",
            links: ["Personal/Business PAN", "VAT Registration", "Business Registration"]
        },
        {
            title: "Education & Exams",
            icon: "school",
            description: "Guidelines for obtaining No Objection Certificates (NOC), degree equivalence, and Lok Sewa Aayog applications.",
            links: ["NOC for Abroad Study", "TU Equivalence Process", "Public Service Exams"]
        },
        {
            title: "Local Government",
            icon: "location_city",
            description: "Service guides for birth, death, and marriage registration, along with other essential Ward-level administrative tasks.",
            links: ["Vital Registration (Birth/Death)", "Marriage Registration", "Ward Recommendation Letters"]
        }
    ];

    const updates = [
        {
            tag: "Fee Change",
            tagColor: "text-amber-600",
            date: "Jan 12, 2024",
            title: "New Passport Fees for 2024 effective from Baisakh 1.",
            description: "Department of Passport (DoP) has announced revised fees for express services."
        },
        {
            tag: "Rule Update",
            tagColor: "text-emerald-600",
            date: "Dec 28, 2023",
            title: "National ID (NID) now mandatory for License Renewal.",
            description: "DOTM implements mandatory NID verification for all smart license processes."
        },
        {
            tag: "Notice",
            tagColor: "text-blue-600",
            date: "Dec 15, 2023",
            title: "Lok Sewa Aayog Kharidar vacancy 2080/81 out.",
            description: "Over 400 positions announced across various provinces."
        }
    ];

    return (
        <div className="bg-white min-h-screen text-slate-900 font-sans">
            <main className="flex flex-col flex-1">
                {/* Hero Search Section */}
                <section className="relative py-20 px-6 md:px-20 bg-primary overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_#ffffff_0%,_transparent_50%)]"></div>
                    </div>
                    <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center gap-8">
                        <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight font-nepali">
                            सरकारी प्रक्रिया अब सरल। <br />
                            <span className="text-blue-300 font-sans text-3xl md:text-4xl mt-2 block">Government processes made easy.</span>
                        </h1>
                        <p className="text-blue-100 text-lg md:text-xl max-w-2xl font-medium">
                            SewaIT is a platform that presents official information from various Nepal Government agencies in a simple manner.
                        </p>
                        <div className="w-full max-w-2xl mt-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary">
                                    <span className="material-symbols-outlined text-2xl">search</span>
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-16 pl-12 pr-32 rounded-xl border-none ring-4 ring-white/10 focus:ring-white/30 text-slate-800 placeholder:text-slate-400 text-lg shadow-2xl transition-all outline-none"
                                    placeholder="Search for a service (e.g., 'Apply for Passport')"
                                />
                                <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-8 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors">
                                    Search
                                </button>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3 mt-6 text-white/70 text-sm">
                                <span className="font-semibold">Popular:</span>
                                <a className="underline hover:text-white transition-colors" href="#">E-Passport</a>
                                <span className="opacity-30">•</span>
                                <a className="underline hover:text-white transition-colors" href="#">License Renewal</a>
                                <span className="opacity-30">•</span>
                                <a className="underline hover:text-white transition-colors" href="#">PAN Registration</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Service Categories Grid */}
                <section className="py-20 px-6 md:px-20 max-w-[1400px] mx-auto w-full">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-slate-900 text-3xl font-black tracking-tight">Browse by Category</h2>
                            <p className="text-slate-500 font-medium mt-1">Select a service to view requirements and process</p>
                        </div>
                        <Link href="#" className="hidden md:flex text-primary font-bold text-sm items-center gap-1 hover:underline">
                            View All Services <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="group cursor-pointer flex flex-col p-8 bg-white border border-slate-200 rounded-2xl hover:shadow-2xl hover:border-primary/20 transition-all">
                                <div className="w-12 h-12 bg-slate-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{cat.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed mb-6">{cat.description}</p>
                                <ul className="flex flex-col gap-3 mb-8">
                                    {cat.links.map((link, lIdx) => (
                                        <li key={lIdx} className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                                            <span className="w-1.5 h-1.5 bg-primary/30 rounded-full"></span>
                                            {link}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="#" className="mt-auto text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                                    View Step-by-Step Guide <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </Link>
                            </div>
                        ))}

                        {/* Missing a Guide Card */}
                        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-dashed border-slate-300 rounded-2xl text-center">
                            <div className="w-12 h-12 bg-white text-slate-400 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                <span className="material-symbols-outlined text-2xl">add</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Missing a Guide?</h3>
                            <p className="text-slate-500 text-sm mb-6 max-w-[200px]">Let us know which government process you need a guide for.</p>
                            <button className="px-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 hover:bg-slate-100 transition-colors shadow-sm">
                                Request Guide
                            </button>
                        </div>
                    </div>
                </section>

                {/* Featured Guides & Updates Section */}
                <section className="py-20 px-6 md:px-20 bg-slate-50 w-full">
                    <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Left: Featured Process Guides */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="material-symbols-outlined text-primary text-3xl">verified</span>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Featured Process Guides</h2>
                            </div>

                            {/* Guide Card 1 */}
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <div className="p-8">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="bg-blue-100 text-primary text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">High Priority</span>
                                                <span className="text-slate-400 text-xs font-medium">Updated 2 days ago</span>
                                            </div>
                                            <h3 className="text-2xl font-extrabold text-slate-900">E-Passport Renewal (34-Page)</h3>
                                            <p className="text-slate-500 text-base mt-2">Complete steps from online appointment to document collection at DOV.</p>
                                        </div>
                                        <button className="bg-primary text-white text-sm font-bold px-8 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-primary/20 whitespace-nowrap">
                                            Start Guide
                                        </button>
                                    </div>
                                    {/* Step Indicators */}
                                    <div className="mt-10 flex items-center">
                                        {[
                                            { step: 1, label: "Appointment" },
                                            { step: 2, label: "Payment" },
                                            { step: 3, label: "Live Photo" },
                                            { step: 4, label: "Collection" }
                                        ].map((s, idx, arr) => (
                                            <div key={idx} className="flex items-center flex-1 last:flex-none">
                                                <div className="flex flex-col items-center relative">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-colors ${idx === 0 ? "bg-primary text-white" : "bg-slate-100 text-slate-400 border border-slate-200"}`}>
                                                        {s.step}
                                                    </div>
                                                    <span className={`text-[10px] font-bold mt-3 absolute -bottom-6 whitespace-nowrap ${idx === 0 ? "text-primary" : "text-slate-400"}`}>
                                                        {s.label}
                                                    </span>
                                                </div>
                                                {idx < arr.length - 1 && (
                                                    <div className={`h-0.5 flex-1 mx-2 ${idx === 0 ? "bg-primary/20" : "bg-slate-100"}`}></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-8"></div>
                                </div>
                            </div>

                            {/* Guide Card 2 */}
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <div className="p-8">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">Updated for 2024</span>
                                                <span className="text-slate-400 text-xs font-medium">Updated 1 week ago</span>
                                            </div>
                                            <h3 className="text-2xl font-extrabold text-slate-900">Personal PAN Registration (Online)</h3>
                                            <p className="text-slate-500 text-base mt-2">Free online process for obtaining your Taxpayer Identification Number.</p>
                                        </div>
                                        <button className="bg-primary text-white text-sm font-bold px-8 py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-primary/20 whitespace-nowrap">
                                            Start Guide
                                        </button>
                                    </div>
                                    {/* Step Indicators */}
                                    <div className="mt-10 flex items-center">
                                        {[
                                            { step: 1, label: "Online Form" },
                                            { step: 2, label: "IRO Selection" },
                                            { step: 3, label: "Verification" }
                                        ].map((s, idx, arr) => (
                                            <div key={idx} className="flex items-center flex-1 last:flex-none">
                                                <div className="flex flex-col items-center relative">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 transition-colors ${idx === 0 ? "bg-primary text-white" : "bg-slate-100 text-slate-400 border border-slate-200"}`}>
                                                        {s.step}
                                                    </div>
                                                    <span className={`text-[10px] font-bold mt-3 absolute -bottom-6 whitespace-nowrap ${idx === 0 ? "text-primary" : "text-slate-400"}`}>
                                                        {s.label}
                                                    </span>
                                                </div>
                                                {idx < arr.length - 1 && (
                                                    <div className={`h-0.5 flex-1 mx-2 ${idx === 0 ? "bg-primary/20" : "bg-slate-100"}`}></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="h-8"></div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Latest Updates Sidebar */}
                        <div className="flex flex-col gap-10">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined text-amber-600 text-3xl">notification_important</span>
                                    <h2 className="text-2xl font-black text-slate-900">Latest Updates</h2>
                                </div>
                                <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col gap-8 shadow-sm">
                                    {updates.map((update, idx) => (
                                        <div key={idx} className={`flex flex-col gap-3 ${idx < updates.length - 1 ? "pb-8 border-b border-slate-100" : ""}`}>
                                            <div className="flex items-center justify-between">
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${update.tagColor}`}>{update.tag}</span>
                                                <span className="text-slate-400 text-xs">{update.date}</span>
                                            </div>
                                            <h4 className="text-base font-bold text-slate-900 leading-snug hover:text-primary cursor-pointer transition-colors">{update.title}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{update.description}</p>
                                            <Link href="#" className="text-primary text-xs font-bold mt-1 flex items-center gap-1 group">
                                                Read Official Notice
                                                <span className="material-symbols-outlined text-xs group-hover:translate-x-0.5 transition-transform">open_in_new</span>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Trust Banner */}
                            <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6">
                                <h5 className="text-primary text-sm font-bold mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-xl">verified_user</span>
                                    Verified Information
                                </h5>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    SewaIT is a platform that presents official information from various Nepal Government agencies in a simple manner.
                                </p>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    SewaIT content is cross-verified with official government portals (gov.np). We are an independent guide platform aimed at improving citizen access to information.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
