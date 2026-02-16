"use client";

import React from "react";
import Link from "next/link";

export default function UploadAdPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Link href="/admin" className="hover:text-primary transition-colors">Dashboard</Link>
                <span className="material-symbols-outlined text-xs leading-none">chevron_right</span>
                <Link href="/admin/ads" className="hover:text-primary transition-colors">Ads</Link>
                <span className="material-symbols-outlined text-xs leading-none">chevron_right</span>
                <span className="text-primary dark:text-blue-400">Upload</span>
            </nav>

            {/* Header */}
            <header>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Upload & Schedule New Advertisement</h2>
                <p className="text-slate-500 mt-1 text-base">Configure your campaign creative, placement, and timeline.</p>
            </header>

            {/* Form Area */}
            <div className="max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-8 space-y-8">
                    {/* Section: Creative */}
                    <section>
                        <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                            <span className="material-symbols-outlined text-primary">image</span>
                            <h3 className="text-lg font-bold">Ad Creative</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Ad Title</span>
                                    <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 border p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white" placeholder="Summer 2024 Promotional Banner" type="text" />
                                </label>
                                <div className="p-4 bg-primary/5 dark:bg-blue-400/5 rounded-lg border border-primary/10 dark:border-blue-400/10">
                                    <div className="flex gap-3">
                                        <span className="material-symbols-outlined text-primary dark:text-blue-400 text-sm">info</span>
                                        <p className="text-xs text-primary dark:text-blue-300 leading-relaxed">
                                            Recommended dimensions vary by placement. High-resolution PNG or JPG preferred (Max 5MB).
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative group cursor-pointer">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Banner Image</span>
                                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 group-hover:border-primary dark:group-hover:border-blue-400 rounded-xl flex flex-col items-center justify-center aspect-video bg-slate-50 dark:bg-slate-800/50 transition-colors">
                                    <span className="material-symbols-outlined text-4xl text-slate-400 mb-2 group-hover:text-primary transition-colors">upload_file</span>
                                    <p className="text-sm font-semibold text-slate-500 group-hover:text-primary transition-colors">Drag & drop or <span className="text-primary dark:text-blue-400 underline">browse</span></p>
                                    <p className="text-[10px] text-slate-400 mt-1">Supports JPG, PNG, GIF</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="border-slate-200 dark:border-slate-800" />

                    {/* Section: Placement & Targeting */}
                    <section>
                        <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                            <span className="material-symbols-outlined text-primary">ads_click</span>
                            <h3 className="text-lg font-bold">Targeting & Placement</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <label className="block">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Ad Placement</span>
                                <select className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 border p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-900 dark:text-white">
                                    <option disabled selected value="">Select position...</option>
                                    <option value="hero">Home Hero Section (1920x600)</option>
                                    <option value="sidebar">Sidebar Widget (300x600)</option>
                                    <option value="footer">Footer Banner (1200x200)</option>
                                </select>
                            </label>
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg flex items-center gap-4 border border-slate-200 dark:border-slate-700">
                                <div className="size-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded flex items-center justify-center flex-shrink-0 shadow-sm">
                                    <div className="w-12 h-8 bg-primary/20 rounded-sm border border-primary/30 flex items-center justify-center">
                                        <div className="w-8 h-1 bg-primary/60 rounded-full"></div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Placement Preview</p>
                                    <p className="text-xs text-slate-500">Visualizing where your ad will appear on the site.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="border-slate-200 dark:border-slate-800" />

                    {/* Section: Timeline */}
                    <section>
                        <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white">
                            <span className="material-symbols-outlined text-primary">calendar_today</span>
                            <h3 className="text-lg font-bold">Campaign Timeline</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <label className="block">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">Start Date</span>
                                <div className="relative">
                                    <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 border p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-700 dark:text-slate-300" type="date" />
                                    <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 pointer-events-none">calendar_month</span>
                                </div>
                            </label>
                            <label className="block">
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 block">End Date</span>
                                <div className="relative">
                                    <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 border p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-700 dark:text-slate-300" type="date" />
                                    <span className="material-symbols-outlined absolute right-3 top-3 text-slate-400 pointer-events-none">event</span>
                                </div>
                            </label>
                        </div>
                    </section>
                </div>

                {/* Action Footer */}
                <div className="bg-slate-50 dark:bg-slate-800/80 px-8 py-6 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative inline-flex items-center">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                            </div>
                            <span className="text-sm font-medium text-slate-500 group-hover:text-primary transition-colors">Set as Draft</span>
                        </label>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/admin/ads" className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            Cancel
                        </Link>
                        <button className="px-8 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">schedule_send</span>
                            Schedule Ad
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Preview Helper */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="text-sm font-bold text-primary dark:text-blue-400 uppercase tracking-wider">Current Active Ad</h4>
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-black px-2 py-0.5 rounded-full">LIVE</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden shadow-inner">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ5Z04kRlGNCeiEVZjTp_N2ztvWIhVK0I1E5sL_tqAr7aNxuRH0SLjVN816bKG-_88GO2JXmK5wb7aT6SVAcAZdng7F-Ba4wYxuehDuXQCeVLh1_eCoapCDbjlxbj2NdDFkwdZC2iBNRL58_UC8g9FpXVD-G8IvXijB-AOQiRN8Y3r4_ZJfOUPVmqUrY7o75EuA3SduqByG6WliiOCCrboqsZsoLCTCPv5Yv_z4WH9NcwglDsVOz_hvLNV5eGaDxUqebpNoBjwdok" alt="Active ad" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">Winter Clearance 2023</p>
                            <p className="text-xs text-slate-500">Ends in 4 days • Hero Section</p>
                        </div>
                        <button className="text-slate-300 hover:text-slate-600 transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="text-sm font-bold text-primary dark:text-blue-400 uppercase tracking-wider">Next Scheduled</h4>
                        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">Upcoming</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden shadow-inner">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFEUi1RazQXbAW1BzkVv3--TQz-_VXe6naaFdwcP1SzbCo_QRkoIcQdganH6Or6KtC0PdR_qljkAjytE0S16f01L8U7lwbHS_VU-pGwrsHsn7SsqzUPVlhgNWoO5OSNscXQJkvfSnRqkjINb5n664kDtAWNKjasA1WeRJW4wLeg5yX6ZhCaA39ZxMo3qnDKB7T7jlrTQirgLLPgXWneNuXX48LRzjaG1Wkn6jskhz4VKtF4-siqJKwUM6MvVBT0a2YSkPHFG4plLc" alt="Upcoming ad" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-900 dark:text-white leading-snug">Spring Arrival Teaser</p>
                            <p className="text-xs text-slate-500">Starts Mar 01 • Sidebar</p>
                        </div>
                        <button className="text-slate-300 hover:text-slate-600 transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
