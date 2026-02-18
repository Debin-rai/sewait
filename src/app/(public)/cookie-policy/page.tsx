"use client";

import { useState } from "react";
import { Shield, Lock, Eye, BarChart3, Globe } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function CookiePolicyPage() {
    const [lang, setLang] = useState<"en" | "ne">("en");

    const content = {
        en: {
            title: "Cookie Policy",
            subtitle: "Trust, Transparency & Security",
            intro: "At SajiloSathi, we prioritize your privacy. This policy explains how we use cookies to provide a secure, seamless, and personalized digital experience.",
            sections: [
                {
                    title: "1. Essential Cookies",
                    icon: <Lock className="size-5 text-primary" />,
                    desc: "Mandatory for the platform to function securely. These handle administrator sessions, CSRF protection, and secure data transmission.",
                    items: ["Admin Session & Timeout", "CSRF Security Tokens", "Basic App Routing"]
                },
                {
                    title: "2. Personalization Cookies",
                    icon: <Eye className="size-5 text-indigo-500" />,
                    desc: "Used to recognize your preferences and store local data like your Daily Reminders without requiring a server login.",
                    items: ["Daily Reminders Storage", "Theme Preferences", "Language Selection"]
                },
                {
                    title: "3. Analytics & Performance",
                    icon: <BarChart3 className="size-5 text-emerald-500" />,
                    desc: "Helps us measure our growth toward 1,000+ daily active users by tracking retention and most-used modules.",
                    items: ["Visitor Retention (Unique ID)", "Session Duration", "Module Popularity Heatmaps"]
                }
            ],
            footer: "All cookies are encrypted and issued with Secure/HttpOnly flags where applicable. We do not sell your personal data."
        },
        ne: {
            title: "कुकी नीति",
            subtitle: "विश्वास, पारदर्शिता र सुरक्षा",
            intro: "सजिलो साथीमा, हामी तपाईंको गोपनीयतालाई प्राथमिकता दिन्छौं। यो नीतिले हामीले कसरी कुकीहरू प्रयोग गरेर सुरक्षित र व्यक्तिगत अनुभव प्रदान गर्छौं भन्ने कुरा स्पष्ट पार्छ।",
            sections: [
                {
                    title: "१. अत्यावश्यक कुकीहरू",
                    icon: <Lock className="size-5 text-primary" />,
                    desc: "प्लेटफर्म सुरक्षित रूपमा सञ्चालन गर्न अनिवार्य। यसले ए‍डमिन सेसन, CSRF सुरक्षा, र सुरक्षित डाटा ट्रान्समिसन व्यवस्थापन गर्छ।",
                    items: ["एडमिन सेसन र टाइमआउट", "CSRF सुरक्षा टोकन", "आधारभूत एप रूटिङ"]
                },
                {
                    title: "२. व्यक्तिगत कुकीहरू",
                    icon: <Eye className="size-5 text-indigo-500" />,
                    desc: "तपाईंको प्राथमिकताहरू पहिचान गर्न र लगइन बिना नै तपाईंको 'दैनिक रिमाइन्डर' जस्ता स्थानीय डाटा भण्डारण गर्न प्रयोग गरिन्छ।",
                    items: ["दैनिक रिमाइन्डर भण्डारण", "थिभ प्राथमिकताहरू", "भाषा छनौट"]
                },
                {
                    title: "३. एनालिटिक्स र कार्यसम्पादन",
                    icon: <BarChart3 className="size-5 text-emerald-500" />,
                    desc: "रिटेन्सन र सबैभन्दा धेरै प्रयोग हुने मोड्युलहरू ट्र्याक गरेर हाम्रो वृद्धि मापन गर्न मद्दत गर्दछ।",
                    items: ["भिजिटर रिटेन्सन (युनिक ID)", "सेसन अवधि", "मोड्युल लोकप्रियता"]
                }
            ],
            footer: "सबै कुकीहरू इन्क्रिप्ट गरिएका हुन्छन् र सुरक्षा फ्ल्यागहरू सहित जारी गरिन्छन्। हामी तपाईंको व्यक्तिगत डाटा बिक्री गर्दैनौं।"
        }
    };

    const t = content[lang];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4">
            <div className="container mx-auto max-w-4xl">

                <div className="flex justify-end mb-8">
                    <button
                        onClick={() => setLang(lang === "en" ? "ne" : "en")}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-xs font-black uppercase tracking-widest text-primary shadow-sm hover:shadow-md transition-all active:scale-95"
                    >
                        <Globe size={14} />
                        {lang === "en" ? "नेपाली संस्करण" : "English Version"}
                    </button>
                </div>

                <FadeIn>
                    <div className="text-center mb-16">
                        <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary">
                            <Shield className="size-8" />
                        </div>
                        <h1 className={`text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 ${lang === 'ne' ? 'nepali-font' : ''}`}>{t.title}</h1>
                        <p className={`text-sm font-black text-primary uppercase tracking-[0.3em] mb-6 ${lang === 'ne' ? 'nepali-font' : ''}`}>{t.subtitle}</p>
                        <p className={`text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed ${lang === 'ne' ? 'nepali-font' : ''}`}>
                            {t.intro}
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 gap-8 mb-16">
                    {t.sections.map((section, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="flex items-start gap-6">
                                    <div className="size-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500">
                                        {section.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className={`text-xl font-black text-slate-900 dark:text-white mb-3 ${lang === 'ne' ? 'nepali-font' : ''}`}>{section.title}</h2>
                                        <p className={`text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed ${lang === 'ne' ? 'nepali-font' : ''}`}>{section.desc}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {section.items.map((item, iIdx) => (
                                                <span key={iIdx} className={`px-4 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-bold text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700 uppercase tracking-tighter ${lang === 'ne' ? 'nepali-font' : ''}`}>
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.4}>
                    <div className="text-center p-8 bg-primary/5 dark:bg-primary/10 rounded-3xl border border-primary/10">
                        <p className={`text-sm font-medium text-slate-600 dark:text-slate-300 ${lang === 'ne' ? 'nepali-font' : ''}`}>
                            {t.footer}
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>Last Updated: Feb 2026</span>
                            <span className="text-slate-200">|</span>
                            <span>Ver 1.1.0</span>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
