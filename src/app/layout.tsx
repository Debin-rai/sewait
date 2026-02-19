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
  description: "SewaIT by Debin Rai: Your all-in-one Nepali utility hub. Features include Live Nepali Calendar with Tithi, Daily Gold/Silver rates, accurate Weather updates, NEPSE stock data, and comprehensive official Government Service Guides.",
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
    description: "SewaIT by Debin Rai: Your all-in-one Nepali utility hub. Features include Live Nepali Calendar with Tithi, Daily Gold/Silver rates, accurate Weather updates, NEPSE stock data, and comprehensive official Government Service Guides.",
    url: "https://sewait.up.railway.app",
    siteName: "SewaIT",
    locale: "ne_NP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SewaIT – Nepali Calendar, Gold Rates & Official Guides",
    description: "SewaIT by Debin Rai: Your all-in-one Nepali utility hub. Features include Live Nepali Calendar with Tithi, Daily Gold/Silver rates, accurate Weather updates, NEPSE stock data, and comprehensive official Government Service Guides.",
    creator: "@SewaIT",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
              "logo": "https://sewait.up.railway.app/apple-touch-icon.png",
              "alternateName": ["Sewa IT"],
              "founder": {
                "@type": "Person",
                "name": "Debin Rai",
                "jobTitle": "Founder & Developer",
                "url": "https://sewait.up.railway.app",
                "sameAs": []
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Debin Rai",
              "url": "https://sewait.up.railway.app",
              "jobTitle": "Founder of SewaIT",
              "worksFor": {
                "@type": "Organization",
                "name": "SewaIT"
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
