"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  MessageSquare,
  Calendar,
  Database,
  CheckCircle2,
  Play,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface HeroProps {
  onOpenIntake: () => void;
}

export default function Hero({ onOpenIntake }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#08080a] text-[#f4f4f6]">
      {/* Cinematic Ambient Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-hero-glow pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] shadow-xl backdrop-blur-md mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.2em] text-[#94949e] uppercase font-semibold">
            Digital Growth & Business Automation Partner
          </span>
        </motion.div>

        {/* Master Headline - Exact User Copy */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold text-white max-w-5xl mx-auto leading-[0.98] tracking-[-0.04em] mb-6"
        >
          More enquiries. <br />
          More customers. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2997ff] via-[#60a5fa] to-[#93c5fd]">
            Less manual work.
          </span>
        </motion.h1>

        {/* Supporting Text - Exact User Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-[#94949e] font-normal leading-relaxed mb-10 tracking-[-0.01em]"
        >
          Websites, sales workflows, and business automations built to help ambitious companies grow.
        </motion.p>

        {/* Primary & Secondary Calls to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onOpenIntake}
            className="graphite-button-primary px-8 py-4 text-xs uppercase tracking-[0.16em] font-semibold flex items-center gap-3 group w-full sm:w-auto justify-center cursor-pointer shadow-xl shadow-blue-500/25"
          >
            <span>Build My Growth Plan</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#see-in-action"
            className="graphite-button-secondary px-8 py-4 text-xs uppercase tracking-[0.16em] font-semibold flex items-center gap-2.5 w-full sm:w-auto justify-center cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#2997ff] fill-[#2997ff]" />
            <span>See It in Action</span>
          </a>
        </motion.div>

        {/* Three Core Value Pillars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-16 border-y border-white/[0.08] py-6 sm:py-8 text-left"
        >
          <div className="px-4 py-2 border-l border-[#0071e3]/60 bg-white/[0.01] rounded-r-xl">
            <div className="text-[11px] font-mono text-[#2997ff] uppercase tracking-wider mb-1 font-semibold">
              01 / ATTRACT
            </div>
            <div className="font-display text-lg sm:text-xl text-white font-bold tracking-tight">
              Capture More Enquiries
            </div>
            <p className="text-xs text-[#94949e] mt-1.5 leading-relaxed">
              Custom websites and targeted landing pages engineered for mobile speed and clear conversion.
            </p>
          </div>

          <div className="px-4 py-2 border-l border-emerald-500/60 bg-white/[0.01] rounded-r-xl">
            <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1 font-semibold">
              02 / CONVERT
            </div>
            <div className="font-display text-lg sm:text-xl text-white font-bold tracking-tight">
              Respond & Book Faster
            </div>
            <p className="text-xs text-[#94949e] mt-1.5 leading-relaxed">
              Instant team notifications and self-scheduling calendars so no warm lead slips to a competitor.
            </p>
          </div>

          <div className="px-4 py-2 border-l border-purple-500/60 bg-white/[0.01] rounded-r-xl">
            <div className="text-[11px] font-mono text-purple-400 uppercase tracking-wider mb-1 font-semibold">
              03 / AUTOMATE
            </div>
            <div className="font-display text-lg sm:text-xl text-white font-bold tracking-tight">
              Eliminate Manual Admin
            </div>
            <p className="text-xs text-[#94949e] mt-1.5 leading-relaxed">
              Automated CRM sync, calendar reminders, and customer review requests that run without human delay.
            </p>
          </div>
        </motion.div>

        {/* Large Cinematic Composition: Connected Business System */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-6xl mx-auto rounded-3xl overflow-hidden border border-white/[0.1] bg-[#101014] shadow-2xl shadow-black/80"
        >
          {/* Top Window Bar */}
          <div className="px-5 py-3.5 bg-[#14141a] border-b border-white/[0.08] flex items-center justify-between text-xs text-[#71717a] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-3 text-[#94949e] font-sans font-medium text-xs hidden sm:inline">
                NOVA Scale Systems • Connected Business Journey Architecture
              </span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE SYSTEM ACTIVE</span>
            </div>
          </div>

          {/* Master Visual Canvas: Gemini Photographic Composition with HTML Interface Overlay */}
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden bg-[#0a0a0e]">
            {/* Custom Gemini Hero Composition Background */}
            <Image
              src="/images/hero-graphite-composition.jpg"
              alt="NOVA connected business architecture with laptop, smartphone, and operational pipeline in deep graphite studio lighting"
              fill
              priority
              className="object-cover object-center opacity-85 select-none"
            />

            {/* Dark Vignette Overlay for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-[#101014]/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#101014]/60 via-transparent to-[#101014]/60 pointer-events-none" />

            {/* Floating Connected Interface Cards (Accessible, Sharp HTML) */}
            <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between">
              {/* Top Flow Banner */}
              <div className="flex items-center justify-between text-left">
                <div className="px-3.5 py-1.5 rounded-full bg-[#08080a]/85 backdrop-blur-md border border-white/[0.12] text-[11px] font-mono text-[#f4f4f6]">
                  <span className="text-[#2997ff] font-semibold">STAGE 01 → 03:</span> INBOUND LEAD TO REVENUE
                </div>
                <div className="hidden sm:inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#2997ff] text-[11px] font-mono">
                  ZERO CLIENT DROP-OFF
                </div>
              </div>

              {/* Connected Three-Node Pipeline Display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 text-left my-auto">
                {/* Node 1: Mobile Enquiry */}
                <div className="p-4 rounded-2xl bg-[#0e0e14]/90 backdrop-blur-md border border-white/[0.1] shadow-xl text-left">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#86868b] mb-2">
                    <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>STEP 1: ENQUIRY</span>
                    </span>
                    <span className="text-emerald-400 font-bold">12s response</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    Direct WhatsApp & Form Capture
                  </div>
                  <p className="text-[11px] text-[#94949e] leading-snug">
                    Prospect submits enquiry; staff immediately pinged and automated greeting dispatched.
                  </p>
                </div>

                {/* Node 2: Automated Booking */}
                <div className="p-4 rounded-2xl bg-[#0e0e14]/90 backdrop-blur-md border border-[#0071e3]/40 shadow-xl text-left relative">
                  <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#0071e3] text-white text-[9px] font-mono font-bold tracking-wider">
                    AUTOMATED
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#86868b] mb-2">
                    <span className="flex items-center gap-1.5 text-[#2997ff] font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>STEP 2: BOOKING</span>
                    </span>
                    <span className="text-[#f4f4f6]">Cal Sync</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    Pre-Qualified Calendar Booking
                  </div>
                  <p className="text-[11px] text-[#94949e] leading-snug">
                    Client chooses meeting slot; calendar invite, video link, and intake questions synced.
                  </p>
                </div>

                {/* Node 3: CRM Ingestion & Retention */}
                <div className="p-4 rounded-2xl bg-[#0e0e14]/90 backdrop-blur-md border border-white/[0.1] shadow-xl text-left">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#86868b] mb-2">
                    <span className="flex items-center gap-1.5 text-purple-400 font-semibold">
                      <Database className="w-3.5 h-3.5" />
                      <span>STEP 3: SECURED</span>
                    </span>
                    <span className="text-emerald-400 font-bold">CRM Synced</span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    Deal Created & Review Queued
                  </div>
                  <p className="text-[11px] text-[#94949e] leading-snug">
                    Lead entered in CRM, follow-up scheduled, and 5-star review request queued post-service.
                  </p>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#86868b] pt-3 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span className="text-white text-[11px] font-mono">
                    Integrations: Google Workspace • HubSpot • Stripe • WhatsApp
                  </span>
                </div>
                <a
                  href="#services"
                  className="text-xs font-semibold text-[#2997ff] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Explore the 6 core systems</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
