import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "CHAMELEON - Premium Creative Digital Agency & IT Services",
  description: "Chameleon IT Services: High-performance Next.js websites, native desktop apps, mobile systems, brand logo design, videography, SEO authority growth, and event coordination.",
  keywords: [
    "Chameleon IT Services",
    "Digital Agency",
    "Website Development",
    "Desktop App Development",
    "Mobile App Development",
    "UI/UX Design",
    "Branding",
    "Logo Design",
    "Videography",
    "SEO",
    "Social Media Marketing",
    "Event Management",
  ],
  icons: {
    icon: [
      { url: "/CH.png", href: "/CH.png" },
    ],
    shortcut: "/CH.png",
    apple: "/CH.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
