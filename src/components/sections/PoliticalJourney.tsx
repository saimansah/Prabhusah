"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { timelineMilestones } from "@/data/timelineData";
import { Badge } from "@/components/ui/Badge";
import { 
  History, 
  Award, 
  Vote, 
  Building2, 
  Scale, 
  Compass, 
  CheckCircle2, 
  Sparkles,
  Calendar
} from "lucide-react";

export const PoliticalJourney: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="relative py-24 bg-slate-950/90 border-t border-slate-800/80 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-saffron-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="saffron" size="md" icon={<History className="w-3.5 h-3.5" />}>
            {language === "EN" ? "Public Service Chronicle" : "जनसेवा तथा संसदीय इतिहास"}
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            {t("journeySectionTitle")}
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            {t("journeySectionSubtitle")}
          </p>
        </div>

        {/* Highlight Feature Banner: 4 Consecutive Mandates & Direct Democracy */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 shadow-lg">
              <Image
                src="/images/casting-vote.jpg"
                alt="Prabhu Sah Casting Vote in Maulapur"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs bg-slate-950/80 backdrop-blur-md p-2 rounded-xl border border-white/10">
                <span className="font-semibold block text-amber-400">
                  {language === "EN" ? "Sovereign Ballot at Maulapur" : "मौलापुर, रौतहट–३ मतदान"}
                </span>
                <span className="text-[11px] text-slate-300">
                  {language === "EN" ? "Electing representatives over party cartels" : "जनताको सार्वभौम मताधिकार"}
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="crimson" size="sm" icon={<Vote className="w-3 h-3" />}>
                  {language === "EN" ? "4 Consecutive Elections" : "लगातार ४ पटक विजयी"}
                </Badge>
                <Badge variant="emerald" size="sm" icon={<Award className="w-3 h-3" />}>
                  {language === "EN" ? "Triple Ministerial Portfolios" : "तीन पटक मन्त्रिपरिषद् नेतृत्व"}
                </Badge>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {language === "EN"
                  ? "A Relentless Voice for Common Citizens in National Parliament"
                  : "राष्ट्रिय संसदमा आम नागरिकको अविचलित आवाज"}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {language === "EN"
                  ? "From the First Constituent Assembly in 2008 to the Federal Parliament in 2022, Prabhu Sah has consistently won the direct mandate of the sovereign voters of Rautahat-3. Whether serving as Minister for Urban Development, Law and Justice, or Land Management, his priority has stayed anchored in social justice, Dalit housing, agricultural electrification, and holding state institutions accountable."
                  : "२०६४ को पहिलो संविधान सभादेखि २०७९ को आम निर्वाचनसम्म रौतहट–३ का जनताले लगातार माननीय प्रभु साहमाथि विश्वास व्यक्त गर्दै आएका छन्। शहरी विकास, कानुन न्याय र भूमि व्यवस्था मन्त्रीको रूपमा उहाँले मधेसको पूर्वाधार, दलित आवास, कृषि सिँचाइ र न्याय प्रणालीमा ठोस योगदान दिनुभएको छ।"}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <span className="block text-xl font-bold text-amber-400 font-display">2008</span>
                  <span className="text-[11px] text-slate-400">1st CA (संविधान सभा)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <span className="block text-xl font-bold text-amber-400 font-display">2013</span>
                  <span className="text-[11px] text-slate-400">2nd CA (पुनः निर्वाचित)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <span className="block text-xl font-bold text-amber-400 font-display">2017</span>
                  <span className="text-[11px] text-slate-400">Parliament (संसद)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <span className="block text-xl font-bold text-amber-400 font-display">2022</span>
                  <span className="text-[11px] text-slate-400">4th Term & AJP (आजपा)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Timeline Spine */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-saffron-500 via-rose-500 to-emerald-500 sm:-translate-x-1/2" />

          <div className="space-y-12">
            {timelineMilestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot Indicator */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-4 border-amber-500 shadow-glow-saffron z-20 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Content Card Container */}
                  <div
                    className={`ml-12 sm:ml-0 sm:w-1/2 ${
                      isEven ? "sm:pr-10" : "sm:pl-10"
                    }`}
                  >
                    <div
                      className={`relative p-6 rounded-2xl bg-slate-900/80 border ${
                        item.isKeyMandate
                          ? "border-amber-500/40 shadow-glow-saffron/20"
                          : "border-slate-800"
                      } backdrop-blur-xl transition-all duration-300 hover:border-slate-700 group`}
                    >
                      {/* Year & Tag Bar */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.year}
                        </span>
                        <Badge
                          variant={item.isKeyMandate ? "saffron" : "slate"}
                          size="sm"
                        >
                          {language === "EN" ? item.tag : item.tagNe}
                        </Badge>
                      </div>

                      {/* Title & Role */}
                      <h4 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                        {language === "EN" ? item.title : item.titleNe}
                      </h4>

                      <p className="text-xs font-medium text-amber-400/90 mt-1 mb-3">
                        {language === "EN" ? item.role : item.roleNe}
                      </p>

                      {item.image && (
                        <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-slate-700 shadow-md">
                          <Image
                            src={item.image}
                            alt={language === "EN" ? item.title : item.titleNe}
                            fill
                            className="object-cover object-top hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {language === "EN" ? item.description : item.descriptionNe}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
