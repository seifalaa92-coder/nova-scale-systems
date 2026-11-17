"use client";

import React from "react";

const PLATFORMS = [
  { name: "STRIPE", desc: "Payments & Invoicing" },
  { name: "GOOGLE WORKSPACE", desc: "Calendar & Email" },
  { name: "HUBSPOT", desc: "CRM & Lead Tracking" },
  { name: "SHOPIFY", desc: "Ecommerce & Inventory" },
  { name: "WHATSAPP BUSINESS", desc: "Client Messaging" },
  { name: "CALENDLY", desc: "Meeting Scheduling" },
  { name: "MAKE & ZAPIER", desc: "Workflow Integration" },
  { name: "QUICKBOOKS", desc: "Accounting Triggers" },
];

export default function BrandMarquee() {
  return (
    <div className="py-12 border-y border-black/[0.06] bg-[#fbfbfd] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-5 text-center">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#86868b]">
          COMPATIBLE WITH YOUR EXISTING BUSINESS SOFTWARE & APIS
        </span>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Soft Left and Right Edge Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#fbfbfd] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#fbfbfd] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap gap-12 sm:gap-20 items-center">
          {[...PLATFORMS, ...PLATFORMS, ...PLATFORMS].map((platform, index) => (
            <div
              key={index}
              className="flex items-center gap-3.5 group cursor-default transition-all duration-300"
            >
              <div className="w-2 h-2 rounded-full bg-[#0071e3] group-hover:scale-125 transition-transform" />
              <div className="text-left">
                <div className="text-sm font-bold tracking-tight text-[#0e0e11] font-mono group-hover:text-[#0071e3] transition-colors">
                  {platform.name}
                </div>
                <div className="text-[10px] text-[#86868b] tracking-wider uppercase font-sans">
                  {platform.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
