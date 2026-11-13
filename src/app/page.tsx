"use client";

import React, { useState } from "react";
import ActiveTheoryIntro from "@/components/ActiveTheoryIntro";
import FluidCanvasBackground from "@/components/FluidCanvasBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SeeItInAction from "@/components/SeeItInAction";
import LiveClientRecoveryDemo from "@/components/LiveClientRecoveryDemo";
import BrandMarquee from "@/components/BrandMarquee";
import WhoWeHelp from "@/components/WhoWeHelp";
import BentoGrid from "@/components/BentoGrid";
import LiveInteractiveStoreDemo from "@/components/LiveInteractiveStoreDemo";
import ArchitectureExplodedView from "@/components/ArchitectureExplodedView";
import ScaleSimulator from "@/components/ScaleSimulator";
import TechSpecs from "@/components/TechSpecs";
import ClientResults from "@/components/ClientResults";
import PricingTiers from "@/components/PricingTiers";
import IntakeModal from "@/components/IntakeModal";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import Footer from "@/components/Footer";

export default function HomePage() {
  // Immediate First Screen — No timed gate blocking arrival
  const [showIntro, setShowIntro] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | undefined>(undefined);

  const handleOpenIntakeWithTier = (tierName?: string) => {
    setSelectedTier(tierName);
    setIsIntakeOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#08080a] text-[#f4f4f6] relative selection:bg-[#0071e3] selection:text-white">
      {/* Optional Replayable Opening Cinematic (Shown only when explicitly triggered) */}
      {showIntro && <ActiveTheoryIntro onComplete={() => setShowIntro(false)} />}

      {/* Subtle Fluid Interactive Background */}
      <FluidCanvasBackground />

      {/* Sticky Translucent Graphite Navigation — Immediately Accessible on Arrival */}
      <Navbar onOpenIntake={() => handleOpenIntakeWithTier()} />

      {/* Flagship Hero Section with Immediate High-Impact Messaging & Gemini Visuals */}
      <Hero onOpenIntake={() => handleOpenIntakeWithTier()} />

      {/* Enterprise Partner Software Compatibility Marquee */}
      <BrandMarquee />

      {/* Repurposed Interactive Experience: Watch an Enquiry Become a Secured Deal */}
      <SeeItInAction onOpenIntake={() => handleOpenIntakeWithTier()} />

      {/* Speed-to-Lead Comparison: Delayed Manual Competitor vs Prompt Automated Routing */}
      <LiveClientRecoveryDemo onOpenIntake={() => handleOpenIntakeWithTier()} />

      {/* The 6 Core Capabilities with Custom Gemini Service Visuals */}
      <BentoGrid />

      {/* Who We Help: Target Sectors with Custom Gemini Industry Vignettes */}
      <div id="who-we-help">
        <WhoWeHelp onOpenIntake={() => handleOpenIntakeWithTier()} />
      </div>

      {/* Interactive Online Store & Checkout Flow Demo */}
      <LiveInteractiveStoreDemo />

      {/* Architectural Deep Dive for Technically Minded Buyers */}
      <ArchitectureExplodedView />

      {/* Interactive Value & ROI Scale Simulator with Dual SME / Store Mode */}
      <ScaleSimulator onOpenIntake={() => handleOpenIntakeWithTier()} />

      {/* Service Architecture Comparison Specs */}
      <TechSpecs />

      {/* Representative Implementation Use Cases */}
      <ClientResults />

      {/* Defined Deliverables & Fixed Investment Packages */}
      <PricingTiers onSelectTier={(tier) => handleOpenIntakeWithTier(tier)} />

      {/* Interactive Project Intake & Onboarding Drawer */}
      <IntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        initialTier={selectedTier}
      />

      {/* Floating Interactive WhatsApp Concierge with Live Ping */}
      <WhatsAppFloatingButton onOpenIntake={() => handleOpenIntakeWithTier()} />

      {/* Transparent Business Directory Footer */}
      <Footer />
    </main>
  );
}
