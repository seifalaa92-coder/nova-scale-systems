"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCheck,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  Clock,
  Database,
  Check,
  Radio,
  Calendar,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import NovaLogo from "./NovaLogo";

interface ActiveTheoryIntroProps {
  onComplete: () => void;
}

export default function ActiveTheoryIntro({ onComplete }: ActiveTheoryIntroProps) {
  const [progress, setProgress] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(8);
  const [isExiting, setIsExiting] = useState(false);
  const [simulationStage, setSimulationStage] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hasEnteredRef = useRef(false);

  // Transition into main site (called automatically after 8 seconds or on instant skip)
  const handleEnter = useCallback(() => {
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 750);
  }, [onComplete]);

  // Calibrated 8-Second Reading Experience (80ms * 100 steps = 8,000ms)
  useEffect(() => {
    const TOTAL_MS = 8000;
    const STEP_MS = 80;
    let elapsedMs = 0;

    const interval = setInterval(() => {
      elapsedMs += STEP_MS;
      const currentProgress = Math.min(100, Math.floor((elapsedMs / TOTAL_MS) * 100));
      const secsLeft = Math.max(0, Math.ceil((TOTAL_MS - elapsedMs) / 1000));

      setProgress(currentProgress);
      setSecondsRemaining(secsLeft);

      // Stage 1: 0 - 2.0s -> Customer message visible & parsed
      // Stage 2: 2.0s - 4.5s -> Instant WhatsApp Auto Concierge reply triggers + CRM record created
      // Stage 3: 4.5s - 8.0s -> Deal Won, Retainer Secured in CRM, client reads both panels comfortably
      if (currentProgress >= 22 && currentProgress < 50) {
        setSimulationStage(2);
      } else if (currentProgress >= 50) {
        setSimulationStage(3);
      }

      if (elapsedMs >= TOTAL_MS) {
        clearInterval(interval);
        setProgress(100);
        setSecondsRemaining(0);
        setSimulationStage(3);

        // Smooth automatic shutter open into the main site at 8 seconds
        setTimeout(() => {
          handleEnter();
        }, 300);
      }
    }, STEP_MS);

    return () => clearInterval(interval);
  }, [handleEnter]);

  // Keyboard skip (Escape or Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEnter]);

  // Real-time interactive fluid ribbon on light canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const points: { x: number; y: number; age: number; maxAge: number; vx: number; vy: number }[] = [];
    let lastX = 0;
    let lastY = 0;

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      points.push({
        x: e.clientX,
        y: e.clientY,
        vx: dx * 0.12,
        vy: dy * 0.12,
        age: 0,
        maxAge: 38,
      });
      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("pointermove", handlePointerMove);

    const render = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fillRect(0, 0, width, height);

      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;

        if (p.age >= p.maxAge) {
          points.splice(i, 1);
          continue;
        }

        const alpha = (1 - p.age / p.maxAge) * 0.35;
        const radius = (1 - p.age / p.maxAge) * 16;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 113, 227, ${alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 211, 102, ${alpha * 1.5})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <div className="fixed inset-0 z-[100] overflow-y-auto select-none bg-[#fbfbfd] text-[#0e0e11] flex flex-col justify-between">
          {/* Interactive Light Fluid Ribbon Canvas */}
          <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />

          {/* White Curtain Shutter Panels (Slide vertically on enter) */}
          <motion.div
            initial={{ y: 0 }}
            animate={isExiting ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 right-0 h-1/2 bg-white border-b border-black/[0.08] pointer-events-none z-10 shadow-sm"
          />
          <motion.div
            initial={{ y: 0 }}
            animate={isExiting ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
            className="fixed bottom-0 left-0 right-0 h-1/2 bg-white border-t border-black/[0.08] pointer-events-none z-10 shadow-sm"
          />

          {/* Top Bar - Optical alignment with Navbar */}
          <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#71717a] uppercase shrink-0">
            <div className="flex items-center">
              <NovaLogo size="md" variant="full" inverted={false} />
            </div>

            <div className="flex items-center gap-6">
              <span className="hidden sm:inline text-emerald-600 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>LEAD CONVERSION → CRM AUTO-SYNC</span>
              </span>
              <button
                onClick={handleEnter}
                className="text-[#0e0e11] hover:text-[#0071e3] transition-colors border-b border-black/20 pb-0.5 tracking-wider cursor-pointer font-bold"
              >
                [ SKIP INTRO → ]
              </button>
            </div>
          </header>

          {/* Center Stage: The Live Video Flow of Lead Inbound -> CRM Secured */}
          <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto my-auto py-4 sm:py-6 w-full">
            {/* Live Video Production Frame HUD */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-black/[0.08] text-xs font-mono mb-3 shadow-xs">
              <span className="flex items-center gap-1 text-red-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                REC
              </span>
              <span className="text-[#86868b]">•</span>
              <span className="text-[#0e0e11] font-semibold">LIVE FLOW SIMULATION: INBOUND CONVERSATION → CRM</span>
              <span className="text-[#86868b]">•</span>
              <span className="text-[#0071e3] font-bold">60 FPS 4K</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-[#0e0e11] tracking-[-0.038em] leading-[1.08] mb-4">
              Watch how an inquiry turns into a{" "}
              <span className="text-[#0071e3]">secured CRM deal.</span>
            </h1>

            {/* Connected Dual Flow Interface: Conversation (Left) -> Data Conduit -> CRM Pipeline (Right) */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch text-left my-2">
              {/* LEFT COLUMN: The Inbound Customer Conversation (WhatsApp / Web) */}
              <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-black/[0.09] shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#71717a] pb-3 border-b border-black/[0.06]">
                    <div className="flex items-center gap-2 text-emerald-600 font-bold font-mono">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>STEP 01: INBOUND CONVERSATION</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#86868b]">Sunday 9:42 PM (After Hours)</span>
                  </div>

                  {/* Customer Message Bubble */}
                  <div className="bg-[#f0f2f5] p-4 sm:p-4.5 rounded-2xl rounded-tl-sm text-[#111b21] max-w-[92%] mt-3 shadow-2xs">
                    <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-[#54656f]">
                      <span className="w-5 h-5 rounded-full bg-slate-300 text-[#111b21] font-bold text-[10px] flex items-center justify-center">
                        M
                      </span>
                      <span className="font-semibold text-[#111b21]">Marcus Vance</span>
                      <span className="text-slate-400">• Director of Operations</span>
                    </div>
                    <p className="text-base sm:text-lg font-medium leading-relaxed text-[#111b21]">
                      &ldquo;Hi, we want to automate all our system operations.&rdquo;
                    </p>
                  </div>

                  {/* Nova 4-Second Instant Response Bubble */}
                  {simulationStage >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-[#d9fdd3] p-4 sm:p-4.5 rounded-2xl rounded-tr-sm text-[#111b21] max-w-[92%] ml-auto mt-3 border border-emerald-300/40 shadow-xs"
                    >
                      <div className="flex items-center justify-between text-xs sm:text-sm text-emerald-900 font-bold mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                          Nova 4-Second Auto Concierge
                        </span>
                        <span className="flex items-center gap-1 text-xs font-mono text-emerald-800 font-semibold">
                          <span>4s</span>
                          <CheckCheck className="w-4 h-4 text-[#53bdeb]" />
                        </span>
                      </div>
                      <p className="text-base sm:text-lg leading-relaxed text-[#111b21]">
                        Hello Marcus! We automate complete business operations, CRM pipelines, and client workflows in 14 days. Reserve your live Systems Blueprint session here:{" "}
                        <span className="text-[#0071e3] font-semibold underline underline-offset-2">nova.link/blueprint</span>
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Left Footer: Conversation Milestone */}
                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#86868b]">CHANNEL: WhatsApp & SMS</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>0-Second Dropoff</span>
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: Enterprise CRM Pipeline (Lead Saved & Secured) */}
              <div className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-black/[0.09] shadow-xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#71717a] pb-3 border-b border-black/[0.06]">
                    <div className="flex items-center gap-2 text-[#0071e3] font-bold font-mono">
                      <Database className="w-4 h-4 text-[#0071e3]" />
                      <span>STEP 02: AUTONOMOUS CRM INGESTION</span>
                    </div>
                    <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-mono text-[11px] font-semibold border border-emerald-200">
                      LIVE REST API SYNC
                    </span>
                  </div>

                  {/* CRM Deal Record Card */}
                  <div className="mt-3 p-3.5 sm:p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[10px] font-mono text-[#86868b] uppercase tracking-wider">
                          SAVED CLIENT RECORD
                        </div>
                        <div className="text-base sm:text-lg font-bold text-[#0e0e11]">
                          Marcus Vance
                        </div>
                        <div className="text-xs text-[#66666e]">
                          Director of Operations • Business Systems
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-[#86868b] uppercase tracking-wider">
                          AUTOMATION DEAL
                        </div>
                        <div className="text-base sm:text-xl font-mono font-extrabold text-emerald-600">
                          +$6,800.00
                        </div>
                      </div>
                    </div>

                    {/* CRM Pipeline Stage Progress */}
                    <div className="pt-2 border-t border-black/[0.05] space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-[#86868b]">PIPELINE STATUS:</span>
                        <span className="text-[#0e0e11] font-bold">
                          {simulationStage === 1 && "1. Inbound Received"}
                          {simulationStage === 2 && "2. Lead Qualified & Blueprint Sent"}
                          {simulationStage === 3 && "3. Closed Won • Automation Booked"}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 h-1.5">
                        <div className="rounded-full bg-emerald-500" />
                        <div
                          className={`rounded-full transition-all duration-300 ${
                            simulationStage >= 2 ? "bg-emerald-500" : "bg-black/[0.08]"
                          }`}
                        />
                        <div
                          className={`rounded-full transition-all duration-300 ${
                            simulationStage >= 3 ? "bg-emerald-500" : "bg-black/[0.08]"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Live Audit Log */}
                    <div className="space-y-1.5 text-xs font-mono pt-1">
                      <div className="flex items-center gap-2 text-[#0e0e11]">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>00:01 • System operations request parsed & enriched</span>
                      </div>
                      {simulationStage >= 2 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 text-[#0e0e11]"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>00:04 • Systems Blueprint & 14-day timeline delivered</span>
                        </motion.div>
                      )}
                      {simulationStage >= 3 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 text-emerald-700 font-bold"
                        >
                          <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>00:06 • Wednesday architecture session locked in CRM</span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Outcome Stamp: Lead Saved & Secured */}
                  {simulationStage >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-2 shadow-xs"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>SYSTEMS AUTOMATION SECURED IN CRM • 0 SECONDS WASTED</span>
                    </motion.div>
                  )}
                </div>

                {/* Right Footer: System Telemetry */}
                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#86868b]">DESTINATION: Enterprise CRM</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Pipeline Synced</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 8-Second Reading Bar & Video Scrubber Status */}
            <div className="w-full max-w-6xl mt-4">
              <div className="flex items-center justify-between text-xs sm:text-sm font-mono tracking-wider mb-2">
                <div className="flex items-center gap-2 text-[#71717a]">
                  <Clock className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span className="font-semibold text-[#0e0e11]">
                    {progress >= 100
                      ? "✓ 100% COMPLETE — OPENING MAIN SITE..."
                      : `READING FLOW: CONVERSATION → CRM (${secondsRemaining}s remaining)`}
                  </span>
                </div>
                <div className="text-base sm:text-lg font-mono font-bold text-[#0e0e11]">
                  {progress}%
                </div>
              </div>

              {/* Precision 8-Second Loading Scrubber */}
              <div
                onClick={handleEnter}
                className="w-full h-3 bg-black/[0.08] rounded-full overflow-hidden relative cursor-pointer shadow-inner"
                title="Click to enter immediately"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#0071e3] via-emerald-500 to-[#0e0e11] rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Fast-Track Options */}
              <div className="flex items-center justify-between mt-2.5 text-xs font-mono text-[#86868b]">
                <button
                  onClick={handleEnter}
                  className="hover:text-[#0071e3] transition-colors cursor-pointer flex items-center gap-1 font-semibold text-[#0e0e11]"
                >
                  <span>[ CLICK TO ENTER MAIN SITE NOW ]</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <span className="text-emerald-700 font-medium">AUTO-OPENS IN {secondsRemaining}s</span>
              </div>
            </div>
          </main>

          {/* Bottom Metas */}
          <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#71717a] border-t border-black/[0.06] shrink-0">
            <div>© 2026 NOVA SCALE SYSTEMS</div>
            <div className="hidden sm:inline">ZERO CLIENT LEAKAGE • CONVERSATION → CRM AUTOPILOT</div>
            <div>STATUS: SECURED PIPELINE ACTIVE</div>
          </footer>
        </div>
      )}
    </AnimatePresence>
  );
}
