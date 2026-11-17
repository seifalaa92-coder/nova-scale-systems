"use client";

import React from "react";
import { Check, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

interface PricingProps {
  onSelectTier: (tierName: string) => void;
}

const TIERS = [
  {
    name: "Core Conversion",
    num: "I",
    badge: "FOUNDATION PACKAGE",
    tagline:
      "A fast, high-converting custom website or landing page with clear calls to action and enquiry forms.",
    price: "$3,500",
    period: "fixed project fee • 100% code ownership",
    popular: false,
    timeline: "Estimated 2–3 Weeks",
    coreScope: [
      "Custom responsive design (mobile, tablet, desktop)",
      "Clear calls to action & strategic content structure",
      "Lead enquiry forms with instant email notifications",
      "Analytics & conversion goal tracking (GA4 setup)",
      "Standard on-page SEO & fast mobile performance",
      "Full code & asset ownership with zero proprietary lock-in",
    ],
    optionalAddons: [
      "Additional landing pages or sub-service templates",
      "Copywriting assistance or professional brand asset review",
    ],
  },
  {
    name: "Growth & Lead Automation",
    num: "II",
    badge: "MOST POPULAR FOR SMES",
    tagline:
      "Complete customer acquisition engine: High-converting website plus automated booking, follow-up, and review collection.",
    price: "$6,800",
    period: "fixed project fee • 100% code ownership",
    popular: true,
    timeline: "Estimated 3–4 Weeks",
    coreScope: [
      "Everything in Core Conversion, plus:",
      "Integrated self-scheduling calendar (Google & Outlook sync)",
      "Custom pre-qualification questions before booking",
      "Automated appointment reminders (SMS & Email sequences)",
      "Automated post-service 5-star Google review request flow",
      "Centralized lead notification alerts to staff (SMS or Slack)",
      "Online payment or deposit processing setup (Stripe)",
      "30-day post-launch technical support & adjustment period",
    ],
    optionalAddons: [
      "WhatsApp Business API messaging integration (where accounts permitted)",
      "Multi-provider calendar routing for teams of 3+ staff",
    ],
  },
  {
    name: "Custom Workflow & Systems",
    num: "III",
    badge: "MULTI-TOOL & ENTERPRISE",
    tagline:
      "Full digital infrastructure connecting your website directly to your internal software, CRMs, and accounting workflows.",
    price: "$12,500+",
    period: "tailored scope • 100% code ownership",
    popular: false,
    timeline: "Estimated 4–6 Weeks",
    coreScope: [
      "Everything in Growth & Lead Automation, plus:",
      "Custom bi-directional CRM integration (HubSpot, Salesforce, Pipedrive)",
      "Automated quote, contract, and invoice triggers (QuickBooks, Xero)",
      "Multi-channel lead triage and automated routing rules",
      "Custom analytics dashboard tracking enquiry-to-close metrics",
      "Dedicated staging environment & staff onboarding workshop",
    ],
    optionalAddons: [
      "Custom API connectors to legacy database or ERP software",
      "Ongoing monthly workflow maintenance & optimization retainer",
    ],
  },
];

export default function PricingTiers({ onSelectTier }: PricingProps) {
  return (
    <section id="pricing" className="py-24 md:py-36 relative bg-[#fbfbfd] text-[#0e0e11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-[#0071e3] uppercase tracking-wider mb-4 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Defined Deliverables & Fixed Rates</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-[#0e0e11] tracking-[-0.038em] leading-[1.06] mb-6">
            Clear project pricing. <br />
            <span className="text-[#0071e3]">Defined deliverables.</span>
          </h2>
          <p className="text-[#515154] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Fixed project pricing with defined deliverables and timelines. You own 100% of your website code,
            accounts, and assets with zero ongoing agency lock-in.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? "bg-white border-2 border-[#0071e3] shadow-2xl lg:-translate-y-2 ring-1 ring-blue-500/20"
                  : "apple-card bg-white border border-black/[0.08] shadow-md hover:shadow-xl"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0071e3] text-white text-[10px] font-mono tracking-widest uppercase px-4 py-1 rounded-full shadow-lg font-bold">
                  RECOMMENDED FOR MOST SMES
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] font-mono tracking-widest text-[#86868b]">
                    PACKAGE / {tier.num}
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border bg-black/[0.04] text-[#515154] border-black/[0.08] font-medium">
                    {tier.timeline}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold mb-1 text-[#0e0e11] tracking-tight">
                  {tier.name}
                </h3>
                <p className="text-[11px] font-mono uppercase tracking-wider mb-4 text-[#0071e3] font-semibold">
                  {tier.badge}
                </p>
                <p className="text-xs leading-relaxed min-h-[36px] mb-8 text-[#515154]">
                  {tier.tagline}
                </p>

                <div className="mb-8 pb-8 border-b border-black/[0.08]">
                  <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0e0e11]">
                    {tier.price}
                  </div>
                  <div className="text-[11px] font-mono mt-1 text-[#86868b]">
                    {tier.period}
                  </div>
                </div>

                {/* Core Deliverables List */}
                <div className="space-y-3 mb-8">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868b] font-semibold">
                    INCLUDED DELIVERABLES:
                  </div>
                  {tier.coreScope.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3 text-xs text-[#515154]">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-600" />
                      </span>
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Optional Scope */}
                <div className="space-y-2 mb-10 pt-4 border-t border-black/[0.06]">
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#86868b] font-semibold">
                    AVAILABLE OPTIONS:
                  </div>
                  {tier.optionalAddons.map((addon, aIdx) => (
                    <div key={aIdx} className="text-xs text-[#515154] flex items-start gap-2">
                      <span className="text-[#0071e3] font-bold">+</span>
                      <span className="leading-tight">{addon}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectTier(tier.name)}
                className={`w-full py-4 rounded-full text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  tier.popular
                    ? "apple-button-primary shadow-lg"
                    : "apple-button-secondary shadow-xs"
                }`}
              >
                <span>Request a Project Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Pricing Transparency & Third-Party Accounts Disclaimer */}
        <div className="mt-14 p-6 rounded-2xl bg-white border border-black/[0.08] shadow-md max-w-4xl mx-auto text-xs text-[#515154] space-y-2 leading-relaxed">
          <div className="flex items-center gap-2 text-[#0e0e11] font-semibold">
            <ShieldAlert className="w-4 h-4 text-[#0071e3]" />
            <span>Scope & Software Account Disclaimers</span>
          </div>
          <p>
            Project fees cover custom design, front-end development, workflow configuration, testing, and deployment.
            Ongoing third-party software subscriptions (such as domain registration, web hosting, email inbox services, CRM subscriptions,
            SMS usage credits via Twilio, or payment gateway fees via Stripe) are owned directly by your company and billed by each respective provider.
          </p>
        </div>
      </div>
    </section>
  );
}
