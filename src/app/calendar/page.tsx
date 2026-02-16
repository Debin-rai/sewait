"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import Link from "next/link";

export default function CalendarPage() {
    const { language, t } = useLanguage();

    const panchangData = [
        { label: "Tithi", value: "Panchami" },
        { label: "Nakshatra", value: "Chitra" },
        { label: "Yoga", value: "Shubha" },
        { label: "Karana", value: "Bava" },
        { label: "Rashi", value: "Kumbha" },
    ];

    const upcomingEvents = [
        { date: "Falgun 19", title: "Maha Shivaratri", desc: "Hindu festival celebrated annually in honour of Lord Shiva.", holiday: true },
        { date: "Falgun 24", title: "Int'l Women's Day", desc: "Nari Diwas - Celebrating achievements of women.", holiday: false },
        { date: "Chaitra 3", title: "Fagu Purnima (Holi)", desc: "The festival of colors celebrated on the full moon day.", holiday: true },
    ];

    const days = [
        { np: "२७", en: "13", current: false },
        { np: "२८", en: "14", current: false },
        { np: "२९", en: "15", current: false },
        { np: "१", en: "13", current: true },
        { np: "२", en: "14", current: true },
        { np: "३", en: "15", current: true },
        { np: "४", en: "16", current: true, holiday: true },
        { np: "५", en: "17", current: true },
        { np: "६", en: "18", current: true },
        { np: "७", en: "19", current: true },
        { np: "८", en: "20", current: true },
        { np: "९", en: "21", current: true },
        { np: "१०", en: "22", current: true },
        { np: "११", en: "23", current: true, holiday: true },
        { np: "१२", en: "24", current: true },
        { np: "१३", en: "25", current: true },
        { np: "१५", en: "27", current: true, today: true },
        { np: "१६", en: "28", current: true },
    ];

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 pb-12">
            <main className="max-w-[1400px] mx-auto px-6 py-8">
                {/* Sub Header Stats */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-4xl font-black text-primary tracking-tight nepali-font">Nepali Calendar 2080</h2>
                        <p className="text-slate-500 font-bold mt-1 nepali-font">Phagun - Chaitra | Bikram Sambat</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all transition-colors nepali-font">
                            <span className="material-symbols-outlined text-primary">event_note</span>
                            Today: 15 Phagun
                        </button>
                        <button className="bg-primary text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-all nepali-font">
                            Add Event
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Panchang */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-primary/5 p-5 border-b border-slate-50 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary font-bold">flare</span>
                                <h3 className="font-bold text-primary uppercase tracking-wider text-xs nepali-font">Daily Panchang</h3>
                            </div>
                            <div className="p-0">
                                {panchangData.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-6 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <span className="text-sm text-slate-500 font-bold nepali-font">{item.label}</span>
                                        <span className="text-sm text-primary font-black nepali-font">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-slate-50 p-6 border-t border-slate-50">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest nepali-font">Auspicious Time</span>
                                </div>
                                <p className="text-xl font-black text-primary nepali-font">11:45 AM - 12:30 PM</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/10 text-8xl pointer-events-none group-hover:scale-110 transition-transform">lightbulb</span>
                            <div className="relative z-10">
                                <h4 className="font-black mb-4 flex items-center gap-2 text-sm uppercase tracking-widest nepali-font">
                                    <span className="material-symbols-outlined text-accent-amber">lightbulb</span>
                                    Did you know?
                                </h4>
                                <p className="text-sm leading-relaxed text-slate-100 font-medium nepali-font">
                                    The Bikram Sambat (B.S.) calendar is approximately 56.7 years ahead of the Gregorian Calendar (A.D.). It was founded by King Bikramaditya.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Center Column: Calendar Grid */}
                    <div className="lg:col-span-6">
                        <div className="flex flex-col items-center mb-10 text-center">
                            <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 shadow-sm shadow-orange-100/50 nepali-font">आज : TODAY</span>
                            <h2 className="text-7xl font-black text-slate-900 mb-2 nepali-font leading-tight">१५ फागुन २०८०</h2>
                            <p className="text-slate-500 font-black text-lg tracking-tight nepali-font">Tuesday, 27 February 2024</p>
                        </div>

                        <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-50">
                            <div className="grid grid-cols-7 mb-8 border-b border-slate-50 pb-6">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                    <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest nepali-font">{day}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-4">
                                {days.map((day, idx) => (
                                    <div
                                        key={idx}
                                        className={`aspect-square flex flex-col items-center justify-center rounded-2xl transition-all cursor-pointer group ${day.today
                                            ? 'bg-primary text-white shadow-xl shadow-primary/30 -translate-y-1 scale-110 z-10'
                                            : !day.current
                                                ? 'text-slate-200'
                                                : 'border border-slate-50 hover:bg-slate-50 hover:border-primary/20'
                                            }`}
                                    >
                                        <span className={`text-2xl font-black nepali-font ${day.holiday && !day.today ? 'text-red-500' : ''} ${day.today ? 'text-white' : ''}`}>
                                            {day.np}
                                        </span>
                                        {day.en && (
                                            <span className={`text-[10px] font-bold mt-1 ${day.today ? 'opacity-80' : 'text-slate-400'}`}>
                                                {day.en}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-white rounded-2xl p-6 flex items-center gap-5 shadow-sm border border-slate-50 hover:shadow-md transition-shadow min-w-0">
                                <div className="bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-orange-500 text-2xl">wb_sunny</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 nepali-font truncate">Sunrise</p>
                                    <p className="text-xl font-black text-primary nepali-font truncate">06:42 AM</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 flex items-center gap-5 shadow-sm border border-slate-50 hover:shadow-md transition-shadow min-w-0">
                                <div className="bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-orange-500 text-2xl">wb_twilight</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 nepali-font truncate">Sunset</p>
                                    <p className="text-xl font-black text-primary nepali-font truncate">06:12 PM</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 flex items-center gap-5 shadow-sm border border-slate-50 hover:shadow-md transition-shadow min-w-0">
                                <div className="bg-orange-50 w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-orange-500 text-2xl">stars</span>
                                </div>
                                <div className="min-w-0 overflow-hidden">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 nepali-font truncate">Tithi / Pakshya</p>
                                    <p className="text-[11px] font-black text-primary nepali-font leading-tight line-clamp-2">Magh Shukla Pakshya, Panchami</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Upcoming Events */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                                <h3 className="font-black text-primary text-sm nepali-font">Upcoming Events</h3>
                                <span className="text-[10px] font-black bg-primary text-white px-3 py-1 rounded-full uppercase tracking-widest nepali-font">Falgun</span>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {upcomingEvents.map((event, idx) => (
                                    <div key={idx} className="p-6 hover:bg-slate-50 transition-colors group cursor-pointer">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-xs font-black text-slate-400 group-hover:text-primary transition-colors nepali-font">{event.date}</span>
                                            {event.holiday && (
                                                <span className="text-[9px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-100 uppercase tracking-widest nepali-font">Public Holiday</span>
                                            )}
                                        </div>
                                        <h4 className="text-sm font-black text-primary leading-snug group-hover:text-primary-light transition-colors nepali-font">{event.title}</h4>
                                        <p className="text-xs text-slate-500 mt-2 leading-relaxed font-bold nepali-font">{event.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-5 text-[10px] font-black text-primary hover:bg-primary/5 transition-colors border-t border-slate-50 uppercase tracking-widest nepali-font">
                                View All Events
                            </button>
                        </div>

                        {/* Weather Snapshot */}
                        <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                            <div className="bg-slate-100 p-4 rounded-xl group-hover:bg-primary transition-colors">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-white transition-colors">cloud</span>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest nepali-font">Weather - Kathmandu</p>
                                <p className="text-sm font-black text-primary nepali-font">18°C / 4°C · Sunny</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Trivia Section */}
                <section className="mt-20 bg-white rounded-[3rem] border border-slate-50 p-12 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -mr-40 -mt-40 transition-transform group-hover:scale-125"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center relative z-10">
                        <div className="col-span-1 border-l-8 border-primary pl-8">
                            <h3 className="text-4xl font-black text-primary mb-3 italic tracking-tighter nepali-font">Calendar Trivia</h3>
                            <div className="h-1.5 w-20 bg-accent-amber rounded-full"></div>
                        </div>
                        <div className="col-span-2">
                            <p className="text-slate-600 leading-relaxed font-bold text-lg nepali-font">
                                Did you know that Nepal uses the Bikram Sambat system as its official calendar? While most of the world operates on the Gregorian calendar, Nepal's lunar-solar calendar features 12 months with the number of days in each month ranging from 29 to 32, determined by astrological calculations. The new year begins in mid-April (Baisakh 1st).
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
