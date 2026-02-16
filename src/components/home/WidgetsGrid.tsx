"use client";

import Link from "next/link";

export default function WidgetsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Calendar Widget */}
            <Link href="/calendar" className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-t-primary block">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">calendar_month</span>
                        <h2 className="text-primary font-bold text-lg">Nepali Calendar <span className="nepali-font text-sm text-primary/60">पात्रो</span></h2>
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-full uppercase tracking-tighter nepali-font">२०८० कार्तिक</span>
                </div>

                <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
                    <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
                </div>
                <div className="grid grid-cols-7 text-center gap-y-1 text-sm font-semibold">
                    {[...Array(3)].map((_, i) => (
                        <span key={`empty-${i}`} className="py-2 text-slate-200">{28 + i}</span>
                    ))}
                    {[...Array(18)].map((_, i) => {
                        const day = i + 1;
                        const isToday = day === 15;
                        return (
                            <span
                                key={`day-${day}`}
                                className={`py-2 rounded-lg cursor-pointer transition-all flex items-center justify-center ${isToday
                                    ? "bg-primary text-white shadow-lg shadow-primary/30 font-bold scale-110"
                                    : "hover:bg-slate-50 text-slate-700 hover:text-primary"
                                    }`}
                            >
                                {day}
                            </span>
                        );
                    })}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Upcoming Festival <span className="nepali-font">आगामी पर्व</span></p>
                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100/50 group cursor-pointer hover:border-primary/30 transition-all">
                        <div className="w-1.5 h-10 bg-accent-amber rounded-full group-hover:scale-y-110 transition-transform"></div>
                        <div>
                            <p className="text-xs font-bold text-primary mb-0.5">Dashain <span className="nepali-font">(घटस्थापना)</span></p>
                            <p className="text-[10px] text-slate-500">5 days left • Ashoj 28</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 ml-auto text-sm group-hover:text-primary transition-colors">chevron_right</span>
                    </div>
                </div>
            </Link>

            {/* Market Rates Widget */}
            <Link href="/gold-silver" className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-t-accent-amber block">
                <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-accent-amber">payments</span>
                    <h2 className="text-slate-900 font-bold text-lg">Market Price <span className="nepali-font text-sm text-slate-400">बजार भाउ</span></h2>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gold (24 Carat) / Tola</span>
                            <span className="text-red-500 text-[10px] font-bold flex items-center gap-0.5 bg-red-50 px-1.5 py-0.5 rounded">
                                <span className="material-symbols-outlined text-xs">arrow_downward</span> Rs. 250
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-primary relative z-10">NPR 1,18,000</p>
                        <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-slate-100 text-6xl group-hover:text-amber-100 transition-colors">savings</span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Silver / Tola</span>
                            <span className="text-green-600 text-[10px] font-bold flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded">
                                <span className="material-symbols-outlined text-xs">arrow_upward</span> Rs. 5
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-primary relative z-10">NPR 1,400</p>
                        <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-slate-100 text-6xl group-hover:text-slate-200 transition-colors">diamond</span>
                    </div>
                    <p className="text-[9px] text-slate-400 text-center pt-2">Source: Nepal Gold & Silver Merchants Federation</p>
                </div>
            </Link>

            {/* NEPSE Widget */}
            <Link href="/nepse" className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-t-primary block">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">monitoring</span>
                        <h2 className="text-primary font-bold text-lg">NEPSE Summary <span className="nepali-font text-sm text-primary/60">नेप्से</span></h2>
                    </div>
                    <span className="text-[9px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase tracking-tighter">Market Open</span>
                </div>

                <div className="mb-8">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Current Index</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-slate-900 tracking-tighter">2,045.63</span>
                        <span className="text-green-600 text-xs font-bold flex items-center bg-green-50 px-1.5 py-0.5 rounded">
                            +9.20 <span className="text-[10px] ml-1">(0.45%)</span>
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    {[
                        { symbol: "NTC", change: "+4.5%" },
                        { symbol: "ADBL", change: "+3.2%" },
                        { symbol: "HDL", change: "+2.8%" }
                    ].map((stock, i) => (
                        <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0 group cursor-pointer">
                            <span className="text-xs font-bold text-slate-600 group-hover:text-primary transition-colors">{stock.symbol}</span>
                            <span className="text-xs font-bold text-green-600 bg-green-50/50 px-2 py-0.5 rounded group-hover:bg-green-100 transition-colors">{stock.change}</span>
                        </div>
                    ))}
                </div>
            </Link>

            {/* Weather Widget */}
            <Link href="/weather" className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-t-accent-amber block">
                <div className="flex items-center gap-2 mb-6">
                    <span className="material-symbols-outlined text-accent-amber">partly_cloudy_day</span>
                    <h2 className="text-slate-900 font-bold text-lg">Weather <span className="nepali-font text-sm text-slate-400">मौसम</span></h2>
                </div>

                <div className="flex items-center gap-6 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="material-symbols-outlined text-5xl text-primary/80">sunny</span>
                    <div>
                        <p className="text-3xl font-bold text-primary tracking-tighter">22°C</p>
                        <p className="text-xs font-bold text-slate-500">Kathmandu, Clear</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {[
                        { day: "THU", temp: "24°", icon: "cloud" },
                        { day: "FRI", temp: "23°", icon: "partly_cloudy_day" },
                        { day: "SAT", temp: "25°", icon: "sunny" }
                    ].map((w, i) => (
                        <div key={i} className="text-center p-2 rounded-xl border border-slate-50 bg-slate-50/30">
                            <p className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-tighter">{w.day}</p>
                            <span className="material-symbols-outlined text-slate-400 text-lg mb-1">{w.icon}</span>
                            <p className="text-xs font-black text-slate-700">{w.temp}</p>
                        </div>
                    ))}
                </div>
            </Link>
        </div>
    );
}
