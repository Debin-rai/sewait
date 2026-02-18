"use client";

import React from "react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a355b] tracking-tight mb-6">
                        Privacy Policy
                    </h1>
                    <div className="h-2 w-24 bg-indigo-500 rounded-full mb-8"></div>
                </header>

                <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100 space-y-12 text-slate-700 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <section>
                        <h2 className="text-xl font-black text-[#1a355b] uppercase tracking-widest mb-4">Privacy-Friendly Focus</h2>
                        <p className="leading-relaxed font-medium opacity-90">
                            SajiloSathi is designed with a "privacy-friendly" focus, ensuring that your utility experience does not come at the cost of your personal data.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div className="space-y-4">
                            <h3 className="font-black text-[#1a355b] flex items-center gap-2">
                                <span className="material-symbols-outlined text-indigo-500">analytics</span>
                                Aggregate Analytics
                            </h3>
                            <p className="leading-relaxed opacity-80 font-medium">
                                We monitor Daily Active Users and traffic origin (such as visitor counts by country) to improve our service, but we do not collect personally identifiable information (PII) from our general users.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="font-black text-[#1a355b] flex items-center gap-2">
                                <span className="material-symbols-outlined text-indigo-500">dns</span>
                                Server-Side Security
                            </h3>
                            <p className="leading-relaxed opacity-80 font-medium">
                                By utilizing Next.js SSR and Laravel, all data processing and API fetching happen on the server. This means your interactions are handled privately, and no sensitive logic is exposed to your browser.
                            </p>
                        </div>
                    </section>

                    <section className="pt-8 border-t border-slate-50">
                        <h2 className="text-sm font-black text-[#1a355b] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-indigo-500">lock</span>
                            Encrypted Data
                        </h2>
                        <p className="leading-relaxed font-medium opacity-90 text-sm">
                            Any user-specific data, such as Daily Reminders, is stored in an encrypted database and is only accessible through our secure backend. Our Sarkari Guides also link to official sources; please review their respective policies when visiting external government sites.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
