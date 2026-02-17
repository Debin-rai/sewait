"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function NepseClient() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("gainers");

    // Sample data based on reference
    const gainers = [
        { symbol: "NICA", name: "NIC Asia Bank Ltd.", ltp: "842.10", change: "+32.40", percent: "+4.01%" },
        { symbol: "ADLB", name: "Aadhikhola Laghubitta", ltp: "1,245.00", change: "+45.00", percent: "+3.75%" },
        { symbol: "UPW", name: "Upper Tamakoshi Hydropower", ltp: "425.20", change: "+12.10", percent: "+2.93%" },
        { symbol: "NTC", name: "Nepal Telecom", ltp: "912.00", change: "+22.50", percent: "+2.52%" },
        { symbol: "SHL", name: "Soaltee Hotel Limited", ltp: "380.00", change: "+8.40", percent: "+2.26%" },
    ];

    const watchlist = [
        { symbol: "NIB", price: "215.00", change: "-1.20%", volume: "24,000", status: "down" },
        { symbol: "Nabil", price: "590.00", change: "+0.45%", volume: "102,120", status: "up" },
        { symbol: "HDHPC", price: "198.50", change: "+5.20%", volume: "45,800", status: "up" },
    ];

    const sectors = [
        { name: "Banking", value: "1,234.50", change: "0.85%", status: "up" },
        { name: "Hydropower", value: "2,410.12", change: "1.20%", status: "down" },
        { name: "Insurance", value: "11,042.80", change: "2.15%", status: "up" },
        { name: "Finance", value: "1,950.40", change: "0.45%", status: "up" },
    ];

    const announcements = [
        { type: "DIVIDEND", title: "SCB announces 12.5% Cash Dividend", excerpt: "Standard Chartered Bank has declared its dividend for the fiscal year 79/80 with a major portion in cash...", time: "2 hours ago", color: "text-emerald-600 bg-emerald-50" },
        { type: "LISTING", title: "Rights Shares of NIMB listed in NEPSE", excerpt: "The 10:3 ratio rights shares of Nepal Investment Mega Bank have been successfully listed on the exchange...", time: "5 hours ago", color: "text-primary bg-primary/10" },
        { type: "AUCTION", title: "NICL to auction unclaimed rights shares", excerpt: "Neco Insurance Limited is opening an auction for its unclaimed promoter and ordinary rights shares starting next week...", time: "1 day ago", color: "text-amber-600 bg-amber-50" },
    ];

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 pb-12">
            <main className="max-w-[1280px] mx-auto px-6 py-8">
                {/* Market Status & Top Stats */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight text-primary font-nepali">नेप्से बजार</h1>
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Market Open
                            </span>
                        </div>
                        <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()} (NST)</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col min-w-[180px] shadow-sm">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">NEPSE Value</span>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-2xl font-bold tabular-nums">2,100.45</span>
                                <span className="text-emerald-600 text-sm font-bold flex items-center mb-0.5">
                                    <span className="material-symbols-outlined text-xs">arrow_upward</span>
                                    1.25%
                                </span>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col min-w-[180px] shadow-sm">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Turnover (NPR)</span>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-2xl font-bold tabular-nums">4.12B</span>
                                <span className="text-emerald-600 text-sm font-bold mb-0.5">+5.4%</span>
                            </div>
                        </div>
                        <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col min-w-[180px] shadow-sm">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Volume</span>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-2xl font-bold tabular-nums">12.45M</span>
                                <span className="text-emerald-600 text-sm font-bold mb-0.5">+2.1%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-8">
                    {/* Left Column */}
                    <div className="col-span-12 lg:col-span-8 space-y-8">
                        {/* Performance Tabs Section */}
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                            <div className="border-b border-slate-100 bg-slate-50/50">
                                <nav className="flex px-4">
                                    <button
                                        onClick={() => setActiveTab("gainers")}
                                        className={`py-4 px-6 text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "gainers" ? "border-b-2 border-primary text-primary" : "text-slate-500 hover:text-primary"}`}
                                    >
                                        <span className="material-symbols-outlined text-lg">trending_up</span>
                                        Top Gainers
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("losers")}
                                        className={`py-4 px-6 text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "losers" ? "border-b-2 border-primary text-primary" : "text-slate-500 hover:text-primary"}`}
                                    >
                                        <span className="material-symbols-outlined text-lg">trending_down</span>
                                        Top Losers
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("turnover")}
                                        className={`py-4 px-6 text-sm font-bold flex items-center gap-2 transition-all ${activeTab === "turnover" ? "border-b-2 border-primary text-primary" : "text-slate-500 hover:text-primary"}`}
                                    >
                                        <span className="material-symbols-outlined text-lg">monetization_on</span>
                                        Top Turnover
                                    </button>
                                </nav>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/30 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Symbol</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">LTP (NPR)</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Change</th>
                                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">% Change</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {gainers.map((stock, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-primary">{stock.symbol}</span>
                                                        <span className="text-[10px] text-slate-500">{stock.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right tabular-nums font-medium">{stock.ltp}</td>
                                                <td className="px-6 py-4 text-right tabular-nums text-emerald-600 font-semibold">{stock.change}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded text-xs font-bold tabular-nums">{stock.percent}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="p-4 bg-white text-center border-t border-slate-50">
                                    <button className="text-sm font-bold text-primary hover:underline font-nepali">View All Gainers</button>
                                </div>
                            </div>
                        </div>

                        {/* Sector Wise Indices */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {sectors.map((sector, idx) => (
                                <div key={idx} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                                    <p className="text-xs font-bold text-slate-500 uppercase mb-2 group-hover:text-primary transition-colors">{sector.name}</p>
                                    <p className="text-lg font-bold tabular-nums">{sector.value}</p>
                                    <div className={`flex items-center gap-1 text-xs font-bold mt-1 ${sector.status === "up" ? "text-emerald-600" : "text-red-500"}`}>
                                        <span className="material-symbols-outlined text-[14px]">
                                            {sector.status === "up" ? "north_east" : "south_east"}
                                        </span>
                                        {sector.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="col-span-12 lg:col-span-4 space-y-8">
                        {/* My Watchlist */}
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">visibility</span>
                                    My Watchlist
                                </h3>
                                <button className="text-primary text-xs font-bold hover:underline">Edit List</button>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {watchlist.map((item, idx) => (
                                    <div key={idx} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
                                        <div>
                                            <span className="text-sm font-bold text-primary block">{item.symbol}</span>
                                            <span className="text-[10px] text-slate-500">Last Price: {item.price}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-sm font-bold block tabular-nums ${item.status === "up" ? "text-emerald-600" : "text-red-500"}`}>{item.change}</span>
                                            <span className="text-[10px] text-slate-500">Vol: {item.volume}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-slate-100">
                                <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-primary transition-all">
                                    Add Scrip to Watchlist
                                </button>
                            </div>
                        </div>

                        {/* Quick Insight */}
                        <div className="bg-primary text-white rounded-2xl shadow-xl p-6 relative overflow-hidden group">
                            <div className="relative z-10">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Quick Insight</span>
                                <h4 className="text-xl font-bold mt-2">Hydropower leads momentum</h4>
                                <p className="text-sm mt-3 leading-relaxed text-slate-100 opacity-90">
                                    The hydropower sector is witnessing a high volume of trade today, following the recent policy updates regarding project extensions.
                                </p>
                                <button className="mt-5 flex items-center gap-2 text-xs font-bold border border-white/20 px-4 py-2.5 rounded-xl hover:bg-white hover:text-primary transition-all">
                                    Read Full Report
                                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                </button>
                            </div>
                            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                <span className="material-symbols-outlined text-[140px]">insert_chart</span>
                            </div>
                        </div>

                        {/* Trading Schedule */}
                        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
                            <h3 className="text-sm font-bold text-primary mb-5 flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">event</span>
                                Trading Schedule
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-medium">Pre-Open Session</span>
                                    <span className="font-bold">10:30 - 10:45</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-medium">Continuous Session</span>
                                    <span className="font-bold text-emerald-600">11:00 - 15:00</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-slate-500 font-medium">Odd Lot Session</span>
                                    <span className="font-bold">11:00 - 15:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Market Announcements Section */}
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-primary font-nepali">बजार घोषणा</h2>
                        <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {announcements.map((news, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all cursor-pointer group">
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${news.color}`}>{news.type}</span>
                                <h4 className="font-bold text-base mt-4 text-primary group-hover:text-accent-amber transition-colors line-clamp-1">{news.title}</h4>
                                <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">{news.excerpt}</p>
                                <div className="flex items-center gap-2 mt-6 text-slate-400">
                                    <span className="material-symbols-outlined text-sm">schedule</span>
                                    <span className="text-[10px]">{news.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
