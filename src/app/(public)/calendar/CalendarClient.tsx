"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CalendarClient() {
    const { language, t } = useLanguage();
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const fetchWeather = async () => {
        // Mock weather data since we don't have the API key setup in this snippet context
        // In real app, this would call the API
        setLoading(false);
        setWeather({
            current: { temp: 24, condition: "Sunny", city: "Kathmandu" }
        });
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    // Placeholder data for Panchang (Dynamic in real app)
    const panchangData = [
        { label: "Tithi", value: "Panchami", icon: "dark_mode" },
        { label: "Nakshatra", value: "Rohini", icon: "star" },
        { label: "Yoga", value: "Shukla", icon: "self_improvement" },
        { label: "Karan", value: "Bava", icon: "work" },
        { label: "Sunrise", value: "05:45 AM", icon: "wb_sunny" },
        { label: "Sunset", value: "06:30 PM", icon: "wb_twilight" },
    ];

    const upcomingEvents = [
        { date: "Falgun 19", title: "Maha Shivaratri", desc: "Hindu festival celebrated annually in honour of the god Shiva.", holiday: true },
        { date: "Falgun 24", title: "Fagu Purnima (Holi)", desc: "The festival of colors, celebrating the arrival of spring.", holiday: true },
        { date: "Chaitra 12", title: "Ghode Jatra", desc: "Horse racing festival celebrated in Kathmandu Valley.", holiday: true },
        { date: "Chaitra 30", title: "Ram Navami", desc: "Celebration of the birth of Lord Rama.", holiday: true },
    ];

    const days = [
        { en: "Sun", np: "आइत" }, { en: "Mon", np: "सोम" }, { en: "Tue", np: "मंगल" },
        { en: "Wed", np: "बुध" }, { en: "Thu", np: "बिही" }, { en: "Fri", np: "शुक्र" }, { en: "Sat", np: "शनि" }
    ];

    // Generate Calendar Grid (Mock for visual)
    const calendarGrid = Array(35).fill(null).map((_, i) => {
        const day = i - 2; // Offset for starting day
        if (day < 1 || day > 30) return null;
        return {
            np: day,
            en: day + 14, // Roughly mapping to English date
            event: day === 19 ? "Shivaratri" : day === 24 ? "Holi" : null,
            isHoliday: day === 19 || day === 24
        };
    });

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 pb-12">
            <main className="max-w-[1400px] mx-auto px-6 py-8">
                {/* Sub Header Stats */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                    <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">calendar_month</span>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Current Month</p>
                                <h2 className="text-xl font-black text-slate-800 nepali-font">Falgun 2081</h2>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-slate-100"></div>
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                                <span className="material-symbols-outlined">wb_sunny</span>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Today's Tithi</p>
                                <h2 className="text-base font-bold text-slate-800 nepali-font">Shukla Panchami</h2>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
                        <span className="material-symbols-outlined text-primary">schedule</span>
                        {currentTime.toLocaleTimeString()}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Panchang */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="bg-slate-900 p-6 text-white text-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffffff_0%,_transparent_70%)]"></div>
                                <h3 className="relative z-10 text-lg font-bold">Daily Panchang</h3>
                                <p className="relative z-10 text-xs text-slate-400 mt-1">{new Date().toDateString()}</p>
                            </div>
                            <div className="p-4">
                                {panchangData.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-slate-300 text-lg">{item.icon}</span>
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{item.label}</span>
                                        </div>
                                        <span className="font-bold text-slate-800 text-sm">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 bg-slate-50 text-center">
                                <button className="text-xs font-bold text-primary hover:underline">View Full Panchang</button>
                            </div>
                        </div>

                        {/* Ad Slot */}
                        <div className="bg-slate-200 rounded-2xl h-[250px] flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                            Ad Space
                        </div>
                    </div>

                    {/* Center Column: Calendar Grid */}
                    <div className="lg:col-span-6">
                        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                            {/* Calendar Header */}
                            <div className="p-8 pb-0 flex items-center justify-between mb-6">
                                <button className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                                    <span className="material-symbols-outlined text-slate-400">chevron_left</span>
                                </button>
                                <div className="text-center">
                                    <h1 className="text-4xl font-black text-slate-900 nepali-font mb-1">फाल्गुन २०८१</h1>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Feb/Mar 2025</p>
                                </div>
                                <button className="size-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                            </div>

                            {/* Days Header */}
                            <div className="grid grid-cols-7 border-b border-slate-100">
                                {days.map((day, i) => (
                                    <div key={i} className={`py-4 text-center text-sm font-black ${i === 6 ? "text-red-500" : "text-slate-400"} uppercase tracking-wider`}>
                                        {language === "np" ? day.np : day.en}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Body */}
                            <div className="grid grid-cols-7 h-[500px]">
                                {calendarGrid.map((date, i) => (
                                    <div key={i} className={`border-r border-b border-slate-50 relative group transition-colors ${date ? "hover:bg-primary/5 cursor-pointer" : "bg-slate-50/30"}`}>
                                        {date && (
                                            <div className="h-full flex flex-col items-center justify-center p-2">
                                                <span className={`text-2xl font-black nepali-font ${date.isHoliday ? "text-red-500" : "text-slate-700"} group-hover:scale-110 transition-transform`}>
                                                    {date.np}
                                                </span>
                                                <span className="text-[10px] font-bold text-slate-400 mt-1">{date.en}</span>

                                                {date.event && (
                                                    <span className="absolute bottom-2 left-1 right-1 text-[9px] font-bold text-center leading-tight truncate px-1 text-primary">
                                                        {date.event}
                                                    </span>
                                                )}

                                                {/* Today Indicator */}
                                                {date.np === 14 && (
                                                    <span className="absolute top-2 right-2 size-2 bg-primary rounded-full animate-pulse"></span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Date Converter Widget */}
                        <div className="mt-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="size-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center">
                                    <span className="material-symbols-outlined">sync_alt</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">Date Converter</h3>
                                    <p className="text-xs text-slate-500">BS to AD / AD to BS</p>
                                </div>
                            </div>
                            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
                                Open Tool
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Upcoming Events */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">event</span>
                                    Upcoming
                                </h3>
                                <Link href="#" className="text-xs font-bold text-primary hover:underline">View All</Link>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {upcomingEvents.map((event, i) => (
                                    <div key={i} className="p-5 hover:bg-slate-50 transition-colors group cursor-default">
                                        <div className="flex items-start gap-4">
                                            <div className={`flex flex-col items-center justify-center bg-slate-50 w-12 h-12 rounded-xl border border-slate-100 ${event.holiday ? "text-red-500 bg-red-50/50 border-red-100" : "text-slate-600"}`}>
                                                <span className="text-xs font-bold uppercase">{event.date.split(" ")[0]}</span>
                                                <span className="text-lg font-black">{event.date.split(" ")[1]}</span>
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-sm ${event.holiday ? "text-red-500" : "text-slate-800"}`}>{event.title}</h4>
                                                <p className="text-xs text-slate-400 mt-1 leading-snug line-clamp-2">{event.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Real-time Sunrise/Sunset Widgets */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100 text-center">
                                <span className="material-symbols-outlined text-orange-400 mb-1">wb_twilight</span>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Sunrise</p>
                                <p className="text-sm font-black text-slate-700">06:45 AM</p>
                            </div>
                            <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 text-center">
                                <span className="material-symbols-outlined text-indigo-400 mb-1">dark_mode</span>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Sunset</p>
                                <p className="text-sm font-black text-slate-700">06:12 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trivia Section */}
                <div className="mt-12 bg-primary/5 rounded-3xl p-8 border border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <span className="material-symbols-outlined text-8xl text-primary">lightbulb</span>
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-2 inline-block">Did you know?</span>
                        <h3 className="text-xl font-bold text-primary mb-2">The Bikram Sambat (BS) Calendar</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Bikram Sambat is approximately 56.7 years ahead of the Gregorian calendar (AD). It adheres to the lunar cycle for religious festivals but uses the solar cycle for years and months.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
