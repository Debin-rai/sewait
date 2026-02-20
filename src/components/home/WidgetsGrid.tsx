"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import FadeIn from "@/components/animations/FadeIn";

export default function WidgetsGrid() {
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
                    <Link href="/calendar" className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-t-primary block h-full">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">calendar_month</span>
                                <h2 className="text-primary font-bold text-lg">Nepali Calendar <span className="nepali-font text-sm text-primary/60">पात्रो</span></h2>
                            </div>
                            <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-full uppercase tracking-tighter nepali-font">२०८२ फागुन</span>
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

            {isVisible('MODULE_GOLD') && (
                <FadeIn delay={0.2} className="h-full">
                    {/* Market Rates Widget */}
                    <Link href="/gold-silver" className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-t-accent-amber block h-full">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-accent-amber">payments</span>
                            <h2 className="text-slate-900 font-bold text-lg">Market Price <span className="nepali-font text-sm text-slate-400">बजार भाउ</span></h2>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-2 relative z-10">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gold (24 Carat) / Tola</span>
                                    <span className="text-red-500 text-[10px] font-bold flex items-center gap-0.5 bg-red-50 px-1.5 py-0.5 rounded">
                                        <span className="material-symbols-outlined text-xs">arrow_downward</span> Rs. 250
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-primary relative z-10">NPR 1,18,000</p>
                                <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-slate-100 text-6xl group-hover:text-amber-100 transition-colors">savings</span>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-2 relative z-10">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Silver / Tola</span>
                                    <span className="text-green-600 text-[10px] font-bold flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded">
                                        <span className="material-symbols-outlined text-xs">arrow_upward</span> Rs. 5
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-primary relative z-10">NPR 1,400</p>
                                <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-slate-100 text-6xl group-hover:text-slate-200 transition-colors">diamond</span>
                            </div>
                            <p className="text-[9px] text-slate-400 text-center pt-2">Source: Nepal Gold & Silver Merchants Federation</p>
                        </div>
                    </Link>
                </FadeIn>
            )}

            {isVisible('MODULE_NEPSE') && (
                <FadeIn delay={0.3} className="h-full">
                    {/* NEPSE Widget */}
                    <Link href="/nepse" className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-t-primary block h-full">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">monitoring</span>
                                <h2 className="text-primary font-bold text-lg">NEPSE Summary <span className="nepali-font text-sm text-primary/60">नेप्से</span></h2>
                            </div>
                            <span className="text-[9px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-100 uppercase tracking-tighter">Market Open</span>
                        </div>

                        <div className="mb-8">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Current Index</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900 tracking-tighter">2,045.63</span>
                                <span className="text-green-600 text-xs font-bold flex items-center bg-green-50 px-1.5 py-0.5 rounded">
                                    +9.20 <span className="text-[10px] ml-1">(0.45%)</span>
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {[
                                { symbol: "NTC", change: "+4.5%" },
                                { symbol: "ADBL", change: "+3.2%" },
                                { symbol: "HDL", change: "+2.8%" }
                            ].map((stock, i) => (
                                <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0 group cursor-pointer">
                                    <span className="text-xs font-bold text-slate-600 group-hover:text-primary transition-colors">{stock.symbol}</span>
                                    <span className="text-xs font-bold text-green-600 bg-green-50/50 px-2 py-0.5 rounded group-hover:bg-green-100 transition-colors">{stock.change}</span>
                                </div>
                            ))}
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
        <Link href="/weather" className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-t-accent-amber block overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-accent-amber">partly_cloudy_day</span>
                <h2 className="text-slate-900 font-bold text-lg">Weather <span className="nepali-font text-sm text-slate-400">मौसम</span></h2>
            </div>

            {loading ? (
                <div className="h-40 flex flex-col items-center justify-center gap-2">
                    <div className="size-8 border-4 border-slate-100 border-t-primary rounded-full animate-spin"></div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Locating...</p>
                </div>
            ) : weather ? (
                <>
                    <div className="flex items-center gap-6 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-4xl font-black text-primary tracking-tighter">{weather.current?.temp ?? weather.temp ?? "--"}°C</p>
                            <p className="text-xs font-bold text-slate-500 mt-1">{weather.current?.city ?? weather.city ?? 'Kathmandu'}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary/60 mt-0.5">{weather.current?.condition ?? weather.condition ?? "--"}</p>
                        </div>
                        <span className="material-symbols-outlined text-6xl text-primary/10 absolute -right-2 -bottom-2">
                            {(weather.current?.condition ?? weather.condition ?? "").toLowerCase().includes('cloud') ? 'cloud' : 'sunny'}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-100 flex flex-col items-center gap-1">
                            <span className="material-symbols-outlined text-orange-500 text-lg">wb_sunny</span>
                            <div className="text-center">
                                <p className="text-[9px] font-black text-orange-400 uppercase leading-none">Sunrise <span className="nepali-font">सूर्योदय</span></p>
                                <p className="text-xs font-black text-slate-700 mt-1">{formatTime(weather.current?.sunrise ?? weather.sunrise)}</p>
                            </div>
                        </div>
                        <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 flex flex-col items-center gap-1">
                            <span className="material-symbols-outlined text-indigo-500 text-lg">wb_twilight</span>
                            <div className="text-center">
                                <p className="text-[9px] font-black text-indigo-400 uppercase leading-none">Sunset <span className="nepali-font">सूर्यास्त</span></p>
                                <p className="text-xs font-black text-slate-700 mt-1">{formatTime(weather.current?.sunset ?? weather.sunset)}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="p-4 bg-red-50 rounded-xl text-center">
                    <p className="text-xs font-bold text-red-500">{error || "Weather Unavailable"}</p>
                    <p className="text-[9px] text-red-400 mt-1">Check API Key / Subscription</p>
                </div>
            )}
        </Link>
    );
}
