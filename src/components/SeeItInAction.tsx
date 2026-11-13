"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  CheckCheck,
  Database,
  ArrowRight,
  Sparkles,
  Clock,
  Play,
  RotateCcw,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface SeeItInActionProps {
  onOpenIntake: () => void;
}

export default function SeeItInAction({ onOpenIntake }: SeeItInActionProps) {
  const [stage, setStage] = useState<number>(3); // Default fully completed, user can replay
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleReplay = () => {
    setIsPlaying(true);
    setStage(1);
    setTimeout(() => {
      setStage(2);
    }, 1800);
    setTimeout(() => {
      setStage(3);
      setIsPlaying(false);
    }, 3800);
  };

  return (
    <section id="see-in-action" className="py-24 md:py-36 relative bg-[#09090c] text-[#f4f4f6] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-[#2997ff] uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Workflow Demonstration</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-[-0.038em] leading-[1.06] mb-6">
            Watch an enquiry become a <br />
            <span className="text-[#2997ff]">secured client deal.</span>
          </h2>
          <p className="text-[#94949e] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Experience how fast automated workflows engage prospects while interest is at its peak.
            Test the live sequence below or review the end-to-end journey.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={handleReplay}
              disabled={isPlaying}
              className="graphite-button-secondary px-6 py-2.5 text-xs font-mono tracking-wider uppercase flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin" : ""}`} />
              <span>{isPlaying ? "Simulating Workflow..." : "Replay Simulation"}</span>
            </button>
          </div>
        </div>

        {/* 4-Step Process Storyboard Visual Banner (Custom Gemini Diagram) */}
        <div className="relative max-w-5xl mx-auto mb-14 rounded-3xl overflow-hidden border border-white/[0.1] bg-[#101014] shadow-2xl p-4 sm:p-6">
          <div className="text-xs font-mono text-[#71717a] uppercase tracking-widest mb-3 flex items-center justify-between">
            <span>END-TO-END LEAD ROUTING ARCHITECTURE</span>
            <span className="text-emerald-400 font-semibold">AUTOMATED PIPELINE</span>
          </div>
          <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-[#070709] border border-white/[0.06]">
            <Image
              src="/images/process-enquiry-to-deal.jpg"
              alt="4-Step automated business pipeline diagram showing Mobile Enquiry, Staff Notification, Calendar Booking, and Secured CRM Deal"
              fill
              loading="lazy"
              className="object-cover object-center select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent opacity-50 pointer-events-none" />
          </div>
        </div>

        {/* Live Interactive Dual Interface (Repurposed from Intro) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: Customer Conversation Stream (6 cols) */}
          <div className="lg:col-span-6 bg-[#101014] rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs">
                <span className="flex items-center gap-2 text-emerald-400 font-mono font-semibold">
                  <MessageSquare className="w-4 h-4" />
                  <span>STAGE 01: INBOUND CONVERSATION</span>
                </span>
                <span className="font-mono text-[11px] text-[#71717a]">
                  Sunday 9:42 PM (After Hours)
                </span>
              </div>

              {/* Customer Inbound Bubble */}
              <div className="mt-6 bg-[#1a1a24] p-4.5 rounded-2xl rounded-tl-sm text-[#f4f4f6] max-w-[90%] border border-white/[0.06]">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#94949e]">
                  <span className="w-5 h-5 rounded-full bg-slate-700 text-white font-bold text-[10px] flex items-center justify-center">
                    M
                  </span>
                  <span className="font-semibold text-white">Operations Director</span>
                  <span className="text-slate-500">• Inbound Lead</span>
                </div>
                <p className="text-base sm:text-lg font-medium leading-relaxed text-white">
                  &ldquo;Hi, we want to automate all our client intake and system operations.&rdquo;
                </p>
              </div>

              {/* Automated Concierge Response Bubble */}
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 bg-[#0a2318] p-4.5 rounded-2xl rounded-tr-sm text-[#f4f4f6] max-w-[90%] ml-auto border border-emerald-500/30 shadow-lg"
                >
                  <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Nova Auto Concierge</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-emerald-400 text-xs">
                      <span>4s</span>
                      <CheckCheck className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-emerald-50">
                    Hello! We connect client intake forms directly to your calendar and CRM. Select a discovery time slot here:{" "}
                    <span className="text-[#60a5fa] font-semibold underline underline-offset-2">nova.link/calendar</span>
                  </p>
                </motion.div>
              )}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-[#71717a]">
              <span>CHANNEL: WhatsApp & Web</span>
              <span className="text-emerald-400 font-semibold">Immediate Dispatch</span>
            </div>
          </div>

          {/* RIGHT: Autonomous CRM Ingestion Record (6 cols) */}
          <div className="lg:col-span-6 bg-[#101014] rounded-3xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs">
                <span className="flex items-center gap-2 text-[#2997ff] font-mono font-semibold">
                  <Database className="w-4 h-4" />
                  <span>STAGE 02: AUTONOMOUS CRM INGESTION</span>
                </span>
                <span className="text-emerald-400 font-mono text-[11px] bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  REAL-TIME SYNC
                </span>
              </div>

              {stage >= 3 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 space-y-4"
                >
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#71717a]">PIPELINE STATUS</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-[#2997ff] text-[10px] font-mono font-bold">
                        QUALIFIED & SCHEDULED
                      </span>
                    </div>

                    <div className="text-lg font-bold text-white font-display">
                      Systems Automation & Growth Blueprint
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-2 border-t border-white/[0.06]">
                      <div>
                        <span className="text-[#71717a] block">CONSULTATION</span>
                        <span className="text-white font-medium">Wed 2:00 PM • Zoom</span>
                      </div>
                      <div>
                        <span className="text-[#71717a] block">NOTIFIED STAFF</span>
                        <span className="text-white font-medium">On-Duty Lead Exec</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 text-xs text-emerald-200 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Calendar invite dispatched & SMS reminder queued</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-400">DONE</span>
                  </div>
                </motion.div>
              ) : (
                <div className="mt-12 text-center text-xs font-mono text-[#71717a] py-8">
                  <span className="animate-pulse">Waiting for customer response trigger...</span>
                </div>
              )}
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-mono text-[#71717a]">
                INTEGRATED: HubSpot • Google • Stripe
              </span>
              <button
                onClick={onOpenIntake}
                className="graphite-button-primary text-xs px-5 py-2 flex items-center gap-1.5 font-semibold cursor-pointer"
              >
                <span>Build My System</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
