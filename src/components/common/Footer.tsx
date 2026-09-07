"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { socialLinks } from "@/data/socials";
import {
  MapPin,
  Mail,
  FileText,
  ExternalLink,
  ShieldCheck,
  Heart,
  Youtube,
  Facebook
} from "lucide-react";

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 text-slate-400 overflow-hidden pt-16 pb-12">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-saffron-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Col 1: Identity & Party Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-saffron-500/80 shadow-glow-saffron">
                <Image
                  src="/images/prabhu-sah-profile.png"
                  alt="Hon. Prabhu Sah"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-lg leading-tight">
                  {language === "EN" ? "Hon. Prabhu Sah" : "माननीय प्रभु साह"}
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  {language === "EN"
                    ? "Chairman, Aam Janata Party (AJP)"
                    : "अध्यक्ष, आम जनता पार्टी (आजपा)"}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t("footerAboutText")}
            </p>

            {/* Official Symbol Box */}
            <div className="inline-flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm">
              <div className="relative w-7 h-7 bg-white rounded-lg p-0.5 flex items-center justify-center border border-red-500">
                <Image
                  src="/images/election-symbol.png"
                  alt="Aam Janata Party Mobile Phone Symbol"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div className="text-[11px]">
                <p className="text-white font-semibold">{t("electionSymbolBadge")}</p>
                <p className="text-slate-400">
                  {language === "EN" ? "" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Col 2: Field Office (Maulapur, Rautahat) */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-saffron-400" />
              {t("footerConstituencyOffice")}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === "EN" ? socialLinks.constituencyOffice : socialLinks.constituencyOfficeNe}
            </p>
            <div className="pt-2 space-y-1.5 text-xs text-slate-400">
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-2 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{socialLinks.email}</span>
              </a>
            </div>
          </div>

          {/* Col 3: Central Office (Kathmandu) */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              {t("footerCentralOffice")}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === "EN" ? socialLinks.centralOffice : socialLinks.centralOfficeNe}
            </p>
            <div className="pt-2 space-y-1.5 text-xs text-slate-400">
              <a
                href={`mailto:${socialLinks.email}`}
                className="flex items-center gap-2 hover:text-amber-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{socialLinks.email}</span>
              </a>
            </div>
          </div>

          {/* Col 4: Verified Channels & Policy Documents */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              {t("footerQuickLinks")}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="#grievance"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {t("navGrievance")} (Janata Sunwai)
                </a>
              </li>
              <li>
                <a
                  href="#development"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-saffron-400" />
                  {language === "EN" ? "Development Impact Dossier" : "विकास कार्य प्रतिवेदन"}
                </a>
              </li>
              <li>
                <a
                  href="https://english.ratopati.com/story/73751/forming-a-front-with-long-term-thinking-as-the-country-is-pushed-towards-crisis-prabhu-sah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2 text-slate-400"
                >
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  {language === "EN" ? "National Political Vision" : "राष्ट्रिय राजनीतिक मार्गचित्र"}
                </a>
              </li>
            </ul>

            {/* Social Icons Bar */}
            <div className="pt-2">
              <p className="text-xs text-slate-400 mb-2 font-medium">
                {language === "EN" ? "Verified Official Channels:" : "आधिकारिक सामाजिक सञ्जाल:"}
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition-all shadow-sm"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-red-500 hover:border-red-500/50 transition-all shadow-sm"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-pink-400 hover:border-pink-500/50 transition-all shadow-sm font-bold text-xs flex items-center justify-center w-9 h-9"
                  aria-label="TikTok"
                >
                  <span>TT</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026{" "}
            <a
              href="https://saimansah.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-medium underline-offset-4 hover:underline transition-colors"
            >
              Saiman Sah
            </a>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">{language === "EN" ? "Hon. Prabhu Sah Personal Secretariat" : "माननीय प्रभु साहको व्यक्तिगत सचिवालय"}</span>
            <span className="inline-block w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-amber-500/80 font-medium">Aam Janata Party (AJP)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
