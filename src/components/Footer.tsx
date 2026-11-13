"use client";

import React from "react";
import NovaLogo from "./NovaLogo";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#060608] text-[#71717a] text-xs pt-20 pb-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Transparent Business Disclaimers & Footnotes */}
        <div className="space-y-2 pb-10 border-b border-white/[0.08] text-[11px] leading-relaxed max-w-4xl text-[#71717a]">
          <p>
            1. <strong>Illustrative Estimates:</strong> All performance statistics, workflow speed benchmarks, and ROI calculator outputs shown on this site are representative illustrative estimates based on standard project workflows. Realized conversion lifts and time savings vary based on baseline traffic quality, industry dynamics, deal sizes, and operational execution.
          </p>
          <p>
            2. <strong>Third-Party Integrations & Subscriptions:</strong> Software automations (including Stripe, Google Workspace, HubSpot, WhatsApp Business API, Twilio, and QuickBooks) require active accounts maintained directly by the client with each respective third-party provider and depend on account access and API availability.
          </p>
          <p>
            3. Nova Scale Systems is an independent web architecture and business automation consultancy. All third-party product names, logos, and brands are property of their respective owners.
          </p>
        </div>

        {/* Directory Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: The 6 Core Services */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-mono text-[11px] uppercase tracking-widest mb-4 font-semibold">
              Our 6 Core Services
            </h4>
            <ul className="space-y-2.5 text-[12px]">
              <li>
                <a href="#services" className="hover:text-[#2997ff] transition-colors">
                  Websites that convert
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#2997ff] transition-colors">
                  Lead capture and follow-up
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#2997ff] transition-colors">
                  Booking and customer reminders
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#2997ff] transition-colors">
                  Online sales and payments
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#2997ff] transition-colors">
                  Business workflow automation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#2997ff] transition-colors">
                  Retention and reputation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Target Sectors */}
          <div>
            <h4 className="text-white font-mono text-[11px] uppercase tracking-widest mb-4 font-semibold">
              Who We Help
            </h4>
            <ul className="space-y-2.5 text-[12px]">
              <li>
                <a href="#who-we-help" className="hover:text-[#2997ff] transition-colors">
                  Professional Services & Advisory
                </a>
              </li>
              <li>
                <a href="#who-we-help" className="hover:text-[#2997ff] transition-colors">
                  Clinics & Healthcare Practices
                </a>
              </li>
              <li>
                <a href="#who-we-help" className="hover:text-[#2997ff] transition-colors">
                  Local Services & Trade Contractors
                </a>
              </li>
              <li>
                <a href="#who-we-help" className="hover:text-[#2997ff] transition-colors">
                  Retail & Modern Stores
                </a>
              </li>
              <li>
                <a href="#who-we-help" className="hover:text-[#2997ff] transition-colors">
                  B2B Companies & Scaled SMEs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Planning & Evaluation */}
          <div>
            <h4 className="text-white font-mono text-[11px] uppercase tracking-widest mb-4 font-semibold">
              Evaluation & Pricing
            </h4>
            <ul className="space-y-2.5 text-[12px]">
              <li>
                <a href="#pricing" className="hover:text-[#2997ff] transition-colors">
                  Implementation Packages
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#2997ff] transition-colors">
                  Value & ROI Estimator
                </a>
              </li>
              <li>
                <a href="#see-in-action" className="hover:text-[#2997ff] transition-colors">
                  Interactive Workflow Demo
                </a>
              </li>
              <li>
                <a href="#speed-to-lead" className="hover:text-[#2997ff] transition-colors">
                  Speed-to-Lead Comparison
                </a>
              </li>
              <li>
                <a href="#technical-inspection" className="hover:text-[#2997ff] transition-colors">
                  Service Architecture Specs
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-[#2997ff] transition-colors">
                  Representative Use Cases
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Engagement & Working with NOVA */}
          <div>
            <h4 className="text-white font-mono text-[11px] uppercase tracking-widest mb-4 font-semibold">
              Working With Us
            </h4>
            <ul className="space-y-2.5 text-[12px]">
              <li>
                <span className="text-[#94949e]">100% Code & Asset Ownership</span>
              </li>
              <li>
                <span className="text-[#94949e]">Direct WhatsApp & Slack Channels</span>
              </li>
              <li>
                <span className="text-[#94949e]">Documented Handover & Training</span>
              </li>
              <li className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Discovery Calls Open for Q1 / Q2</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#71717a]">
          <div className="flex items-center gap-3">
            <NovaLogo size="sm" variant="full" inverted={true} />
            <span className="ml-2">© {new Date().getFullYear()} NOVA SCALE SYSTEMS. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#services" className="hover:text-white transition-colors">
              SERVICES
            </a>
            <span>•</span>
            <a href="#pricing" className="hover:text-white transition-colors">
              PACKAGES
            </a>
            <span>•</span>
            <a href="#technical-inspection" className="hover:text-white transition-colors">
              ARCHITECTURE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
