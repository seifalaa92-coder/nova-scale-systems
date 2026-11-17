"use client";

import React, { useState } from "react";
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
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  ShieldCheck,
  Zap,
  Film,
} from "lucide-react";

interface SeeItInActionProps {
  onOpenIntake: () => void;
}

export default function SeeItInAction({ onOpenIntake }: SeeItInActionProps) {
  const [stage, setStage] = useState<number>(3);
  const [isPlayingSimulation, setIsPlayingSimulation] = useState<boolean>(false);
  const [activeMediaView, setActiveMediaView] = useState<"video" | "diagram">("video");
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);

  const handleReplaySimulation = () => {
    setIsPlayingSimulation(true);
    setStage(1);
    setTimeout(() => {
      setStage(2);
    }, 1800);
    setTimeout(() => {
      setStage(3);
      setIsPlayingSimulation(false);
    }, 3800);
  };

  return (
    <section id="see-in-action" className="py-24 md:py-36 relative bg-[#fbfbfd] text-[#0e0e11] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-[#0071e3] uppercase tracking-wider mb-4 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Workflow Demonstration</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-[#0e0e11] tracking-[-0.038em] leading-[1.06] mb-6">
            Watch an enquiry become a <br />
            <span className="text-[#0071e3]">secured client deal.</span>
          </h2>
          <p className="text-[#515154] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Experience how fast automated workflows engage prospects while interest is at its peak.
            Watch the official system walkthrough video below or test the live simulated response.
          </p>

          {/* Media View Switcher */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveMediaView("video")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-all ${
                activeMediaView === "video"
                  ? "bg-[#0e0e11] text-white border border-[#0e0e11] shadow-md font-bold"
                  : "bg-white text-[#515154] border border-black/[0.08] hover:text-[#0e0e11]"
              }`}
            >
              <Film className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Official Video Walkthrough</span>
            </button>
            <button
              onClick={() => setActiveMediaView("diagram")}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-all ${
                activeMediaView === "diagram"
                  ? "bg-[#0e0e11] text-white border border-[#0e0e11] shadow-md font-bold"
                  : "bg-white text-[#515154] border border-black/[0.08] hover:text-[#0e0e11]"
              }`}
            >
              <Database className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>Architecture Diagram</span>
            </button>
          </div>
        </div>

        {/* Featured Media Showcase (Video or Diagram) */}
        <div className="relative max-w-5xl mx-auto mb-14 rounded-3xl overflow-hidden border border-black/[0.08] bg-white shadow-xl p-4 sm:p-6">
          <div className="text-xs font-mono text-[#515154] uppercase tracking-widest mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{activeMediaView === "video" ? "OFFICIAL CINEMATIC WALKTHROUGH" : "LEAD ROUTING ARCHITECTURE"}</span>
            </span>
            <span className="text-[#0071e3] font-semibold font-mono">1080P HD</span>
          </div>

          {activeMediaView === "video" ? (
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-black border border-black/[0.08] flex items-center justify-center">
              <video
                src="/videos/nova-intro.mp4"
                poster="/videos/nova-intro-poster.jpg"
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
                className="w-full h-full object-cover sm:object-contain bg-black"
              />

              {/* Video Floating Controls */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#0e0e11]/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-xs z-20">
                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className="flex items-center gap-1.5 text-white hover:text-[#38bdf8] transition-colors cursor-pointer font-mono"
                >
                  {isVideoMuted ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isVideoMuted ? "Unmute" : "Muted"}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-[#f5f5f7] border border-black/[0.08]">
              <Image
                src="/images/process-enquiry-to-deal.jpg"
                alt="4-Step automated business pipeline diagram showing Mobile Enquiry, Staff Notification, Calendar Booking, and Secured CRM Deal"
                fill
                loading="lazy"
                className="object-cover object-center select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-50 pointer-events-none" />
            </div>
          )}
        </div>

        {/* Live Interactive Dual Interface */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT: Customer Conversation Stream (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-lg flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] text-xs">
                <span className="flex items-center gap-2 text-emerald-700 font-mono font-semibold">
                  <MessageSquare className="w-4 h-4" />
                  <span>STAGE 01: INBOUND CONVERSATION</span>
                </span>
                <span className="font-mono text-[11px] text-[#86868b]">
                  Sunday 9:42 PM (After Hours)
                </span>
              </div>

              {/* Customer Inbound Bubble */}
              <div className="mt-6 bg-[#f5f5f7] p-4.5 rounded-2xl rounded-tl-sm text-[#0e0e11] max-w-[90%] border border-black/[0.06]">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#515154]">
                  <span className="w-5 h-5 rounded-full bg-[#0e0e11] text-white font-bold text-[10px] flex items-center justify-center">
                    M
                  </span>
                  <span className="font-semibold text-[#0e0e11]">Operations Director</span>
                  <span className="text-[#86868b]">• Inbound Lead</span>
                </div>
                <p className="text-base sm:text-lg font-medium leading-relaxed text-[#0e0e11]">
                  &ldquo;Hi, we want to automate all our system operations.&rdquo;
                </p>
              </div>

              {/* Automated Concierge Response Bubble */}
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 bg-emerald-50 p-4.5 rounded-2xl rounded-tr-sm text-emerald-950 max-w-[90%] ml-auto border border-emerald-300 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-2">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Nova Auto Concierge</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-emerald-700 text-xs">
                      <span>4s</span>
                      <CheckCheck className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-emerald-950 font-normal">
                    Hello! We connect intake forms and enquiry channels directly to your calendar and CRM operations. Pick your discovery session here:{" "}
                    <span className="text-[#0071e3] font-semibold underline underline-offset-2">nova.link/calendar</span>
                  </p>
                </motion.div>
              )}
            </div>

            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono text-[#515154]">
              <span>CHANNEL: WhatsApp & Web</span>
              <button
                onClick={handleReplaySimulation}
                disabled={isPlayingSimulation}
                className="text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                <RotateCcw className={`w-3 h-3 ${isPlayingSimulation ? "animate-spin" : ""}`} />
                <span>{isPlayingSimulation ? "Simulating..." : "Test 4s Responder"}</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Autonomous CRM Ingestion Record (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-black/[0.08] shadow-lg flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] text-xs">
                <span className="flex items-center gap-2 text-[#0071e3] font-mono font-semibold">
                  <Database className="w-4 h-4" />
                  <span>STAGE 02: AUTONOMOUS CRM INGESTION</span>
                </span>
                <span className="text-emerald-700 font-mono text-[11px] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
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
                  <div className="p-5 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#515154]">PIPELINE STATUS</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0071e3] text-[10px] font-mono font-bold">
                        QUALIFIED & SCHEDULED
                      </span>
                    </div>

                    <div className="text-lg font-bold text-[#0e0e11] font-display">
                      Systems Automation & Growth Blueprint
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-2 border-t border-black/[0.06]">
                      <div>
                        <span className="text-[#86868b] block">CONSULTATION</span>
                        <span className="text-[#0e0e11] font-medium">Wed 2:00 PM • Zoom</span>
                      </div>
                      <div>
                        <span className="text-[#86868b] block">NOTIFIED STAFF</span>
                        <span className="text-[#0e0e11] font-medium">On-Duty Lead Exec</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Calendar invite dispatched & SMS reminder queued</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-700">DONE</span>
                  </div>
                </motion.div>
              ) : (
                <div className="mt-12 text-center text-xs font-mono text-[#86868b] py-8">
                  <span className="animate-pulse">Waiting for customer response trigger...</span>
                </div>
              )}
            </div>

            {/* Bottom Action */}
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
              <span className="text-xs font-mono text-[#515154]">
                INTEGRATED: HubSpot • Google • Stripe
              </span>
              <button
                onClick={onOpenIntake}
                className="apple-button-primary text-xs px-5 py-2 flex items-center gap-1.5 font-semibold cursor-pointer shadow-sm"
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
