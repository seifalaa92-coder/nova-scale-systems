"use client";

import React from "react";
import { Check, Sparkles, Layers } from "lucide-react";

const COMPARISON_ROWS = [
  {
    feature: "Mobile Page Loading & Performance",
    nova: "Optimized clean code, compressed media & global CDN delivery",
    agency: "Often bogged down by 20+ WordPress plugins and heavy theme scripts",
    diy: "Standard template overhead with restricted script optimization",
    highlight: true,
  },
  {
    feature: "Lead Capture & Team Notifications",
    nova: "Immediate email, SMS, or Slack alerts sent to designated staff",
    agency: "Standard contact forms often landing in generic unmonitored inboxes",
    diy: "Basic form notifications; advanced routing requires extra plugins",
    highlight: true,
  },
  {
    feature: "Appointment Scheduling & Intake",
    nova: "Embedded self-scheduling with pre-qualification questions & calendar sync",
    agency: "Often requires manual phone tag or third-party iframe embeds",
    diy: "Basic scheduling widget with limited customization options",
    highlight: false,
  },
  {
    feature: "Business Workflow Automations",
    nova: "Direct webhook and API triggers connecting forms to your CRM & tools",
    agency: "Rarely included by default; typically billed as expensive custom dev",
    diy: "Restricted to basic built-in app ecosystem connections",
    highlight: true,
  },
  {
    feature: "Online Payments & Checkout",
    nova: "1-Click digital wallets (Apple Pay, Google Pay) and custom Stripe flows",
    agency: "Standard multi-step forms with higher mobile cart abandonment",
    diy: "Generic redirection to external checkout pages",
    highlight: false,
  },
  {
    feature: "Code & Account Ownership",
    nova: "100% full client ownership of all code, assets, and service accounts",
    agency: "Often locked into proprietary agency hosting and retainer contracts",
    diy: "Rented inside a closed platform; cannot export clean custom code",
    highlight: true,
  },
  {
    feature: "Post-Service Review Requests",
    nova: "Automated timed review links sent to happy customers via SMS/Email",
    agency: "Manual outreach; rarely systematized across every completed job",
    diy: "Requires manual copy-pasting of review links to clients",
    highlight: false,
  },
];

export default function TechSpecs() {
  return (
    <section id="technical-inspection" className="py-24 md:py-36 relative bg-[#fbfbfd] text-[#0e0e11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-[#0071e3] uppercase tracking-wider mb-4 font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>Service Architecture Comparison</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.038em] text-[#0e0e11] mb-6">
            Compare the approach.
          </h2>
          <p className="text-[#515154] text-base md:text-lg leading-relaxed">
            See how NOVA’s custom web architecture and business automations compare to generic agency retainers and basic DIY builders.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[720px] apple-card rounded-3xl p-6 md:p-8 border border-black/[0.08] shadow-xl bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-black/[0.08] text-xs uppercase tracking-wider">
                  <th className="py-4 px-4 text-[#515154] font-medium w-1/3">Core Capability</th>
                  <th className="py-4 px-4 text-[#0071e3] font-bold w-1/3 bg-blue-50 rounded-t-xl border-t border-x border-[#0071e3]/30">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#0071e3]" />
                      <span>NOVA Scale Systems</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-[#86868b] font-medium w-1/6">Typical Agency</th>
                  <th className="py-4 px-4 text-[#86868b] font-medium w-1/6">DIY Builders</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06] text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row, index) => (
                  <tr
                    key={index}
                    className={`transition-colors hover:bg-black/[0.01] ${
                      row.highlight ? "bg-black/[0.01]" : ""
                    }`}
                  >
                    <td className="py-4 px-4 font-semibold text-[#0e0e11]">{row.feature}</td>
                    <td className="py-4 px-4 font-medium text-emerald-800 bg-blue-50/40 border-x border-[#0071e3]/20">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{row.nova}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#515154]">{row.agency}</td>
                    <td className="py-4 px-4 text-[#515154]">{row.diy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
