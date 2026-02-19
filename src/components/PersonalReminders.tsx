"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle, Bell } from "lucide-react";
import { getCookie, setCookie } from "@/lib/cookies";

interface Reminder {
    id: string;
    text: string;
    completed: boolean;
}

export default function PersonalReminders() {
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [input, setInput] = useState("");

    // Load from cookies on mount
    useEffect(() => {
        const saved = getCookie('sewait_reminders');
        if (saved) {
            try {
                setReminders(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse reminders", e);
            }
        }
    }, []);

    // Save to cookies on change
    useEffect(() => {
        setCookie('sewait_reminders', JSON.stringify(reminders), 30);
    }, [reminders]);

    const addReminder = () => {
        if (!input.trim()) return;
        const newReminder = {
            id: crypto.randomUUID(),
            text: input.trim(),
            completed: false
        };
        setReminders([...reminders, newReminder]);
        setInput("");
    };

    const toggleReminder = (id: string) => {
        setReminders(reminders.map(r =>
            r.id === id ? { ...r, completed: !r.completed } : r
        ));
    };

    const deleteReminder = (id: string) => {
        setReminders(reminders.filter(r => r.id !== id));
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] h-full transition-all hover:shadow-xl">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary animate-pulse">
                        <Bell className="size-6" />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-900 dark:text-white tracking-tight">Daily Reminders</h3>
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mt-1">
                            Your Companion <span className="nepali-font font-medium ml-1">तपाईंको डिजिटल सहायक</span>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">Encrypted Local</span>
                </div>
            </div>

            <div className="flex gap-3 mb-8">
                <input
                    id="reminder-input"
                    name="reminder"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addReminder()}
                    placeholder="Pay Internet Bill... इन्टरनेट बिल तिर्नुहोस्"
                    className="flex-1 bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/20 rounded-2xl px-5 py-4 text-sm font-medium outline-none transition-all placeholder:text-slate-400 dark:text-white"
                    aria-label="New reminder text"
                />
                <button
                    onClick={addReminder}
                    className="bg-primary hover:bg-primary/90 text-white p-4 rounded-2xl transition-all active:scale-90 shadow-xl shadow-primary/30"
                >
                    <Plus size={24} strokeWidth={3} />
                </button>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {reminders.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-400 font-bold mb-1">No reminders yet. <span className="nepali-font">कुनै रिमाइन्डर छैन।</span></p>
                        <p className="text-[10px] text-slate-300 uppercase tracking-widest font-black">Plan your day perfectly</p>
                    </div>
                ) : (
                    reminders.map((r) => (
                        <div
                            key={r.id}
                            className={`flex items-center gap-4 p-5 rounded-3xl border transition-all duration-300 group ${r.completed
                                ? 'bg-slate-50/30 dark:bg-slate-800/20 border-transparent opacity-50'
                                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:shadow-lg'
                                }`}
                        >
                            <button
                                onClick={() => toggleReminder(r.id)}
                                className={`shrink-0 transition-all duration-500 scale-110 ${r.completed ? 'text-primary' : 'text-slate-300 hover:text-primary'}`}
                            >
                                {r.completed ? <CheckCircle2 size={24} fill="currentColor" className="text-white" /> : <Circle size={24} />}
                            </button>
                            <span className={`flex-1 text-sm font-bold dark:text-slate-200 truncate ${r.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                                {r.text}
                            </span>
                            <button
                                onClick={() => deleteReminder(r.id)}
                                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all scale-110"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] leading-relaxed">
                    Private & Secure Cookie Persistence <br />
                    <span className="text-primary/30">Your data never leaves your browser</span>
                </p>
            </div>
        </div>
    );
}
