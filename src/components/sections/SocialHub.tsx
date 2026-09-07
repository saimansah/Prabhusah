"use client";

import React, { useState } from "react";
import { AppImage as Image } from "@/components/ui/AppImage";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { socialLinks, socialFeedItems } from "@/data/socials";
import { SocialPost } from "@/types";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  Share2, 
  ExternalLink, 
  Play, 
  Youtube, 
  Facebook, 
  Radio, 
  Flame, 
  ThumbsUp, 
  Eye, 
  MessageCircle,
  Video
} from "lucide-react";

export const SocialHub: React.FC = () => {
  const { t, language } = useLanguage();
  const [activePlatform, setActivePlatform] = useState<string>("All");

  const platformTabs = [
    { id: "All", label: language === "EN" ? "All Feeds" : "सबै सञ्जाल", icon: <Share2 className="w-3.5 h-3.5" /> },
    { id: "youtube", label: "YouTube Speeches", icon: <Youtube className="w-3.5 h-3.5 text-red-500" /> },
    { id: "facebook", label: "Facebook Updates", icon: <Facebook className="w-3.5 h-3.5 text-blue-500" /> },
    { id: "tiktok", label: "TikTok Grassroots", icon: <Radio className="w-3.5 h-3.5 text-pink-500" /> },
  ];

  const filteredItems = socialFeedItems.filter((item) => {
    if (activePlatform === "All") return true;
    return item.platform === activePlatform;
  });

  return (
    <section id="social" className="relative py-24 bg-slate-950 border-t border-slate-800/80 overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="saffron" size="md" icon={<Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />}>
            {t("socialSectionBadge")}
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            {t("socialSectionTitle")}
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            {t("socialSectionSubtitle")}
          </p>
        </div>

        {/* Platform Quick Links Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/50 text-slate-200 hover:text-white transition-all shadow-sm group"
          >
            <Youtube className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-semibold">YouTube Channel</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 text-slate-200 hover:text-white transition-all shadow-sm group"
          >
            <Facebook className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs sm:text-sm font-semibold">Facebook Community</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <a
            href={socialLinks.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/50 text-slate-200 hover:text-white transition-all shadow-sm group"
          >
            <span className="w-4 h-4 rounded-full bg-slate-800 text-pink-400 font-bold text-[10px] flex items-center justify-center group-hover:scale-110 transition-transform">
              TT
            </span>
            <span className="text-xs sm:text-sm font-semibold">TikTok Official</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <Tabs
            tabs={platformTabs}
            activeTab={activePlatform}
            onChange={(id) => setActivePlatform(id)}
          />
        </div>

        {/* Media Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 backdrop-blur-xl overflow-hidden shadow-glass group hover:-translate-y-1 transition-all duration-300"
              >
                {/* Visual Header / Media Preview */}
                <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                  {item.platform === "youtube" ? (
                    <div className="relative w-full h-full bg-gradient-to-tr from-slate-950 via-slate-900 to-red-950/40 flex items-center justify-center p-6 text-center">
                      <Image
                        src="/images/prabhu-sah-elderly.jpg"
                        alt="Speech Preview"
                        fill
                        className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-glow-crimson group-hover:scale-110 transition-transform mb-3">
                          <Play className="w-7 h-7 ml-1 fill-white" />
                        </div>
                        <span className="text-xs font-semibold text-white bg-slate-950/80 px-3 py-1 rounded-full border border-white/10">
                          {language === "EN" ? "Parliamentary Intervention" : "संसदीय सम्बोधन"}
                        </span>
                      </div>
                    </div>
                  ) : item.platform === "tiktok" ? (
                    <div className="relative w-full h-full bg-gradient-to-tr from-slate-950 via-slate-900 to-pink-950/40 flex items-center justify-center p-6 text-center">
                      <Image
                        src="/images/dalit-basti.png"
                        alt="TikTok Inspection"
                        fill
                        className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3">
                          <Video className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-semibold text-white bg-slate-950/80 px-3 py-1 rounded-full border border-white/10">
                          {language === "EN" ? "Ground Inspection Short" : "स्थलगत स्थल भिडियो"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-950/40 flex items-center justify-center p-6 text-center">
                      <Image
                        src="/images/casting-vote.jpg"
                        alt="Constituency Meeting"
                        fill
                        className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-3">
                          <Facebook className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-semibold text-white bg-slate-950/80 px-3 py-1 rounded-full border border-white/10">
                          {language === "EN" ? "Public Assembly & Townhall" : "वृहत् जनसभा तथा संवाद"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Channel / Platform Tag */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-950/90 text-white border border-white/10 backdrop-blur-md flex items-center gap-1.5">
                      {item.platform === "youtube" && <Youtube className="w-3.5 h-3.5 text-red-500" />}
                      {item.platform === "facebook" && <Facebook className="w-3.5 h-3.5 text-blue-500" />}
                      {item.platform === "tiktok" && <Radio className="w-3.5 h-3.5 text-pink-500" />}
                      {item.author}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 text-[11px] font-semibold text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-white/10">
                    {item.engagement}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {language === "EN" ? item.title : item.titleNe}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {language === "EN" ? item.description : item.descriptionNe}
                    </p>
                  </div>

                  {/* Direct Watch / Interact Link */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 py-1.5 px-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 transition-colors border border-slate-800"
                    >
                      <span>
                        {item.platform === "youtube"
                          ? t("socialFollowYT")
                          : item.platform === "facebook"
                          ? t("socialFollowFB")
                          : t("socialFollowTT")}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
