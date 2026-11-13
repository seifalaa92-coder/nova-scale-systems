"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Cpu,
  ShoppingBag,
  Workflow,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface Layer {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  metrics: { label: string; value: string }[];
  description: string;
  codeSnippet: string;
  benefits: string[];
}

const LAYERS: Layer[] = [
  {
    id: "edge",
    number: "01",
    title: "Global Content Delivery & Edge Routing",
    subtitle: "Fast asset delivery close to your visitors",
    tag: "EDGE RUNTIME",
    metrics: [
      { label: "Target TTFB", value: "< 50ms" },
      { label: "Asset Caching", value: "Global CDN" },
      { label: "SSL / TLS", value: "Automated" },
    ],
    description:
      "When a prospective client opens your site from any location or device, static pages and assets are delivered from nearby global edge nodes, reducing waiting time and improving first impressions.",
    codeSnippet: `// Edge-Optimized Route Handler Example
export const runtime = 'edge';

export async function GET(request: Request) {
  // Return cached business data with automated revalidation
  return Response.json({ status: 'operational', timestamp: Date.now() }, {
    headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' }
  });
}`,
    benefits: [
      "Fast first contentful paint across mobile and desktop connections",
      "Resilient during traffic surges from promotions or seasonal campaigns",
      "Edge SSL encryption and standard DDoS mitigation included",
    ],
  },
  {
    id: "engine",
    number: "02",
    title: "Modern Component Architecture",
    subtitle: "Clean code structure without template bloat",
    tag: "CLEAN CODEBASE",
    metrics: [
      { label: "Core Web Vitals", value: "Compliant" },
      { label: "Client Bundle", value: "Lightweight" },
      { label: "Accessibility", value: "Semantic HTML" },
    ],
    description:
      "Unlike generic website builders burdened with dozens of incompatible plugins, custom-built sites deliver clean semantic markup, fast load times, and structured data for search engine clarity.",
    codeSnippet: `// Server Action: Lead Capture & Staff Notification Example
export async function submitEnquiryAction(formData: FormData) {
  'use server';
  const enquiry = validateEnquiry(formData);
  
  // Create lead record & trigger staff notification
  await Promise.all([
    recordLeadInPipeline(enquiry),
    dispatchStaffAlert(enquiry)
  ]);
  return { success: true };
}`,
    benefits: [
      "Built following Google Core Web Vitals performance guidelines",
      "Smooth layout stability (CLS) with responsive mobile layouts",
      "Full source code ownership with zero monthly theme lock-in fees",
    ],
  },
  {
    id: "checkout",
    number: "03",
    title: "Frictionless Sales & Payments Flow",
    subtitle: "1-Click Digital Wallets & Secure Provider Integration",
    tag: "PAYMENT INTEGRATION",
    metrics: [
      { label: "Supported Wallets", value: "Apple / Google Pay" },
      { label: "Payment Gateway", value: "Stripe Verified" },
      { label: "Security", value: "PCI-DSS Level 1" },
    ],
    description:
      "Eliminate multi-step checkout friction with 1-click digital wallet support, clear product options, order bumps, and automatic payment receipt dispatching.",
    codeSnippet: `// Payment Intent with Digital Wallet Support Example
const paymentIntent = await stripe.paymentIntents.create({
  amount: order.totalInCents,
  currency: 'usd',
  automatic_payment_methods: { enabled: true },
  metadata: { orderId: order.id, customerEmail: order.email }
});`,
    benefits: [
      "Support for Apple Pay, Google Pay, and major credit cards via Stripe",
      "Optional add-ons, warranties, or service tier selection at checkout",
      "Direct webhook verification to trigger post-purchase emails",
    ],
  },
  {
    id: "automation",
    number: "04",
    title: "Business Workflow & CRM Integrations",
    subtitle: "Connect your enquiry forms to the tools you already use",
    tag: "WORKFLOW CONNECTIVITY",
    metrics: [
      { label: "Supported CRMs", value: "HubSpot / Google" },
      { label: "Staff Alerts", value: "SMS / WhatsApp / Email" },
      { label: "Account Scope", value: "Client Provided" },
    ],
    description:
      "Bridge your website forms to your day-to-day business tools. New enquiries automatically create pipeline records, alert available staff members, and send structured confirmation emails.",
    codeSnippet: `// Webhook Event Integration Flow
export async function handleNewEnquiry(enquiry: LeadData) {
  // 1. Sync to CRM (HubSpot, Salesforce, or Google Sheets)
  await syncToCRM(enquiry);

  // 2. Alert on-duty staff member via SMS / WhatsApp
  await notifyTeamMember({ leadName: enquiry.name, phone: enquiry.phone });

  // 3. Queue automated confirmation & calendar booking link
  await queueConfirmationEmail(enquiry.email);
}`,
    benefits: [
      "Eliminates manual re-typing of enquiries between email and CRM",
      "Immediate notifications allow your team to follow up while interest is high",
      "Transparent reliance on client-maintained accounts and official APIs",
    ],
  },
];

export default function ArchitectureExplodedView() {
  const [activeLayerId, setActiveLayerId] = useState<string>("edge");
  const activeLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[0];

  return (
    <section id="technical-inspection" className="py-24 md:py-36 relative border-t border-black/[0.06] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>FOR TECHNICALLY MINDED BUYERS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.038em] text-[#0e0e11] mb-6">
            Under the hood: reliable, scalable architecture.
          </h2>
          <p className="text-[#6e6e73] text-base md:text-lg leading-relaxed">
            While business outcomes come first, modern infrastructure powers them. Inspect the underlying code,
            edge routing, payment security, and workflow integrations we build into every deployment.
          </p>
        </div>

        {/* 4-Layer Navigation Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {LAYERS.map((layer) => {
            const isSelected = layer.id === activeLayerId;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayerId(layer.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative cursor-pointer ${
                  isSelected
                    ? "bg-[#0e0e11] text-white border-[#0e0e11] shadow-lg shadow-black/10"
                    : "bg-[#f5f5f7] hover:bg-[#ebebed] text-[#1d1d1f] border-black/[0.06]"
                }`}
              >
                <div className="text-[10px] font-mono tracking-widest uppercase mb-1 opacity-70">
                  LAYER {layer.number}
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-tight">
                  {layer.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Layer Deep Dive Card */}
        <div className="apple-card rounded-3xl p-6 sm:p-10 md:p-12 border border-black/[0.08] shadow-xl bg-white max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Left Column: Description & Deliverables */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="inline-block text-[11px] font-mono text-blue-600 font-semibold uppercase tracking-wider mb-2">
                    LAYER {activeLayer.number} • {activeLayer.tag}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0e0e11] mb-2">
                    {activeLayer.title}
                  </h3>
                  <p className="text-sm font-medium text-[#71717a]">
                    {activeLayer.subtitle}
                  </p>
                </div>

                <p className="text-[#515154] text-sm sm:text-base leading-relaxed">
                  {activeLayer.description}
                </p>

                {/* Target Metrics */}
                <div className="grid grid-cols-3 gap-3 py-4 border-y border-black/[0.06]">
                  {activeLayer.metrics.map((m, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-[10px] font-mono text-[#86868b] uppercase tracking-wider">
                        {m.label}
                      </div>
                      <div className="text-base sm:text-lg font-bold text-[#0e0e11] font-mono">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Benefits List */}
                <div className="space-y-2.5">
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#0e0e11]">
                    Key Deliverables & Standards:
                  </div>
                  {activeLayer.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#515154]">
                      <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Code Snippet & Architecture Implementation */}
              <div className="lg:col-span-6 bg-[#0e0e11] rounded-2xl p-5 sm:p-6 border border-black/20 text-white font-mono text-xs shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 text-[#86868b] text-[11px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    <span className="ml-2 text-white/60">architecture.config.ts</span>
                  </div>
                  <span className="text-[10px] text-blue-400">TypeScript</span>
                </div>

                <pre className="overflow-x-auto text-[11px] sm:text-xs leading-relaxed text-[#e2e8f0] pb-2 font-mono">
                  <code>{activeLayer.codeSnippet}</code>
                </pre>

                <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-[10px] text-[#86868b]">
                  <span>STANDARD: Clean Documentation</span>
                  <span className="text-emerald-400">Production Grade</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
