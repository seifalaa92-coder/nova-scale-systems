"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, ArrowRight, Sparkles, TrendingUp, Zap, Target } from "lucide-react";

interface SubtitleSegment {
  start: number;
  end: number;
  text: string;
}

const REELS_SUBTITLES: SubtitleSegment[] = [
  { start: 0.0, end: 3.92, text: "موقع يلفت النظر وموظف استقبال واتساب يرد على عملاءك" },
  { start: 3.92, end: 7.6, text: "ونظام يجمع بياناتهم من أول الرسالة لين الحجز" },
  { start: 7.6, end: 10.64, text: "كلها مترابطة.. لا تخلي فرصة تضيع عليك" },
  { start: 11.8, end: 14.5, text: "نوفا سكيل سيستمز" },
];

interface ReelsAdCampaignShowcaseProps {
  onOpenIntake: () => void;
}

export default function ReelsAdCampaignShowcase({ onOpenIntake }: ReelsAdCampaignShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  // High-frequency subtitle time tracking
  useEffect(() => {
    let animId: number;
    const syncTime = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
      }
      animId = requestAnimationFrame(syncTime);
    };
    animId = requestAnimationFrame(syncTime);
    return () => cancelAnimationFrame(animId);
  }, []);

  const currentSubtitle = REELS_SUBTITLES.find(
    (s) => currentTime >= s.start && currentTime <= s.end
  );

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    if (!video.muted) {
      video.volume = 1.0;
      video.play().catch(() => {});
    }
    setIsMuted(video.muted);
  };

  return (
    <section className="py-20 md:py-32 relative bg-[#fbfbfd] text-[#0e0e11] overflow-hidden border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Kicker */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-[#0071e3] uppercase tracking-wider mb-4 font-semibold">
            <Target className="w-3.5 h-3.5" />
            <span>TOP-OF-FUNNEL CUSTOMER ATTRACTION</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#0e0e11] tracking-[-0.038em] leading-[1.08] mb-6">
            Meta Reels & Creative Ads that <br />
            <span className="text-[#0071e3]">command buyer attention.</span>
          </h2>

          <p className="text-[#515154] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            High-converting short-form creative engineered to stop the scroll, pre-qualify prospective buyers, and channel them straight into your automated CRM workflows.
          </p>
        </div>

        {/* 2-Column Showcase Card */}
        <div className="apple-card rounded-3xl p-6 sm:p-10 md:p-12 border border-black/[0.08] shadow-xl bg-white max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Creative Strategy & Deliverables (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-xs font-mono text-[#0071e3] uppercase tracking-wider block mb-2 font-semibold">
                  CAMPAIGN HIGHLIGHT
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#0e0e11] font-bold tracking-tight">
                  High-Impact Meta & Social Video Engine
                </h3>
                <p className="text-sm text-[#515154] mt-2 leading-relaxed">
                  We create visually striking, message-first video advertisements designed specifically for 9:16 mobile feeds (Instagram Reels, Facebook, TikTok, and YouTube Shorts) that drive immediate client action.
                </p>
              </div>

              {/* Three Value Pillars */}
              <div className="space-y-3.5">
                <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] flex items-start gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center shrink-0 font-bold">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0e0e11]">1-Second Attention Hooks</div>
                    <div className="text-xs text-[#515154] mt-0.5 leading-relaxed">
                      Compelling first frames and kinetic typography that capture viewers before they swipe away.
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] flex items-start gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0e0e11]">Direct Intake Architecture</div>
                    <div className="text-xs text-[#515154] mt-0.5 leading-relaxed">
                      Custom landing pages and 1-tap WhatsApp chat hooks linked directly to each campaign offer.
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#f5f5f7] border border-black/[0.06] flex items-start gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0e0e11]">Automated CRM Attribution</div>
                    <div className="text-xs text-[#515154] mt-0.5 leading-relaxed">
                      Every enquiry is tagged by campaign source, notifying your team with zero manual tracking.
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Call to Action */}
              <div className="pt-2">
                <button
                  onClick={onOpenIntake}
                  className="apple-button-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] inline-flex items-center gap-2.5 shadow-md cursor-pointer w-full sm:w-auto justify-center"
                >
                  <span>Build My Campaign Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Video Reel in Architectural Frame (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[320px] aspect-[9/16] rounded-[36px] bg-white p-3 border border-black/[0.1] shadow-2xl shadow-black/10 overflow-hidden flex flex-col">
                {/* Speaker Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-3.5 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Video Container */}
                <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src="/videos/nova-reels-ad.mp4"
                    poster="/videos/nova-reels-poster.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={togglePlay}
                  />

                  {/* Play/Pause Button on Pause */}
                  {!isPlaying && (
                    <button
                      onClick={togglePlay}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-[#0e0e11] flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform z-20"
                    >
                      <Play className="w-6 h-6 fill-[#0e0e11] ml-0.5" />
                    </button>
                  )}

                  {/* Live Synchronized Arabic Subtitles */}
                  <AnimatePresence mode="wait">
                    {currentSubtitle && (
                      <motion.div
                        key={currentSubtitle.text}
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        dir="rtl"
                        className="absolute bottom-16 inset-x-2 z-25 flex items-center justify-center pointer-events-none text-center px-1"
                      >
                        <div className="px-3.5 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-2xl max-w-[94%] select-none">
                          <p className="font-sans font-bold text-xs sm:text-sm text-white tracking-normal leading-relaxed drop-shadow-md">
                            {currentSubtitle.text}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Transport Controls Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs z-30 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-black/[0.08] shadow-sm">
                    <button
                      onClick={togglePlay}
                      className="p-1 text-[#0e0e11] hover:text-[#0071e3] transition-colors cursor-pointer"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-[#0e0e11]" />}
                    </button>

                    <div className="text-[10px] font-mono text-[#515154]">
                      Meta Reels Campaign
                    </div>

                    <button
                      onClick={toggleMute}
                      className="p-1 text-[#0e0e11] hover:text-[#0071e3] transition-colors cursor-pointer"
                      title={isMuted ? "Unmute Audio" : "Mute Audio"}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-amber-600" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-emerald-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
