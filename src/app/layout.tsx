import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

import { StructuredData } from "@/components/common/StructuredData";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.prabhu-sah.com.np"),
  title: {
    default: "Prabhu Sah | Official Portal | Chairman, Aam Janata Party (AJP)",
    template: "%s | Hon. Prabhu Sah Official Portal",
  },
  description:
    "Official bilingual portal and citizen grievance system (Janata Sunwai) of Hon. Prabhu Sah. 4-time Former Member of Parliament (Rautahat-3) and former Cabinet Minister of Urban Development, Law, and Land Management.",
  keywords: [
    "Prabhu Sah",
    "प्रभु साह",
    "Aam Janata Party",
    "AJP",
    "आम जनता पार्टी",
    "Rautahat 3",
    "Janata Sunwai",
    "जनता सुनुवाइ",
    "Nepal Parliament",
    "Madhani Mahotsav",
    "Patauradham",
    "Free Irrigation Nepal",
    "Dalit Basti Maryadpur",
    "prabhu-sah.com.np",
    "Madhesh Province Leader",
  ],
  authors: [{ name: "Personal Secretariat of Hon. Prabhu Sah" }],
  creator: "Hon. Prabhu Sah Secretariat",
  publisher: "Aam Janata Party (AJP)",
  alternates: {
    canonical: "https://www.prabhu-sah.com.np",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/election-symbol.png",
    shortcut: "/images/election-symbol.png",
    apple: "/images/election-symbol.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.prabhu-sah.com.np",
    siteName: "Hon. Prabhu Sah Official Portal",
    title: "Hon. Prabhu Sah | Official Political & Citizen Portal",
    description:
      "Voice of the Common Citizen, Architect of Modern Rautahat. Direct citizen engagement portal and Janata Sunwai grievance desk.",
    locale: "ne_NP",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/images/prabhu-sah-profile.png",
        width: 800,
        height: 1000,
        alt: "Hon. Prabhu Sah - Chairman, Aam Janata Party",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hon. Prabhu Sah | Official Political & Citizen Portal",
    description:
      "Voice of the Common Citizen, Architect of Modern Rautahat. Direct citizen engagement portal and Janata Sunwai grievance desk.",
    images: ["/images/prabhu-sah-profile.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('prabhu_sah_theme') === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <StructuredData />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans min-h-screen antialiased selection:bg-amber-500/30 selection:text-amber-300">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
