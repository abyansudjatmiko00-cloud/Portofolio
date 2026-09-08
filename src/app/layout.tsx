import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Intro from "@/components/Intro";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abyannz.",
  description: "Muhammad Abyan Sudjatmiko — Web Developer",

  openGraph: {
    title: "Abyannz.",
    description: "Muhammad Abyan Sudjatmiko — Web Developer",
    url: "https://portfolio-abyanzz.vercel.app",
    siteName: "Abyannz.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abyannz. — Web Developer",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Intro />
        {children}
      </body>
    </html>
  );
}