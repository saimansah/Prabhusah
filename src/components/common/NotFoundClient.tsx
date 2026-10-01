"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppImage as Image } from "@/components/ui/AppImage";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Footer } from "./Footer";
import { Button } from "@/components/ui/Button";
import { socialLinks } from "@/data/socials";
import {
  Home,
  ArrowLeft,
  MessageSquare,
  Tractor,
  Award,
  Newspaper,
  Share2,
  Mail,
  MapPin,
  CheckCircle,
  Copy,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";

export const NotFoundClient: React.FC = () => {
  const { t, language } = useLanguage();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const navCards = [
    {
      href: "/#about",
      title: t("notFoundNavHomeTitle"),
      desc: t("notFoundNavHomeDesc"),
      icon: <Home className="w-5 h-5 text-amber-400" />,
      tag: language === "EN" ? "Overview" : "अवलोकन",
      color: "from-amber-500/10 to-transparent border-amber-500/20",
    },
    {
      href: "/#grievance",
      title: t("notFoundNavGrievanceTitle"),
      desc: t("notFoundNavGrievanceDesc"),
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      tag: language === "EN" ? "Active Desk" : "प्रत्यक्ष दर्ता",
      color: "from-emerald-500/10 to-transparent border-emerald-500/20",
    },
    {
      href: "/#development",
      title: t("notFoundNavDevTitle"),
      desc: t("notFoundNavDevDesc"),
      icon: <Tractor className="w-5 h-5 text-saffron-400" />,
      tag: language === "EN" ? "100% Free Irrigation" : "निःशुल्क सिँचाइ",
      color: "from-saffron-500/10 to-transparent border-saffron-500/20",
    },
    {
      href: "/#about",
      title: t("notFoundNavJourneyTitle"),
      desc: t("notFoundNavJourneyDesc"),
      icon: <Award className="w-5 h-5 text-blue-400" />,
      tag: language === "EN" ? "4x MP Mandates" : "४ पटक सांसद",
      color: "from-blue-500/10 to-transparent border-blue-500/20",
    },
    {
      href: "/#news",
      title: t("notFoundNavNewsTitle"),
      desc: t("notFoundNavNewsDesc"),
      icon: <Newspaper className="w-5 h-5 text-rose-400" />,
      tag: language === "EN" ? "Media & Speeches" : "मिडिया कभरेज",
      color: "from-rose-500/10 to-transparent border-rose-500/20",
    },
    {
      href: "/#social",
      title: t("notFoundNavSocialTitle"),
      desc: t("notFoundNavSocialDesc"),
      icon: <Share2 className="w-5 h-5 text-purple-400" />,
      tag: language === "EN" ? "YouTube • FB • TikTok" : "प्रत्यक्ष च्यानल",
      color: "from-purple-500/10 to-transparent border-purple-500/20",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-300">
      {/* Background Ambience & Radial Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-saffron-500/15 via-rose-500/10 to-transparent blur-[120px]" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-20 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 shadow-2xl py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-saffron-500 via-rose-500 to-amber-400 shrink-0 shadow-glow-saffron transition-transform group-hover:scale-105">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-950">
                <Image
                  src="/images/prabhu-sah-profile.png"
                  alt="Hon. Prabhu Sah"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white p-0.5 shadow-md flex items-center justify-center border border-red-500">
                <Image
                  src="/images/election-symbol.png"
                  alt="Election Symbol - Phone"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {language === "EN" ? "Prabhu Sah" : "प्रभु साह"}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 font-medium">
                {language === "EN"
                  ? "Chairman, Aam Janata Party (AJP)"
                  : "अध्यक्ष, आम जनता पार्टी (आजपा)"}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/" className="hidden sm:inline-flex">
              <Button
                variant="outline"
                size="sm"
                icon={<Home className="w-4 h-4 text-amber-400" />}
                className="font-semibold"
              >
                {t("notFoundBackHome")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 w-full">
        {/* Hero 404 Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>{t("notFoundBadge")}</span>
          </motion.div>

          {/* Large Glowing 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative mb-6 select-none"
          >
            <h1 className="font-display text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tighter bg-gradient-to-b from-white via-slate-200 to-slate-600 bg-clip-text text-transparent drop-shadow-2xl">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <span className="font-display text-9xl sm:text-[12rem] font-black text-saffron-500/10 blur-2xl">
                404
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-4"
          >
            {t("notFoundHeading")}
          </motion.h2>

          {/* Descriptive text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-sm sm:text-base text-slate-300/90 leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            {t("notFoundDesc")}
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Link href="/">
              <Button
                variant="primary"
                size="lg"
                icon={<Home className="w-5 h-5" />}
                className="font-bold shadow-glow-saffron px-6"
              >
                {t("notFoundBackHome")}
              </Button>
            </Link>

            <button
              onClick={() => {
                if (typeof window !== "undefined" && window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = "/";
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 transition-all text-sm font-semibold shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("notFoundGoBack")}</span>
            </button>

            <Link href="/#grievance">
              <Button
                variant="outline"
                size="lg"
                icon={<MessageSquare className="w-4 h-4 text-emerald-400" />}
                className="font-semibold border-emerald-500/40 hover:bg-emerald-500/10 text-emerald-300"
              >
                {t("navGrievance")}
              </Button>
            </Link>
          </motion.div>
        </section>

        {/* Quick Navigation Cards (SEO pathways for users & search bots) */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-800/80">
            <h3 className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-saffron-500" />
              {t("notFoundQuickNavTitle")}
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              {language === "EN" ? "Explore Key Portals" : "प्रमुख खण्डहरू"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {navCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * idx }}
              >
                <Link
                  href={card.href}
                  className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900/95 border ${card.color} hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-inner group-hover:scale-110 transition-transform">
                        {card.icon}
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/50">
                        {card.tag}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-white text-base group-hover:text-amber-300 transition-colors mb-1.5 flex items-center justify-between">
                      <span>{card.title}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Direct Secretariat Support Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-saffron-500/15 border border-saffron-500/30 text-saffron-400">
                  <Mail className="w-5 h-5" />
                </span>
                <h4 className="font-display font-bold text-lg text-white">
                  {t("notFoundDirectHelp")}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t("notFoundDirectHelpDesc")}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  {language === "EN"
                    ? "Maulapur, Rautahat-3 (Field Office)"
                    : "मौलापुर, रौतहट–३ (सम्पर्क कार्यालय)"}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {language === "EN"
                    ? "Koteshwor-32, Kathmandu (Central Office)"
                    : "कोटेश्वर–३२, काठमाडौं (केन्द्रीय कार्यालय)"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">
                      {language === "EN" ? "Email Copied!" : "इमेल कपी भयो!"}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>{socialLinks.email}</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${socialLinks.email}?subject=Portal%20Inquiry%20/%20Janata%20Sunwai`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 hover:from-saffron-600 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-glow-saffron transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>{language === "EN" ? "Email Secretariat" : "इमेल पठाउनुहोस्"}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Official Footer */}
      <Footer />
    </div>
  );
};
