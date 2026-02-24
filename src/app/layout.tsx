import type { Metadata, Viewport } from "next";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { Mukta } from "next/font/google";
import "./globals.css";

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1a355b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://sewait.up.railway.app"),
  title: {
    default: "SewaIT – Nepali Calendar, Official Guides & Digital Utilities",
    template: "%s | SewaIT"
  },
  description: "SewaIT by Debin C. Rai: The ultimate Digital Nepal hub. Featuring a live Nepali Calendar with Tithi, government service guides (Passport, License, PAN), weather updates, and the Sewa AI assistant.",
  keywords: [
    "SewaIT", "Debin C. Rai", "SewaIT Founder", "Nepali Calendar 2081", "Nepali Patro", 
    "Sarkari Guides", "Nepal government services", "Passport Nepal", "Driving License Nepal", 
    "PAN registration Nepal", "आजको मिती", "नेपाली पात्रो", "Sewa AI", "Sarkari AI", "Nepal AI Assistant"
  ],
  authors: [{ name: "Debin C. Rai", url: "https://sewait.up.railway.app" }],
  creator: "Debin C. Rai",
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
    title: "SewaIT – Nepali Calendar & Official Guides",
    description: "SewaIT by Debin C. Rai: Access Nepali Calendar, Tithi, Government Service Guides, and AI Assistance in one unified platform.",
    url: "https://sewait.up.railway.app",
    siteName: "SewaIT",
    locale: "ne_NP",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "SewaIT - Simplifying Digital Nepal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SewaIT – Nepali Calendar & Official Guides",
    description: "Your all-in-one Nepali utility hub. Live Calendar, Government Guides, and Sewa AI Assistant.",
    creator: "@SewaIT",
    images: ["/web-app-manifest-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
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
};

import ClientLayout from "./ClientLayout";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import SmoothScroll from "@/components/SmoothScroll";
import PwaPrompt from "@/components/PwaPrompt";
import CookieConsent from "@/components/CookieConsent";
import FluidCursor from "@/components/animations/FluidCursor";

import prisma from "@/lib/prisma";
import Chatbot from "@/components/Chatbot";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let chatbotId = "";
  try {
    const config = await prisma.systemConfig.findUnique({
      where: { key: 'API_CHATBOT_ID' }
    });
    chatbotId = config?.value || "";
  } catch (e) {
    console.warn("Chatbot config load failed", e);
  }

  return (
    <html lang="ne" className="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="google-site-verification" content="dp_oL0KNsg0OGz0oNnciIxqsjzUw_QsFVzmTywxd8NU" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
        {/* Canonical Link */}
        <link rel="canonical" href="https://sewait.up.railway.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SewaIT",
              "alternateName": ["Sewa IT"],
              "url": "https://sewait.up.railway.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://sewait.up.railway.app/guides?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SewaIT",
              "url": "https://sewait.up.railway.app",
              "logo": "https://sewait.up.railway.app/web-app-manifest-512x512.png",
              "alternateName": ["Sewa IT"],
              "founder": {
                "@type": "Person",
                "name": "Debin C. Rai",
                "jobTitle": "SewaIT Founder & Developer",
                "url": "https://sewait.up.railway.app",
                "sameAs": [
                  "https://github.com/Debin-rai",
                  "https://twitter.com/SewaIT",
                  "https://facebook.com/SewaIT"
                ]
              },
              "hasPart": [
                {
                  "@type": "Service",
                  "name": "Sewa AI",
                  "url": "https://sewait.up.railway.app/sewa-ai"
                },
                {
                  "@type": "Service",
                  "name": "Nepali Calendar",
                  "url": "https://sewait.up.railway.app/calendar"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${mukta.variable} antialiased bg-background-light text-slate-800 font-body`}
      >
        <SmoothScroll>
          <ClientLayout>
            <Header />
            {children}
            <Footer />
            <AnalyticsTracker />
            <Chatbot id={chatbotId} />
            <PwaPrompt />
            <CookieConsent />
            <FluidCursor />
          </ClientLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}
