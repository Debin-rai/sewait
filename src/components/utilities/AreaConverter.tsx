"use client";

import React, { useState } from "react";

export default function AreaConverter() {
    // Nepali inputs
    const [ropani, setRopani] = useState<number | "">("");
    const [aana, setAana] = useState<number | "">("");
    const [paisa, setPaisa] = useState<number | "">("");
    const [daam, setDaam] = useState<number | "">("");

    // Constants
    const SQ_FT_PER_ROPANI = 5476;
    const AANA_PER_ROPANI = 16;
    const PAISA_PER_AANA = 4;
    const DAAM_PER_PAISA = 4;

    const SQ_FT_PER_AANA = SQ_FT_PER_ROPANI / AANA_PER_ROPANI;
    const SQ_FT_PER_PAISA = SQ_FT_PER_AANA / PAISA_PER_AANA;
    const SQ_FT_PER_DAAM = SQ_FT_PER_PAISA / DAAM_PER_PAISA;

    const SQ_METER_FACTOR = 0.092903;

    // Derived conversion
    const totalSqFtRaw = (Number(ropani) * SQ_FT_PER_ROPANI) + (Number(aana) * SQ_FT_PER_AANA) + (Number(paisa) * SQ_FT_PER_PAISA) + (Number(daam) * SQ_FT_PER_DAAM);
    const sqFt = totalSqFtRaw > 0 ? parseFloat(totalSqFtRaw.toFixed(2)) : 0;
    const sqM = totalSqFtRaw > 0 ? parseFloat((totalSqFtRaw * SQ_METER_FACTOR).toFixed(2)) : 0;

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <span className="material-symbols-outlined">landscape</span>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nepali Land Area Converter</h3>
                    <p className="text-sm text-slate-500">Convert Ropani, Aana, Paisa, Daam into Sq. Ft and Meters.</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Ropani</label>
                    <input
                        type="number"
                        min="0"
                        value={ropani}
                        onChange={(e) => setRopani(e.target.value ? Number(e.target.value) : "")}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                        placeholder="0"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Aana</label>
                    <input
                        type="number"
                        min="0"
                        max="15"
                        value={aana}
                        onChange={(e) => setAana(e.target.value ? Number(e.target.value) : "")}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                        placeholder="0"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Paisa</label>
                    <input
                        type="number"
                        min="0"
                        max="3"
                        value={paisa}
                        onChange={(e) => setPaisa(e.target.value ? Number(e.target.value) : "")}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                        placeholder="0"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Daam</label>
                    <input
                        type="number"
                        min="0"
                        max="3"
                        value={daam}
                        onChange={(e) => setDaam(e.target.value ? Number(e.target.value) : "")}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                        placeholder="0"
                    />
                </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-4 text-center divide-x divide-slate-200 dark:divide-slate-700">
                    <div>
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Equivalent Square Feet</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">
                            {sqFt !== 0 ? sqFt.toLocaleString() : "0"} <span className="text-sm font-medium text-slate-400">sq.ft</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Equivalent Square Meters</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">
                            {sqM !== 0 ? sqM.toLocaleString() : "0"} <span className="text-sm font-medium text-slate-400">sq.m</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>1 Ropani = 5476 sq.ft</span>
                <span>1 Aana = 342.25 sq.ft</span>
            </div>
        </div>
    );
}
