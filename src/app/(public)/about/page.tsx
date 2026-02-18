import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About SewaIT | Founded by Debin Rai",
    description: "Learn about SewaIT, a Nepali utility platform founded by Debin Rai, providing Nepali calendar, gold rates, and digital tools.",
};

export default function AboutPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://sewait.up.railway.app/#organization",
                "name": "SewaIT",
                "url": "https://sewait.up.railway.app",
                "logo": "https://sewait.up.railway.app/assets/images/Final-logo.png",
                "founder": {
                    "@type": "Person",
                    "@id": "https://sewait.up.railway.app/#founder",
                    "name": "Debin Rai",
                    "jobTitle": "Founder & Lead Developer",
                    "url": "https://sewait.up.railway.app/about"
                }
            },
            {
                "@type": "Person",
                "@id": "https://sewait.up.railway.app/#founder",
                "name": "Debin Rai",
                "url": "https://sewait.up.railway.app/about",
                "knowsAbout": ["Web Development", "Nepali Digital Services", "Bikram Sambat"],
                "founderOf": { "@id": "https://sewait.up.railway.app/#organization" }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 md:py-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <header className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-[#1a355b] tracking-tight mb-6">
                        About SewaIT
                    </h1>
                    <div className="h-2 w-24 bg-[#10b981] rounded-full mb-8"></div>
                </header>

                {/* Content */}
                <div className="space-y-12 text-slate-700 leading-relaxed text-lg">
                    <section className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Official Statement</h2>
                        <p className="text-xl font-medium text-[#1a355b] mb-8 leading-snug">
                            SewaIT is a Nepali utility platform founded by <span className="text-slate-900 font-black">Debin Rai</span>, focused on providing daily-use digital services such as Nepali calendar, gold rates, and public information tools.
                        </p>
                        <p className="mb-6">
                            The platform was born from a vision to create a cleaner, faster, and more reliable digital companion for the Nepali community, centralizing essential tools that were previously scattered across less secure websites.
                        </p>
                        <p>
                            Founded and maintained by Debin Rai, SewaIT serves students, professionals, and general users by providing location-based weather, Bikram Sambat dates, and verified market rates.
                        </p>
                    </section>

                    {/* Mission Section */}
                    <section>
                        <h3 className="text-2xl font-black text-[#1a355b] uppercase tracking-widest mb-8 flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#10b981]">rocket_launch</span>
                            Our Values
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Accuracy",
                                    desc: "Official festival dates and manually verified market rates.",
                                    icon: "verified_user",
                                    color: "bg-blue-50 text-blue-600"
                                },
                                {
                                    title: "Authority",
                                    desc: "A verified platform led by Debin Rai to ensure tool integrity.",
                                    icon: "foundation",
                                    color: "bg-indigo-50 text-indigo-600"
                                },
                                {
                                    title: "Efficiency",
                                    desc: "Blazing fast digital tools built for the modern Nepali web.",
                                    icon: "bolt",
                                    color: "bg-teal-50 text-teal-600"
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 hover:shadow-lg transition-all duration-300">
                                    <div className={`size-12 rounded-2xl flex items-center justify-center mb-6 ${item.color}`}>
                                        <span className="material-symbols-outlined font-black">{item.icon}</span>
                                    </div>
                                    <h4 className="font-black text-lg mb-3 tracking-tight">{item.title}</h4>
                                    <p className="text-sm opacity-80 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
