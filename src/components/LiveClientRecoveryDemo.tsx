"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  CheckCheck,
  Zap,
  ArrowRight,
  Sparkles,
  XCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

interface Scenario {
  id: string;
  category: string;
  clientName: string;
  dealValue: string;
  inquiryMsg: string;
  slowCompetitorResponse: {
    delay: string;
    msg: string;
    result: string;
    outcomeNote: string;
  };
  novaInstantResponse: {
    delay: string;
    msg: string;
    result: string;
    outcomeNote: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "clinic",
    category: "Medical & Dental Clinic",
    clientName: "Sarah M. (New Patient)",
    dealValue: "Treatment Value: ~$3,500",
    inquiryMsg: "Hi, I need an appointment for cosmetic dental treatment. Are you available this Thursday afternoon?",
    slowCompetitorResponse: {
      delay: "11 Hours Later (Email)",
      msg: "Hi Sarah, sorry for the delay. Please call our clinic reception between 9am and 5pm to check available slots.",
      result: "Patient has already booked with another clinic that provided instant booking.",
      outcomeNote: "Lost consultation to faster responder",
    },
    novaInstantResponse: {
      delay: "Instant (Automated Reply)",
      msg: "Hello Sarah! Dr. Aris has 2 consultation slots open this Thursday at 2:30 PM & 4:00 PM. Tap here to lock in your preferred time instantly: [yourclinic.com/booking]",
      result: "Patient reserves Thursday 2:30 PM slot. Automated calendar confirmation & SMS reminder scheduled.",
      outcomeNote: "Appointment confirmed within minutes",
    },
  },
  {
    id: "operations",
    category: "Business Operations & SME",
    clientName: "David K. (Operations Director)",
    dealValue: "Project Retainer: ~$6,800",
    inquiryMsg: "Hi, we want to automate our team's lead intake and CRM workflows across our 3 offices. Who can we speak to this week?",
    slowCompetitorResponse: {
      delay: "18 Hours Later",
      msg: "Thank you for contacting us. Please fill out our 12-question PDF form and someone from sales will review it next week.",
      result: "Prospective client contacted another provider offering direct calendar scheduling.",
      outcomeNote: "Delayed sales cycle & cool-off",
    },
    novaInstantResponse: {
      delay: "Prompt (Automated Routing)",
      msg: "Good evening David! We engineer complete business workflow automations in 2–4 weeks. You can directly select a 30-min discovery session on our calendar here: [yoursite.com/discovery]",
      result: "Discovery session booked for Wednesday 10 AM. Team notified in Slack with preliminary project details.",
      outcomeNote: "Qualified meeting secured immediately",
    },
  },
  {
    id: "contractor",
    category: "Specialized Contractor",
    clientName: "James R. (Commercial Property)",
    dealValue: "Contract Value: ~$18,000",
    inquiryMsg: "Need an urgent commercial HVAC retrofit quote for our 20,000 sq ft warehouse. Project starts next month.",
    slowCompetitorResponse: {
      delay: "Next Day at 3:15 PM",
      msg: "We received your message. Our estimator is out in the field and will try to call you back by the end of the week.",
      result: "Property manager had already booked an on-site visit with a responsive contractor.",
      outcomeNote: "High-value commercial bid lost",
    },
    novaInstantResponse: {
      delay: "Instant SMS Alert to Owner",
      msg: "Hi James! We have received your warehouse retrofit project details. Our Senior Commercial Estimator is reviewing your specs and will call you today at 11:30 AM.",
      result: "Owner pings lead within 8 minutes. On-site assessment locked in on calendar.",
      outcomeNote: "First to respond; proposal delivered",
    },
  },
];

export default function LiveClientRecoveryDemo({
  onOpenIntake,
}: {
  onOpenIntake: () => void;
}) {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("clinic");
  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  return (
    <section id="speed-to-lead" className="py-24 md:py-36 relative bg-[#08080a] text-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-[#2997ff] uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Speed-to-Lead Comparison</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-[-0.038em] leading-[1.06] mb-6">
            The first business to respond <br />
            <span className="text-[#2997ff]">wins the client.</span>
          </h2>
          <p className="text-[#94949e] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            78% of customers purchase from the provider that replies first. See the difference between traditional
            manual delays and NOVA&apos;s automated lead capture.
          </p>

          {/* Scenario Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveScenarioId(s.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeScenarioId === s.id
                    ? "bg-[#14141a] text-white border border-[#0071e3] shadow-md shadow-blue-500/15"
                    : "bg-[#101014] text-[#71717a] border border-white/[0.08] hover:text-white hover:border-white/[0.18]"
                }`}
              >
                {s.category}
              </button>
            ))}
          </div>
        </div>

        {/* Live Side-by-Side Comparison Container */}
        <div className="max-w-5xl mx-auto">
          {/* Header Bar */}
          <div className="p-4 sm:p-5 bg-[#14141a] rounded-t-3xl border-t border-x border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white">
                ILLUSTRATIVE ENQUIRY: <span className="text-[#2997ff]">{scenario.clientName}</span>
              </span>
            </div>
            <div className="text-xs font-mono text-emerald-300 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {scenario.dealValue}
            </div>
          </div>

          {/* Incoming Customer Message Box */}
          <div className="p-5 sm:p-6 bg-[#101014] border-x border-white/[0.08] flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {scenario.clientName[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-[#71717a] mb-1 font-mono">
                <span>{scenario.clientName} • Website Enquiry Form</span>
                <span>Sunday 9:42 PM (After Hours)</span>
              </div>
              <p className="text-base sm:text-lg text-[#f4f4f6] font-medium leading-relaxed bg-[#16161e] p-4 sm:p-5 rounded-2xl border border-white/[0.06]">
                &ldquo;{scenario.inquiryMsg}&rdquo;
              </p>
            </div>
          </div>

          {/* The Side-by-Side Dual Fate Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 rounded-b-3xl border border-white/[0.08] overflow-hidden shadow-2xl">
            {/* Column A: Standard Delayed Response */}
            <div className="p-6 sm:p-8 bg-[#150f11] border-b md:border-b-0 md:border-r border-white/[0.08] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-red-500/20 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400">
                    <XCircle className="w-4 h-4" />
                    <span>SLOW / MANUAL RESPONSE</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#94949e] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{scenario.slowCompetitorResponse.delay}</span>
                  </span>
                </div>

                {/* Slow Message bubble */}
                <div className="bg-[#1f1517] p-4 rounded-2xl border border-red-500/20 text-xs text-[#d4b0b4] space-y-2">
                  <div className="text-[10px] text-red-400 font-mono">Delayed Email Response:</div>
                  <p className="italic leading-relaxed">&ldquo;{scenario.slowCompetitorResponse.msg}&rdquo;</p>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 space-y-1">
                  <div className="font-bold text-red-300">Probable Outcome:</div>
                  <p className="text-[11px] leading-snug">{scenario.slowCompetitorResponse.result}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-red-500/20 flex items-center justify-between">
                <span className="text-xs text-[#94949e]">Business Result:</span>
                <span className="text-xs font-mono font-bold text-red-400">
                  {scenario.slowCompetitorResponse.outcomeNote}
                </span>
              </div>
            </div>

            {/* Column B: Prompt Automated Follow-Up */}
            <div className="p-6 sm:p-8 bg-[#0a1a14] flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>NOVA AUTOMATED WORKFLOW</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300 font-semibold bg-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/30">
                    <Zap className="w-3 h-3 fill-emerald-400" />
                    <span>{scenario.novaInstantResponse.delay}</span>
                  </span>
                </div>

                {/* Automated Message bubble */}
                <div className="bg-[#0f281e] p-4 sm:p-5 rounded-2xl border border-emerald-500/30 text-sm sm:text-base text-white space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-mono font-bold">
                    <span>Automated Acknowledgement & Booking</span>
                    <CheckCheck className="w-4 h-4 text-[#2997ff]" />
                  </div>
                  <p className="leading-relaxed font-medium">&ldquo;{scenario.novaInstantResponse.msg}&rdquo;</p>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>System Outcome:</span>
                  </div>
                  <p className="text-[11px] leading-snug">{scenario.novaInstantResponse.result}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between">
                <span className="text-xs text-[#94949e]">Business Result:</span>
                <span className="text-xs font-mono font-bold text-emerald-300">
                  {scenario.novaInstantResponse.outcomeNote}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button & Disclaimer */}
        <div className="text-center mt-12 space-y-4">
          <button
            onClick={onOpenIntake}
            className="graphite-button-primary px-8 py-4 text-xs uppercase tracking-[0.16em] font-semibold inline-flex items-center gap-2.5 shadow-xl shadow-blue-500/20 cursor-pointer"
          >
            <span>Build My Growth Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <div className="text-xs text-[#71717a] max-w-xl mx-auto flex items-center justify-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-[#71717a]" />
            <span>Illustrative scenarios showing how speed-to-lead and automated intake improve consultation booking rates.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
