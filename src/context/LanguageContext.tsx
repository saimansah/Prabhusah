"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, Theme } from "@/types";

interface Translations {
  [key: string]: {
    en: string;
    ne: string;
  };
}

export const translations: Translations = {
  // Navigation
  navAbout: { en: "About & Mandates", ne: "परिचय तथा यात्रा" },
  navDevelopment: { en: "Development Works", ne: "विकास निर्माण" },
  navNews: { en: "News & Media", ne: "समाचार तथा मिडिया" },
  navSocial: { en: "Social Hub", ne: "सामाजिक सञ्जाल" },
  navGrievance: { en: "Janata Sunwai", ne: "जनता सुनुवाइ" },
  navConnectCTA: { en: "Citizen Connect", ne: "जनता संवाद" },

  // Hero Section
  heroBadgeParty: { en: "Chairman, Aam Janata Party (AJP)", ne: "अध्यक्ष, आम जनता पार्टी (आजपा)" },
  heroBadgeMandate: { en: "4x Former MP, Rautahat-3", ne: "४ पटक निर्वाचित पूर्व सांसद, रौतहट–३" },
  heroSloganMain: {
    en: "Voice of the Common Citizen, Architect of Modern Rautahat",
    ne: "जनताको सेवा, समृद्धिको संकल्प: आधुनिक रौतहटका योजनाकार"
  },
  heroSubtitle: {
    en: "Dedicated to socio-economic justice, agricultural revolution, grassroots empowerment, and fearless legislative resistance against corruption and loan-shark exploitation.",
    ne: "सामाजिक–आर्थिक न्याय, किसानको हक–हित, कृषि क्रान्ति र भ्रष्टाचार तथा मिटरब्याजी शोषणविरुद्ध संसददेखि सडकसम्म निरन्तर जनताको आवाज।"
  },
  heroCTAFileGrievance: { en: "Submit Grievance / जनता सुनुवाइ", ne: "गुनासो दर्ता गर्नुहोस्" },
  heroCTAExploreWorks: { en: "Explore Development Record", ne: "विकास कार्यहरू हेर्नुहोस्" },
  heroCTAWatchSpeeches: { en: "Watch Speeches", ne: "संसदीय सम्बोधन" },

  // Hero Counter Stats
  statMandatesNum: { en: "4x", ne: "४ पटक" },
  statMandatesLabel: { en: "Consecutive Parliamentary Mandates (2008, 2013, 2017, 2022)", ne: "लगातार संसदीय विजय (२०६४, २०७०, २०७४, २०७९)" },
  statRoadsNum: { en: "100+ km", ne: "१००+ कि.मी." },
  statRoadsLabel: { en: "Rural Blacktopped Road Corridors", ne: "कालोपत्रे ग्रामीण सडक तथा आरसीसी पुल" },
  statPilgrimsNum: { en: "200k+", ne: "२ लाख+" },
  statPilgrimsLabel: { en: "Annual Madhani Mahotsav Pilgrims", ne: "वार्षिक पतौराधाम मधानी तीर्थयात्री" },
  statFarmersNum: { en: "10,000+", ne: "१०,०००+" },
  statFarmersLabel: { en: "Farmers Powered by 100% Free Irrigation", ne: "निःशुल्क कृषि सिँचाइबाट लाभान्वित किसान" },

  // Political Journey Section
  journeySectionTitle: { en: "Political Journey & Public Service", ne: "राजनीतिक यात्रा तथा जनसेवा" },
  journeySectionSubtitle: {
    en: "Over two decades of unapologetic representation, constitutional statecraft, and executive governance.",
    ne: "दुई दशकभन्दा बढीको अविराम जनसेवा, संविधान निर्माण र मन्त्रीय कार्यसम्पादनको इतिहास।"
  },
  viewAllMilestones: { en: "Key Legislative & Ministerial Mandates", ne: "प्रमुख संसदीय तथा मन्त्रीय कोशेढुङ्गाहरू" },

  // Development Works Section
  devSectionBadge: { en: "Transformative Governance", ne: "विकास र रूपान्तरण" },
  devSectionTitle: { en: "Concrete Development Track Record", ne: "ऐतिहासिक विकास कार्य र परिणाम" },
  devSectionSubtitle: {
    en: "Transforming promise into asphalt, power grids, heritage preservation, and dignified shelter for the oppressed.",
    ne: "शहरी पूर्वाधार, शतप्रतिशत निःशुल्क कृषि सिँचाइ र विपन्न दलित आवासको सफल नमुना।"
  },
  devFilterAll: { en: "All Projects", ne: "सबै आयोजनाहरू" },
  devFilterInfra: { en: "Infrastructure", ne: "पूर्वाधार विकास" },
  devFilterAgri: { en: "Agriculture & Energy", ne: "कृषि तथा ऊर्जा" },
  devFilterHeritage: { en: "Heritage & Tourism", ne: "सम्पदा तथा पर्यटन" },
  devFilterJustice: { en: "Social Justice", ne: "सामाजिक न्याय" },
  devBtnCaseStudy: { en: "View Case Study & Impact", ne: "विस्तृत विवरण हेर्नुहोस्" },

  // News & Media Section
  newsSectionBadge: { en: "Media Spotlight & Statements", ne: "मिडिया कभरेज तथा वक्तव्य" },
  newsSectionTitle: { en: "Press, Public Discourse & Policies", ne: "राष्ट्रिय मिडियामा विचार तथा दृष्टिकोण" },
  newsSectionSubtitle: {
    en: "Uncompromising positions on electoral integrity, federal meritocracy, anti-corruption, and grassroots mobilization.",
    ne: "संवैधानिक निष्पक्षता, सुशासन, भ्रष्टाचारविरुद्धको अडान र नागरिक सरोकारका प्रमुख समाचारहरू।"
  },
  newsReadReport: { en: "Open Original Report", ne: "मूल समाचार पढ्नुहोस्" },
  newsSourceLabel: { en: "Published via", ne: "स्रोत" },

  // Social Hub
  socialSectionBadge: { en: "Constituency & Digital Engagement", ne: "प्रत्यक्ष संवाद र डिजिटल उपस्थिति" },
  socialSectionTitle: { en: "Direct Citizen & Media Channels", ne: "सामाजिक सञ्जाल तथा प्रत्यक्ष सम्पर्क" },
  socialSectionSubtitle: {
    en: "Follow live parliamentary speeches, constituency mass inspections, and youth mobilization rallies across all platforms.",
    ne: "संसदको आवाज, जनतासँगको संवाद र स्थलगत अनुगमनका पछिल्ला भिडियो तथा अपडेटहरू।"
  },
  socialFollowYT: { en: "Subscribe on YouTube", ne: "युट्युबमा हेर्नुहोस्" },
  socialFollowFB: { en: "Follow on Facebook", ne: "फेसबुकमा जोडिनुहोस्" },
  socialFollowTT: { en: "Watch on TikTok", ne: "टिकटकमा हेर्नुहोस्" },

  // Grievance Portal (Janata Sunwai)
  grievanceSectionBadge: { en: "Public Grievance Redressal", ne: "नागरिक सुनुवाइ कक्ष" },
  grievanceSectionTitle: { en: "Janata Sunwai Portal (जनता सुनुवाइ)", ne: "जनता सुनुवाइ: प्रत्यक्ष गुनासो दर्ता" },
  grievanceSectionSubtitle: {
    en: "Submit your constituency problems, infrastructural issues, administrative obstacles, or village-level requirements directly to Hon. Prabhu Sah's personal secretariat.",
    ne: "आफ्नो गाउँ-ठाउँको समस्या, सडक, बिजुली, सिँचाइ, प्रशासनिक बाधा वा गुनासोहरू प्रत्यक्ष माननीय प्रभु साहको व्यक्तिगत सचिवालयमा दर्ता गर्नुहोस्।"
  },
  formFullName: { en: "Full Name", ne: "पूरा नाम" },
  formFullNamePlaceholder: { en: "Your name", ne: "तपाईंको नाम" },
  formPhone: { en: "Mobile Phone Number", ne: "सम्पर्क मोबाइल नम्बर" },
  formPhonePlaceholder: { en: "98XXXXXXXX", ne: "९८XXXXXXXX" },
  formMunicipality: { en: "Municipality / Rural Municipality", ne: "नगरपालिका / गाउँपालिका" },
  formMunicipalityPlaceholder: { en: "e.g. Maulapur Municipality", ne: "जस्तै: मौलापुर नगरपालिका" },
  formWard: { en: "Ward No.", ne: "वडा नं." },
  formWardPlaceholder: { en: "e.g. 3", ne: "जस्तै: ३" },
  formCategory: { en: "Grievance Category", ne: "गुनासोको विषय / क्षेत्र" },
  formCategorySelect: { en: "Select Category...", ne: "विषय छान्नुहोस्..." },
  formCategoryAgri: { en: "Agriculture & Free Irrigation Subsidies", ne: "कृषि तथा निःशुल्क सिँचाइ सम्बन्धी" },
  formCategoryRoads: { en: "Roads, Bridges & Blacktopping", ne: "सडक, पुल तथा पूर्वाधार निर्माण" },
  formCategoryElectricity: { en: "Electricity Feeders & Transformers", ne: "विद्युत, ट्रान्सफर्मर तथा बत्ती" },
  formCategoryLegal: { en: "Legal, Land Rights & Loan Shark (Meterbyaj)", ne: "कानुनी सहायता, लालपुर्जा तथा मिटरब्याज" },
  formCategoryGeneral: { en: "General Administrative & Civic Query", ne: "प्रशासनिक काम तथा अन्य जनसरोकार" },
  formMessage: { en: "Detailed Message / Description", ne: "गुनासो वा समस्याको विस्तृत विवरण" },
  formMessagePlaceholder: {
    en: "Describe the situation, exact village/tole location, and what urgent action is required...",
    ne: "आफ्नो गाउँ, टोल र समस्याको स्पष्ट विवरण लेख्नुहोस्..."
  },
  formSubmitBtn: { en: "Submit Grievance to Personal Secretariat", ne: "व्यक्तिगत सचिवालयमा गुनासो दर्ता गर्नुहोस्" },
  formSubmitting: { en: "Generating Official Ticket...", ne: "दर्ता हुँदैछ..." },
  formSuccessTitle: { en: "Grievance Successfully Registered!", ne: "गुनासो सफलतापूर्वक दर्ता भयो!" },
  formSuccessDesc: {
    en: "Your grievance has been logged directly with Hon. Prabhu Sah's personal secretariat. The team will follow up on the matter.",
    ne: "तपाईंको गुनासो माननीय प्रभु साहको व्यक्तिगत सचिवालयमा दर्ता गरिएको छ। सचिवालयको टोलीबाट आवश्यक पहल गरिनेछ।"
  },
  ticketNumberLabel: { en: "Official Tracking Reference ID", ne: "आधिकारिक दर्ता नं. (ट्र्याकिङ कोड)" },
  trackGrievanceBtn: { en: "Check Status of Past Ticket", ne: "पहिले दर्ता भएको स्थिति हेर्नुहोस्" },
  emergencyHotlineNote: {
    en: "All citizen concerns are prioritized and supervised by Hon. Prabhu Sah's personal secretariat team.",
    ne: "नागरिकका सबै गुनासो तथा समस्याहरू माननीय प्रभु साहको व्यक्तिगत सचिवालय टोलीको प्रत्यक्ष रेखदेखमा सम्बोधन गरिन्छ।"
  },

  // Footer
  footerAboutText: {
    en: "Official portal of Hon. Prabhu Sah, Chairman of the Aam Janata Party (AJP), 4-time Former Parliamentarian from Rautahat-3, former Cabinet Minister of Urban Development, Law, and Land Management.",
    ne: "आम जनता पार्टी (आजपा) का केन्द्रीय अध्यक्ष, रौतहट–३ बाट लगातार चार पटक निर्वाचित पूर्व सांसद तथा पूर्व मन्त्री माननीय प्रभु साहको आधिकारिक नागरिक पोर्टल।"
  },
  footerCentralOffice: { en: "Central Party Headquarters", ne: "केन्द्रीय पार्टी कार्यालय" },
  footerConstituencyOffice: { en: "Field Liaison Office", ne: "क्षेत्रीय सम्पर्क कार्यालय" },
  footerQuickLinks: { en: "Quick Navigation", ne: "महत्वपूर्ण लिङ्कहरू" },
  footerPolicyDocs: { en: "Party Charter & Ideology (PDF)", ne: "पार्टीको घोषणापत्र तथा विधान" },
  footerAllRights: { en: "All Rights Reserved. Official Digital Desk of Prabhu Sah.", ne: "सर्वाधिकार सुरक्षित। प्रभु साह आधिकारिक डिजिटल डेस्क।" },
  electionSymbolBadge: { en: "Election Symbol: Mobile Phone (मोबाइल फोन)", ne: "चुनाव चिन्ह: मोबाइल फोन" }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("EN");
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("prabhu_sah_lang") as Language;
    if (savedLang === "EN" || savedLang === "NE") {
      setLanguage(savedLang);
    }

    const savedTheme = localStorage.getItem("prabhu_sah_theme") as Theme;
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("prabhu_sah_lang", lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === "EN" ? "NE" : "EN";
    handleSetLanguage(nextLang);
  };

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("prabhu_sah_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return language === "EN" ? translations[key].en : translations[key].ne;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        toggleLanguage,
        theme,
        toggleTheme,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
