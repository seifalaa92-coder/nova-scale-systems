"use client";

import React from "react";
import { Check, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

interface CaseScenario {
  number: string;
  industry: string;
  headline: string;
  focusArea: string;
  problem: string;
  solution: string;
  deliverablesSummary: string[];
}

const SCENARIOS: CaseScenario[] = [
  {
    number: "01",
    industry: "Corporate Professional Services & Law",
    headline: "Consultation Scheduling & Pre-Qualification",
    focusArea: "Website Redesign + Booking Calendar + CRM Intake",
    problem:
      "Partners were spending hours every week coordinating meeting times via email, only to discover that several enquiries were unqualified for their service tiers.",
    solution:
      "Implemented a bespoke conversion website with an integrated calendar and pre-qualification questionnaire, routing only qualified corporate leads directly into partner calendars.",
    deliverablesSummary: [
      "Mobile-optimized corporate landing pages",
      "Two-way calendar sync with Google & Outlook",
      "Automated intake form filtering out unqualified submissions",
      "Instant confirmation emails with meeting links",
    ],
  },
  {
    number: "02",
    industry: "Private Dental & Medical Practice",
    headline: "Appointment Confirmations & Google Review Flow",
    focusArea: "Booking Reminders + Reputation Automation",
    problem:
      "Front-desk staff were overwhelmed making reminder phone calls, yet patients still forgot appointments, creating costly gaps in the clinic's daily schedule.",
    solution:
      "Deployed automated SMS and email reminders sent at 24 hours and 2 hours prior, followed by an automated review request link after completed treatments.",
    deliverablesSummary: [
      "Automated 2-step SMS & email appointment reminders",
      "1-Tap post-appointment Google review request link",
      "Online treatment enquiry form with staff notifications",
      "Reputation tracking to monitor patient satisfaction",
    ],
  },
  {
    number: "03",
    industry: "Specialty Retail & Showroom",
    headline: "Frictionless Mobile Checkout & Order Follow-Up",
    focusArea: "Online Store + 1-Click Payments + Repeat Triggers",
    problem:
      "Over 75% of web visitors were browsing on phones but abandoning carts at lengthy multi-step billing and shipping entry forms.",
    solution:
      "Streamlined the checkout experience with 1-click digital wallet payment (Apple Pay, Google Pay, Stripe), clear product presentation, and automated order confirmations.",
    deliverablesSummary: [
      "1-Click mobile checkout integration",
      "Clear product variant selectors and fast image loading",
      "Automated order confirmation receipts & tracking emails",
      "Post-purchase satisfaction survey & care guide",
    ],
  },
];

export default function ClientResults() {
  return (
    <section id="case-studies" className="py-24 md:py-36 relative bg-[#fbfbfd] text-[#0e0e11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-[#0071e3] uppercase tracking-wider mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Representative Operational Scenarios</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-[#0e0e11] tracking-[-0.038em] leading-[1.06] mb-6">
            Proven models for <br />
            <span className="text-[#0071e3]">common business problems.</span>
          </h2>
          <p className="text-[#515154] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            These representative implementation models illustrate how different business types combine our website
            design and automation capabilities to address daily operational friction.
          </p>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SCENARIOS.map((scenario, idx) => (
            <div
              key={idx}
              className="apple-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-white border border-black/[0.08] shadow-md hover:shadow-xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#86868b] uppercase pb-3 border-b border-black/[0.06] mb-6">
                  <span>USE CASE / {scenario.number}</span>
                  <span className="font-semibold text-[#0e0e11]">{scenario.industry}</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0e0e11] tracking-tight mb-2">
                  {scenario.headline}
                </h3>
                <div className="text-xs font-mono text-[#0071e3] font-semibold mb-5">
                  {scenario.focusArea}
                </div>

                <div className="space-y-4 mb-8 text-xs text-[#515154] leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                    <span className="font-mono text-[10px] font-bold text-amber-800 uppercase block mb-1">
                      CHALLENGE:
                    </span>
                    <span className="text-amber-950">{scenario.problem}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                    <span className="font-mono text-[10px] font-bold text-emerald-800 uppercase block mb-1">
                      IMPLEMENTATION:
                    </span>
                    <span className="text-emerald-950">{scenario.solution}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-black/[0.06]">
                <span className="font-mono text-[10px] font-bold text-[#86868b] uppercase tracking-wider block mb-2.5">
                  SYSTEM DELIVERABLES:
                </span>
                <div className="space-y-2">
                  {scenario.deliverablesSummary.map((item, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-[#515154]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 text-center text-xs text-[#86868b] max-w-2xl mx-auto">
          Illustrative implementation examples. Actual system setup, tools, and timelines depend on your specific
          requirements, existing software accounts, and chosen service scope.
        </div>
      </div>
    </section>
  );
}
