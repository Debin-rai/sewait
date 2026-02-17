"use client";

import React from "react";

const events = [
    { id: 1, title: "Lhosar", date: "Feb 10, 2024", type: "Public Holiday", status: "Upcoming", color: "bg-red-100 text-red-700" },
    { id: 2, title: "Basanta Panchami", date: "Feb 14, 2024", type: "Religious", status: "Upcoming", color: "bg-orange-100 text-orange-700" },
    { id: 3, title: "Democracy Day", date: "Feb 19, 2024", type: "Public Holiday", status: "Upcoming", color: "bg-red-100 text-red-700" },
    { id: 4, title: "Maha Shivaratri", date: "Mar 08, 2024", type: "Religious", status: "Scheduled", color: "bg-purple-100 text-purple-700" },
];

export default function CalendarManagementPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Calendar Management</h2>
                    <p className="text-slate-500 mt-1">Manage holidays, festivals, and important events for the app calendar.</p>
                </div>
                <button className="bg-primary text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold text-sm shadow-md hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-xl">add_event</span>
                    Add New Event
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calendar View Container */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">February 2024</h3>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"><span className="material-symbols-outlined">chevron_left</span></button>
                                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"><span className="material-symbols-outlined">chevron_right</span></button>
                            </div>
                        </div>

                        {/* Simple Calendar Grid Mockup */}
                        <div className="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="bg-slate-50 dark:bg-slate-800/50 py-3 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">{day}</div>
                            ))}
                            {Array.from({ length: 29 }).map((_, i) => {
                                const day = i + 1;
                                const isToday = day === 12;
                                const hasEvent = [10, 14, 19].includes(day);
                                return (
                                    <div key={i} className={`bg-white dark:bg-slate-900 aspect-square p-2 group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative`}>
                                        <span className={`text-sm font-bold ${isToday ? 'bg-primary text-white size-7 flex items-center justify-center rounded-full' : 'text-slate-700 dark:text-slate-300'}`}>{day}</span>
                                        {hasEvent && <div className="absolute bottom-2 left-1/2 -translate-x-1/2 size-1.5 rounded-full bg-primary shadow-sm shadow-primary/30"></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Events List Side Panel */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 h-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upcoming Events</h3>
                            <span className="text-primary dark:text-blue-400 text-xs font-bold uppercase tracking-wider">Sync API</span>
                        </div>
                        <div className="space-y-4">
                            {events.map(event => (
                                <div key={event.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/20 dark:hover:border-blue-400/20 transition-all group cursor-pointer bg-slate-50/50 dark:bg-slate-800/30">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${event.color}`}>{event.type}</span>
                                        <button className="text-slate-300 group-hover:text-slate-500"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                                    </div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{event.title}</h4>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                                        {event.date}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-400 text-sm font-bold hover:border-primary hover:text-primary transition-all">
                            View All Events
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
