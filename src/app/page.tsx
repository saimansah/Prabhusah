"use client";

import React from "react";
import { Navbar } from "@/components/common/Navbar";
import { Hero } from "@/components/sections/Hero";
import { PoliticalJourney } from "@/components/sections/PoliticalJourney";
import { DevelopmentWorks } from "@/components/sections/DevelopmentWorks";
import { NewsAndMedia } from "@/components/sections/NewsAndMedia";
import { SocialHub } from "@/components/sections/SocialHub";
import { CitizenGrievance } from "@/components/sections/CitizenGrievance";
import { Footer } from "@/components/common/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-300">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1 w-full">
        <Hero />
        <PoliticalJourney />
        <DevelopmentWorks />
        <NewsAndMedia />
        <SocialHub />
        <CitizenGrievance />
      </main>

      {/* Official Footer & Office Contacts */}
      <Footer />
    </div>
  );
}
