import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Toaster } from "@/components/ui/sonner";
import { PersonJsonLd } from "@/components/seo/JsonLd";
import { VisitorTracker } from "@/components/analytics/VisitorTracker";
import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = getSiteUrl();
const TITLE = "Faisal Ahmed — Software Engineer";
const DESCRIPTION =
  "Software Engineer building scalable systems — POS for 300+ restaurants, multi-tenant SaaS platforms, and component design systems.";
const OG_DESCRIPTION =
  "I architect systems that scale — from offline-first POS to real-time multi-tenant SaaS.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Faisal Ahmed" },
  description: DESCRIPTION,
  keywords: [
    "Software Engineer",
    "Frontend Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: OG_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: "Faisal Ahmed",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: OG_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  other: { "theme-color": "#09090b" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#09090b] text-[#f4f4f5]">
        <PersonJsonLd />
        <AppProviders>
          {children}
          <Toaster />
          <VisitorTracker />
        </AppProviders>
      </body>
    </html>
  );
}
