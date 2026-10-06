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
  metadataBase: new URL("https://portofolio-abyanzz.vercel.app"),

  title: {
    default: "Abyannz. — Web Developer",
    template: "%s | Abyannz.",
  },

  description:
    "Muhammad Abyan Sudjatmiko — Web Developer portfolio showcasing projects, skills, and learning journey.",

  openGraph: {
    title: "Abyannz. — Web Developer",
    description:
      "Muhammad Abyan Sudjatmiko — Web Developer portfolio showcasing projects, skills, and learning journey.",
    url: "https://portofolio-abyanzz.vercel.app",
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
      <body className="site-background flex min-h-full flex-col">
        <Intro />
        {children}
      </body>
    </html>
  );
}