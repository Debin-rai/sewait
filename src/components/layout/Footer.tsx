"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 mt-20 py-12">
            <div className="container mx-auto px-4 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Branding Column */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6 text-slate-900">
                            <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                                <img
                                    src="/assets/images/Final-logo.png"
                                    alt="SajiloSathi Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold">Sajilo<span className="text-primary">Sathi</span></span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed mb-6">
                            Our goal is to simplify citizens&apos; lives by bringing Nepal Government&apos;s digital services to one place.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary transition-colors hover:text-white group">
                                <span className="material-symbols-outlined text-sm text-slate-500 group-hover:text-white">public</span>
                            </Link>
                            <Link href="mailto:contact@sajilosathi.com" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary transition-colors hover:text-white group">
                                <span className="material-symbols-outlined text-sm text-slate-500 group-hover:text-white">mail</span>
                            </Link>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-slate-900 font-bold text-sm mb-6">Important Services</h4>
                        <ul className="space-y-4 text-xs text-slate-600">
                            <li><Link className="hover:text-primary transition-colors" href="#">Passport Service</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Driving License</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">PAN Number</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Land Revenue & Tax</Link></li>
                        </ul>
                    </div>

                    {/* About Column */}
                    <div>
                        <h4 className="text-slate-900 font-bold text-sm mb-6">About Us</h4>
                        <ul className="space-y-4 text-xs text-slate-600">
                            <li><Link className="hover:text-primary transition-colors" href="/about">About Us</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/mission">Our Mission</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/contact">Contact Us</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/privacy">Privacy Policy</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="text-slate-900 font-bold text-sm mb-6">Get Notifications</h4>
                        <p className="text-slate-600 text-xs leading-relaxed mb-6">
                            Register to receive important government notices directly to your email.
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="bg-slate-50 border border-slate-200 rounded-lg text-xs px-4 py-2 flex-1 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                            />
                            <button className="bg-primary text-white text-[10px] font-bold px-4 py-2 rounded-lg hover:bg-primary-light transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500">
                    <p className="uppercase">© 2024 SajiloSathi Inc. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">OFFICIAL UTILITY PLATFORM BY</span>
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-slate-700 uppercase tracking-wider">Debin Rai</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
