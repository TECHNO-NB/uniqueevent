// @ts-nocheck
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unique Events Planner | Wedding & Event Management",
  description:
    "Unique Events Planner specializes in weddings, engagements, receptions, birthday parties, corporate events, and unforgettable celebrations. We turn your dream events into reality.",

  keywords: [
    "Unique Events Planner",
    "wedding planner",
    "event management",
    "marriage planner",
    "wedding decoration",
    "engagement ceremony",
    "birthday event planning",
    "corporate events",
    "event organizer",
    "wedding coordinator",
    "event decoration",
    "Nepal wedding planner",
    "luxury weddings",
    "party planner"
  ],

  authors: [{ name: "Unique Events Planner" }],
  creator: "Unique Events Planner",
  publisher: "Unique Events Planner",

  metadataBase: new URL("https://uniqueeventsplanner.com"),

  openGraph: {
    title: "Unique Events Planner | Wedding & Event Management",
    description:
      "Creating memorable weddings, receptions, engagements, birthdays, and special events with professional planning and elegant decoration.",
    url: "https://uniqueeventsplanner.com",
    siteName: "Unique Events Planner",
    images: [
      {
        url: "/logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Unique Events Planner"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Unique Events Planner",
    description:
      "Professional wedding and event planning services for unforgettable celebrations.",
    images: ["/logo.jpeg"]
  },

  icons: {
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg"
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LayoutWrapper>
          {children}
          <Footer />
        </LayoutWrapper>
      </body>
    </html>
  );
}