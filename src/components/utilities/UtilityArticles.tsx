"use client";

import React from "react";
import FadeIn from "@/components/animations/FadeIn";

export default function UtilityArticles() {
    return (
        <FadeIn direction="up" delay={0.4}>
            <section className="mt-12 mb-12">
                <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Understanding Nepali Metrics</h2>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Land Measurement Article */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400">square_foot</span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nepali Land Measurement Basics</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                            In Nepal, particularly in the hilly and mountainous regions (including the Kathmandu Valley), land is traditionally measured using the <strong>Ropani</strong> system.
                            Understanding this system is crucial for real estate, farming, and legal documentation.
                        </p>

                        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">The Conversion Hierarchy</h4>
                            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                                <li className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                    <span className="font-medium">1 Ropani</span>
                                    <span>= 16 Aana</span>
                                </li>
                                <li className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                    <span className="font-medium">1 Aana</span>
                                    <span>= 4 Paisa</span>
                                </li>
                                <li className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                                    <span className="font-medium">1 Paisa</span>
                                    <span>= 4 Daam</span>
                                </li>
                                <li className="flex justify-between items-center py-1 pt-3">
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400">1 Ropani (Total)</span>
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400">5476 Sq. Ft.</span>
                                </li>
                            </ul>
                        </div>
                        <p className="text-xs text-slate-500 mt-4 italic">Note: The Terai region uses a different system based on Bigha, Katha, and Dhur.</p>
                    </div>

                    {/* BS vs AD Article */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">history_edu</span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bikram Sambat (BS) vs. Gregorian (AD)</h3>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                            The official calendar of Nepal is the <strong>Bikram Sambat (BS)</strong>, a historical Hindu calendar named after King Vikramaditya.
                            It is a solar calendar alongside lunar months, making it fundamentally different from the Gregorian calendar used globally.
                        </p>

                        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700 space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">The Time Difference</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    The BS calendar is approximately <strong>56 years and 8.5 months ahead</strong> of the Gregorian calendar (AD). The New Year typically falls in mid-April (Baisakh 1st).
                                </p>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Variable Months</h4>
                                <p className="text-sm text-slate-700 dark:text-slate-300">
                                    Unlike the fixed days in Gregorian months, Nepali months can range from <strong>29 to 32 days</strong>. The exact length is determined yearly by astrological calculations of the sun's position.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FadeIn>
    );
}
