"use client";

import React from "react";
import FadeIn from "@/components/animations/FadeIn";
import AreaConverter from "./AreaConverter";
import DateConverter from "./DateConverter";
import ForexConverter from "./ForexConverter";

export default function UtilitiesSection() {
    return (
        <FadeIn direction="up" delay={0.3}>
            <section className="mt-12">
                <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Nepali Utilities</h2>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <DateConverter />
                    <AreaConverter />
                    <ForexConverter />
                </div>
            </section>
        </FadeIn>
    );
}
