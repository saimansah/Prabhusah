"use client";

import React, { useState } from "react";
import { AppImage as Image } from "@/components/ui/AppImage";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { GrievanceFormData, GrievanceTicket } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  Search,
  Clock,
  FileCheck2,
  Sparkles,
  ShieldAlert,
  HelpCircle,
  Database,
  Loader2
} from "lucide-react";
import { submitGrievance, trackGrievance } from "@/services/grievanceService";

export const CitizenGrievance: React.FC = () => {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState<GrievanceFormData>({
    fullName: "",
    phone: "",
    municipality: "",
    ward: "",
    category: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof GrievanceFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState<GrievanceTicket | null>(null);
  const [isSupabaseSynced, setIsSupabaseSynced] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  // Status Check Modal State
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [searchTicketId, setSearchTicketId] = useState("");
  const [searchingTrack, setSearchingTrack] = useState(false);
  const [trackedResult, setTrackedResult] = useState<GrievanceTicket | null>(null);
  const [trackSource, setTrackSource] = useState<"supabase" | "local" | "demo" | null>(null);
  const [trackError, setTrackError] = useState("");

  const validate = (): boolean => {
    const errs: Partial<Record<keyof GrievanceFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = language === "EN" ? "Please enter your full name" : "कृपया आफ्नो पूरा नाम लेख्नुहोस्";
    }

    if (!formData.phone.trim()) {
      errs.phone = language === "EN" ? "Phone number is required" : "सम्पर्क फोन नम्बर आवश्यक छ";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errs.phone = language === "EN" ? "Please enter a valid phone number" : "मान्य फोन नम्बर प्रविष्ट गर्नुहोस्";
    }

    if (!formData.municipality.trim()) {
      errs.municipality = language === "EN" ? "Municipality is required" : "नगरपालिका वा गाउँपालिका उल्लेख गर्नुहोस्";
    } else if (formData.municipality.trim().length > 50) {
      errs.municipality = language === "EN" ? "Please enter a valid municipality" : "मान्य नगरपालिका उल्लेख गर्नुहोस्";
    }

    if (!formData.ward.trim()) {
      errs.ward = language === "EN" ? "Ward is required" : "वडा नम्बर उल्लेख गर्नुहोस्";
    } else {
      const wardNum = parseInt(formData.ward.trim(), 10);
      if (isNaN(wardNum) || wardNum < 1 || wardNum > 100) {
        errs.ward = language === "EN" ? "Please enter a valid ward number" : "मान्य वडा नम्बर प्रविष्ट गर्नुहोस्";
      }
    }

    if (!formData.category) {
      errs.category = language === "EN" ? "Please select a category" : "कृपया गुनासोको विषय छान्नुहोस्";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = language === "EN"
        ? "Please provide at least 10 characters describing the issue"
        : "कृपया समस्याको कम्तिमा १० अक्षरको स्पष्ट विवरण लेख्नुहोस्";
    } else if (formData.message.trim().length > 2000) {
      errs.message = language === "EN"
        ? "Please shorten your description"
        : "कृपया विवरण छोटो पार्नुहोस्";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const result = await submitGrievance(formData, language);
      if (result.success && result.ticket) {
        setGeneratedTicket(result.ticket);
        setIsSupabaseSynced(result.isSupabase);
        setFormData({
          fullName: "",
          phone: "",
          municipality: "",
          ward: "",
          category: "",
          message: "",
        });
        setErrors({});
      } else {
        setErrors({
          message: result.error || (language === "EN" ? "Failed to record grievance." : "गुनासो दर्ता गर्न सकिएन।")
        });
      }
    } catch (err: unknown) {
      console.error(err);
      setErrors({
        message: language === "EN" ? "A network error occurred. Please try again." : "नेटवर्क समस्या आयो। कृपया पुनः प्रयास गर्नुहोस्।"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyTicket = () => {
    if (!generatedTicket) return;
    navigator.clipboard.writeText(generatedTicket.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSearchTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackError("");
    setTrackedResult(null);
    setTrackSource(null);

    const query = searchTicketId.trim().toUpperCase();
    if (!query) {
      setTrackError(language === "EN" ? "Please enter a Ticket ID" : "कृपया ट्र्याकिङ कोड लेख्नुहोस्");
      return;
    }

    setSearchingTrack(true);
    try {
      const result = await trackGrievance(query, language);
      if (result.found && result.ticket) {
        setTrackedResult(result.ticket);
        setTrackSource(result.source);
      } else {
        setTrackError(
          result.error ||
          (language === "EN"
            ? "No ticket found with this ID. Please verify your reference code (e.g. AJP-RT-2026-1001)."
            : "यो दर्ता नम्बरको कुनै विवरण भेटिएन। कृपया कोड पुनः जाँच गर्नुहोस्।")
        );
      }
    } catch (err: unknown) {
      console.error(err);
      setTrackError(language === "EN" ? "Error searching grievance records." : "गुनासो खोज गर्दा समस्या भयो।");
    } finally {
      setSearchingTrack(false);
    }
  };

  return (
    <section id="grievance" className="relative py-24 bg-slate-950/90 border-t border-slate-800/80 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="saffron" size="md" icon={<MessageSquare className="w-3.5 h-3.5" />}>
            {t("grievanceSectionBadge")}
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            {t("grievanceSectionTitle")}
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            {t("grievanceSectionSubtitle")}
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                setTrackModalOpen(true);
                setTrackError("");
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 py-1.5 px-4 rounded-full bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all cursor-pointer shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t("trackGrievanceBtn")}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Assistance & Authentic Outreach Image */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-glass space-y-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 shadow-md">
                <Image
                  src="/images/prabhu-sah-elderly.jpg"
                  alt="Hon. Prabhu Sah Interacting with Constituent"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white text-xs">
                  <p className="font-bold text-amber-400">
                    {language === "EN" ? "Direct Citizen Engagement" : "जनताको सुख-दुःखमा प्रत्यक्ष हातेमालो"}
                  </p>
                  <p className="text-[11px] text-slate-300">
                    {language === "EN" ? "Personal Secretariat Grievance Desk" : "व्यक्तिगत सचिवालय प्रत्यक्ष गुनासो डेस्क"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold font-display text-white">
                  {language === "EN"
                    ? "Direct Pipeline to Hon. Prabhu Sah's Personal Secretariat"
                    : "व्यक्तिगत सचिवालयमा प्रत्यक्ष दर्ता हुने प्रणाली"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === "EN"
                    ? "Every ticket filed through Janata Sunwai is assigned an official tracking code and received directly by Hon. Prabhu Sah's personal secretariat for priority review and field coordination."
                    : "जनता सुनुवाइमार्फत दर्ता भएका प्रत्येक गुनासोलाई ट्र्याकिङ कोड प्रदान गरी प्रत्यक्ष माननीय प्रभु साहको व्यक्तिगत सचिवालयमार्फत समाधानका लागि पहल गरिन्छ।"}
                </p>
              </div>

              {/* Personal Secretariat Supervision Card */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200/90 leading-relaxed">
                  <strong className="block text-amber-300 font-semibold mb-0.5">
                    {language === "EN" ? "Direct Secretariat Review" : "व्यक्तिगत सचिवालयबाट प्रत्यक्ष निगरानी"}
                  </strong>
                  {t("emergencyHotlineNote")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form or Success Ticket State */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-2xl shadow-glass">
              <AnimatePresence mode="wait">
                {generatedTicket ? (
                  /* Success Confirmation Screen */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6 text-center py-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-glow-emerald">
                      <CheckCircle className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold font-display text-white">
                        {t("formSuccessTitle")}
                      </h3>
                      <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                        {t("formSuccessDesc")}
                      </p>
                      {isSupabaseSynced && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium mt-1">
                          <Database className="w-3.5 h-3.5" />
                          <span>
                            {language === "EN"
                              ? "Saved your query successfully"
                              : "क्लाउड डाटाबेसमा प्रत्यक्ष दर्ता भयो"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Ticket Reference Highlight Box */}
                    <div className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/40 max-w-md mx-auto text-left shadow-lg space-y-3">
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                        {t("ticketNumberLabel")}
                      </span>

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 tracking-wider">
                          {generatedTicket.id}
                        </span>
                        <button
                          onClick={handleCopyTicket}
                          className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1 text-xs"
                          title="Copy Ticket ID"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-300">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Status:</span>
                          <span className="text-emerald-400 font-semibold">
                            {language === "EN" ? generatedTicket.status : generatedTicket.statusNe}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Estimated Update:</span>
                          <span className="text-slate-200 font-semibold">
                            {generatedTicket.estimatedResolution}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => setGeneratedTicket(null)}
                      >
                        {language === "EN" ? "Submit Another Grievance" : "अर्को गुनासो दर्ता गर्नुहोस्"}
                      </Button>
                      <a href="#about">
                        <Button variant="outline" size="md">
                          {language === "EN" ? "Return to Overview" : "गृहपृष्ठमा फर्कनुहोस्"}
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  /* Interactive Grievance Submission Form */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                          {t("formFullName")} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder={t("formFullNamePlaceholder")}
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border ${errors.fullName ? "border-rose-500" : "border-slate-800 focus:border-amber-500"
                            } text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                          {t("formPhone")} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                            setFormData({ ...formData, phone: val });
                          }}
                          placeholder={t("formPhonePlaceholder")}
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border ${errors.phone ? "border-rose-500" : "border-slate-800 focus:border-amber-500"
                            } text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {/* Municipality */}
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                          {t("formMunicipality")} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          maxLength={50}
                          value={formData.municipality}
                          onChange={(e) => setFormData({ ...formData, municipality: e.target.value.slice(0, 50) })}
                          placeholder={t("formMunicipalityPlaceholder")}
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border ${errors.municipality ? "border-rose-500" : "border-slate-800 focus:border-amber-500"
                            } text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                        />
                        {errors.municipality && (
                          <p className="text-[11px] text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.municipality}
                          </p>
                        )}
                      </div>

                      {/* Ward */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                          {t("formWard")} <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={3}
                          value={formData.ward}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                            if (!val) {
                              setFormData({ ...formData, ward: "" });
                              return;
                            }
                            const num = parseInt(val, 10);
                            if (num <= 100) {
                              setFormData({ ...formData, ward: val });
                            }
                          }}
                          placeholder={t("formWardPlaceholder")}
                          className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border ${errors.ward ? "border-rose-500" : "border-slate-800 focus:border-amber-500"
                            } text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                        />
                        {errors.ward && (
                          <p className="text-[11px] text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.ward}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Category Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                        {t("formCategory")} <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border ${errors.category ? "border-rose-500" : "border-slate-800 focus:border-amber-500"
                          } text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all`}
                      >
                        <option value="" className="bg-slate-900 text-slate-400">
                          {t("formCategorySelect")}
                        </option>
                        <option value="Agriculture" className="bg-slate-900 text-white">
                          {t("formCategoryAgri")}
                        </option>
                        <option value="Roads" className="bg-slate-900 text-white">
                          {t("formCategoryRoads")}
                        </option>
                        <option value="Electricity" className="bg-slate-900 text-white">
                          {t("formCategoryElectricity")}
                        </option>
                        <option value="Legal" className="bg-slate-900 text-white">
                          {t("formCategoryLegal")}
                        </option>
                        <option value="General" className="bg-slate-900 text-white">
                          {t("formCategoryGeneral")}
                        </option>
                      </select>
                      {errors.category && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.category}
                        </p>
                      )}
                    </div>

                    {/* Detailed Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                        {t("formMessage")} <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        maxLength={2000}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, 2000) })}
                        placeholder={t("formMessagePlaceholder")}
                        className={`w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border ${errors.message ? "border-rose-500" : "border-slate-800 focus:border-amber-500"
                          } text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all resize-none`}
                      />
                      {errors.message && (
                        <p className="text-[11px] text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={submitting}
                        icon={<Send className="w-4 h-4" />}
                        className="w-full justify-center shadow-glow-saffron font-bold text-slate-950"
                      >
                        {submitting ? t("formSubmitting") : t("formSubmitBtn")}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Status Tracking Modal */}
      <Modal
        isOpen={trackModalOpen}
        onClose={() => setTrackModalOpen(false)}
        title={language === "EN" ? "Track Grievance Status" : "दर्ता भएको गुनासोको स्थिति जाँच"}
        description={
          language === "EN"
            ? "Enter your official reference code (e.g., AJP-RT-2026-XXXX) to check updates."
            : "आफ्नो ट्र्याकिङ कोड प्रविष्ट गरी गुनासो सम्बोधनको प्रगति विवरण हेर्नुहोस्।"
        }
        maxWidth="max-w-xl"
      >
        <div className="space-y-5 pt-2">
          <form onSubmit={handleSearchTicket} className="flex gap-2">
            <input
              type="text"
              value={searchTicketId}
              onChange={(e) => setSearchTicketId(e.target.value)}
              placeholder="e.g. AJP-RT-2026-1001"
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white uppercase placeholder:normal-case focus:outline-none focus:border-amber-500"
            />
            <Button variant="primary" size="md" type="submit" disabled={searchingTrack}>
              {searchingTrack ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4" />
              )}
            </Button>
          </form>

          {trackError && (
            <p className="text-xs text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
              {trackError}
            </p>
          )}

          {trackedResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-700 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase text-slate-400 font-mono block">Ticket ID</span>
                    {trackSource === "supabase" && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        <Database className="w-2.5 h-2.5" /> Supabase Live
                      </span>
                    )}
                  </div>
                  <span className="text-lg font-bold text-amber-400 font-mono">{trackedResult.id}</span>
                </div>
                <Badge variant="emerald" size="sm">
                  {language === "EN" ? trackedResult.status : trackedResult.statusNe}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Registered By:</span>
                  <span className="text-white font-medium">{trackedResult.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Municipality / Ward:</span>
                  <span className="text-white font-medium">{trackedResult.municipality}, Ward {trackedResult.ward}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Subject:</span>
                  <span className="text-white font-medium">{trackedResult.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Registered Date:</span>
                  <span className="text-white font-medium">{trackedResult.createdAt}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="text-slate-400 block text-[10px] mb-1">Issue Overview:</span>
                <p className="italic leading-relaxed">{trackedResult.message}</p>
              </div>
            </motion.div>
          )}

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <Button variant="secondary" size="sm" onClick={() => setTrackModalOpen(false)}>
              {language === "EN" ? "Close" : "बन्द गर्नुहोस्"}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
