"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import {
  Award,
  MapPin,
  Sparkles,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Zap,
  Compass,
  ShieldCheck,
  Building2,
  Scale
} from "lucide-react";

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const [bioModalOpen, setBioModalOpen] = useState(false);

  const stats = [
    {
      num: t("statMandatesNum"),
      label: t("statMandatesLabel"),
      sub: "2008, 2013, 2017, 2022",
      icon: <Award className="w-5 h-5 text-amber-400" />,
      highlight: "from-amber-500/20 to-amber-600/5",
      border: "border-amber-500/30",
    },
    {
      num: t("statRoadsNum"),
      label: t("statRoadsLabel"),
      sub: "Gandak-Iashnath & Bridges",
      icon: <TrendingUp className="w-5 h-5 text-rose-400" />,
      highlight: "from-rose-500/20 to-rose-600/5",
      border: "border-rose-500/30",
    },
    {
      num: t("statPilgrimsNum"),
      label: t("statPilgrimsLabel"),
      sub: "Patauradham 5th Century Shiva",
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      highlight: "from-emerald-500/20 to-emerald-600/5",
      border: "border-emerald-500/30",
    },
    {
      num: t("statFarmersNum"),
      label: t("statFarmersLabel"),
      sub: "100% Bill Subsidized Grid",
      icon: <Zap className="w-5 h-5 text-cyan-400" />,
      highlight: "from-cyan-500/20 to-cyan-600/5",
      border: "border-cyan-500/30",
    },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "4rem 4rem"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Badges, Mission & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            {/* Badges Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <Badge variant="saffron" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
                {t("heroBadgeParty")}
              </Badge>
              <Badge variant="crimson" size="md" icon={<Award className="w-3.5 h-3.5" />}>
                {t("heroBadgeMandate")}
              </Badge>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                Rautahat, Madhesh Province
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.15]">
                {language === "EN" ? (
                  <>
                    Voice of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-saffron-400 to-amber-200">Common Citizen</span>,{" "}
                    Architect of <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-crimson-500 to-amber-300">Modern Rautahat</span>
                  </>
                ) : (
                  <>
                    जनताको सेवा, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-saffron-400 to-amber-200">समृद्धिको संकल्प:</span>{" "}
                    आधुनिक <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-crimson-500 to-amber-300">रौतहटका योजनाकार</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed pt-2 font-normal">
                {t("heroSubtitle")}
              </p>
            </motion.div>

            {/* Former Ministerial Portfolios Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-2 text-xs text-slate-300 py-1"
            >
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                {language === "EN" ? "Ex-Minister of Urban Development" : "पूर्व शहरी विकास मन्त्री"}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
                <Scale className="w-3.5 h-3.5 text-rose-400" />
                {language === "EN" ? "Ex-Minister of Law & Justice" : "पूर्व कानुन तथा न्याय मन्त्री"}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                {language === "EN" ? "Ex-Minister of Land Management" : "पूर्व भूमि व्यवस्था मन्त्री"}
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <a href="#grievance" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<MessageSquare className="w-5 h-5" />}
                  className="w-full sm:w-auto shadow-glow-saffron text-slate-950 font-bold"
                >
                  {t("heroCTAFileGrievance")}
                </Button>
              </a>

              <a href="#development" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4 text-amber-400" />}
                  className="w-full sm:w-auto text-slate-200 hover:text-white"
                >
                  {t("heroCTAExploreWorks")}
                </Button>
              </a>

              <button
                onClick={() => setBioModalOpen(true)}
                className="text-xs sm:text-sm text-slate-400 hover:text-amber-400 underline underline-offset-4 decoration-amber-500/50 transition-colors py-2 px-1 cursor-pointer"
              >
                {language === "EN" ? "View Full Profile Dossier →" : "माननीय प्रभु साहको संक्षिप्त जीवनी →"}
              </button>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Showcase with Authentic Images */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[420px] aspect-[4/5]"
            >
              {/* Decorative Outer Glow Ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-saffron-500/40 via-rose-500/20 to-amber-400/40 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000" />

              {/* Main Portrait Card */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl">
                <Image
                  src="/images/prabhu-sah-profile.png"
                  alt="Hon. Prabhu Sah Portrait"
                  fill
                  className="object-cover object-top filter brightness-[1.02]"
                  priority
                />

                {/* Gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Floating Candidate Label at Bottom of Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-display font-bold text-lg leading-tight">
                        {language === "EN" ? "Hon. Prabhu Sah" : "माननीय प्रभु साह"}
                      </p>
                      <p className="text-xs text-amber-400 font-semibold">
                        {language === "EN" ? "4x Former MP | AJP Chairman" : "४ पटक निर्वाचित पूर्व सांसद | अध्यक्ष, आजपा"}
                      </p>
                    </div>

                    {/* Election Symbol Pill */}
                    <div className="flex items-center gap-2 bg-white/95 px-2.5 py-1 rounded-xl shadow-md border border-red-500">
                      <Image
                        src="/images/election-symbol.png"
                        alt="Election Symbol - Phone"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                      <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
                        {language === "EN" ? "Symbol" : "चुनाव चिन्ह"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Micro Badge 1: Voter Mandate Action */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-4 -left-6 hidden sm:flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-xl backdrop-blur-xl"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-amber-500/50">
                  <Image
                    src="/images/casting-vote.jpg"
                    alt="Prabhu Sah Casting Vote in Maulapur"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left pr-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                    {language === "EN" ? "4x MP Victory" : "४ पटक विजय"}
                  </span>
                  <span className="text-xs font-semibold text-white block">
                    {language === "EN" ? "Direct Citizen Ballot" : "रौतहट–३ जनविश्वास"}
                  </span>
                </div>
              </motion.div>

              {/* Floating Micro Badge 2: Grassroots Connection */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-xl backdrop-blur-xl"
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-emerald-500/50">
                  <Image
                    src="/images/prabhu-sah-elderly.jpg"
                    alt="Prabhu Sah with elderly constituent"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left pr-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                    {language === "EN" ? "Grassroots First" : "जनताको साथमा"}
                  </span>
                  <span className="text-xs font-semibold text-white block">
                    {language === "EN" ? "Janata Sunwai Care" : "घरदैलोमा जनसेवा"}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Live Counter Metric Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-6 bg-gradient-to-b ${stat.highlight} bg-slate-900/80 border ${stat.border} backdrop-blur-xl shadow-glass transition-all duration-300 hover:translate-y-[-4px] group`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/5 shadow-inner">
                  {stat.icon}
                </div>
                <span className="text-[11px] font-semibold text-slate-400 font-mono">
                  {stat.sub}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight group-hover:text-amber-300 transition-colors">
                {stat.num}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-2 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Profile Bio Dossier Modal */}
      <Modal
        isOpen={bioModalOpen}
        onClose={() => setBioModalOpen(false)}
        title={language === "EN" ? "Hon. Prabhu Sah - Leadership Profile" : "माननीय प्रभु साहको नेतृत्व परिचय"}
        description={
          language === "EN"
            ? "Chairman, Aam Janata Party (AJP) | 4-time Former Member of Parliament (Rautahat-3)"
            : "अध्यक्ष, आम जनता पार्टी | ४ पटक निर्वाचित पूर्व प्रतिनिधि सभा सदस्य, रौतहट–३"
        }
        maxWidth="max-w-3xl"
      >
        <div className="space-y-5 text-slate-300 text-sm leading-relaxed pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-3 border-b border-slate-800">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-slate-700">
              <Image
                src="/images/prabhu-sah-profile.png"
                alt="Prabhu Sah"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col justify-center space-y-2.5">
              <div className="inline-flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white p-0.5 border border-red-500 flex items-center justify-center">
                  <Image
                    src="/images/election-symbol.png"
                    alt="AJP Symbol"
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-bold text-amber-400">
                  {language === "EN" ? "Election Symbol: Mobile Phone" : "चुनाव चिन्ह: मोबाइल फोन"}
                </span>
              </div>
              <h4 className="text-white font-bold text-lg">
                {language === "EN" ? "Unbroken Mandate & Socialist Vision" : "अविचलित जनसमर्थन र समाजवादी कार्यदिशा"}
              </h4>
              <p className="text-xs text-slate-400">
                {language === "EN"
                  ? "Elected to the First & Second Constituent Assemblies (2008, 2013) and Federal Parliament (2017, 2022) continuously from Rautahat-3."
                  : "पहिलो र दोस्रो संविधान सभा (२०६४, २०७०) तथा संघीय प्रतिनिधि सभा (२०७४, २०७९) मा रौतहट क्षेत्र नं. ३ बाट लगातार चार पटक विजयी।"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider text-amber-400">
              {language === "EN" ? "Core Political Convictions" : "प्रमुख राजनीतिक निष्ठा तथा कार्यदिशा"}
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{language === "EN" ? "Anti-Corruption & Governance:" : "भ्रष्टाचार नियन्त्रण र सुशासन:"}</strong>{" "}
                  {language === "EN"
                    ? "Unflinching fight against bureaucratic syndicates, opaque political appointments, and institutional rot."
                    : "सार्वजनिक निकायमा हुने दलीय भागबन्डा र संस्थागत भ्रष्टाचारविरुद्ध सम्झौताहीन संघर्ष।"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{language === "EN" ? "Peasant & Smallholder Rights:" : "किसान र श्रमजीवीको अधिकार:"}</strong>{" "}
                  {language === "EN"
                    ? "Pioneered free agricultural electricity in Madhesh and spearheads the national movement against loan-shark (meterbyaj) cartels."
                    : "मधेसमा निःशुल्क कृषि बिजुलीको सफल कार्यान्वयन र गरिब किसानलाई लुट्ने मिटरब्याजविरुद्ध देशव्यापी आन्दोलनको नेतृत्व।"}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{language === "EN" ? "Dalit & Bahujan Housing (Janata Awas):" : "दलित तथा विपन्न आवास (जनता आवास):"}</strong>{" "}
                  {language === "EN"
                    ? "Sanctioned and supervised concrete pucca homes, clean piped water, and land deeds for the historically landless Dom and Musahar families."
                    : "डोम र मुसहरलगायत भूमिहीन दलित परिवारका लागि पक्की नमुना आवास र लालपुर्जाको व्यवस्था।"}
                </span>
              </li>
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setBioModalOpen(false)}>
              {language === "EN" ? "Close Dossier" : "बन्द गर्नुहोस्"}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
