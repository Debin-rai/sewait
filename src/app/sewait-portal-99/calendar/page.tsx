"use client";

import React, { useState, useEffect } from "react";
import Papa from "papaparse";

export default function CalendarManagementPage() {
    const [loading, setLoading] = useState(false);
    const [days, setDays] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<string>("");
    const [formData, setFormData] = useState({
        bsDate: "",
        adDate: "",
        tithi: "",
        name: "",
        type: "FESTIVAL",
        isPublicHoliday: false
    });

    useEffect(() => {
        fetchCalendar();
    }, []);

    const fetchCalendar = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/calendar");
            const data = await res.json();
            if (Array.isArray(data)) {
                setDays(data);
            }
        } catch (error) {
            console.error("Failed to fetch calendar", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/calendar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsModalOpen(false);
                fetchCalendar();
                setFormData({ bsDate: "", adDate: "", tithi: "", name: "", type: "FESTIVAL", isPublicHoliday: false });
            }
        } catch (error) {
            console.error("Event creation failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setUploadStatus("Parsing file...");

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                setUploadStatus("Uploading data...");
                try {
                    // Start transforming data to match our schema
                    const bulkData = results.data.map((row: any) => {
                        return {
                            bsDate: row.bs_date,
                            adDate: row.ad_date,
                            tithi: row.tithi,
                            sunrise: row.sunrise,
                            events: row.event_name ? [{
                                name: row.event_name,
                                type: row.event_type || "FESTIVAL",
                                description: row.event_desc,
                                isPublicHoliday: row.is_holiday === "yes" || row.is_holiday === "true" || row.is_holiday === true
                            }] : []
                        };
                    });

                    // Remove invalid rows
                    const validData = bulkData.filter((d: any) => d.bsDate && d.adDate);

                    const res = await fetch("/api/admin/calendar/bulk-upload", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(validData),
                    });

                    if (res.ok) {
                        const responseData = await res.json();
                        setUploadStatus(`Success! Processed ${responseData.count} days.`);
                        setTimeout(() => {
                            setIsBulkModalOpen(false);
                            setUploadStatus("");
                            fetchCalendar();
                        }, 2000);
                    } else {
                        const err = await res.json();
                        setUploadStatus(`Error: ${err.error}`);
                    }
                } catch (error) {
                    console.error("Bulk upload failed", error);
                    setUploadStatus("Failed to process upload.");
                } finally {
                    setLoading(false);
                }
            },
            error: (error) => {
                console.error("CSV Parse Error", error);
                setUploadStatus("Failed to parse CSV file.");
                setLoading(false);
            }
        });
    };

    const upcomingEvents = days.flatMap(d => d.events.map((e: any) => ({ ...e, bsDate: d.bsDate }))).slice(0, 10);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-slate-800 dark:text-slate-100">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight">Calendar Manager</h2>
                    <p className="text-slate-500 font-medium">Synchronize Nepali BS dates with festivals and public holidays.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsBulkModalOpen(true)}
                        className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-xl">upload_file</span>
                        Bulk Upload
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black text-sm shadow-xl shadow-primary/20 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-xl">add_box</span>
                        Register Event
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Calendar Board */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black">Monthly Overview</h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">Live Sync Active</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="py-2 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">{day}</div>
                        ))}
                        {days.map((day) => (
                            <div key={day.id} className="aspect-square bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl p-3 border border-transparent hover:border-primary/20 transition-all cursor-pointer group relative overflow-hidden">
                                <span className="text-sm font-black group-hover:text-primary transition-colors">{day.bsDate.split('-')[2]}</span>
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {day.events.slice(0, 3).map((e: any) => (
                                        <div key={e.id} className={`size-1.5 rounded-full ${e.isPublicHoliday ? 'bg-red-500' : 'bg-primary'}`}></div>
                                    ))}
                                </div>
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Event Feed */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                    <h3 className="text-xl font-black mb-6">Upcoming Feed</h3>
                    <div className="space-y-4">
                        {loading ? (
                            <p className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Updating Feed...</p>
                        ) : upcomingEvents.length === 0 ? (
                            <p className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest text-[10px]">No events registered</p>
                        ) : upcomingEvents.map((event) => (
                            <div key={event.id} className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${event.isPublicHoliday ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'}`}>
                                        {event.isPublicHoliday ? 'Holiday' : event.type}
                                    </span>
                                </div>
                                <h4 className="font-black text-slate-800 dark:text-white leading-tight">{event.name}</h4>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{event.bsDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Event Registry Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black">Register Calendar Event</h3>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Nepali Samvat Archive</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreateEvent} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">BS Date (YYYY-MM-DD)</label>
                                    <input required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm" placeholder="2081-01-01" value={formData.bsDate} onChange={e => setFormData({ ...formData, bsDate: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">AD Equivalent</label>
                                    <input type="date" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm" value={formData.adDate} onChange={e => setFormData({ ...formData, adDate: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Event Title (English/Nepali)</label>
                                <input required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm" placeholder="e.g. Nepali New Year" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="FESTIVAL">Festival</option>
                                        <option value="HOLIDAY">National Holiday</option>
                                        <option value="RITUAL">Local Ritual</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3 pt-6">
                                    <input type="checkbox" id="isPublicHoliday" checked={formData.isPublicHoliday} onChange={e => setFormData({ ...formData, isPublicHoliday: e.target.checked })} className="size-5 rounded border-slate-300 text-primary focus:ring-primary" />
                                    <label htmlFor="isPublicHoliday" className="text-xs font-black uppercase tracking-widest text-slate-400 cursor-pointer">Public Holiday</label>
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all">
                                {loading ? 'Processing...' : 'Register to Calendar'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Bulk Upload Modal */}
            {isBulkModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black">Bulk Upload Calendar</h3>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Upload CSV Data (Yearly)</p>
                            </div>
                            <button onClick={() => setIsBulkModalOpen(false)} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-800/30">
                                <span className="material-symbols-outlined text-4xl text-slate-400 mb-2">upload_file</span>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Click to upload CSV file</p>
                                <p className="text-xs text-slate-400 mt-1">Headers: bs_date, ad_date, tithi, event_name, event_type, is_holiday</p>
                                <input
                                    type="file"
                                    accept=".csv"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleBulkUpload}
                                />
                            </div>

                            {uploadStatus && (
                                <div className={`p-4 rounded-xl text-center text-sm font-bold ${uploadStatus.includes("Success") ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                                    {uploadStatus}
                                </div>
                            )}

                            {loading && <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-primary w-1/2 animate-progress"></div></div>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
