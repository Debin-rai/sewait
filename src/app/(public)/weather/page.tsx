"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function WeatherPage() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState("");

    // Forecast data based on reference
    const forecast = [
        { day: "Tue", icon: "wb_sunny", condition: "Sunny", high: 28, low: 18, color: "text-orange-400" },
        { day: "Wed", icon: "partly_cloudy_day", condition: "Cloudy", high: 26, low: 17, color: "text-slate-400" },
        { day: "Thu", icon: "rainy", condition: "Rainy", high: 22, low: 19, color: "text-blue-400" },
        { day: "Fri", icon: "thunderstorm", condition: "Storm", high: 21, low: 16, color: "text-blue-500" },
        { day: "Sat", icon: "cloud", condition: "Overcast", high: 24, low: 17, color: "text-slate-400" },
        { day: "Sun", icon: "wb_sunny", condition: "Sunny", high: 29, low: 18, color: "text-orange-400" },
        { day: "Mon", icon: "wb_sunny", condition: "Sunny", high: 30, low: 20, color: "text-orange-400" },
    ];

    const metrics = [
        { label: "Humidity", value: "65%", subValue: "+2%", icon: "humidity_percentage", iconColor: "text-blue-500", trend: "up" },
        { label: "Wind", value: "12", unit: "km/h", subValue: "-1km", icon: "air", iconColor: "text-slate-500", trend: "down" },
        { label: "Pressure", value: "1012", unit: "hPa", subValue: "0 hPa", icon: "compress", iconColor: "text-purple-500", trend: "neutral" },
        { label: "UV Index", value: "Moderate", subValue: "+1", icon: "wb_sunny", iconColor: "text-orange-500", trend: "up" },
    ];

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 pb-12">
            <main className="max-w-[1400px] mx-auto px-6 py-10">
                {/* Location Header */}
                <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-base">location_on</span>
                            <span className="text-sm font-black uppercase tracking-wider">Current Location</span>
                        </div>
                        <h1 className="mt-1 text-5xl font-black tracking-tight text-slate-900 nepali-font">काठमाडौं, नेपाल</h1>
                        <p className="mt-2 text-sm text-slate-500 font-semibold uppercase tracking-wide">Monday, 24 May • Last updated 10:42 AM</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all active:scale-95">
                            <span className="material-symbols-outlined mr-2 text-sm">refresh</span> Refresh
                        </button>
                        <button className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-xl hover:bg-primary/95 transition-all active:scale-95">
                            <span className="material-symbols-outlined mr-2 text-sm">map</span> Open Map
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                    {/* Left & Center: Current Weather & Metrics */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Main Temperature Card */}
                        <div className="overflow-hidden rounded-3xl bg-white p-10 shadow-xl ring-1 ring-slate-200 transition-all hover:shadow-2xl">
                            <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
                                <div className="text-center md:text-left">
                                    <div className="flex items-start justify-center md:justify-start">
                                        <span className="text-9xl font-black tracking-tighter text-slate-900 md:text-[160px]">24</span>
                                        <span className="mt-8 text-5xl font-bold text-slate-300">°C</span>
                                    </div>
                                    <p className="mt-4 text-3xl font-bold text-slate-600 nepali-font">आंशिक बदली</p>
                                    <div className="mt-6 flex gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5 hover:text-orange-600 transition-colors">
                                            <span className="material-symbols-outlined text-sm text-orange-500 font-black">arrow_upward</span> H: 28°
                                        </span>
                                        <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                                            <span className="material-symbols-outlined text-sm text-blue-500 font-black">arrow_downward</span> L: 19°
                                        </span>
                                    </div>
                                </div>
                                <div className="relative h-64 w-64 md:h-80 md:w-80">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10 animate-pulse">
                                        <span className="material-symbols-outlined text-[240px] text-orange-400">light_mode</span>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center drop-shadow-2xl">
                                        <span className="material-symbols-outlined text-[140px] text-slate-400 md:text-[180px]">cloud</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            {metrics.map((metric, i) => (
                                <div key={i} className="group rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200 transition-all hover:shadow-xl hover:-translate-y-1">
                                    <div className="flex items-center gap-3 text-slate-400 transition-colors group-hover:text-primary">
                                        <span className={`material-symbols-outlined ${metric.iconColor}`}>{metric.icon}</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{metric.label}</span>
                                    </div>
                                    <div className="mt-4 flex items-end justify-between">
                                        <span className="text-2xl font-black text-slate-900">
                                            {metric.value}
                                            {metric.unit && <span className="text-xs font-bold text-slate-300 ml-1 uppercase">{metric.unit}</span>}
                                        </span>
                                        <span className={`text-xs font-black ${metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
                                            {metric.subValue}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Hourly Graph */}
                        <div className="rounded-3xl bg-white p-8 shadow-md ring-1 ring-slate-200">
                            <div className="mb-8 flex items-center justify-between">
                                <h3 className="text-lg font-black text-slate-900 nepali-font">प्रति घण्टा तापक्रम</h3>
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span className="h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-primary/20"></span> Temp
                                    </span>
                                    <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span className="h-2.5 w-2.5 rounded-full bg-slate-200"></span> Rain
                                    </span>
                                </div>
                            </div>
                            <div className="relative h-48 w-full">
                                <div className="absolute inset-0 flex items-end justify-between px-4">
                                    {[
                                        { h: "h-[35%]", lab: "12 PM" },
                                        { h: "h-[50%]", lab: "2 PM" },
                                        { h: "h-[100%]", lab: "Now", main: true },
                                        { h: "h-[45%]", lab: "6 PM" },
                                        { h: "h-[30%]", lab: "8 PM" },
                                        { h: "h-[20%]", lab: "10 PM" }
                                    ].map((bar, i) => (
                                        <div key={i} className="flex flex-col items-center gap-4 group cursor-pointer h-full justify-end">
                                            <div className={`w-4 rounded-t-full transition-all duration-500 ${bar.main ? 'bg-primary shadow-lg' : 'bg-slate-100 group-hover:bg-slate-200'} ${bar.h}`}></div>
                                            <span className={`text-[10px] font-black uppercase tracking-tighter ${bar.main ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                                {bar.lab}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: 7-Day Forecast & Sun/Moon */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* 7-Day Forecast */}
                        <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200 h-fit">
                            <h3 className="mb-8 flex items-center gap-3 text-lg font-black text-slate-900 nepali-font">
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-xl">calendar_month</span>
                                साताको पूर्वानुमान
                            </h3>
                            <div className="space-y-6">
                                {forecast.map((day, i) => (
                                    <div key={i} className="group flex items-center justify-between py-2 transition-all hover:px-2 hover:bg-slate-50 rounded-xl cursor-default">
                                        <span className="w-12 text-sm font-black text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">{day.day}</span>
                                        <div className="flex flex-1 items-center justify-center gap-3">
                                            <span className={`material-symbols-outlined ${day.color} text-2xl drop-shadow-sm`}>{day.icon}</span>
                                            <span className="text-xs font-black text-slate-500 uppercase tracking-[0.1em] group-hover:text-slate-700 transition-colors">{day.condition}</span>
                                        </div>
                                        <div className="flex w-24 items-center justify-end gap-4">
                                            <span className="text-base font-black text-slate-900">{day.high}°</span>
                                            <span className="text-sm font-bold text-slate-300 group-hover:text-slate-400 transition-colors">{day.low}°</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-10 w-full rounded-2xl bg-slate-50 py-4 text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-slate-100 hover:text-primary transition-all border border-slate-100">
                                विस्तृत पूर्वानुमान हेर्नुहोस्
                            </button>
                        </div>

                        {/* Sun & Moon Info */}
                        <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 shadow-2xl transition-all hover:shadow-primary/20">
                            <h3 className="mb-8 font-black text-white/50 text-xs uppercase tracking-[0.2em]">सुर्योदय र सुर्यास्त</h3>
                            <div className="grid grid-cols-2 gap-6 relative z-10">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 ring-1 ring-orange-500/30">
                                        <span className="material-symbols-outlined text-orange-500 text-xl font-black">sunny</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Sunrise</p>
                                        <p className="text-lg font-black text-white whitespace-nowrap">5:12 AM</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 ring-1 ring-indigo-500/30">
                                        <span className="material-symbols-outlined text-indigo-400 text-xl font-black">wb_twilight</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Sunset</p>
                                        <p className="text-lg font-black text-white whitespace-nowrap">6:45 PM</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
                        </div>
                    </div>
                </div>

                {/* Search Sidebar/Footer */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4 opacity-50">
                        <span className="material-symbols-outlined text-base">verified</span>
                        <p className="text-xs font-bold uppercase tracking-widest nepali-font">डाटा २ मिनेट अघि अपडेट गरिएको</p>
                    </div>
                    <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                        <a className="hover:text-primary transition-colors" href="#">API Access</a>
                    </div>
                </div>
            </main>
        </div>
    );
}
