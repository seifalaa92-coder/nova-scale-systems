"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Building2,
  Wrench,
  Store,
  Users,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface IndustryTrack {
  id: string;
  icon: any;
  title: string;
  number: string;
  badge: string;
  summary: string;
  relevantOffers: string[];
  challenges: string[];
  deliverables: string[];
  focusArea: string;
  image: string;
  imageAlt: string;
}

const TRACKS: IndustryTrack[] = [
  {
    id: "professional",
    icon: Briefcase,
    title: "Professional Services & Consultancies",
    number: "01",
    badge: "Legal, Advisory, Accounting & Architecture",
    summary:
      "Transform high-value corporate visitors into booked client consultations without phone tag or manual administrative delays.",
    relevantOffers: [
      "Offer 01: Websites that convert",
      "Offer 03: Booking and customer reminders",
      "Offer 02: Lead capture and follow-up",
    ],
    challenges: [
      "Dated website that fails to reflect partner seniority and market authority",
      "Partners wasting hours back-and-forth scheduling discovery calls",
      "Unqualified leads taking up partner calendar slots",
    ],
    deliverables: [
      "High-authority corporate web presence with clean case study presentation",
      "Self-scheduling calendar integrated with Google Calendar or Microsoft Outlook",
      "Mandatory pre-qualification questions before a meeting is confirmed",
      "Automated calendar invites and video conference link generation",
    ],
    focusArea: "Consultation Bookings & Partner Time Recovery",
    image: "/images/industry-professional-services.jpg",
    imageAlt: "Contemporary corporate advisory boardroom with skyline view and polished marble conference table",
  },
  {
    id: "clinics",
    icon: Building2,
    title: "Clinics & Healthcare Practices",
    number: "02",
    badge: "Medical, Dental, Physiotherapy & Wellness",
    summary:
      "Enable patients to book private appointments online, reduce empty chair time with automated reminders, and collect Google reviews on autopilot.",
    relevantOffers: [
      "Offer 03: Booking and customer reminders",
      "Offer 06: Retention and reputation",
      "Offer 02: Lead capture and follow-up",
    ],
    challenges: [
      "Front desk overwhelmed during peak clinic hours missing new patient calls",
      "Revenue lost from last-minute patient no-shows and forgotten appointments",
      "Lacking recent 5-star Google reviews to win local patient searches",
    ],
    deliverables: [
      "Mobile-friendly appointment booking for specific treatments and clinicians",
      "Automated SMS and email reminders sent 24 hours and 2 hours prior",
      "Automated post-treatment follow-up messages with 1-click Google review links",
      "Treatment enquiry capture forms with instant front desk notifications",
    ],
    focusArea: "Appointment Attendance & Local Google Reputation",
    image: "/images/industry-clinics.jpg",
    imageAlt: "Serene contemporary dental and wellness clinic reception with oak paneling and digital check-in terminal",
  },
  {
    id: "local-services",
    icon: Wrench,
    title: "Local Services & Specialized Contractors",
    number: "03",
    badge: "Trade Contractors, Home & Commercial Services",
    summary:
      "Capture quote requests the moment a prospective client searches, notify the estimator immediately, and collect reviews after every completed job.",
    relevantOffers: [
      "Offer 02: Lead capture and follow-up",
      "Offer 06: Retention and reputation",
      "Offer 01: Websites that convert",
    ],
    challenges: [
      "Missing profitable jobs while estimators and crews are out on site",
      "Homeowners submitting quote requests and hiring whoever responds first",
      "Disorganized text and email message threads leading to missed follow-ups",
    ],
    deliverables: [
      "Fast 1-tap mobile quote request form with photo upload capability",
      "Instant SMS and email alert to the business owner or lead estimator",
      "Automated message sent immediately to the homeowner acknowledging the request",
      "Automated review request sent to customer upon project completion",
    ],
    focusArea: "Speed-to-Lead Response & Review Collection",
    image: "/images/industry-local-trades.jpg",
    imageAlt: "Architectural contractor drafting studio with blueprints, specs tablet, and jobsite perspective",
  },
  {
    id: "retail",
    icon: Store,
    title: "Retail & Modern Stores",
    number: "04",
    badge: "Boutiques, Specialty Brands & Showrooms",
    summary:
      "Modernize your store with effortless 1-click mobile checkout, clear product presentation, and automated order confirmations.",
    relevantOffers: [
      "Offer 04: Online sales and payments",
      "Offer 06: Retention and reputation",
      "Offer 01: Websites that convert",
    ],
    challenges: [
      "Over 70% of mobile shoppers drop off at long, multi-step checkout forms",
      "Generic templates that make high-value products look commoditized",
      "Missing simple options to recommend complementary accessories or add-ons",
    ],
    deliverables: [
      "High-speed product pages with clear photography and mobile navigation",
      "1-Click digital wallet checkout (Apple Pay, Google Pay, Stripe)",
      "Practical order value enhancements (in-cart add-ons, warranties, bundles)",
      "Automated customer order receipts and shipping confirmation notifications",
    ],
    focusArea: "Mobile Checkout Conversion & Repeat Purchasing",
    image: "/images/industry-retail-stores.jpg",
    imageAlt: "Curated modern boutique showroom with floating displays and elegant spotlighting",
  },
  {
    id: "sme",
    icon: Users,
    title: "B2B Companies & Scaled SMEs",
    number: "05",
    badge: "Wholesalers, Manufacturers & Multi-Location Firms",
    summary:
      "Connect website quote requests and contact forms directly to your sales pipeline and operations tools to eliminate manual data entry.",
    relevantOffers: [
      "Offer 05: Business workflow automation",
      "Offer 02: Lead capture and follow-up",
      "Offer 01: Websites that convert",
    ],
    challenges: [
      "Sales reps spending hours manually copying contact data into CRMs",
      "Delayed handoff between sales qualification and invoice dispatch",
      "Lack of clear tracking on which marketing channels generate closed revenue",
    ],
    deliverables: [
      "High-converting B2B website layout with clear service scoping forms",
      "Automatic deal record creation in HubSpot, Salesforce, or Google Sheets",
      "Automated quote confirmation and internal team notification triggers",
      "Conversion tracking setup connecting Google Analytics to pipeline status",
    ],
    focusArea: "Sales Pipeline Velocity & Admin Reduction",
    image: "/images/industry-b2b-sme.jpg",
    imageAlt: "Modern executive operations conference room with live pipeline data display",
  },
];

export default function WhoWeHelp({ onOpenIntake }: { onOpenIntake: () => void }) {
  const [selectedTrackId, setSelectedTrackId] = useState<string>("professional");
  const activeTrack = TRACKS.find((t) => t.id === selectedTrackId) || TRACKS[0];

  return (
    <section id="who-we-help" className="py-24 md:py-36 relative bg-[#08080a] text-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-[#2997ff] uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Target SME Sectors</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-[-0.038em] leading-[1.06] mb-6">
            Tailored to your exact <br />
            <span className="text-[#2997ff]">business model.</span>
          </h2>
          <p className="text-[#94949e] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Select your industry below to see how our six core services solve the most common operational bottlenecks
            and turn website visitors into clients.
          </p>
        </div>

        {/* 5 Industry Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-6xl mx-auto mb-12">
          {TRACKS.map((track) => {
            const isSelected = track.id === selectedTrackId;
            const Icon = track.icon;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrackId(track.id)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#14141a] text-white border-[#0071e3] shadow-lg shadow-blue-500/10 -translate-y-0.5"
                    : "bg-[#101014] text-[#94949e] border-white/[0.08] hover:border-white/[0.18] hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono ${isSelected ? "text-[#2997ff]" : "text-[#71717a]"}`}>
                    INDEX / {track.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isSelected ? "text-[#2997ff]" : "text-[#71717a]"}`} />
                </div>
                <div className="font-semibold text-xs leading-snug">
                  {track.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Track Detailed Inspector Card */}
        <div className="graphite-card rounded-3xl p-6 sm:p-10 md:p-12 border border-white/[0.08] shadow-2xl bg-[#101014] max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Left Column: Scope & Deliverables (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#2997ff] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-3">
                    <Sparkles className="w-3 h-3 text-[#2997ff]" />
                    <span>{activeTrack.badge}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-white font-bold tracking-tight">
                    {activeTrack.title}
                  </h3>
                  <p className="text-sm text-[#94949e] mt-2 leading-relaxed">
                    {activeTrack.summary}
                  </p>
                </div>

                {/* Relevant Core Offers */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] font-semibold">
                    RECOMMENDED CORE OFFERS:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeTrack.relevantOffers.map((offer, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-[#16161c] border border-white/[0.08] text-[#f4f4f6]"
                      >
                        {offer}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges Addressed */}
                <div className="space-y-2.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                    COMMON FRICTION SOLVED:
                  </div>
                  {activeTrack.challenges.map((challenge, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#94949e]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span>{challenge}</span>
                    </div>
                  ))}
                </div>

                {/* System Deliverables */}
                <div className="space-y-2.5 pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-white font-semibold">
                    WHAT WE DELIVER FOR THIS SECTOR:
                  </div>
                  {activeTrack.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#f4f4f6]">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Custom Gemini Industry Photographic Vignette (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0a0a0e] shadow-xl group">
                  <Image
                    src={activeTrack.image}
                    alt={activeTrack.imageAlt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] font-mono text-[#2997ff] uppercase tracking-wider block">
                      SECTOR VIGNETTE
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {activeTrack.focusArea}
                    </span>
                  </div>
                </div>

                {/* Outcome Callout Box */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] mb-1">
                    PRIMARY OUTCOME:
                  </div>
                  <div className="text-base font-bold text-white font-display">
                    {activeTrack.focusArea}
                  </div>
                  <p className="text-xs text-[#94949e] mt-1.5 leading-relaxed">
                    Designed to eliminate administrative delays and give prospects an effortless way to enquire, book, and buy.
                  </p>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={onOpenIntake}
                  className="w-full graphite-button-primary py-3.5 px-6 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20"
                >
                  <span>Build My Growth Plan for This Sector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
