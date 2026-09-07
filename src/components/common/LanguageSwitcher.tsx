"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Languages, Moon, Sun } from "lucide-react";
import clsx from "clsx";

export const LanguageSwitcher: React.FC<{ showThemeToggle?: boolean }> = ({
  showThemeToggle = true,
}) => {
  const { language, setLanguage, theme, toggleTheme } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      {/* Bilingual Toggle Pill */}
      <div className="inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-inner">
        <button
          onClick={() => setLanguage("EN")}
          className={clsx(
            "px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer",
            language === "EN"
              ? "bg-gradient-to-r from-saffron-500 to-amber-500 text-slate-950 shadow-sm"
              : "text-slate-400 hover:text-white"
          )}
          title="Switch to English"
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("NE")}
          className={clsx(
            "px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer",
            language === "NE"
              ? "bg-gradient-to-r from-saffron-500 to-amber-500 text-slate-950 shadow-sm"
              : "text-slate-400 hover:text-white"
          )}
          title="नेपाली भाषामा हेर्नुहोस्"
        >
          नेपाली
        </button>
      </div>

      {/* Theme Toggle */}
      {showThemeToggle && (
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-400 hover:text-amber-400 transition-colors backdrop-blur-md cursor-pointer"
          aria-label="Toggle theme"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-300" />
          )}
        </button>
      )}
    </div>
  );
};
