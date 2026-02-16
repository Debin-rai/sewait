"use client";

import Link from "next/link";

export default function NewsSection() {
    const news = [
        {
            tag: "National",
            time: "10 min ago",
            title: "New Notice Published Regarding National ID Distribution",
            titleNp: "राष्ट्रिय परिचयपत्र वितरण सम्बन्धी नयाँ सूचना",
            desc: "Ministry of Home Affairs has released new procedures to make national ID distribution more effective...",
        },
        {
            tag: "Economy",
            time: "2 hours ago",
            title: "Nepal Rastra Bank Publishes New Monetary Policy",
            titleNp: "नेपाल राष्ट्र बैंकद्वारा नयाँ मौद्रिक नीति सार्वजनिक",
            desc: "New directives issued to balance interest rates of banks and financial institutions...",
        },
        {
            tag: "Weather",
            time: "4 hours ago",
            title: "Heavy Rainfall Expected in Kathmandu Valley",
            titleNp: "काठमाडौं उपत्यकामा भारी वर्षाको सम्भावना",
            desc: "Department of Hydrology and Meteorology forecasts rainfall in hilly areas within 24 hours...",
        },
    ];

    return (
        <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Major News & Updates <span className="nepali-font text-sm text-slate-400">समाचार</span></h2>
                <Link className="text-xs font-bold text-primary hover:underline" href="/news">
                    More news
                </Link>
            </div>

            <div className="space-y-6">
                {news.map((item, idx) => (
                    <article key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                        <div className="w-20 h-20 bg-slate-100 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">
                                    {item.tag}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">{item.time}</span>
                            </div>
                            <h3 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-primary transition-colors mb-1">
                                {item.title}
                            </h3>
                            <p className="text-[10px] text-primary/40 nepali-font mb-1">{item.titleNp}</p>
                            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
