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
  src: "../../public/assets/fonts/NotoSansDevanagari-VariableFont_wdth,wght.ttf",
  variable: "--font-noto-sans-devanagari",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SewaIT - Digital Utility Platform",
  description: "SewaIT - Bringing Nepal Government digital services to one place with modern technology.",
  icons: {
    icon: [
      { url: "/assets/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/favicon_io/favicon.ico" },
    ],
    apple: "/assets/favicon_io/apple-touch-icon.png",
  },
  manifest: "/assets/favicon_io/site.webmanifest",
};

import ClientLayout from "./ClientLayout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ne" className="light" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
      </head>
      <body
        className={`${inter.variable} ${mukta.variable} ${notoSansDevanagari.variable} antialiased bg-background-light text-slate-800 font-body`}
      >
        <ClientLayout>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ClientLayout>
      </body>
    </html>
  );
}
