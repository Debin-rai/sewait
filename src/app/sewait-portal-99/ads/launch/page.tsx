"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, CloudUpload, Sparkles, Target, Calendar as CalendarIcon, Info, Monitor, MousePointerClick, X } from "lucide-react";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from "@/lib/cropUtils";

const PLACEMENT_CATEGORIES = {
    "HOME": [
        { id: "HOME_HERO", name: "Hero Banner (Top)", size: "1200x400", ratio: "3/1", aspect: 3 },
        { id: "HOME_SIDEBAR", name: "Sidebar Widget", size: "400x400", ratio: "1/1", aspect: 1 },
        { id: "HOME_FOOTER", name: "Footer Strip", size: "1200x200", ratio: "6/1", aspect: 6 }
    ],
    "CALENDAR": [
        { id: "CALENDAR_TOP", name: "Top Banner", size: "1200x200", ratio: "6/1", aspect: 6 },
        { id: "CALENDAR_SIDEBAR", name: "Sidebar Widget", size: "400x400", ratio: "1/1", aspect: 1 }
    ],
    "GOLD_SILVER": [
        { id: "GOLD_HEADER", name: "Header Banner", size: "1200x300", ratio: "4/1", aspect: 4 }
    ],
    "SERVICES": [
        { id: "GOV_LIST", name: "List Interstitial", size: "800x200", ratio: "4/1", aspect: 4 }
    ],
    "WEATHER": [
        { id: "WEATHER_BOTTOM", name: "Widget Bottom", size: "400x200", ratio: "2/1", aspect: 2 }
    ]
};

export default function LaunchAdPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedPage, setSelectedPage] = useState("HOME");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        client: "",
        position: "",
        imageUrl: "",
        link: "",
        startDate: "",
        endDate: "",
    });

    // Cropper State
    const [tempImage, setTempImage] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [showCropper, setShowCropper] = useState(false);

    const activePosition = PLACEMENT_CATEGORIES[selectedPage as keyof typeof PLACEMENT_CATEGORIES]?.find(p => p.id === formData.position);

    const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!formData.position) {
                alert("Please select a placement position first!");
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setTempImage(reader.result as string);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropAndUpload = async () => {
        if (!tempImage || !croppedAreaPixels) return;

        setUploading(true);
        // Don't close immediately in case of error

        try {
            const croppedImageBlob = await getCroppedImg(tempImage, croppedAreaPixels);
            if (!croppedImageBlob) throw new Error("Cropping failed");

            const data = new FormData();
            data.append('file', croppedImageBlob, 'creative.jpg');

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Upload failed");
            }

            const result = await res.json();
            if (result.url) {
                setFormData(prev => ({ ...prev, imageUrl: result.url }));
                setShowCropper(false); // Close ONLY on success
                setTempImage(null);
            }
        } catch (err: any) {
            console.error(err);
            alert(`CRITICAL ERROR: ${err.message || "Unknown Failure"}`);
        } finally {
            setUploading(false);
        }
    };

    const handleLaunch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl || !formData.position || !formData.name) {
            alert("Error: All primary fields (Position, Name, and Creative) are required.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/ads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Campaign Synchronized Successfully!");
                router.push("/sewait-portal-99/ads");
                router.refresh();
            } else {
                const errData = await res.json();
                alert(`PUBLISH FAILED: ${errData.error || "Database rejection"}`);
            }
        } catch (error: any) {
            console.error("Failed to fetch ads", error);
            alert(`NETWORK ERROR: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            {/* Cropper Modal */}
            {showCropper && tempImage && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col">
                    <div className="p-6 flex justify-between items-center border-b border-white/10">
                        <div>
                            <h3 className="text-white font-black uppercase tracking-widest text-sm">Fine-Tune Creative</h3>
                            <p className="text-[10px] text-slate-500 font-bold">MATCHING {activePosition?.ratio} ASPECT RATIO</p>
                        </div>
                        <button type="button" onClick={() => setShowCropper(false)} className="text-slate-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-1 relative">
                        <Cropper
                            image={tempImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={activePosition?.aspect || 1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div className="p-8 bg-slate-900/50 border-t border-white/10 flex flex-col items-center gap-6">
                        <div className="w-64">
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleCropAndUpload}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-[0.2em] px-12 py-4 rounded-2xl shadow-2xl shadow-emerald-500/20 transition-all active:scale-95"
                        >
                            Finalize & Quantize
                        </button>
                    </div>
                </div>
            )}

            {/* Dark Mode Specific Header */}
            <div className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-[60] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/sewait-portal-99/ads" className="size-10 rounded-full bg-slate-900 hover:bg-slate-800 flex items-center justify-center text-slate-400 transition-colors">
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                            Creative Studio <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">v2.0</span>
                        </h1>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Campaign Configuration Engine</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                    >
                        Discard
                    </button>
                    <button
                        type="button"
                        onClick={handleLaunch}
                        disabled={loading || !formData.imageUrl || !formData.position}
                        className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-900/40 transition-all active:scale-95"
                    >
                        {loading ? 'Initializing...' : 'Finalize & Launch'}
                    </button>
                </div>
            </div>

            <main className="flex-1 p-6 lg:p-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Column: Configuration */}
                <div className="lg:col-span-7 space-y-12">

                    {/* 1. Placement */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                                <Target size={16} />
                            </div>
                            <h2 className="text-lg font-black text-white tracking-tight uppercase">1. Strategic Placement</h2>
                        </div>

                        <div className="space-y-6 bg-slate-900/40 border border-slate-900 p-8 rounded-[2rem]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block ml-1">Target Surface</label>
                                    <select
                                        value={selectedPage}
                                        onChange={(e) => {
                                            setSelectedPage(e.target.value);
                                            setFormData(prev => ({ ...prev, position: "" }));
                                        }}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none"
                                    >
                                        <option value="HOME">Main Home Screen</option>
                                        <option value="CALENDAR">Nepali Patro (Calendar)</option>
                                        <option value="GOLD_SILVER">Bullion Rates (Gold/Silver)</option>
                                        <option value="SERVICES">Government Portal</option>
                                        <option value="WEATHER">Live Weather</option>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block ml-1">Contextual Info</label>
                                    <div className="bg-slate-950 border border-emerald-500/10 p-4 rounded-2xl flex items-start gap-3">
                                        <Info className="text-emerald-500 size-4 mt-0.5" />
                                        <p className="text-[11px] text-slate-400 leading-relaxed">
                                            Selecting a specific page ensures your campaign reaches the most relevant audience.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block ml-1">Available Positions</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {PLACEMENT_CATEGORIES[selectedPage as keyof typeof PLACEMENT_CATEGORIES]?.map((pos) => (
                                        <div
                                            key={pos.id}
                                            onClick={() => setFormData(prev => ({ ...prev, position: pos.id }))}
                                            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative group overflow-hidden ${formData.position === pos.id
                                                ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]'
                                                : 'border-slate-800 hover:border-slate-700 bg-slate-950/50'
                                                }`}
                                        >
                                            <div className="relative z-10">
                                                <h3 className={`text-sm font-black tracking-tight mb-1 ${formData.position === pos.id ? 'text-emerald-400' : 'text-slate-200'}`}>{pos.name}</h3>
                                                <div className="flex gap-2">
                                                    <span className="text-[9px] font-black uppercase text-slate-500 px-2 py-0.5 bg-slate-900 rounded">Expected: {pos.size}</span>
                                                    <span className="text-[9px] font-black uppercase text-emerald-500/80 px-2 py-0.5 bg-emerald-500/5 rounded">Ratio: {pos.ratio}</span>
                                                </div>
                                            </div>
                                            {formData.position === pos.id && (
                                                <Sparkles className="absolute -bottom-2 -right-2 text-emerald-500/20 size-12 rotate-12" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Content */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                                <Monitor size={16} />
                            </div>
                            <h2 className="text-lg font-black text-white tracking-tight uppercase">2. Impression Geometry</h2>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-[2rem] space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block ml-1">Client Name</label>
                                        <input
                                            placeholder="SewaIT Ltd."
                                            value={formData.client || ""}
                                            onChange={e => setFormData({ ...formData, client: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block ml-1">Destination URL</label>
                                        <div className="relative flex items-center">
                                            <div className="absolute left-4 text-slate-600"><MousePointerClick size={16} /></div>
                                            <input
                                                placeholder="https://client-site.com"
                                                value={formData.link}
                                                onChange={e => setFormData({ ...formData, link: e.target.value })}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-12 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-700"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block ml-1">Internal Reference</label>
                                        <input
                                            placeholder="Q1 Tech Campaign - Nepal"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`relative group h-full min-h-[160px] rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer overflow-hidden ${formData.imageUrl ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-800 hover:border-emerald-500/30'
                                        }`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} accept="image/*" />

                                    {uploading ? (
                                        <div className="flex flex-col items-center gap-2 animate-pulse">
                                            <div className="size-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
                                            <p className="text-[10px] font-black uppercase text-emerald-500">Writing to ImgBB...</p>
                                        </div>
                                    ) : formData.imageUrl ? (
                                        <div className="absolute inset-0">
                                            <img src={formData.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" key={formData.imageUrl} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 flex flex-col items-center justify-center p-4">
                                                <Sparkles className="text-emerald-500 size-6 mb-2" />
                                                <p className="text-[10px] font-black uppercase text-emerald-400">Creative Synchronized</p>
                                                <p className="text-[9px] text-slate-500 mt-1 uppercase">Click to recalibrate</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="size-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                                <CloudUpload size={24} />
                                            </div>
                                            <p className="text-xs font-black text-slate-300 uppercase tracking-widest leading-relaxed">Transmit Ad Creative</p>
                                            <p className="text-[9px] text-slate-500 mt-2 font-medium">PNG, WEBP, or JPG accepted.<br />Cropping tool will open automatically.</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. Temporal */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                                <CalendarIcon size={16} />
                            </div>
                            <h2 className="text-lg font-black text-white tracking-tight uppercase">3. Temporal Window</h2>
                        </div>

                        <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-[2rem] grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block ml-1">Initialization Date</label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all color-scheme-dark"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block ml-1">Termination Date</label>
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 px-5 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all color-scheme-dark"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Dynamic Preview (Creative Studio) */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24 space-y-8">
                        <div className="bg-[#0c121e] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <div className="bg-slate-900/50 px-8 py-5 border-b border-slate-800 flex justify-between items-center">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Preview Engine</span>
                                <div className="flex gap-1.5">
                                    <div className="size-2 rounded-full bg-red-500/40"></div>
                                    <div className="size-2 rounded-full bg-amber-500/40"></div>
                                    <div className="size-2 rounded-full bg-green-500/40"></div>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* Preview Card */}
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Rendered Output ({activePosition?.ratio || '---'})</p>
                                    <div className={`w-full bg-slate-950 border border-slate-800 rounded-3xl relative overflow-hidden flex items-center justify-center transition-all duration-700 ${activePosition?.id.includes('HERO') ? 'aspect-[3/1]' :
                                        activePosition?.id.includes('SIDEBAR') ? 'aspect-square' :
                                            activePosition?.id.includes('LIST') ? 'aspect-[4/1]' :
                                                activePosition?.id.includes('FOOTER') ? 'aspect-[6/1]' :
                                                    activePosition?.id.includes('BOTTOM') ? 'aspect-[2/1]' :
                                                        'aspect-video'
                                        }`}>
                                        {formData.imageUrl ? (
                                            <>
                                                <img src={formData.imageUrl} className="w-full h-full object-cover" key={formData.imageUrl} />
                                                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-black text-white/90 uppercase tracking-widest">Sponsored</div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center gap-3 opacity-20">
                                                <span className="material-symbols-outlined text-4xl">image_not_supported</span>
                                                <p className="text-[8px] font-black uppercase tracking-[0.3em]">Awaiting Creative...</p>
                                            </div>
                                        )}

                                        {/* Crop Guides Overlay */}
                                        <div className="absolute inset-0 pointer-events-none border-[16px] border-slate-950/20">
                                            <div className="w-full h-full border border-white/5 grid grid-cols-3 grid-rows-3">
                                                <div className="border border-white/5"></div>
                                                <div className="border border-white/5"></div>
                                                <div className="border border-white/5"></div>
                                                <div className="border border-white/5"></div>
                                                <div className="border border-white/5"></div>
                                                <div className="border border-white/5"></div>
                                                <div className="border border-white/5"></div>
                                                <div className="border border-white/5"></div>
                                                <div className="border border-white/5"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Analytics Prediction */}
                                <div className="space-y-4 pt-8 border-t border-slate-900">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Impact Analytics</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 text-center">
                                            <p className="text-xl font-black text-white">~२.रु</p>
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Est. CPC</p>
                                        </div>
                                        <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800 text-center">
                                            <p className="text-xl font-black text-emerald-400">High</p>
                                            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Visibility Ranking</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-3xl flex items-start gap-3">
                                    <Sparkles className="text-emerald-500 size-4 mt-0.5 flex-shrink-0" />
                                    <p className="text-[10px] text-slate-400 leading-relaxed italic">
                                        "Automated systems will monitor this campaign for fraudulent clicks using our zero-trust auditing engine."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx global>{`
                .color-scheme-dark {
                    color-scheme: dark;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1e293b;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
