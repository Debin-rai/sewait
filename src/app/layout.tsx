import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { Mukta } from "next/font/google";

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["latin", "devanagari"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const notoSansDevanagari = localFont({
  src: "../../public/assets/fonts/NotoSansDevanagari.ttf",
  variable: "--font-noto-sans-devanagari",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "SewaIT - Nepali Calendar, Gold Rates & Official Guides",
    template: "%s | SewaIT by Debin Rai",
  },
  description: "Official Nepali utility portal for real-time Gold/Silver rates, Nepali Calendar (Patro), and Government Service Guides.",
  keywords: ["SewaIT", "Debin Rai", "Nepali Calendar", "Sarkari Guides", "Gold Price Nepal", "today's date", "tithi", "Nepal government services", "आजको मिती", "सुन चाँदी मूल्य", "NEPSE"],
  authors: [{ name: "Debin Rai", url: "https://sewait.up.railway.app" }],
  creator: "Debin Rai",
  publisher: "SewaIT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SewaIT - Digital Utility Platform for Nepalis",
    description: "Your daily companion for Nepali Calendar, Gold Rates, and Government Services.",
    url: "https://sewait.up.railway.app",
    siteName: "SewaIT",
    locale: "ne_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SewaIT - Digital Utility Platform",
    description: "Founded by Debin Rai, SewaIT simplifies digital life for Nepalis.",
    creator: "@SewaIT",
  },
  icons: {
    icon: [
      { url: "/assets/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon/favicon.ico" },
    ],
    apple: "/assets/favicon/apple-touch-icon.png",
  },
  manifest: "/assets/favicon/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "dp_oL0KNsg0OGz0oNnciIxqsjzUw_QsFVzmTywxd8NU",
  },
};

import ClientLayout from "./ClientLayout";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import SmoothScroll from "@/components/SmoothScroll";
import PwaPrompt from "@/components/PwaPrompt";
import CookieConsent from "@/components/CookieConsent";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ne" className="light" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="dp_oL0KNsg0OGz0oNnciIxqsjzUw_QsFVzmTywxd8NU" />
      </head>
      <body
        className={`${inter.variable} ${mukta.variable} ${notoSansDevanagari.variable} antialiased bg-background-light text-slate-800 font-body`}
      >
        <SmoothScroll>
          <ClientLayout>
            {children}
            <AnalyticsTracker />
            <PwaPrompt />
            <CookieConsent />
          </ClientLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}
