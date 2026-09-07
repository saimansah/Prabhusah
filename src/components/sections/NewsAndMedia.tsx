"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { newsArticles } from "@/data/newsData";
import { NewsArticle } from "@/types";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  Newspaper, 
  ExternalLink, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Scale, 
  Vote, 
  Users, 
  Flame,
  Globe2
} from "lucide-react";

export const NewsAndMedia: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: language === "EN" ? "All Coverage" : "सबै समाचार" },
    { id: "National Politics", label: language === "EN" ? "National Politics" : "राष्ट्रिय राजनीति" },
    { id: "Electoral Reform", label: language === "EN" ? "Electoral Reform" : "निर्वाचन सुधार" },
    { id: "Anti-Corruption", label: language === "EN" ? "Anti-Corruption" : "भ्रष्टाचार नियन्त्रण" },
    { id: "Governance", label: language === "EN" ? "Governance" : "सुशासन" },
  ];

  const filteredNews = newsArticles.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  const getSourceBadgeStyle = (src: string) => {
    if (src.includes("Ratopati")) {
      return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    }
    if (src.includes("Nepal News")) {
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    }
    return "bg-amber-500/10 text-amber-400 border-amber-500/30";
  };

  return (
    <section id="news" className="relative py-24 bg-slate-950/95 border-t border-slate-800/80 overflow-hidden">
      {/* Atmosphere Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="crimson" size="md" icon={<Newspaper className="w-3.5 h-3.5" />}>
            {t("newsSectionBadge")}
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            {t("newsSectionTitle")}
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            {t("newsSectionSubtitle")}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <Tabs
            tabs={categories}
            activeTab={activeCategory}
            onChange={(id) => setActiveCategory(id)}
          />
        </div>

        {/* News Cards Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredNews.map((article) => (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-glass group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Card Meta Bar: Source & Date */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${getSourceBadgeStyle(
                        article.source
                      )}`}
                    >
                      {article.source}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-amber-400/90 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      {language === "EN" ? article.category : article.categoryNe}
                    </span>
                    {article.featured && (
                      <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-rose-400" />
                        {language === "EN" ? "Spotlight" : "विशेष"}
                      </span>
                    )}
                  </div>

                  {/* Headline */}
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {language === "EN" ? article.title : article.titleNe}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {language === "EN" ? article.summary : article.summaryNe}
                  </p>
                </div>

                {/* External Link Action Button */}
                <div className="pt-5 mt-4 border-t border-slate-800/80">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 py-2 px-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 transition-all group/btn"
                  >
                    <span className="flex items-center gap-2">
                      <Globe2 className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-amber-400" />
                      {t("newsReadReport")}
                    </span>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover/btn:text-amber-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
