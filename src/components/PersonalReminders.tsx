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
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Bell className="size-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Daily Reminders</h3>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Personal Tasks <span className="nepali-font">व्यक्तिगत कार्यहरू</span></p>
                    </div>
                </div>
                <span className="text-[10px] font-black text-slate-400 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded uppercase">Local Only</span>
            </div>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addReminder()}
                    placeholder="Add a reminder... (e.g. Pay Internet Bill)"
                    className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:text-white"
                />
                <button
                    onClick={addReminder}
                    className="bg-primary hover:bg-primary/90 text-white p-3 rounded-xl transition-all active:scale-95 shadow-md shadow-primary/20"
                >
                    <Plus size={20} strokeWidth={3} />
                </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {reminders.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-sm text-slate-400 font-medium">No reminders yet. Add one above! <span className="nepali-font">कुनै रिमाइन्डर छैन।</span></p>
                    </div>
                ) : (
                    reminders.map((r) => (
                        <div
                            key={r.id}
                            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all group ${r.completed
                                    ? 'bg-slate-50/50 dark:bg-slate-800/30 border-transparent opacity-60'
                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary/30'
                                }`}
                        >
                            <button
                                onClick={() => toggleReminder(r.id)}
                                className={`shrink-0 transition-colors ${r.completed ? 'text-primary' : 'text-slate-300 hover:text-primary'}`}
                            >
                                {r.completed ? <CheckCircle2 size={20} fill="currentColor" className="text-white" /> : <Circle size={20} />}
                            </button>
                            <span className={`flex-1 text-sm font-medium dark:text-slate-200 truncate ${r.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                                {r.text}
                            </span>
                            <button
                                onClick={() => deleteReminder(r.id)}
                                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-center text-slate-400 leading-tight">
                    Your reminders are stored securely in your browser's cookies and are not sent to our servers.
                </p>
            </div>
        </div>
    );
}
