"use client";

import React from "react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 md:py-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <header className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a355b] tracking-tight mb-6">
                        About SewaIT
                    </h1>
                    <div className="h-2 w-24 bg-blue-500 rounded-full mb-8"></div>
                </header>

                <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100 space-y-12 text-slate-700 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <section className="space-y-6">
                        <p className="text-xl font-medium leading-relaxed">
                            SewaIT is a Nepali utility platform founded by <span className="text-[#1a355b] font-black">Debin C. Rai</span>.
                            As the Founder of SewaIT, Debin C. Rai envisioned a digital space where every Nepali can easily access
                            essential tools like the calendar, gold rates, and government guides.
                        </p>
                        <p className="text-slate-500 leading-relaxed">
                            Our platform is built with a "trust-first" approach, ensuring that every Nepali citizen has access to
                            accurate, accessible, and exceptionally secure digital tools.
                        </p>
                    </section>

                    <section className="pt-12 border-t border-slate-100">
                        <h2 className="text-2xl font-black text-[#1a355b] mb-8 flex items-center gap-3">
                            <span className="material-symbols-outlined text-blue-500">person</span>
                            Meet the Founder
                        </h2>

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 flex-1">
                                <h3 className="text-xl font-black text-[#1a355b] mb-4">Debin C. Rai</h3>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">SewaIT Founder & IT Specialist</p>

                                <div className="space-y-4 text-slate-600 font-medium">
                                    <p>Based in <span className="text-[#1a355b] font-bold">Khotang</span>, Debin C. Rai is an NSS Management faculty passout with a deep passion for technology and design.</p>
                                    <p>As an IT specialist and designer, he envisioned SewaIT as a way to simplify digital Nepal. His focus is on creating tools that are not only functional but also beautiful and secure.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-blue-50/50 p-8 rounded-[32px] border border-blue-100/50">
                        <p className="text-sm text-blue-700 font-medium leading-relaxed">
                            SewaIT aims to empower every Nepali citizen with a digital toolkit that helps them navigate daily life—from tracking market trends to understanding government processes—with total confidence.
                        </p>
                    </section>
                </div>

                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            "name": "Debin C. Rai",
                            "jobTitle": ["Founder", "IT Specialist", "Designer"],
                            "url": "https://sewait.up.railway.app/about",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Khotang",
                                "addressCountry": "NP"
                            },
                            "alumniOf": "NSS Management",
                            "description": "SewaIT Founder, IT Specialist, and Designer from Khotang."
                        })
                    }}
                />
            </div>
        </div>
    );
}
