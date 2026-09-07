"use client";

import React, { useState } from "react";
import { AppImage as Image } from "@/components/ui/AppImage";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { developmentProjects } from "@/data/developmentData";
import { DevelopmentCategory, DevelopmentProject } from "@/types";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { 
  Building, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight, 
  Layers, 
  Sparkles,
  Home,
  Zap,
  Footprints,
  ShieldAlert
} from "lucide-react";

export const DevelopmentWorks: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<DevelopmentProject | null>(null);

  const tabs = [
    { id: "All", label: t("devFilterAll"), icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "Infrastructure", label: t("devFilterInfra"), icon: <Building className="w-3.5 h-3.5" /> },
    { id: "Agriculture & Energy", label: t("devFilterAgri"), icon: <Zap className="w-3.5 h-3.5" /> },
    { id: "Heritage & Tourism", label: t("devFilterHeritage"), icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "Social Justice", label: t("devFilterJustice"), icon: <Home className="w-3.5 h-3.5" /> },
  ];

  const filteredProjects = developmentProjects.filter((proj) => {
    if (activeCategory === "All") return true;
    return proj.category === activeCategory;
  });

  const getCategoryBadgeVariant = (cat: string) => {
    switch (cat) {
      case "Social Justice":
        return "crimson";
      case "Agriculture & Energy":
        return "emerald";
      case "Heritage & Tourism":
        return "saffron";
      default:
        return "slate";
    }
  };

  return (
    <section id="development" className="relative py-24 bg-slate-950 border-t border-slate-800/80 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="emerald" size="md" icon={<TrendingUp className="w-3.5 h-3.5" />}>
            {t("devSectionBadge")}
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            {t("devSectionTitle")}
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            {t("devSectionSubtitle")}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <Tabs
            tabs={tabs}
            activeTab={activeCategory}
            onChange={(id) => setActiveCategory(id)}
          />
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col rounded-3xl overflow-hidden bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all duration-300 backdrop-blur-xl group hover:shadow-glass hover:-translate-y-1.5"
              >
                {/* Project Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <Image
                    src={project.image}
                    alt={language === "EN" ? project.title : project.titleNe}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Category & Status Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <Badge
                      variant={getCategoryBadgeVariant(project.category)}
                      size="sm"
                    >
                      {language === "EN" ? project.category : project.categoryNe}
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700 backdrop-blur-md">
                      {language === "EN" ? project.status : project.statusNe}
                    </span>
                  </div>

                  {/* Impact Metric Floating Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                        {language === "EN" ? project.metricLabel : project.metricLabelNe}
                      </span>
                      <span className="text-base font-extrabold font-display text-amber-400">
                        {language === "EN" ? project.impactMetric : project.impactMetricNe}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{language === "EN" ? project.location : project.locationNe}</span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {language === "EN" ? project.title : project.titleNe}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {language === "EN" ? project.summary : project.summaryNe}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors py-1 cursor-pointer"
                    >
                      <span>{t("devBtnCaseStudy")}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Case Study Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject ? (language === "EN" ? selectedProject.title : selectedProject.titleNe) : ""}
        description={selectedProject ? (language === "EN" ? `${selectedProject.location} • ${selectedProject.year}` : `${selectedProject.locationNe} • ${selectedProject.year}`) : ""}
        maxWidth="max-w-4xl"
      >
        {selectedProject && (
          <div className="space-y-6 pt-2">
            {/* Modal Image Showcase */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-slate-950">
              <Image
                src={selectedProject.image}
                alt={language === "EN" ? selectedProject.title : selectedProject.titleNe}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <span className="text-xs text-slate-400 block">
                    {language === "EN" ? selectedProject.metricLabel : selectedProject.metricLabelNe}
                  </span>
                  <span className="text-xl sm:text-2xl font-black font-display text-amber-400">
                    {language === "EN" ? selectedProject.impactMetric : selectedProject.impactMetricNe}
                  </span>
                </div>
                <Badge variant="saffron" size="md">
                  {language === "EN" ? selectedProject.category : selectedProject.categoryNe}
                </Badge>
              </div>
            </div>

            {/* In-depth Narrative */}
            <div className="space-y-3">
              <h4 className="text-white font-display font-bold text-lg">
                {language === "EN" ? "Strategic Impact & Context" : "रणनीतिक प्रभाव तथा पृष्ठभूमि"}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === "EN" ? selectedProject.description : selectedProject.descriptionNe}
              </p>
            </div>

            {/* Key Deliverables & Highlights */}
            <div className="space-y-3">
              <h4 className="text-white font-display font-bold text-base text-amber-400">
                {language === "EN" ? "Key Project Milestones & Outcomes" : "मुख्य उपलब्धि तथा परिणामहरू"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(language === "EN" ? selectedProject.highlights : selectedProject.highlightsNe).map(
                  (hl, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-200 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                <span>{language === "EN" ? "Supervised by:" : "योजना कार्यान्वयन:"} </span>
                <strong className="text-white">Hon. Prabhu Sah Secretariat</strong>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedProject(null)}
              >
                {language === "EN" ? "Close Case Study" : "बन्द गर्नुहोस्"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
