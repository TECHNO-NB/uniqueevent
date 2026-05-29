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
  title: "Mithila Tech & IT Solutions",
  description:
    "Mithila Tech & IT Solutions provides modern web development, mobile apps, UI/UX design, and digital solutions to grow your business online.",

  keywords: [
    "Mithilatech",
    "IT Solutions",
    "web development",
    "software company",
    "UI UX design",
    "mobile app development",
    "Nepal IT company",
    "Next.js development",
    "React developer",
    "modern websites"
  ],

  authors: [{ name: "Mithila Tech" }],
  creator: "Mithila Tech & IT Solutions",
  publisher: "Mithilatech",

  metadataBase: new URL("https://mimthilatech.com"),

  openGraph: {
    title: "Mithila Tech & IT Solutions",
    description:
      "We build modern, fast, and scalable websites, apps, and digital products.",
    url: "https://mimthilatech.com",
    siteName: "Mithila Tech & IT Solutions",
    images: [
      {
        url: "/mithilatechlogo.jpeg",
        width: 1200,
        height: 630,
        alt: "Mithilatech Preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },

  twitter: {
    card: "summary_large_image",
    title: "Mithila Tech & IT Solutions",
    description:
      "Modern web development, apps, and UI/UX solutions.",
    images: ["/mithilatechlogo.jpeg"]
  },

  icons: {
    icon: "/mithilatechlogo.jpeg",
    shortcut: "/mithilatechlogo.jpeg",
    apple: "/mithilatechlogo.jpeg"
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
        <Footer/>
        </LayoutWrapper>
        </body>
    </html>
  );
}
