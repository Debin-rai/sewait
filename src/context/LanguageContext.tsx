"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "en" | "np";

type Translations = {
    nav: {
        home: string;
        calendar: string;
        weather: string;
        rates: string;
        sewaAi: string;
        services: string;
        searchPlaceholder: string;
        search: string;
        login: string;
    };
    hero: {
        nepaliSamvat: string;
        date: string;
        day: string;
        tithi: string;
        festival: string;
        kathmandu: string;
        kathmandu_nepal: string;
    };
    services: {
        title: string;
        viewAll: string;
        items: { title: string; desc: string }[];
    };
    widgets: {
        calendar: {
            title: string;
            month: string;
            days: string[];
            upcomingFestival: string;
            festivalName: string;
            festivalDays: string;
        };
        market: {
            title: string;
            gold24: string;
            silver: string;
            source: string;
        };
        sewaAi: {
            title: string;
            desc: string;
        };
        weather: {
            title: string;
            location: string;
            days: { day: string; temp: string }[];
        };
    };
    news: {
        title: string;
        more: string;
        items: { tag: string; time: string; title: string; desc: string }[];
    };
    tasks: {
        title: string;
        update: string;
        officialInfo: string;
        officialDesc: string;
        items: { title: string; desc: string }[];
    };
    footer: {
        about: string;
        services: string;
        contact: string;
        rights: string;
        brandDesc: string;
        importantServices: string;
        passport: string;
        drivingLicense: string;
        pan: string;
        tax: string;
        aboutUs: string;
        ourMission: string;
        contactUs: string;
        privacy: string;
        terms: string;
        newsletter: string;
        newsletterDesc: string;
        subscribe: string;
        copyright: string;
        platform: string;
    };
};

const translations: Record<Language, Translations> = {
    en: {
        nav: {
            home: "Home",
            calendar: "Calendar",
            weather: "Weather",
            rates: "Gold & Silver",
            sewaAi: "Sewa AI",
            services: "Gov. Services",
            searchPlaceholder: "Search government services or info...",
            search: "Search",
            login: "Login",
        },
        hero: {
            nepaliSamvat: "Nepali Samvat",
            date: "2080 Kartik 15,",
            day: "Wednesday",
            tithi: "Ekadashi Tithi",
            festival: "5 days left for Dashain (Ghatasthapana)",
            kathmandu: "Kathmandu: 22°C",
            kathmandu_nepal: "Kathmandu, Nepal",
        },
        services: {
            title: "Government Guides & Services",
            viewAll: "View all services",
            items: [
                { title: "Passport", desc: "Application and fee details" },
                { title: "Driving License", desc: "New and renewal" },
                { title: "PAN (Permanent Account)", desc: "Online registration process" },
                { title: "National ID Card", desc: "NID registration process" },
            ],
        },
        widgets: {
            calendar: {
                title: "Nepali Calendar",
                month: "2080 Kartik",
                days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
                upcomingFestival: "Upcoming Festival",
                festivalName: "Dashain (Ghatasthapana)",
                festivalDays: "5 days left • Ashoj 28",
            },
            market: {
                title: "Market Price",
                gold24: "Gold (24 Carat) / Tola",
                silver: "Silver / Tola",
                source: "Source: Nepal Gold & Silver Merchants Federation",
            },
            sewaAi: {
                title: "Sewa AI Sumamry",
                desc: "Your Nepali AI Assistant",
            },
            weather: {
                title: "Weather",
                location: "Kathmandu, Clear",
                days: [
                    { day: "THU", temp: "24°" },
                    { day: "FRI", temp: "23°" },
                    { day: "SAT", temp: "25°" },
                ],
            },
        },
        news: {
            title: "Major News & Updates",
            more: "More news",
            items: [
                {
                    tag: "National",
                    time: "10 minutes ago",
                    title: "New Notice Published Regarding National ID Card Distribution",
                    desc: "Ministry of Home Affairs has released new procedures to make national ID distribution more effective...",
                },
                {
                    tag: "Economy",
                    time: "2 hours ago",
                    title: "Nepal Rastra Bank Publishes New Monetary Policy",
                    desc: "New directives issued to balance interest rates of banks and financial institutions...",
                },
                {
                    tag: "Weather",
                    time: "4 hours ago",
                    title: "Heavy Rainfall Expected in Kathmandu Valley",
                    desc: "Department of Hydrology and Meteorology forecasts rainfall in hilly areas within 24 hours...",
                },
            ],
        },
        tasks: {
            title: "Special Functions",
            update: "Update",
            officialInfo: "Official Information",
            officialDesc: "SewaIT is a platform that presents official information from various Nepal Government agencies in a simple manner.",
            items: [
                { title: "National ID Renewal", desc: "Online form and required documents" },
                { title: "Lost Passport Notice", desc: "Process for new passport" },
                { title: "Revenue Fee Calculator", desc: "Fee details for various services" },
                { title: "Costume Permit", desc: "Formal application and conditions" },
            ],
        },
        footer: {
            about: "About Us",
            services: "Our Services",
            contact: "Contact",
            rights: "All rights reserved",
            brandDesc: "Our goal is to simplify citizens' lives by bringing Nepal Government's digital services to one place.",
            importantServices: "Important Services",
            passport: "Passport Service",
            drivingLicense: "Driving License",
            pan: "PAN Number",
            tax: "Land Revenue & Tax",
            aboutUs: "About Us",
            ourMission: "Our Mission",
            contactUs: "Contact Us",
            privacy: "Privacy Policy",
            terms: "Terms of Service",
            newsletter: "Get Notifications",
            newsletterDesc: "Register to receive important government notices directly to your email.",
            subscribe: "Subscribe",
            copyright: "© 2024 SewaIT Inc. All rights reserved.",
            platform: "OFFICIAL UTILITY PLATFORM BY",
        },
    },
    np: {
        nav: {
            home: "गृहपृष्ठ",
            calendar: "पात्रो",
            weather: "मौसम",
            rates: "सुनचाँदी",
            sewaAi: "सेवा AI",
            services: "सरकारी सेवा",
            searchPlaceholder: "सरकारी सेवा वा जानकारी खोज्नुहोस्...",
            search: "खोज्नुहोस्",
            login: "लगइन",
        },
        hero: {
            nepaliSamvat: "नेपाली सम्वत्",
            date: "२०८० कार्तिक १५,",
            day: "बुधबार",
            tithi: "एकादशी तिथि",
            festival: "दशैं आउन ५ दिन बाँकी (घटस्थापना)",
            kathmandu: "काठमाडौं: २२°C",
            kathmandu_nepal: "काठमाडौं, नेपाल",
        },
        services: {
            title: "सरकारी गाइड तथा सेवाहरू",
            viewAll: "सबै सेवाहरू हेर्नुहोस्",
            items: [
                { title: "राहदानी (Passport)", desc: "आवेदन र दस्तुर विवरण" },
                { title: "सवारी चालक अनुमति", desc: "नयाँ तथा नवीकरण" },
                { title: "स्थायी लेखा (PAN)", desc: "अनलाइन दर्ता प्रक्रिया" },
                { title: "राष्ट्रिय परिचयपत्र", desc: "NID दर्ता प्रक्रिया" },
            ],
        },
        widgets: {
            calendar: {
                title: "नेपाली पात्रो",
                month: "२०८० कार्तिक",
                days: ["आइत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"],
                upcomingFestival: "आगामी पर्व",
                festivalName: "दशैं (घटस्थापना)",
                festivalDays: "५ दिन बाँकी • असोज २८",
            },
            market: {
                title: "बजार भाउ",
                gold24: "सुन (२४ क्यारेट) / तोला",
                silver: "चाँदी / तोला",
                source: "स्रोत: नेपाल सुनचाँदी व्यवसायी महासंघ",
            },
            sewaAi: {
                title: "सेवा AI सारांश",
                desc: "तपाईको नेपाली AI सहयोगी",
            },
            weather: {
                title: "मौसम",
                location: "काठमाडौं, सफा",
                days: [
                    { day: "बिही", temp: "२४°" },
                    { day: "शुक्र", temp: "२३°" },
                    { day: "शनि", temp: "२५°" },
                ],
            },
        },
        news: {
            title: "प्रमुख समाचार तथा अपडेट",
            more: "थप समाचार",
            items: [
                {
                    tag: "राष्ट्रिय",
                    time: "१० मिनेट अघि",
                    title: "राष्ट्रिय परिचयपत्र वितरण सम्बन्धी नयाँ सूचना प्रकाशित",
                    desc: "गृह मन्त्रालयले राष्ट्रिय परिचयपत्र वितरणको प्रक्रियालाई थप प्रभावकारी बनाउन नयाँ कार्यविधि...",
                },
                {
                    tag: "अर्थतन्त्र",
                    time: "२ घण्टा अघि",
                    title: "नेपाल राष्ट्र बैंकद्वारा नयाँ मौद्रिक नीति सार्वजनिक",
                    desc: "बैंक तथा वित्तीय संस्थाहरूको ब्याजदर सन्तुलन कायम गर्न नयाँ निर्देशन जारी गरिएको छ...",
                },
                {
                    tag: "मौसम",
                    time: "४ घण्टा अघि",
                    title: "काठमाडौं उपत्यकामा भारी वर्षाको सम्भावना",
                    desc: "जल तथा मौसम विज्ञान विभागले आगामी २४ घण्टाभित्र पहाडी भू-भागमा वर्षा हुने पूर्वानुमान गरेको छ...",
                },
            ],
        },
        tasks: {
            title: "विशेष कार्यहरू",
            update: "अद्यावधिक",
            officialInfo: "आधिकारिक जानकारी",
            officialDesc: "SewaIT नेपाल सरकारका विभिन्न निकायहरूबाट प्राप्त आधिकारिक सूचनाहरूलाई सरल ढंगले प्रस्तुत गर्ने माध्यम हो।",
            items: [
                { title: "राष्ट्रिय परिचयपत्र नवीकरण", desc: "अनलाइन फारम र आवश्यक कागजातहरू" },
                { title: "राहदानी हराएको सूचना", desc: "नयाँ बनाउन चालिने प्रक्रिया" },
                { title: "राजस्व दस्तुर गणना", desc: "विभिन्न सेवाहरूको शुल्क विवरण" },
                { title: "पोसाक अनुमति पत्र", desc: "औपचारिक आवेदन र सर्तहरू" },
            ],
        },
        footer: {
            about: "हाम्रो बारेमा",
            services: "हाम्रा सेवाहरू",
            contact: "सम्पर्क",
            rights: "सर्वाधिकार सुरक्षित",
            brandDesc: "नेपाल सरकारका डिजिटल सेवाहरूलाई एकै ठाउँमा ल्याई नागरिकहरूको जीवन सहज बनाउने हाम्रो लक्ष्य हो।",
            importantServices: "महत्वपूर्ण सेवाहरू",
            passport: "राहदानी सेवा",
            drivingLicense: "सवारी चालक अनुमतिपत्र",
            pan: "स्थायी लेखा नम्बर (PAN)",
            tax: "मालपोत र कर",
            aboutUs: "हाम्रो बारेमा",
            ourMission: "हाम्रो उद्देश्य",
            contactUs: "सम्पर्क गर्नुहोस्",
            privacy: "गोपनीयता नीति",
            terms: "सेवाका सर्तहरू",
            newsletter: "सूचना प्राप्त गर्नुहोस्",
            newsletterDesc: "महत्वपूर्ण सरकारी सूचनाहरू सिधै इमेलमा प्राप्त गर्न दर्ता गर्नुहोस्।",
            subscribe: "दर्ता गर्नुहोस्",
            copyright: "© 2026 SewaIT Inc. All rights reserved.",
            platform: "OFFICIAL UTILITY PLATFORM BY",
        },
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("np");

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
