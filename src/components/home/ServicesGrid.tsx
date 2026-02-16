"use client";

import Link from "next/link";

export default function ServicesGrid() {
    const services = [
        {
            href: "/guides/passport",
            icon: "travel",
            title: "Passport",
            titleNp: "राहदानी",
            desc: "Application and fee details",
        },
        {
            href: "/guides/license",
            icon: "badge",
            title: "Driving License",
            titleNp: "सवारी चालक अनुमति",
            desc: "New and renewal",
        },
        {
            href: "/guides/pan",
            icon: "payments",
            title: "Permanent Account (PAN)",
            titleNp: "स्थायी लेखा नम्बर",
            desc: "Online registration process",
        },
        {
            href: "/guides/nid",
            icon: "badge",
            title: "National Identity Card",
            titleNp: "राष्ट्रिय परिचयपत्र",
            desc: "NID registration process",
        },
    ];

    return (
        <section className="mb-16">
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-primary relative inline-block">
                    Government Guides & Services <span className="nepali-font text-lg text-primary/60">सरकारी गाइड</span>
                    <div className="absolute -bottom-4 left-0 w-20 h-1 bg-primary rounded-full"></div>
                </h2>
                <Link href="/guides" className="text-sm font-bold text-primary hover:text-primary-light flex items-center gap-1 transition-colors">
                    View all services
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <Link
                        key={index}
                        href={service.href}
                        className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary transition-all text-center"
                    >
                        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary group-hover:text-white transition-all transform group-hover:-translate-y-1">
                            <span className="material-symbols-outlined text-3xl font-light">{service.icon}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                            {service.title}
                        </h3>
                        <p className="text-xs text-primary/50 nepali-font mb-2">{service.titleNp}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            {service.desc}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
