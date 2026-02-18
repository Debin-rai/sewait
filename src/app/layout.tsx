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
  title: "SewaIT – Nepali Calendar, Gold Rates & Official Guides",
  description: "SewaIT is a Nepali utility platform providing today’s Nepali date, Tithi, gold rates, weather updates, and official government guides for Nepalis.",
  keywords: ["SewaIT", "Debin Rai", "Nepali Calendar", "Sarkari Guides", "Gold Price Nepal", "today's date", "tithi", "Nepal government services", "आजको मिती", "सुन चाँदी मूल्य", "NEPSE"],
  authors: [{ name: "Debin Rai", url: "https://sewait.up.railway.app" }],
  creator: "Debin Rai",
  publisher: "SewaIT",
  applicationName: "SewaIT",
  appleWebApp: {
    title: "SewaIT",
    capable: true,
    statusBarStyle: "default",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SewaIT – Nepali Calendar, Gold Rates & Official Guides",
    description: "SewaIT is a Nepali utility platform providing today’s Nepali date, Tithi, gold rates, weather updates, and official government guides for Nepalis.",
    url: "https://sewait.up.railway.app",
    siteName: "SewaIT",
    locale: "ne_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SewaIT – Nepali Calendar, Gold Rates & Official Guides",
    description: "SewaIT is a Nepali utility platform providing today’s Nepali date, Tithi, gold rates, weather updates, and official government guides for Nepalis.",
    creator: "@SewaIT",
  },
  icons: {
    icon: [
      { url: "/assets/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SewaIT",
              "url": "https://sewait.up.railway.app",
              "logo": "https://sewait.up.railway.app/assets/favicon/web-app-manifest-512x512.png",
              "alternateName": ["Sewa IT", "SajiloSathi"],
              "founder": {
                "@type": "Person",
                "name": "Debin Rai"
              }
            })
          }}
        />
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
