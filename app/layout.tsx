import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "SARA by Saadhyam — Your AI Sales Team. Always Ready.",
  description:
    "SARA is your AI-powered sales teammate that engages prospects, conducts natural voice conversations, qualifies leads, schedules meetings, and collaborates with your sales team around the clock.",
  openGraph: {
    title: "SARA by Saadhyam — Your AI Sales Team. Always Ready.",
    description:
      "Engage prospects, qualify opportunities, and support your sales pipeline with SARA by Saadhyam.",
    url: "https://sara.saadhyam.com/",
    siteName: "SARA",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased bg-white text-[#111111]">
        {children}
      </body>
    </html>
  );
}
