"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Globe,
  MessageSquare,
  Calendar,
  CreditCard,
  Workflow,
  Star,
  Check,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface ServiceOffer {
  id: string;
  number: string;
  title: string;
  badge: string;
  icon: any;
  summary: string;
  whoItSuits: string;
  problemSolved: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
}

const SERVICES: ServiceOffer[] = [
  {
    id: "websites",
    number: "01",
    title: "Websites that convert",
    badge: "FOUNDATION",
    icon: Globe,
    summary:
      "Custom business websites and targeted landing pages structured to guide visitors smoothly toward making an enquiry or purchase.",
    whoItSuits:
      "Businesses with an outdated site, weak mobile presentation, or low conversion from existing traffic.",
    problemSolved:
      "Losing potential clients who leave within seconds because the site is slow, difficult to navigate on a phone, or lacks clear calls to action.",
    deliverables: [
      "Custom responsive design (mobile, tablet, desktop)",
      "Clear, benefit-focused calls to action and enquiry forms",
      "Fast page load performance with modern asset optimization",
      "Analytics and conversion event tracking setup (GA4 / Meta)",
      "Standard on-page SEO structure and search-friendly markup",
    ],
    image: "/images/service-websites-convert.jpg",
    imageAlt: "High-conversion modern website layout displayed on a sleek laptop in an architectural design studio",
  },
  {
    id: "lead-capture",
    number: "02",
    title: "Lead capture and follow-up",
    badge: "CONVERSION",
    icon: MessageSquare,
    summary:
      "Bring enquiries from your website and agreed communication channels into one organized workflow so no prospective client slips through the cracks.",
    whoItSuits:
      "Service firms, trade businesses, and sales teams taking hours or days to respond to incoming quote requests.",
    problemSolved:
      "Up to 78% of customers buy from the business that responds first. Missed form submissions and slow manual email checks cause warm leads to hire competitors.",
    deliverables: [
      "Centralized lead notification alerts to staff (Email, SMS, or Slack)",
      "Enquiry routing from website forms and integrated channels",
      "Automated instant acknowledgement messages to the enquirer",
      "Internal follow-up reminders so team members never drop a warm lead",
      "Lead status tracking board (New, Contacted, Qualified, Closed)",
    ],
    image: "/images/service-lead-followup.jpg",
    imageAlt: "Smartphone on executive boardroom table receiving an instant customer lead notification alert",
  },
  {
    id: "booking",
    number: "03",
    title: "Booking and customer reminders",
    badge: "SCHEDULING",
    icon: Calendar,
    summary:
      "Hands-free appointment and consultation scheduling with intake qualification, automated confirmations, and timed reminders.",
    whoItSuits:
      "Consultancies, medical and dental clinics, specialized contractors, and personal service providers.",
    problemSolved:
      "Wasting 5–10 hours each week playing phone tag or email ping-pong to schedule calls, and losing revenue to client no-shows.",
    deliverables: [
      "Self-scheduling calendar interface embedded on your website",
      "Custom pre-qualification intake questions before a booking is confirmed",
      "Direct two-way calendar sync with Google Calendar or Microsoft Outlook",
      "Automated booking confirmation emails with video conference links",
      "Timed SMS and email reminder sequence (24h and 1h prior to reduce no-shows)",
    ],
    image: "/images/service-booking-reminders.jpg",
    imageAlt: "Minimalist desktop monitor showing an automated calendar scheduling interface in a Scandinavian corporate suite",
  },
  {
    id: "ecommerce",
    number: "04",
    title: "Online sales and payments",
    badge: "COMMERCE",
    icon: CreditCard,
    summary:
      "Frictionless online checkout, clear product presentation, and secure payment processing for products, deposits, and retainers.",
    whoItSuits:
      "Retailers, boutique brands, wholesalers, and service businesses collecting deposits, upfront fees, or invoices online.",
    problemSolved:
      "High checkout drop-off caused by clunky multi-step forms, missing mobile payment methods, and complicated payment steps.",
    deliverables: [
      "Ecommerce store setup or checkout optimization (Shopify or custom)",
      "Clear, high-converting product and service detail pages",
      "1-Click digital wallet integration (Apple Pay, Google Pay, Stripe)",
      "Practical average order value options (in-cart add-ons, bundles)",
      "Automated order receipts, customer confirmations, and invoice generation",
    ],
    image: "/images/service-online-sales.jpg",
    imageAlt: "Luxury retail counter with sleek contactless digital payment terminal and successful transaction verification",
  },
  {
    id: "workflow-automation",
    number: "05",
    title: "Business workflow automation",
    badge: "OPERATIONS",
    icon: Workflow,
    summary:
      "Connect the software tools your business already uses to eliminate repetitive manual admin and ensure data flows without human delay.",
    whoItSuits:
      "Growing SMEs where staff spend hours copying data between forms, spreadsheets, CRMs, and accounting platforms.",
    problemSolved:
      "Manual data entry errors, delayed handoffs between team members, and hundreds of lost administrative payroll hours every month.",
    deliverables: [
      "Automatic lead record creation in your CRM (HubSpot, Salesforce, Pipedrive)",
      "Automated proposal, contract, or quote dispatch upon qualification",
      "Direct webhook triggers connecting forms to internal team channels",
      "Accounting integration triggers (e.g. creating a draft invoice in QuickBooks/Xero)",
      "Clear documentation and staff walkthrough on how the automated workflow runs",
    ],
    image: "/images/service-workflow-automation.jpg",
    imageAlt: "Dual studio display setup rendering automated business integration pipelines and software connectors",
  },
  {
    id: "retention",
    number: "06",
    title: "Retention and reputation",
    badge: "REPUTATION",
    icon: Star,
    summary:
      "Systematize customer follow-up, repeat orders, service renewal reminders, and authentic 5-star Google review collection.",
    whoItSuits:
      "Clinics, local service providers, contractors, professional firms, and repeat-order retailers.",
    problemSolved:
      "Completed jobs forgotten without asking for a review or follow-up, leaving hundreds of 5-star customer testimonials uncollected.",
    deliverables: [
      "Automated post-purchase or post-appointment check-in sequences",
      "One-click Google Review request links sent at the moment of highest satisfaction",
      "Automated service renewal and maintenance reminder triggers",
      "Customer re-engagement emails for past clients who haven't booked recently",
      "Notification alerts when negative feedback is received so managers can resolve it fast",
    ],
    image: "/images/service-retention-reputation.jpg",
    imageAlt: "Satisfied business client holding a smartphone displaying an authentic 5-star review rating in a sunlit lounge",
  },
];

export default function BentoGrid() {
  return (
    <section id="services" className="py-24 md:py-36 relative bg-[#fbfbfd] text-[#0e0e11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-[#0071e3] uppercase tracking-wider mb-4 font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>Our 6 Core Capabilities</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-[#0e0e11] tracking-[-0.038em] leading-[1.06] mb-6">
            Clear solutions built for <br />
            <span className="text-[#0071e3]">measurable business growth.</span>
          </h2>
          <p className="text-[#515154] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            We organize our work around six focused outcomes. No confusing technical jargon—just reliable digital systems
            that help your business capture leads, save hours, and win customers.
          </p>
        </div>

        {/* 6 Core Offers Grid with Custom Gemini Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
                className="apple-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-white border border-black/[0.08] shadow-md hover:shadow-xl transition-all group overflow-hidden"
              >
                <div>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] mb-4">
                    <span className="text-[11px] font-mono tracking-widest text-[#86868b]">
                      OFFER / {service.number}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0071e3] border border-blue-200">
                      {service.badge}
                    </span>
                  </div>

                  {/* Visual Asset Vignette */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 border border-black/[0.08] bg-[#f5f5f7]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40" />
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-[#0071e3]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0e0e11] tracking-tight">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#515154] leading-relaxed mb-5">
                    {service.summary}
                  </p>

                  {/* Who It Suits */}
                  <div className="mb-3.5 p-3.5 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] text-xs">
                    <span className="font-mono text-[10px] font-semibold text-[#86868b] uppercase block mb-1">
                      BEST SUITED FOR:
                    </span>
                    <span className="text-[#0e0e11] font-medium leading-snug block">
                      {service.whoItSuits}
                    </span>
                  </div>

                  {/* Problem Solved */}
                  <div className="mb-5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs">
                    <span className="font-mono text-[10px] font-semibold text-amber-800 uppercase block mb-1">
                      THE PROBLEM WE SOLVE:
                    </span>
                    <span className="text-amber-950 leading-snug block">
                      {service.problemSolved}
                    </span>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6">
                    <span className="font-mono text-[10px] font-semibold text-[#86868b] uppercase tracking-wider block mb-2">
                      WHAT WE DELIVER:
                    </span>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#515154]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Anchor */}
                <div className="pt-4 border-t border-black/[0.06] mt-2">
                  <a
                    href="#who-we-help"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071e3] hover:text-[#0077ed] transition-colors"
                  >
                    <span>See industry applications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Integration Dependency Notice */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-white border border-black/[0.08] shadow-md max-w-4xl mx-auto flex items-start gap-4 text-xs text-[#515154] leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-[#0071e3] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#0e0e11] block mb-1">
              Software Integration & Account Access Terms:
            </span>
            <p>
              Software automations (such as WhatsApp Business API, HubSpot CRM, Google Workspace, Stripe, and QuickBooks)
              require active accounts maintained directly by the client with each respective third-party provider. NOVA configures,
              tests, and connects these platforms to your website workflows subject to the API limits, features, and permissions of your chosen software subscriptions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
