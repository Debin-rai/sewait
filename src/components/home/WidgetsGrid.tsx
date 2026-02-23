import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme, THEMES } from "@/context/ThemeContext";

import FadeIn from "@/components/animations/FadeIn";

export default function WidgetsGrid() {
    const { theme } = useTheme();
    const [config, setConfig] = useState<any>({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetch("/api/public/config")
            .then(res => res.json())
            .then(data => setConfig(data))
            .catch(err => console.error("Config fetch failed", err));
    }, []);

    const isVisible = (key: string) => !mounted || config[key] !== 'false';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {isVisible('MODULE_GUIDES') && (
                <FadeIn delay={0.1} className="h-full">
                    {/* Calendar Widget used as Guide link often or just Calendar */}
                    <Link
                        href="/calendar"
                        className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 block h-full"
                        style={{ borderTopColor: THEMES[theme].primary }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined" style={{ color: THEMES[theme].primary }}>calendar_month</span>
                                <h2 className="font-bold text-lg" style={{ color: THEMES[theme].primary }}>Nepali Calendar <span className="nepali-font text-sm opacity-60">पात्रो</span></h2>
                            </div>
                            <span
                                className="text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter nepali-font"
                                style={{ color: THEMES[theme].primary, backgroundColor: `${THEMES[theme].primary}10` }}
                            >
                                २०८२ फागुन
                            </span>
                        </div>

                        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
                            <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
                        </div>
                        <div className="grid grid-cols-7 text-center gap-y-1 text-sm font-semibold">
                            {[...Array(3)].map((_, i) => (
                                <span key={`empty-${i}`} className="py-2 text-slate-200">{28 + i}</span>
                            ))}
                            {[...Array(18)].map((_, i) => {
                                const day = i + 1;
                                const isToday = day === 15;
                                return (
                                    <span
                                        key={`day-${day}`}
                                        className={`py-2 rounded-lg cursor-pointer transition-all flex items-center justify-center ${isToday
                                            ? "bg-primary text-white shadow-lg shadow-primary/30 font-bold scale-110"
                                            : "hover:bg-slate-50 text-slate-700 hover:text-primary"
                                            }`}
                                    >
                                        {day}
                                    </span>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-50">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Upcoming Festival <span className="nepali-font">आगामी पर्व</span></p>
                            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100/50 group cursor-pointer hover:border-primary/30 transition-all">
                                <div className="w-1.5 h-10 bg-accent-amber rounded-full group-hover:scale-y-110 transition-transform"></div>
                                <div>
                                    <p className="text-xs font-bold text-primary mb-0.5">Dashain <span className="nepali-font">(घटस्थापना)</span></p>
                                    <p className="text-[10px] text-slate-500">5 days left • Ashoj 28</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 ml-auto text-sm group-hover:text-primary transition-colors">chevron_right</span>
                            </div>
                        </div>
                    </Link>
                </FadeIn>
            )}

            {isVisible('MODULE_SEWA_AI') && (
                <FadeIn delay={0.3} className="h-full">
                    {/* Sarkari AI Widget */}
                    <Link
                        href="/sewa-ai"
                        className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 block h-full overflow-hidden relative group"
                        style={{ borderTopColor: THEMES[theme].primary }}
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                            <span className="material-symbols-outlined text-8xl">history_edu</span>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined" style={{ color: THEMES[theme].primary }}>auto_fix_high</span>
                                <h2 className="font-bold text-lg" style={{ color: THEMES[theme].primary }}>Sarkari AI <span className="nepali-font text-sm opacity-60">सरकारी AI</span></h2>
                            </div>
                            <span
                                className="text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-tighter"
                                style={{ color: THEMES[theme].primary, backgroundColor: `${THEMES[theme].primary}10`, borderColor: `${THEMES[theme].primary}20` }}
                            >
                                Premium
                            </span>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Professional Nepali document assistant. I'll help you write:
                            </p>
                        </div>

                        <div className="space-y-2">
                            {[
                                { label: "Sarkari Nibedan (Applications)", icon: "description" },
                                { label: "Character/Job Letters", icon: "assignment_ind" },
                                { label: "Legal Format Drafting", icon: "gavel" }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-100 transition-all"
                                    style={{ "--hover-border": THEMES[theme].primary } as any}
                                >
                                    <span className="material-symbols-outlined text-sm" style={{ color: THEMES[theme].primary }}>{item.icon}</span>
                                    <span className="text-[10px] font-bold text-slate-600">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between" style={{ color: THEMES[theme].primary }}>
                            <span className="text-[10px] font-bold group-hover:underline underline-offset-4">Generate Document Now</span>
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </Link>
                </FadeIn>
            )}

            {isVisible('MODULE_WEATHER') && (
                <FadeIn delay={0.4} className="h-full">
                    {/* Weather Widget */}
                    <WeatherWidget />
                </FadeIn>
            )}
        </div>
    );
}

function WeatherWidget() {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (lat?: number, lon?: number) => {
        try {
            const url = lat && lon
                ? `/api/weather?lat=${lat}&lon=${lon}`
                : `/api/weather`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.error) {
                setError(data.error);
                setWeather(null);
            } else {
                setWeather(data);
                setError(null);
            }
        } catch (err) {
            console.error("Weather fetch failed", err);
            setError("Connection Failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
                () => fetchWeather() // Fallback to Kathmandu on denial
            );
        } else {
            fetchWeather();
        }
    }, []);

    const formatTime = (timestamp: number) => {
        if (!timestamp || isNaN(timestamp)) return "--:--";
        try {
            return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            return "--:--";
        }
    };

    return (
        <Link href="/weather" className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-t-accent-amber block overflow-hidden h-full">
            <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-accent-amber">partly_cloudy_day</span>
                <h2 className="text-slate-900 font-bold text-lg">Weather <span className="nepali-font text-sm text-slate-400">मौसम</span></h2>
            </div>

            {loading ? (
                <div className="h-40 flex flex-col items-center justify-center gap-2">
                    <div className="size-8 border-4 border-slate-100 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Locating...</p>
                </div>
            ) : weather ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div>
                            <p className="text-3xl font-black text-primary tracking-tighter">{weather.current?.temp ?? weather.temp ?? "--"}°C</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{weather.current?.city ?? 'Kathmandu'}</p>
                        </div>
                        <span className="material-symbols-outlined text-4xl text-primary/20">
                            {(weather.current?.condition ?? weather.condition ?? "").toLowerCase().includes('cloud') ? 'cloud' : 'sunny'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-orange-50/30 p-2 rounded-xl border border-orange-100 flex flex-col items-center">
                            <span className="material-symbols-outlined text-orange-500 text-base mb-1">wb_sunny</span>
                            <p className="text-[8px] font-black text-orange-400 uppercase">Sunrise</p>
                            <p className="text-[10px] font-bold text-slate-700">{formatTime(weather.current?.sunrise ?? weather.sunrise)}</p>
                        </div>
                        <div className="bg-indigo-50/30 p-2 rounded-xl border border-indigo-100 flex flex-col items-center">
                            <span className="material-symbols-outlined text-indigo-500 text-base mb-1">wb_twilight</span>
                            <p className="text-[8px] font-black text-indigo-400 uppercase">Sunset</p>
                            <p className="text-[10px] font-bold text-slate-700">{formatTime(weather.current?.sunset ?? weather.sunset)}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-4 bg-red-50 rounded-xl text-center">
                    <p className="text-xs font-bold text-red-500">Service Offline</p>
                </div>
            )}
        </Link>
    );
}
