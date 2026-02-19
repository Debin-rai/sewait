"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import NepaliDate from "nepali-date-converter";
import AdSlot from "@/components/ads/AdSlot";

export default function CalendarClient() {
    const { language } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date());

    // Calendar Data State
    const initialBs = new NepaliDate();
    const [calendarData, setCalendarData] = useState<any>(null);
    const [bsYear, setBsYear] = useState(initialBs.getYear());
    const [bsMonth, setBsMonth] = useState(initialBs.getMonth() + 1); // 1-12
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        fetchAccountData(bsYear, bsMonth);
        fetchWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bsYear, bsMonth]);

    const fetchAccountData = async (year: number, month: number) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/calendar/month?year=${year}&month=${month}`);
            if (res.ok) {
                const data = await res.json();
                setCalendarData(data);
            }
        } catch (error) {
            console.error("Failed to fetch calendar data", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeather = async () => {
        try {
            const res = await fetch("/api/weather?lat=27.7172&lon=85.3240");
            if (res.ok) {
                const data = await res.json();
                setWeather(data);
            }
        } catch (error) {
            console.error("Failed to fetch weather", error);
        }
    };

    const handleNextMonth = () => {
        if (bsMonth === 12) {
            setBsYear((prev) => prev + 1);
            setBsMonth(1);
        } else {
            setBsMonth((prev) => prev + 1);
        }
    };

    const handlePrevMonth = () => {
        if (bsMonth === 1) {
            setBsYear((prev) => prev - 1);
            setBsMonth(12);
        } else {
            setBsMonth((prev) => prev - 1);
        }
    };

    const days = [
        { en: "Sun", np: "आइत" },
        { en: "Mon", np: "सोम" },
        { en: "Tue", np: "मंगल" },
        { en: "Wed", np: "बुध" },
        { en: "Thu", np: "बिही" },
        { en: "Fri", np: "शुक्र" },
        { en: "Sat", np: "शनि" },
    ];

    const toNepaliDigits = (num: number | string | undefined) => {
        if (num === undefined || num === null) return "";
        const str = num.toString();
        const mapping: Record<string, string> = {
            "0": "०", "1": "१", "2": "२", "3": "३", "4": "४",
            "5": "५", "6": "६", "7": "७", "8": "८", "9": "९",
        };
        return str.split("").map((char) => mapping[char] || char).join("");
    };

    const nepaliMonths = [
        "बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज",
        "कात्तिक", "मंसिर", "पुस", "माघ", "फागुन", "चैत",
    ];

    const formatTime = (timestamp: number) => {
        if (!timestamp) return "--:--";
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const todayDay = calendarData?.days?.find((d: any) => {
        const todayStr = new Date().toISOString().split("T")[0];
        return d.adDate.split("T")[0] === todayStr;
    });

    const panchangData = [
        { label: "तिथि", value: todayDay?.tithi || "पञ्चमी", icon: "dark_mode" },
        { label: "नक्षत्र", value: "चित्र", icon: "star" },
        { label: "योग", value: "शुभ", icon: "self_improvement" },
        { label: "करण", value: "बव", icon: "work" },
        { label: "राशि", value: "कुम्भ", icon: "stars" },
    ];

    const upcomingEvents = calendarData?.days
        ?.flatMap((d: any) => d.events.map((e: any) => ({ ...e, bsDay: d.bsDay, bsMonth: bsMonth })))
        .slice(0, 5) || [];

    const startEmptySlots = calendarData ? Array(calendarData.startWeekday).fill(null) : [];
    const validDays = calendarData ? calendarData.days : [];
    const calendarGrid = [...startEmptySlots, ...validDays];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 pb-12 font-sans">
            <main className="max-w-[1400px] mx-auto px-6 py-8">
                {/* CALENDAR_TOP Ad Slot */}
                <AdSlot position="CALENDAR_TOP" className="mb-8 aspect-[6/1] w-full" />

                {/* Header Section */}
                <FadeIn direction="down" delay={0.1}>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                {language === "np" ? `नेपाली पात्रो ${toNepaliDigits(bsYear)}` : `Nepali Calendar ${bsYear}`}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                {language === "np" ? `${nepaliMonths[bsMonth - 1]} - ${nepaliMonths[bsMonth % 12]}` : "Month View"} | विक्रम सम्वत्
                            </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <div className="flex items-center bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                                <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                <span className="px-4 py-2 text-sm font-bold border-x border-slate-200 dark:border-slate-700 min-w-[120px] text-center">
                                    {language === "np" ? nepaliMonths[bsMonth - 1] : nepaliMonths[bsMonth - 1]} {toNepaliDigits(bsYear)}
                                </span>
                                <button onClick={handleNextMonth} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                                </button>
                            </div>
                            <button className="hidden sm:flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-bold items-center gap-2 shadow-sm hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-primary">event_note</span>
                                {language === "np" ? `आज: ${toNepaliDigits(todayDay?.bsDay)} ${nepaliMonths[bsMonth - 1]}` : `Today: ${todayDay?.bsDay || '--'} ${nepaliMonths[bsMonth - 1]}`}
                            </button>
                            <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
                                {language === "np" ? "कार्यक्रम थप्नुहोस्" : "Add Event"}
                            </button>
                        </div>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Panchang */}
                    <div className="lg:col-span-3 space-y-6">
                        <FadeIn direction="left" delay={0.2}>
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                                <div className="bg-primary/5 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary font-bold">flare</span>
                                    <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs">DAILY PANCHANG</h3>
                                </div>
                                <div className="p-0">
                                    {panchangData.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50 transition-colors">
                                            <span className="text-sm text-slate-500 font-medium">{item.label}</span>
                                            <span className="text-sm text-slate-900 dark:text-white font-bold">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-200 dark:border-slate-800">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                                        <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Auspicious Time</span>
                                    </div>
                                    <p className="text-lg font-bold text-primary">11:45 AM - 12:30 PM</p>
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn direction="left" delay={0.3}>
                            <div className="bg-[#1a355b] rounded-xl p-5 text-white shadow-xl">
                                <h4 className="font-bold mb-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined">lightbulb</span>
                                    Did you know?
                                </h4>
                                <p className="text-xs leading-relaxed text-slate-200">
                                    The Bikram Sambat (B.S.) calendar is approximately 56.7 years ahead of the Gregorian Calendar (A.D.). It was founded by King Bikramaditya.
                                </p>
                            </div>
                        </FadeIn>

                        <AdSlot position="CALENDAR_SIDEBAR" className="aspect-square w-full" />
                    </div>

                    {/* Center Column: Calendar Grid */}
                    <div className="lg:col-span-6">
                        <FadeIn direction="up" delay={0.2}>
                            <div className="flex flex-col items-center mb-8 text-center">
                                <span className="bg-orange-100 text-[#f97316] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                                    आज : TODAY
                                </span>
                                <h2 className="text-6xl font-black text-slate-800 dark:text-white mb-2">
                                    {todayDay ? `${toNepaliDigits(todayDay.bsDay)} ${nepaliMonths[bsMonth - 1]}` : nepaliMonths[bsMonth - 1]} {toNepaliDigits(bsYear)}
                                </h2>
                                <p className="text-slate-500 font-semibold italic">
                                    {currentDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                                <div className="grid grid-cols-7 mb-6">
                                    {days.map((day, i) => (
                                        <div key={i} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            {day.en}
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {calendarGrid.map((day, i) => {
                                        if (!day) return <div key={`empty-${i}`} className="aspect-square"></div>;

                                        const isToday = day.bsDate === todayDay?.bsDate;
                                        const isHoliday = day.isPublicHoliday;

                                        return (
                                            <div
                                                key={i}
                                                className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-200 relative border
                                                    ${isToday ? "bg-[#f97316] text-white shadow-lg shadow-orange-500/30 border-transparent" : "bg-white dark:bg-slate-900 border-slate-50 dark:border-slate-800 hover:border-primary/20 hover:scale-105"}
                                                `}
                                            >
                                                <span className={`text-lg font-bold ${isHoliday && !isToday ? "text-red-500" : ""}`}>
                                                    {toNepaliDigits(day.bsDay)}
                                                </span>
                                                <span className={`text-[10px] ${isToday ? "text-white/80" : "text-slate-400"}`}>
                                                    {new Date(day.adDate).getDate()}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Weather & Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-slate-800">
                                    <div className="bg-orange-50 p-3 rounded-xl">
                                        <span className="material-symbols-outlined text-[#f97316]">wb_sunny</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sunrise</p>
                                        <p className="text-lg font-black text-slate-800 dark:text-white uppercase">{weather ? formatTime(weather.current.sunrise) : "06:42 AM"}</p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-slate-800">
                                    <div className="bg-orange-50 p-3 rounded-xl">
                                        <span className="material-symbols-outlined text-[#f97316]">wb_twilight</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sunset</p>
                                        <p className="text-lg font-black text-slate-800 dark:text-white uppercase">{weather ? formatTime(weather.current.sunset) : "06:12 PM"}</p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 dark:border-slate-800">
                                    <div className="bg-orange-50 p-3 rounded-xl">
                                        <span className="material-symbols-outlined text-[#f97316]">stars</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tithi / Pakshya</p>
                                        <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{todayDay?.tithi || "Panchami"}</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right Column: Upcoming Events */}
                    <div className="lg:col-span-3">
                        <FadeIn direction="right" delay={0.2}>
                            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <h3 className="font-bold text-slate-800 dark:text-white">Upcoming Events</h3>
                                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">
                                        {language === "np" ? nepaliMonths[bsMonth - 1] : "Events"}
                                    </span>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {upcomingEvents.length === 0 ? (
                                        <div className="p-8 text-center text-slate-400 text-xs font-bold italic">No events found</div>
                                    ) : (
                                        upcomingEvents.map((event: any, i: number) => (
                                            <div key={i} className="p-4 hover:bg-slate-50 transition-colors group">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">
                                                        {nepaliMonths[event.bsMonth - 1]} {toNepaliDigits(event.bsDay)}
                                                    </span>
                                                    {event.isPublicHoliday && (
                                                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">Holiday</span>
                                                    )}
                                                </div>
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{event.name}</h4>
                                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{event.description}</p>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <button className="w-full py-3 text-[10px] font-bold text-primary hover:bg-primary/5 transition-colors border-t border-slate-100 dark:border-slate-800 uppercase tracking-widest">
                                    View All Events
                                </button>
                            </div>

                            <div className="mt-6 bg-[#f8fafc] dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-slate-400">cloud</span>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Weather - Kathmandu</p>
                                        <p className="text-sm font-black text-slate-800 dark:text-white">
                                            {weather ? `${weather.current.temp}°C · ${weather.current.condition}` : "Loading..."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>

                {/* Trivia Section */}
                <FadeIn direction="up" delay={0.4}>
                    <section className="mt-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                            <div className="col-span-1">
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 italic tracking-tighter uppercase">Calendar Trivia</h3>
                                <div className="h-1 w-12 bg-primary rounded-full"></div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    Did you know that Nepal uses the Bikram Sambat system as its official calendar? While most of the world operates on the Gregorian calendar, Nepal's lunar-solar calendar features 12 months with the number of days in each month ranging from 29 to 32, determined by astrological calculations. The new year begins in mid-April (Baisakh 1st).
                                </p>
                            </div>
                        </div>
                    </section>
                </FadeIn>
            </main>
        </div>
    );
}
