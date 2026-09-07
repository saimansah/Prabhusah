"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { Menu, X, MessageSquare, PhoneCall, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t("navAbout") },
    { href: "#development", label: t("navDevelopment") },
    { href: "#news", label: t("navNews") },
    { href: "#social", label: t("navSocial") },
    { href: "#grievance", label: t("navGrievance") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-xl bg-slate-950/85 border-b border-white/10 shadow-2xl py-3"
          : "backdrop-blur-md bg-slate-950/60 border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Candidate Badge */}
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
            {/* Election Symbol Mini Badge */}
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

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-saffron-400 to-amber-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <LanguageSwitcher />

          <a href="#grievance">
            <Button
              variant="primary"
              size="sm"
              icon={<MessageSquare className="w-4 h-4" />}
              className="font-bold animate-pulse-slow shadow-glow-saffron"
            >
              {t("navConnectCTA")}
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          <LanguageSwitcher showThemeToggle={false} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6"
          >
            <nav className="flex flex-col gap-2 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-amber-400 transition-all"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-3">
              <a
                href="#grievance"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button
                  variant="primary"
                  size="md"
                  icon={<MessageSquare className="w-4 h-4" />}
                  className="w-full justify-center"
                >
                  {t("navConnectCTA")}
                </Button>
              </a>

              <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-400">
                <span>{language === "EN" ? "Election Symbol" : "चुनाव चिन्ह"}</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                  <Image
                    src="/images/election-symbol.png"
                    alt="Mobile Phone Symbol"
                    width={14}
                    height={14}
                  />
                  {language === "EN" ? "Mobile Phone (AJP)" : "मोबाइल फोन (आजपा)"}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
