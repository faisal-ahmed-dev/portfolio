import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Faisal Ahmed — Frontend Engineer",
  description:
    "Frontend / Fullstack Engineer at 3S. Built POS systems for 300+ restaurants, multi-tenant SaaS platforms, and component design systems.",
  keywords: ["Frontend Engineer", "React", "Next.js", "TypeScript", "Full Stack", "Saudi Arabia"],
  openGraph: {
    title: "Faisal Ahmed — Frontend Engineer",
    description: "I architect systems that scale, from POS terminals to multi-tenant SaaS.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#09090b] text-[#f4f4f5]">
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
