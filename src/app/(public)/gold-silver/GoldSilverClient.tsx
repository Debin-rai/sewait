"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function GoldSilverClient() {
    const { t } = useLanguage();
    const [tolaQuantity, setTolaQuantity] = useState(1);

    const rates = [
        {
            title: "Gold 24K", nepaliTitle: "सुन (छापावाल) - २४ क्यारेट", price: 118500, change: "0.5%", trend: "up",
            yesterday: 117900, diff: 600, icon: "workspace_premium", color: "text-gold-accent"
        },
        {
            title: "Gold 22K", nepaliTitle: "सुन (तेजाबी) - २२ क्यारेट", price: 117950, change: "0.5%", trend: "up",
            yesterday: 117350, diff: 600, icon: "token", color: "text-yellow-600"
        },
        {
            title: "Silver", nepaliTitle: "चाँदी", price: 1450, change: "-0.2%", trend: "down",
            yesterday: 1455, diff: -5, icon: "diamond", color: "text-slate-400"
        },
    ];

    const historicalData = [
        { date: "Oct 24, 2023", gold24k: 118500, gold22k: 117950, silver: 1450, status: "+0.51%", trend: "up" },
        { date: "Oct 23, 2023", gold24k: 117900, gold22k: 117350, silver: 1455, status: "-0.2%", trend: "down" },
        { date: "Oct 22, 2023", gold24k: 118100, gold22k: 117550, silver: 1460, status: "0%", trend: "neutral" },
        { date: "Oct 21, 2023", gold24k: 118100, gold22k: 117550, silver: 1460, status: "+1.2%", trend: "up" },
    ];

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 pb-12">
            <main className="max-w-[1400px] mx-auto px-6 py-10">
                {/* Breadcrumbs & Title */}
                <div className="mb-10">
                    <nav className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <span>Home</span>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="text-primary">Market</span>
                        <span className="material-symbols-outlined text-sm">chevron_right</span>
                        <span className="text-slate-600">Gold & Silver</span>
                    </nav>
                    <h1 className="text-5xl font-black tracking-tight text-primary nepali-font">बुलियन बजार दर</h1>
                    <p className="text-slate-500 mt-2 font-bold opacity-70">Live retail prices in Nepal per Tola (11.66 Grams)</p>
                    <div className="flex items-center gap-2 mt-6 text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200 w-fit shadow-sm">
                        <span className="material-symbols-outlined text-green-500">update</span>
                        Last updated: Today, 10:00 AM
                    </div>
                </div>

                {/* Rate Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {rates.map((rate, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl shadow-xl ring-1 ring-slate-200 relative overflow-hidden group transition-all hover:shadow-2xl hover:-translate-y-1">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                                <span className={`material-symbols-outlined text-8xl ${rate.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{rate.icon}</span>
                            </div>
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`size-10 rounded-full flex items-center justify-center bg-slate-50 ${rate.color}`}>
                                        <span className="material-symbols-outlined">{rate.icon}</span>
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{rate.title}</h3>
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 nepali-font mb-4">{rate.nepaliTitle}</h2>
                                <div className="mt-auto">
                                    <div className="flex items-end gap-3 mb-2">
                                        <span className="text-5xl font-black text-slate-900 tracking-tighter">
                                            <span className="text-2xl align-top text-slate-400 font-bold mr-1">Rs.</span>
                                            {rate.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className={`flex items-center gap-2 text-sm font-bold ${rate.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} w-fit px-3 py-1 rounded-lg`}>
                                        <span className="material-symbols-outlined text-base">
                                            {rate.trend === 'up' ? 'trending_up' : 'trending_down'}
                                        </span>
                                        <span>{rate.change} ({rate.diff > 0 ? '+' : ''}{rate.diff})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Chart Section */}
                    <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-10 shadow-xl overflow-hidden relative">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-black text-slate-800">Price Trend</h3>
                                <p className="text-sm text-slate-500 font-bold">Past 30 Days Volatility</p>
                            </div>
                            <div className="flex gap-2">
                                {['1W', '1M', '6M', '1Y'].map(range => (
                                    <button key={range} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${range === '1M' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Mock Chart Area */}
                        <div className="h-[300px] w-full bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-bold border border-dashed border-slate-200">
                            Interactive Chart Component Loading...
                        </div>
                    </div>

                    {/* Sidebar Widgets */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Converter */}
                        <div className="bg-primary text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                                    <span className="material-symbols-outlined">calculate</span>
                                    Quick Converter
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase opacity-70">Tola Quantity</label>
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setTolaQuantity(Math.max(1, tolaQuantity - 1))} className="size-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                                                <span className="material-symbols-outlined">remove</span>
                                            </button>
                                            <span className="text-3xl font-black tabular-nums min-w-[40px] text-center">{tolaQuantity}</span>
                                            <button onClick={() => setTolaQuantity(tolaQuantity + 1)} className="size-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                                                <span className="material-symbols-outlined">add</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-white/20 mt-4">
                                        <p className="text-xs font-bold uppercase opacity-70 mb-1">Total Value (24K)</p>
                                        <p className="text-3xl font-black text-amber-300">Rs. {(118500 * tolaQuantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Market Outlook */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Market Outlook</h3>
                            <div className="flex items-start gap-4">
                                <div className="size-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 leading-tight">Gold prices expected to rise due to international market pressure.</p>
                                    <p className="text-xs text-slate-400 mt-2">Analysis based on FENEGOSIDA reports.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Historical Table */}
                <div className="mt-12 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-black text-slate-800">Historical Rates</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-8 py-4">Date</th>
                                    <th className="px-8 py-4 text-right">Gold (24K)</th>
                                    <th className="px-8 py-4 text-right">Gold (22K)</th>
                                    <th className="px-8 py-4 text-right">Silver</th>
                                    <th className="px-8 py-4 text-center">Trend</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm font-bold text-slate-700">
                                {historicalData.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-8 py-4 text-slate-500">{row.date}</td>
                                        <td className="px-8 py-4 text-right tabular-nums">{row.gold24k.toLocaleString()}</td>
                                        <td className="px-8 py-4 text-right tabular-nums text-slate-400">{row.gold22k.toLocaleString()}</td>
                                        <td className="px-8 py-4 text-right tabular-nums">{row.silver.toLocaleString()}</td>
                                        <td className="px-8 py-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${row.trend === 'up' ? 'bg-green-100 text-green-700' : row.trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>
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
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 px-4">
                        <span className="material-symbols-outlined text-slate-300 text-3xl">info</span>
                    </div>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                        Rates are set by the <strong className="text-primary">Federation of Nepal Gold & Silver Dealers' Association (FENEGOSIDA)</strong> at 10:00 AM daily.
                        SewaIT updates these rates continuously. Prices may vary slightly by store location.
                    </p>
                </footer>
            </main>
        </div>
    );
}
