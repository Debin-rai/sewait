"use client";

import React from "react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a355b] tracking-tight mb-6">
                        Terms of Service
                    </h1>
                    <div className="h-2 w-24 bg-amber-500 rounded-full mb-8"></div>
                </header>

                <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100 space-y-12 text-slate-700 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <p className="font-medium text-slate-500">By using SewaIT, you agree to the following terms designed to protect the "trust-first" nature of our utility platform:</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-[#1a355b] uppercase tracking-[0.2em] flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500 text-base">analytics</span>
                                Informational Purposes
                            </h2>
                            <p className="text-sm leading-relaxed opacity-90 font-medium">
                                Market data for Gold and Silver is provided for informational use; while we update these daily to ensure accuracy, we recommend verifying rates with official associations before major transactions.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-sm font-black text-[#1a355b] uppercase tracking-[0.2em] flex items-center gap-2">
                                <span className="material-symbols-outlined text-amber-500 text-base">description</span>
                                Guide Usage
                            </h2>
                            <p className="text-sm leading-relaxed opacity-90 font-medium">
                                Our Sarkari Guides are provided as a helpful resource. Users should always check the "Last Updated" date and the provided Official source link to ensure they have the latest requirements from the relevant government department.
                            </p>
                        </section>
                    </div>

                    <section className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-4">
                        <h2 className="text-sm font-black text-red-500 uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="material-symbols-outlined">shield</span>
                            Security & Integrity
                        </h2>
                        <p className="text-sm leading-relaxed font-medium">
                            Unauthorized attempts to scrape our Nepali Calendar data or bypass our security architecture (including our IP restrictions) are strictly prohibited.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-black text-[#1a355b] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-amber-500 text-base">admin_panel_settings</span>
                            Admin Authority
                        </h2>
                        <p className="text-sm leading-relaxed opacity-90 font-medium">
                            Access to the SewaIT Admin Panel—the "brain" of our application—is strictly limited to authorized personnel and is monitored through comprehensive Activity Logs.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
