"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

export default function CalendarClient() {
    const { language } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date()); // Current AD date for clock
    const [viewDate, setViewDate] = useState(new Date()); // Date to determine which month to show (AD)

    // Calendar Data State
    const [calendarData, setCalendarData] = useState<any>(null);
    const [bsYear, setBsYear] = useState(2081);
    const [bsMonth, setBsMonth] = useState(1); // 1-12

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Initial Load - Fetch current month data
    // Ideally we need a way to know "Today's BS Date" to invoke the API correctly.
    // For now, let's hardcode a start checking point or use a "today" API.
    // Since we don't have a specific "get today", we can rely on the API defaulting or
    // use a lightweight local converter just to get the current BS Month/Year to start.
    // However, since we haven't installed a client-side converter in this file yet (it's in node_modules),
    // let's fetch a specific starter month, e.g., 2081-01 (Baisakh) or try to fetch "current".
    // Let's implement a `useEffect` that fetches based on `bsYear` and `bsMonth`.

    useEffect(() => {
        fetchAccountData(bsYear, bsMonth);
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
    }

    const handleNextMonth = () => {
        if (bsMonth === 12) {
            setBsYear(prev => prev + 1);
            setBsMonth(1);
        } else {
            setBsMonth(prev => prev + 1);
        }
    };

    const handlePrevMonth = () => {
        if (bsMonth === 1) {
            setBsYear(prev => prev - 1);
            setBsMonth(12);
        } else {
            setBsMonth(prev => prev - 1);
        }
    };

    const days = [
        { en: "Sun", np: "आइत" }, { en: "Mon", np: "सोम" }, { en: "Tue", np: "मंगल" },
        { en: "Wed", np: "बुध" }, { en: "Thu", np: "बिही" }, { en: "Fri", np: "शुक्र" }, { en: "Sat", np: "शनि" }
    ];

    const toNepaliDigits = (num: number | string | undefined) => {
        if (num === undefined || num === null) return "";
        const str = num.toString();
        const mapping: Record<string, string> = {
            '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
            '5': '५', '6': '६', '7': '७', '8': '८', '9': '९'
        };
        return str.split('').map(char => mapping[char] || char).join('');
    };

    const nepaliMonths = [
        "बैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज",
        "कात्तिक", "मंसिर", "पुस", "माघ", "फागुन", "चैत"
    ];

    // Placeholder data for Panchang (Dynamic in real app or fetched)
    const panchangData = [
        { label: "तिथि", value: calendarData?.days?.find((d: any) => d.isToday)?.tithi || "पञ्चमी", icon: "dark_mode" },
        { label: "नक्षत्र", value: "चित्र", icon: "star" },
        { label: "योग", value: "शुभ", icon: "self_improvement" },
        { label: "करण", value: "बव", icon: "work" },
        { label: "राशि", value: "कुम्भ", icon: "stars" },
    ];

    const upcomingEvents = calendarData?.days
        ?.flatMap((d: any) => d.events.map((e: any) => ({ ...e, date: `day ${d.bsDay}` })))
        .slice(0, 5) || [];

    // Grid Construction
    // We need empty slots for startWeekday (0=Sun, 6=Sat)
    const startEmptySlots = calendarData ? Array(calendarData.startWeekday).fill(null) : [];
    const validDays = calendarData ? calendarData.days : [];
    const calendarGrid = [...startEmptySlots, ...validDays];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100 pb-12 font-sans">
            <main className="max-w-[1400px] mx-auto px-6 py-8">
                {/* Sub Header Stats */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-sans">
                            {language === 'np' ? `नेपाली पात्रो ${toNepaliDigits(bsYear)}` : `Nepali Calendar ${bsYear}`}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-medium font-sans">
                            {language === 'np' ? nepaliMonths[bsMonth - 1] : "Month " + bsMonth} | विक्रम सम्वत्
                        </p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="flex bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <button onClick={handlePrevMonth} className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            <span className="px-3 py-2 text-sm font-bold border-x border-slate-200 dark:border-slate-700 flex items-center min-w-[100px] justify-center">
                                {language === 'np' ? nepaliMonths[bsMonth - 1] : bsMonth}
                            </span>
                            <button onClick={handleNextMonth} className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                        <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 font-sans active:scale-95 transition-transform">
                            <span className="material-symbols-outlined text-primary">schedule</span>
                            {currentDate.toLocaleTimeString()}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Panchang */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-primary/5 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary font-bold">flare</span>
                                <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider text-xs font-sans">दैनिक पञ्चाङ्ग</h3>
                            </div>
                            <div className="p-0">
                                {panchangData.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <span className="text-sm text-slate-500 font-medium font-sans">{item.label}</span>
                                        <span className="text-sm text-slate-900 dark:text-white font-bold font-sans">{item.value}</span>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-5 border border-orange-100 shadow-sm">
                            <h4 className="font-bold mb-2 flex items-center gap-2 font-sans text-orange-800">
                                <span className="material-symbols-outlined text-orange-600">lightbulb</span>
                                के तपाईलाई थाहा छ?
                            </h4>
                            <p className="text-xs leading-relaxed text-slate-600 font-sans">
                                विक्रम सम्वत् (वि.सं.) पात्रो ग्रेगोरियन क्यालेन्डर (ई.सं.) भन्दा करिब ५६.७ वर्ष अगाडि छ। यसको स्थापना राजा विक्रमादित्यले गरेका थिए।
                            </p>
                        </div>
                    </div>

                    {/* Center Column: Calendar Grid */}
                    <div className="lg:col-span-6">
                        {loading ? (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center shadow-sm border border-slate-100 dark:border-slate-800">
                                <span className="material-symbols-outlined text-4xl animate-spin text-primary">sync</span>
                                <p className="mt-4 font-bold text-slate-400">Loading Calendar...</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col items-center mb-8 text-center">
                                    <span className="bg-orange-100 text-orange-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 font-sans">
                                        {nepaliMonths[bsMonth - 1]}
                                    </span>
                                    <h2 className="text-6xl font-black text-slate-800 dark:text-white mb-2 font-sans">
                                        {toNepaliDigits(bsYear)}
                                    </h2>
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                                    <div className="grid grid-cols-7 mb-6">
                                        {days.map((day, i) => (
                                            <div key={i} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest font-sans">
                                                {language === "np" ? day.np : day.en}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-2">
                                        {calendarGrid.map((day, i) => {
                                            if (!day) return <div key={`empty-${i}`} className="aspect-square"></div>;

                                            const isHoliday = day.isPublicHoliday;
                                            const isToday = false; // We need logic to compare with 'today' which is complex without current BS date known perfectly here. Can ignore for now or infer.

                                            return (
                                                <div
                                                    key={i}
                                                    className={`aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-200 font-sans relative
                                                border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 hover:shadow-sm cursor-pointer
                                                text-slate-800 dark:text-white
                                            `}
                                                >
                                                    <span className={`text-lg font-bold ${isHoliday ? "text-red-500" : ""}`}>
                                                        {toNepaliDigits(day.bsDay)}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400">
                                                        {new Date(day.adDate).getDate()}
                                                    </span>
                                                    {day.events.length > 0 && (
                                                        <div className="flex gap-0.5 mt-0.5">
                                                            {day.events.slice(0, 3).map((e: any, idx: number) => (
                                                                <div key={idx} className={`w-1 h-1 rounded-full ${e.isPublicHoliday ? 'bg-red-500' : 'bg-primary'}`}></div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Column: Upcoming Events */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 dark:text-white font-sans">आउँदै गरेका चाडपर्वहरु</h3>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800 min-h-[200px]">
                                {upcomingEvents.length === 0 ? (
                                    <div className="p-8 text-center text-slate-400 text-xs font-bold">कुनै कार्यक्रम छैन</div>
                                ) : (
                                    upcomingEvents.map((event: any, i: number) => (
                                        <div key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group cursor-pointer block">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors font-sans">{event.date}</span>
                                                {event.isPublicHoliday && (
                                                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 font-sans">विदा</span>
                                                )}
                                            </div>
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans group-hover:text-primary transition-colors">{event.name}</h4>
                                            <p className="text-xs text-slate-500 mt-1 font-sans">{event.description}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
