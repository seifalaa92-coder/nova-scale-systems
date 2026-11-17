"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  Wifi,
  Battery,
  Calendar,
  MessageSquare,
  Users,
  CreditCard,
  Building2,
  Clock,
} from "lucide-react";

interface WorkflowDemo {
  id: string;
  tabLabel: string;
  industry: string;
  metric1: { label: string; val: string; sub: string };
  metric2: { label: string; val: string; sub: string };
  metric3: { label: string; val: string; sub: string };
  metric4: { label: string; val: string; sub: string };
  activeEvent: {
    client: string;
    action: string;
    amount: string;
    speed: string;
    badge: string;
  };
  recentLogs: { text: string; time: string; status: string }[];
}

const DEMOS: WorkflowDemo[] = [
  {
    id: "services",
    tabLabel: "Service & Practice",
    industry: "Consultancies, Law, Medical Practices & Agencies",
    metric1: { label: "Client Inquiries", val: "Increased", sub: "Clear calls to action" },
    metric2: { label: "Booking Calendar", val: "Automated", sub: "Pre-qualified self-scheduling" },
    metric3: { label: "Meeting Attendance", val: "Improved", sub: "Automated email & SMS reminders" },
    metric4: { label: "Staff Admin Saved", val: "10-15 hrs/wk", sub: "Reduced manual scheduling tag" },
    activeEvent: {
      client: "Commercial Operations Client",
      action: "Consultation Call Booked",
      amount: "Qualified Lead",
      speed: "Integrated Calendar",
      badge: "Synced to Calendar",
    },
    recentLogs: [
      { text: "New website enquiry -> Immediate staff alert dispatched", time: "1m ago", status: "Delivered" },
      { text: "Client selected discovery slot -> Calendar invite & video link created", time: "4m ago", status: "Automated" },
      { text: "Post-consultation follow-up -> Automated feedback & review request", time: "12m ago", status: "Completed" },
    ],
  },
  {
    id: "trades",
    tabLabel: "Local Services & Trades",
    industry: "Contractors, Clinics, Salons & Trade Services",
    metric1: { label: "Mobile Clicks", val: "Streamlined", sub: "Tap-to-call & enquiry forms" },
    metric2: { label: "Quote Requests", val: "Organized", sub: "Clear intake qualification" },
    metric3: { label: "Customer Reviews", val: "Systematic", sub: "Automated post-job review request" },
    metric4: { label: "Lead Response", val: "Fast", sub: "Instant team notifications" },
    activeEvent: {
      client: "Residential Renovation Client",
      action: "Project Scope & Quote Submitted",
      amount: "Intake Captured",
      speed: "Direct to Team Phone",
      badge: "High Intent",
    },
    recentLogs: [
      { text: "Customer submitted project requirements -> Team notified instantly", time: "2m ago", status: "Dispatched" },
      { text: "Automated confirmation & service guide sent to client", time: "2m ago", status: "Delivered" },
      { text: "Lead logged into pipeline with intake responses", time: "3m ago", status: "Synced" },
    ],
  },
  {
    id: "stores",
    tabLabel: "Retail & Online Stores",
    industry: "Modern E-Commerce & Retail Stores",
    metric1: { label: "Checkout Process", val: "Frictionless", sub: "Clear layout & trust signals" },
    metric2: { label: "Digital Wallets", val: "1-Click", sub: "Apple Pay, Google Pay, Stripe" },
    metric3: { label: "Order Value", val: "Optimized", sub: "Curated add-ons & warranty options" },
    metric4: { label: "Cart Follow-up", val: "Automated", sub: "Timely reminder notifications" },
    activeEvent: {
      client: "Online Store Customer",
      action: "Digital Wallet Order Completed",
      amount: "Payment Verified",
      speed: "Direct Payment",
      badge: "Stripe Verified",
    },
    recentLogs: [
      { text: "Customer completed order -> Digital receipt & tracking sent", time: "30s ago", status: "Processed" },
      { text: "Order record updated in inventory & fulfillment system", time: "31s ago", status: "Synced" },
      { text: "Customer enrolled in post-purchase satisfaction flow", time: "32s ago", status: "Queued" },
    ],
  },
];

export default function MacbookMockup() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const activeDemo = DEMOS[activeTabIdx];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % DEMOS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="automation-preview" className="relative max-w-6xl mx-auto my-12 px-2 sm:px-4">
      {/* Background Soft Studio Lighting */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-b from-blue-100/70 via-indigo-50/40 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Main MacBook Pro Aluminum Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto rounded-[28px] sm:rounded-[36px] bg-[#d2d2d7] p-3 sm:p-4 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.25),0_10px_30px_-10px_rgba(0,0,0,0.15)] border border-[#b8b8be]"
      >
        {/* Screen Display Bezel */}
        <div className="rounded-[20px] sm:rounded-[26px] bg-[#0c0c10] p-1.5 sm:p-2 overflow-hidden shadow-inner border border-black">
          {/* Top Notch Area */}
          <div className="relative bg-white text-[#1d1d1f] rounded-[16px] sm:rounded-[22px] overflow-hidden min-h-[490px] sm:min-h-[560px] flex flex-col justify-between">
            {/* macOS Menu Bar */}
            <div className="h-7 bg-[#f5f5f7] border-b border-black/[0.06] flex items-center justify-between px-3 sm:px-4 text-[11px] text-[#515154] select-none">
              <div className="flex items-center gap-3 sm:gap-4 font-medium">
                <span className="font-bold text-[#1d1d1f]"></span>
                <span className="font-semibold text-[#1d1d1f]">Nova Business OS</span>
                <span className="text-[#86868b] hidden sm:inline">• {activeDemo.industry}</span>
              </div>

              {/* Center Notch */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 sm:w-28 h-4 bg-black rounded-b-xl flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
              </div>

              <div className="flex items-center gap-2.5 text-[#6e6e73]">
                <Wifi className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-mono text-[10px] hidden sm:inline">All Systems Operational</span>
                <Battery className="w-4 h-4 text-emerald-600" />
                <span className="font-medium text-[10px]">100%</span>
              </div>
            </div>

            {/* In-Screen Dashboard Header with Interactive Industry Tabs */}
            <div className="px-4 sm:px-7 pt-4 pb-2 border-b border-black/[0.06] bg-[#fbfbfd] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs font-bold text-[#1d1d1f]">LIVE BUSINESS COCKPIT</span>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-[#f0f0f4] rounded-xl border border-black/[0.04]">
                {DEMOS.map((demo, idx) => (
                  <button
                    key={demo.id}
                    onClick={() => setActiveTabIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeTabIdx === idx
                        ? "bg-white text-[#1d1d1f] shadow-xs font-bold"
                        : "text-[#6e6e73] hover:text-[#1d1d1f]"
                    }`}
                  >
                    {demo.tabLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Screen Dashboard Live Workspace */}
            <div className="p-4 sm:p-7 flex-1 bg-gradient-to-b from-[#ffffff] via-[#fbfbfd] to-[#f5f5f7] flex flex-col justify-between">
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
                  <div className="text-[#86868b] text-[11px] font-medium">{activeDemo.metric1.label}</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#0071e3] mt-1">
                    {activeDemo.metric1.val}
                  </div>
                  <div className="text-[10px] text-[#6e6e73] mt-0.5">{activeDemo.metric1.sub}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-xs">
                  <div className="text-[#86868b] text-[11px] font-medium">{activeDemo.metric2.label}</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-[#1d1d1f] mt-1">
                    {activeDemo.metric2.val}
                  </div>
                  <div className="text-[10px] text-[#6e6e73] mt-0.5">{activeDemo.metric2.sub}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-xs hidden sm:block">
                  <div className="text-[#86868b] text-[11px] font-medium">{activeDemo.metric3.label}</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 mt-1">
                    {activeDemo.metric3.val}
                  </div>
                  <div className="text-[10px] text-[#6e6e73] mt-0.5">{activeDemo.metric3.sub}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-xs hidden md:block">
                  <div className="text-[#86868b] text-[11px] font-medium">{activeDemo.metric4.label}</div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-600 mt-1">
                    {activeDemo.metric4.val}
                  </div>
                  <div className="text-[10px] text-[#6e6e73] mt-0.5">{activeDemo.metric4.sub}</div>
                </div>
              </div>

              {/* Middle Row: Active Real-time Flow Simulation & Automated Event Stream */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
                {/* Active Automated Trigger Card (7 cols) */}
                <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-xs font-bold text-[#1d1d1f]">Active Pipeline Sequence</span>
                      </div>
                      <span className="text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                        {activeDemo.activeEvent.badge}
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2 mb-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#1d1d1f]">{activeDemo.activeEvent.client}</span>
                        <span className="font-mono font-bold text-blue-700">{activeDemo.activeEvent.amount}</span>
                      </div>
                      <div className="text-xs text-[#515154] font-medium flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{activeDemo.activeEvent.action}</span>
                      </div>
                      <div className="text-[11px] text-[#6e6e73] flex items-center justify-between pt-1 border-t border-blue-200/60">
                        <span>Speed: {activeDemo.activeEvent.speed}</span>
                        <span className="text-emerald-700 font-semibold">Zero Manual Work Required</span>
                      </div>
                    </div>

                    {/* Step-by-Step Flow Graphic */}
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="p-2 rounded-lg bg-[#f5f5f7] border border-black/[0.04]">
                        <div className="font-bold text-[#1d1d1f]">1. Website Visitor</div>
                        <div className="text-[#86868b] mt-0.5">High-trust speed</div>
                      </div>
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="font-bold text-blue-700">2. Instant Automation</div>
                        <div className="text-blue-600 mt-0.5">SMS / Booking / Pay</div>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                        <div className="font-bold text-emerald-800">3. Retained Client</div>
                        <div className="text-emerald-700 mt-0.5">Auto review sync</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#86868b] pt-3 border-t border-black/[0.04]">
                    <span>Replaces 4+ Disconnected Subscriptions</span>
                    <span className="font-semibold text-blue-600">All-in-One Architecture</span>
                  </div>
                </div>

                {/* Right Column: Live Telemetry Logs (5 cols) */}
                <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-bold text-[#1d1d1f]">Automation Activity Log</span>
                      <span className="text-[10px] text-[#86868b] font-mono">Real-Time</span>
                    </div>

                    <div className="space-y-2">
                      {activeDemo.recentLogs.map((log, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-[#f5f5f7] border border-black/[0.04] text-[11px] space-y-1"
                        >
                          <div className="flex justify-between items-center text-[#86868b] text-[10px]">
                            <span>{log.time}</span>
                            <span className="font-mono font-semibold text-blue-600 bg-white px-1.5 py-0.2 rounded border border-black/[0.04]">
                              {log.status}
                            </span>
                          </div>
                          <div className="text-[#1d1d1f] font-medium leading-snug">{log.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[10px] text-[#86868b]">
                    <span>Direct Sync: WhatsApp • CRM • Stripe • Calendar</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MacBook Bottom Base / Lip with reflective opening notch */}
        <div className="relative mx-auto -mt-1 h-3 sm:h-4 w-[98%] bg-[#c2c2c8] rounded-b-[18px] border-t border-[#b8b8be] shadow-md flex items-center justify-center">
          <div className="w-20 sm:w-28 h-1 bg-[#86868b] rounded-full opacity-60" />
        </div>
      </motion.div>

      {/* Floating iPhone 16 Pro Showcase: Live SME Notification */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block absolute -bottom-8 -right-4 lg:-right-6 w-64 lg:w-72 rounded-[38px] bg-[#1d1d1f] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-2 border-[#4b5563] z-20"
      >
        <div className="rounded-[30px] bg-white p-4 h-[390px] flex flex-col justify-between overflow-hidden relative border border-black/10">
          {/* Dynamic Island */}
          <div className="mx-auto w-24 h-6 bg-black rounded-full flex items-center justify-between px-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] font-mono text-white font-semibold">New Client</span>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          </div>

          {/* iPhone Screen Content: Instant Lead Notification */}
          <div className="text-center my-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#1d1d1f]">Call Booked & Confirmed</div>
              <div className="text-[11px] text-[#6e6e73]">Discovery Consultation</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#f5f5f7] border border-black/[0.06] text-xs font-mono font-bold text-blue-700">
              Thursday 2:00 PM • Zoom Synced
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 py-1 px-2.5 rounded-full inline-block border border-emerald-200">
              Automated SMS Reminder Queued
            </div>
          </div>

          <div className="w-24 h-1 bg-black rounded-full mx-auto" />
        </div>
      </motion.div>
    </div>
  );
}
