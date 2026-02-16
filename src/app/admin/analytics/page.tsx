"use client";

import React from "react";

export default function AnalyticsDashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Analytics Overview</h2>
                    <p className="text-slate-500 dark:text-slate-400">Monitoring user behavior and utility performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                        <span>Last 30 Days</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined text-lg">download</span>
                        <span>Export Report</span>
                    </button>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <span className="material-symbols-outlined text-primary">schedule</span>
                        </div>
                        <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                            +12% <span className="material-symbols-outlined text-sm">trending_up</span>
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Avg. Session Duration</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">4m 32s</h3>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                            <span className="material-symbols-outlined text-rose-600">output</span>
                        </div>
                        <span className="text-rose-500 text-sm font-bold flex items-center gap-1">
                            -5% <span className="material-symbols-outlined text-sm">trending_down</span>
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Bounce Rate</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">32.4%</h3>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <span className="material-symbols-outlined text-blue-600">group</span>
                        </div>
                        <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                            +8.2% <span className="material-symbols-outlined text-sm">trending_up</span>
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Active Users</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">12,540</h3>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <span className="material-symbols-outlined text-amber-600">visibility</span>
                        </div>
                        <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                            +14.5% <span className="material-symbols-outlined text-sm">trending_up</span>
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Page Views</p>
                    <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">45.8k</h3>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Line Chart: Traffic Trends */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">Daily Active Users</h4>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1">
                                <span className="size-2 rounded-full bg-primary"></span>
                                <span className="text-xs text-slate-500">Current</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="size-2 rounded-full bg-slate-300"></span>
                                <span className="text-xs text-slate-500">Target</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-64 w-full relative">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            {/* Grid lines */}
                            <line className="text-slate-100 dark:text-slate-700" stroke="currentColor" strokeWidth="0.5" x1="0" x2="100" y1="20" y2="20"></line>
                            <line className="text-slate-100 dark:text-slate-700" stroke="currentColor" strokeWidth="0.5" x1="0" x2="100" y1="40" y2="40"></line>
                            <line className="text-slate-100 dark:text-slate-700" stroke="currentColor" strokeWidth="0.5" x1="0" x2="100" y1="60" y2="60"></line>
                            <line className="text-slate-100 dark:text-slate-700" stroke="currentColor" strokeWidth="0.5" x1="0" x2="100" y1="80" y2="80"></line>
                            {/* Area under curve */}
                            <path d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,45 T100,50 L100,100 L0,100 Z" fill="rgba(26, 53, 91, 0.05)"></path>
                            {/* Main line */}
                            <path d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,45 T100,50" fill="none" stroke="#1a355b" strokeWidth="2"></path>
                            {/* Target line (dashed) */}
                            <path d="M0,85 Q15,75 30,80 T60,70 T90,65 T100,60" fill="none" stroke="#cbd5e1" strokeDasharray="4" strokeWidth="1.5"></path>
                        </svg>
                        <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>
                </div>

                {/* Line Chart: Page Views */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">Page Views</h4>
                        <select className="text-xs bg-slate-50 dark:bg-slate-900 border-none rounded-lg focus:ring-primary text-slate-600 dark:text-slate-400">
                            <option>Weekly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                    <div className="h-64 w-full relative">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            {/* Grid lines */}
                            <line className="text-slate-100 dark:text-slate-700" stroke="currentColor" strokeWidth="0.5" x1="0" x2="100" y1="20" y2="20"></line>
                            <line className="text-slate-100 dark:text-slate-700" stroke="currentColor" strokeWidth="0.5" x1="0" x2="100" y1="40" y2="40"></line>
                            <line className="text-slate-100 dark:text-slate-700" stroke="currentColor" strokeWidth="0.5" x1="0" x2="100" y1="60" y2="60"></line>
                            <line className="text-slate-100 dark:text-slate-700" stroke="currentColor" strokeWidth="0.5" x1="0" x2="100" y1="80" y2="80"></line>
                            {/* Area */}
                            <path d="M0,60 Q10,40 20,50 T40,30 T60,45 T80,20 T100,25 L100,100 L0,100 Z" fill="rgba(26, 53, 91, 0.1)"></path>
                            {/* Main line */}
                            <path d="M0,60 Q10,40 20,50 T40,30 T60,45 T80,20 T100,25" fill="none" stroke="#1a355b" strokeWidth="3"></path>
                        </svg>
                        <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Bar Chart: Top Modules */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm xl:col-span-2">
                    <h4 className="font-bold text-lg mb-6 text-slate-900 dark:text-white">Top Modules Performance</h4>
                    <div className="space-y-6">
                        {/* Weather */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sky-500">cloud_queue</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Weather Utility</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">12,402 hits</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                        {/* Calendar */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-orange-500">calendar_month</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Calendar</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">8,115 hits</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-primary/70 rounded-full" style={{ width: '62%' }}></div>
                            </div>
                        </div>
                        {/* Gold */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-amber-500">payments</span>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Gold & Precious Metals</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">4,290 hits</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-primary/40 rounded-full" style={{ width: '33%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Utility Market Share */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-slate-900 dark:text-white">
                    <h4 className="font-bold text-lg mb-6">Utility Market Share</h4>
                    <div className="flex justify-center items-center py-4">
                        <div className="relative size-48">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                                <circle cx="16" cy="16" fill="transparent" r="14" stroke="currentColor" strokeWidth="4" className="text-slate-100 dark:text-slate-700"></circle>
                                <circle cx="16" cy="16" fill="transparent" r="14" stroke="currentColor" strokeDasharray="60 100" strokeLinecap="round" strokeWidth="4" className="text-primary"></circle>
                                <circle cx="16" cy="16" fill="transparent" r="14" stroke="currentColor" strokeDasharray="25 100" strokeDashoffset="-60" strokeLinecap="round" strokeWidth="4" className="text-blue-500"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold">24.8k</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase">Total Hits</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                            <span className="size-3 rounded-full bg-primary"></span>
                            <span className="text-xs">Weather (60%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-3 rounded-full bg-blue-500"></span>
                            <span className="text-xs">Calendar (25%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-3 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                            <span className="text-xs">Others (15%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
