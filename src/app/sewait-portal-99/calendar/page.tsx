"use client";

import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import NepaliDate from "nepali-date-converter";

export default function CalendarManagementPage() {
    const [loading, setLoading] = useState(false);
    const [daysData, setDaysData] = useState<any[]>([]);
    const [viewDate, setViewDate] = useState(new NepaliDate()); // Persistent navigation state

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeEvent, setActiveEvent] = useState<any>(null); // For editing

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

    const nepaliMonths = [
        "Baisakh", "Jestha", "Ashad", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"
    ];

    useEffect(() => {
        fetchCalendar();
    }, [viewDate]);

    const fetchCalendar = async () => {
        setLoading(true);
        try {
            const yearStr = viewDate.getYear();
            const monthStr = (viewDate.getMonth() + 1).toString().padStart(2, '0');
            const res = await fetch(`/api/sewait-portal-99/calendar?month=${yearStr}-${monthStr}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setDaysData(data);
            }
        } catch (error) {
            console.error("Failed to fetch calendar", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const method = activeEvent ? "PATCH" : "POST";
            const body = activeEvent ? { ...formData, id: activeEvent.id } : formData;

            const res = await fetch("/api/sewait-portal-99/calendar", {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setIsModalOpen(false);
                fetchCalendar();
                resetForm();
            }
        } catch (error) {
            console.error("Event operation failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEvent = async (id: string) => {
        if (!confirm("Are you sure you want to delete this event?")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/sewait-portal-99/calendar?id=${id}`, { method: "DELETE" });
            if (res.ok) fetchCalendar();
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ bsDate: "", adDate: "", tithi: "", name: "", type: "FESTIVAL", isPublicHoliday: false });
        setActiveEvent(null);
    };

    const handleDateClick = (bsDate: string) => {
        // Convert BS to AD for the input
        try {
            const [y, m, d] = bsDate.split('-').map(Number);
            const nep = new NepaliDate(y, m - 1, d);
            const ad = nep.toJsDate();
            setFormData({ ...formData, bsDate, adDate: ad.toISOString().split('T')[0] });
            setIsModalOpen(true);
        } catch (e) {
            console.error("Date conversion error", e);
        }
    };

    const handleEditClick = (event: any, bsDate: string) => {
        setFormData({
            bsDate: bsDate,
            adDate: "", // Not strictly needed for PATCH in current API but good practice
            tithi: "",
            name: event.name,
            type: event.type,
            isPublicHoliday: event.isPublicHoliday
        });
        setActiveEvent(event);
        setIsModalOpen(true);
    };

    const navigateMonth = (direction: number) => {
        const nextDate = new NepaliDate(viewDate.getYear(), viewDate.getMonth(), 1);
        nextDate.setMonth(viewDate.getMonth() + direction);
        setViewDate(nextDate);
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
                    const bulkData = results.data.map((row: any) => ({
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
                    }));

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
            }
        });
    };

    // Grid Generation Logic
    const generateGrid = () => {
        const year = viewDate.getYear();
        const month = viewDate.getMonth();
        const firstDayOfMonth = new NepaliDate(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)

        let daysInMonth = 29;
        for (let d = 29; d <= 32; d++) {
            try {
                const date = new NepaliDate(year, month, d);
                if (date.getMonth() === month) {
                    daysInMonth = d;
                } else {
                    break;
                }
            } catch (e) {
                break;
            }
        }

        const grid = [];
        // Padding for start of month
        for (let i = 0; i < firstDayOfMonth; i++) {
            grid.push({ padding: true });
        }

        // Actual days
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
            const dayInfo = daysData.find(day => day.bsDate === dateStr);
            grid.push({
                date: d,
                bsDate: dateStr,
                events: dayInfo?.events || [],
                dayId: dayInfo?.id
            });
        }

        return grid;
    };

    const gridDays = generateGrid();
    const upcomingEvents = daysData.flatMap(d => d.events.map((e: any) => ({ ...e, bsDate: d.bsDate }))).slice(0, 15);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 text-slate-800 dark:text-slate-100">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight">Calendar Manager</h2>
                    <p className="text-slate-500 font-medium">Manage festivals, holidays, and ritual dates.</p>
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
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="bg-[#1a355b] hover:bg-[#1a355b]/90 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black text-sm shadow-xl shadow-blue-900/20 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-xl">add_box</span>
                        New Event
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Calendar Board */}
                <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-[#1a355b] dark:text-white flex items-center gap-3">
                                {nepaliMonths[viewDate.getMonth()]} {viewDate.getYear()}
                                <span className="text-sm font-bold text-slate-400 dark:text-slate-500">BS</span>
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => navigateMonth(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button onClick={() => setViewDate(new NepaliDate())} className="px-4 py-2 text-xs font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 transition-colors">Today</button>
                            <button onClick={() => navigateMonth(1)} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 md:gap-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="py-2 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">{day}</div>
                        ))}
                        {gridDays.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => !item.padding && item.bsDate && handleDateClick(item.bsDate)}
                                className={`aspect-square rounded-2xl p-2 md:p-3 border transition-all cursor-pointer group relative overflow-hidden flex flex-col ${item.padding
                                    ? 'bg-transparent border-transparent cursor-default'
                                    : 'bg-slate-50/50 dark:bg-slate-800/30 border-transparent hover:border-[#1a355b]/20 hover:bg-white dark:hover:bg-slate-800 shadow-sm'
                                    }`}
                            >
                                {!item.padding && (
                                    <>
                                        <span className={`text-sm font-black transition-colors ${item.events.some((e: any) => e.isPublicHoliday) ? 'text-red-500' : 'group-hover:text-[#1a355b]'}`}>
                                            {item.date}
                                        </span>
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {item.events.map((e: any) => (
                                                <div
                                                    key={e.id}
                                                    title={e.name}
                                                    className={`size-1.5 md:size-2 rounded-full ${e.isPublicHoliday ? 'bg-red-500' : 'bg-blue-500'}`}
                                                ></div>
                                            ))}
                                        </div>
                                        {item.events.length > 0 && (
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="material-symbols-outlined text-[16px] text-[#1a355b]/50">edit</span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Event Feed */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col h-full max-h-[800px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black">Monthly Events</h3>
                        <span className="px-2 py-1 bg-[#1a355b]/10 text-[#1a355b] dark:text-blue-400 rounded text-[10px] font-black uppercase">{upcomingEvents.length}</span>
                    </div>

                    <div className="space-y-3 overflow-y-auto pr-2 flex-1 scrollbar-thin scrollbar-thumb-slate-200">
                        {loading ? (
                            <p className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Updating Feed...</p>
                        ) : upcomingEvents.length === 0 ? (
                            <p className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest text-[10px]">No events this month</p>
                        ) : upcomingEvents.map((event) => (
                            <div key={event.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${event.isPublicHoliday ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                                        {event.isPublicHoliday ? 'Holiday' : event.type}
                                    </span>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={(e) => { e.stopPropagation(); handleEditClick(event, event.bsDate); }} className="hover:text-blue-600 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); handleDeleteEvent(event.id); }} className="hover:text-red-600 transition-colors">
                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                                <h4 className="font-black text-sm text-slate-800 dark:text-white leading-tight">{event.name}</h4>
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
                                <h3 className="text-2xl font-black">{activeEvent ? "Edit Event" : "Register Event"}</h3>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Calendar Archive Manager</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSaveEvent} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">BS Date</label>
                                    <input required readonly={!!activeEvent} className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm" placeholder="2081-01-01" value={formData.bsDate} onChange={e => setFormData({ ...formData, bsDate: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">AD Equivalent</label>
                                    <input type="date" required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm" value={formData.adDate} onChange={e => setFormData({ ...formData, adDate: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Event Title</label>
                                <input required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm" placeholder="e.g. Nepali New Year" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category</label>
                                    <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl outline-none font-bold text-sm" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="FESTIVAL">Festival</option>
                                        <option value="HOLIDAY">National Holiday</option>
                                        <option value="RITUAL">Local Ritual</option>
                                        <option value="GOVERNMENT">Government</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-3 pt-6">
                                    <input type="checkbox" id="isPublicHoliday" checked={formData.isPublicHoliday} onChange={e => setFormData({ ...formData, isPublicHoliday: e.target.checked })} className="size-5 rounded border-slate-300 text-primary focus:ring-primary" />
                                    <label htmlFor="isPublicHoliday" className="text-xs font-black uppercase tracking-widest text-slate-400 cursor-pointer">Public Holiday</label>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                {activeEvent && (
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteEvent(activeEvent.id)}
                                        className="flex-1 py-4 border-2 border-red-500 text-red-500 rounded-2xl font-black uppercase tracking-widest hover:bg-red-50 transition-all"
                                    >
                                        Delete
                                    </button>
                                )}
                                <button type="submit" className="flex-[2] py-4 bg-[#1a355b] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-[#1a355b]/90 transition-all">
                                    {loading ? 'Processing...' : activeEvent ? 'Save Changes' : 'Register to Calendar'}
                                </button>
                            </div>
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
                            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-800/30 relative">
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
