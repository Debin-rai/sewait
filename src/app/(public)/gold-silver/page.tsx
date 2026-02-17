"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function GoldSilverPage() {
    const { t } = useLanguage();
    const [tolaQuantity, setTolaQuantity] = useState(1);

    const rates = [
        {
            title: "Gold 24K",
            nepaliTitle: "सुन (छापावाल) - २४ क्यारेट",
            price: 118500,
            change: "0.5%",
            trend: "up",
            yesterday: 117900,
            diff: 600,
            icon: "workspace_premium",
            color: "text-gold-accent"
        },
        {
            title: "Gold 22K",
            nepaliTitle: "सुन (तेजावी) - २२ क्यारेट",
            price: 117950,
            change: "0.4%",
            trend: "up",
            yesterday: 117450,
            diff: 500,
            icon: "stars",
            color: "text-slate-400"
        },
        {
            title: "Silver",
            nepaliTitle: "चाँदी",
            price: 1450,
            change: "0.2%",
            trend: "down",
            yesterday: 1455,
            diff: -5,
            icon: "blur_on",
            color: "text-slate-400"
        }
    ];

    const historicalData = [
        { date: "Oct 24, 2023", gold24k: 118500, gold22k: 117950, silver: 1450, status: "+0.51%", trend: "up" },
        { date: "Oct 23, 2023", gold24k: 117900, gold22k: 117450, silver: 1455, status: "-0.10%", trend: "down" },
        { date: "Oct 22, 2023", gold24k: 118000, gold22k: 117500, silver: 1440, status: "No Change", trend: "neutral" },
        { date: "Oct 21, 2023", gold24k: 117200, gold22k: 116650, silver: 1425, status: "+1.20%", trend: "up" },
    ];

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 pb-12">
            <main className="max-w-[1400px] mx-auto px-6 py-10">
                {/* Breadcrumbs & Title */}
                <div className="mb-10">
                    <nav className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <a href="/" className="hover:text-primary transition-colors">Home</a>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-primary">Gold & Silver Rates</span>
                    </nav>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-5xl font-black tracking-tight text-primary nepali-font">बुलियन बजार दर</h1>
                            <p className="text-slate-500 mt-2 font-bold opacity-70">Live retail prices in Nepal per Tola (11.66 Grams)</p>
                        </div>
                        <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-xl text-xs font-black border border-emerald-100 shadow-sm transition-all hover:bg-emerald-100">
                            <span className="material-symbols-outlined text-sm">sync</span>
                            Last Updated: Oct 24, 2023, 10:30 AM
                        </div>
                    </div>
                </div>

                {/* Rate Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {rates.map((rate, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl shadow-xl ring-1 ring-slate-200 relative overflow-hidden group transition-all hover:shadow-2xl hover:-translate-y-1">
                            <div className={`absolute top-0 right-0 w-32 h-32 ${i === 0 ? 'bg-amber-100/30' : 'bg-slate-50'} rounded-full -mr-12 -mt-12 group-hover:scale-125 transition-transform duration-500`}></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`flex items-center gap-2 ${rate.color} font-black uppercase tracking-widest text-xs`}>
                                        <span className="material-symbols-outlined text-xl">{rate.icon}</span>
                                        <span>{rate.title}</span>
                                    </div>
                                    <span className={`flex items-center text-xs font-black ${rate.trend === 'up' ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'} px-2 py-1 rounded-lg border ${rate.trend === 'up' ? 'border-green-100' : 'border-red-100'}`}>
                                        <span className="material-symbols-outlined text-sm">{rate.trend === 'up' ? 'arrow_upward' : 'arrow_downward'}</span>
                                        {rate.change}
                                    </span>
                                </div>
                                <div className="text-slate-300 text-[10px] mb-1 font-black uppercase tracking-[0.2em]">Current Price</div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-primary">रु {rate.price.toLocaleString()}</span>
                                    <span className="text-slate-400 text-xs font-bold uppercase">/ tola</span>
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-slate-300">Yesterday: रु {rate.yesterday.toLocaleString()}</span>
                                    <span className={rate.diff > 0 ? 'text-green-500' : 'text-red-500'}>
                                        {rate.diff > 0 ? '+' : ''} रु {Math.abs(rate.diff).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Chart Section */}
                    <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-10 shadow-xl overflow-hidden relative">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h3 className="text-xl font-black text-primary nepali-font">७ दिनको मूल्य इतिहास</h3>
                                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">Gold 24K Trend Analysis</p>
                            </div>
                            <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                <button className="px-6 py-2 rounded-xl bg-white text-[10px] font-black text-primary shadow-lg ring-1 ring-slate-200 tracking-[0.2em] uppercase">Gold</button>
                                <button className="px-6 py-2 rounded-xl text-[10px] font-black text-slate-400 hover:text-primary transition-all tracking-[0.2em] uppercase">Silver</button>
                            </div>
                        </div>
                        {/* SVG Chart */}
                        <div className="relative h-[350px] w-full">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 300">
                                <defs>
                                    <linearGradient id="chartG" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#1a355b" stopOpacity="0.1" />
                                        <stop offset="100%" stopColor="#1a355b" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                <path d="M0,250 L100,230 L200,240 L300,180 L400,200 L500,140 L600,160 L700,80 L800,90 L800,300 L0,300 Z" fill="url(#chartG)" />
                                <path d="M0,250 L100,230 L200,240 L300,180 L400,200 L500,140 L600,160 L700,80 L800,90" fill="none" stroke="#1a355b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                {[100, 200, 300, 400, 500, 600, 700, 800].map((cx, i) => (
                                    <circle key={i} cx={cx} cy={[230, 240, 180, 200, 140, 160, 80, 90][i]} r={cx === 700 ? 8 : 5} fill={cx === 700 ? '#D4AF37' : '#1a355b'} stroke="white" strokeWidth="3" />
                                ))}
                            </svg>
                            <div className="flex justify-between mt-10 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] px-2">
                                {["Oct 18", "Oct 19", "Oct 20", "Oct 21", "Oct 22", "Oct 23", "Today"].map(d => <span key={d}>{d}</span>)}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Widgets */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Converter */}
                        <div className="bg-primary text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden transition-all hover:shadow-primary/20">
                            <div className="flex items-center gap-3 mb-8 relative z-10">
                                <span className="material-symbols-outlined text-amber-500 bg-white/10 p-2 rounded-xl">calculate</span>
                                <h3 className="text-lg font-black nepali-font">एकाइ रूपान्तरण</h3>
                            </div>
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <label className="text-[10px] uppercase font-black text-white/30 block mb-2 tracking-[0.2em]">Quantity (Tola)</label>
                                    <input
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-xl font-black text-white focus:ring-2 focus:ring-amber-500 outline-none placeholder-white/20 transition-all"
                                        type="number"
                                        value={tolaQuantity}
                                        onChange={(e) => setTolaQuantity(Number(e.target.value))}
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white/10 text-4xl font-black rotate-90">sync_alt</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                                        <div className="text-[10px] uppercase font-black text-white/30 mb-2 tracking-widest">Grams</div>
                                        <div className="text-xl font-black">{(tolaQuantity * 11.66).toFixed(2)}</div>
                                    </div>
                                    <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                                        <div className="text-[10px] uppercase font-black text-white/30 mb-2 tracking-widest">Ounces</div>
                                        <div className="text-xl font-black">{(tolaQuantity * 0.41).toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="pt-4 mt-4 border-t border-white/10">
                                    <div className="text-[10px] uppercase font-black text-white/30 mb-2 tracking-widest">Total Estimated Value</div>
                                    <div className="text-3xl font-black text-amber-500">रु {(tolaQuantity * 118500).toLocaleString()}</div>
                                </div>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]"></div>
                        </div>

                        {/* Market Outlook */}
                        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                            <h3 className="text-lg font-black text-primary mb-8 nepali-font">बजारको अवस्था</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <span className="material-symbols-outlined text-emerald-500 font-black mt-1">trending_up</span>
                                    <p className="text-sm font-semibold text-slate-500 leading-relaxed">बिश्वव्यापी बजारमा आएको उतारचढावका कारण सुनको मूल्यमा केही सुधार देखिएको छ ।</p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="material-symbols-outlined text-amber-500 font-black mt-1">info</span>
                                    <p className="text-sm font-semibold text-slate-500 leading-relaxed">चाडपर्वका कारण स्थानीय बजारमा सुनको माग उच्च रहेको छ ।</p>
                                </div>
                            </div>
                            <button className="w-full mt-10 py-5 bg-slate-50 text-[10px] font-black text-primary border border-slate-100 uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all">विस्तृत विश्लेषण</button>
                        </div>
                    </div>
                </div>

                {/* Historical Table */}
                <div className="mt-12 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl">
                    <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <h3 className="text-lg font-black text-primary nepali-font">विगत हप्ताको दरहरू</h3>
                        <span className="material-symbols-outlined text-slate-400">history</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black border-b border-slate-50">
                                    <th className="px-8 py-6">Date</th>
                                    <th className="px-8 py-6">Gold 24K (Tola)</th>
                                    <th className="px-8 py-6">Gold 22K (Tola)</th>
                                    <th className="px-8 py-6">Silver (Tola)</th>
                                    <th className="px-8 py-6 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {historicalData.map((row, i) => (
                                    <tr key={i} className="text-sm hover:bg-slate-50 transition-all cursor-default group">
                                        <td className="px-8 py-6 font-bold text-slate-700">{row.date}</td>
                                        <td className="px-8 py-6 font-black text-primary">रु {row.gold24k.toLocaleString()}</td>
                                        <td className="px-8 py-6 font-bold text-slate-500 group-hover:text-primary transition-colors">रु {row.gold22k.toLocaleString()}</td>
                                        <td className="px-8 py-6 font-bold text-slate-500 group-hover:text-primary transition-colors">रु {row.silver.toLocaleString()}</td>
                                        <td className="px-8 py-6 text-right">
                                            <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-lg border ${row.trend === 'up' ? 'text-green-500 bg-green-50' : row.trend === 'down' ? 'text-red-500 bg-red-50' : 'text-slate-400 bg-slate-100'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Info */}
                <footer className="mt-16 py-12 border-t border-slate-200 text-center relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6">
                        <span className="material-symbols-outlined text-slate-200 text-4xl font-black">verified</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest opacity-60">
                        Data provided by the Federation of Nepal Gold and Silver Dealers' Association (FENEGOSIDA).
                        Prices are indicative and may vary slightly across different regions in Nepal.
                    </p>
                    <div className="mt-8 flex justify-center gap-10">
                        {["Privacy Policy", "Terms of Service", "API Access"].map(l => (
                            <a key={l} className="text-[10px] font-black text-slate-300 hover:text-primary uppercase tracking-[0.2em] transition-all" href="#">{l}</a>
                        ))}
                    </div>
                    <p className="mt-10 text-[10px] font-black text-slate-200 uppercase tracking-[0.4em]">© २०८१ SewaIT OFFICIAL. सर्वाधिकार सुरक्षित।</p>
                </footer>
            </main>
        </div>
    );
}
