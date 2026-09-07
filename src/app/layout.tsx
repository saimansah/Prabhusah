import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

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
  metadataBase: new URL("https://prabhusah.org.np"),
  title: "Prabhu Sah | Official Portal | Chairman, Aam Janata Party (AJP) | 4x Former MP",
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
    "Nepal Parliament",
    "Madhani Mahotsav",
    "Patauradham",
    "Free Irrigation Nepal",
    "Dalit Basti Maryadpur",
  ],
  authors: [{ name: "Personal Secretariat of Hon. Prabhu Sah" }],
  icons: {
    icon: "/images/election-symbol.png",
  },
  openGraph: {
    title: "Hon. Prabhu Sah | Official Political & Citizen Portal",
    description:
      "Voice of the Common Citizen, Architect of Modern Rautahat. Direct citizen engagement portal.",
    images: [
      {
        url: "/images/prabhu-sah-profile.png",
        width: 800,
        height: 1000,
        alt: "Hon. Prabhu Sah",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${jakarta.variable} ${outfit.variable}`}>
      <body className="bg-slate-950 text-slate-100 font-sans min-h-screen antialiased selection:bg-amber-500/30 selection:text-amber-300">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
