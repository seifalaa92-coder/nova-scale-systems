"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  MapPin,
  Search,
  Target,
  TrendingUp,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface SubtitleSegment {
  start: number;
  end: number;
  text: string;
}

const GEO_SUBTITLES: SubtitleSegment[] = [
  { start: 0.0, end: 2.1, text: "تبغى ترفع مبيعاتك؟" },
  { start: 2.1, end: 5.6, text: "مع خطة نوفا ندير جمهورك بالـ SEO والاستهداف الجغرافي" },
  { start: 5.6, end: 8.04, text: "ونجيب لك الزبون الصح!" },
];

interface GeoSalesAdShowcaseProps {
  onOpenIntake: () => void;
}

export default function GeoSalesAdShowcase({ onOpenIntake }: GeoSalesAdShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);

  // High-frequency subtitle synchronizer
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

  const currentSubtitle = GEO_SUBTITLES.find(
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
    <section className="py-20 md:py-32 relative bg-[#f5f5f7] text-[#0e0e11] overflow-hidden border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Kicker */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-700 uppercase tracking-wider mb-4 font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>GEO-TARGETED ACQUISITION ENGINE</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#0e0e11] tracking-[-0.038em] leading-[1.08] mb-6">
            Hyper-Local SEO & Geo Ads that <br />
            <span className="text-emerald-600">reach ready-to-buy clients.</span>
          </h2>

          <p className="text-[#515154] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Stop wasting budget on broad impressions. We engineer location-first SEO and precision geo-campaigns that place your business in front of verified, local buyers searching right now.
          </p>
        </div>

        {/* 2-Column Showcase Card */}
        <div className="apple-card rounded-3xl p-6 sm:p-10 md:p-12 border border-black/[0.08] shadow-xl bg-white max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Strategic Capabilities (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-xs font-mono text-emerald-600 uppercase tracking-wider block mb-2 font-semibold">
                  NEW AD CAMPAIGN • HIGH-INTENT LOCAL DOMINANCE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-[#0e0e11] font-bold tracking-tight">
                  Dominating Local Search & Neighborhood Conversions
                </h3>
                <p className="text-sm text-[#515154] mt-2 leading-relaxed">
                  Every business loses up to 80% of revenue to local competitors simply because they do not rank first in map packs and geo-targeted social queries. We manage your entire regional audience acquisition pipeline.
                </p>
              </div>

              {/* Three Value Pillars */}
              <div className="space-y-3.5">
                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] flex items-start gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0e0e11]">Organic & Local SEO Leadership</div>
                    <div className="text-xs text-[#515154] mt-0.5 leading-relaxed">
                      Optimized for top placement on Google Maps, Apple Maps, and local search queries for your target service category.
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] flex items-start gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0071e3] flex items-center justify-center shrink-0 font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0e0e11]">Hyper-Radius Geo-Fencing</div>
                    <div className="text-xs text-[#515154] mt-0.5 leading-relaxed">
                      Deliver localized video ads exclusively to potential clients in your specific district, neighborhood, or city center.
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] flex items-start gap-3.5 shadow-xs">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-bold">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0e0e11]">Instant Deal Capture & CRM Booking</div>
                    <div className="text-xs text-[#515154] mt-0.5 leading-relaxed">
                      Every geo-targeted lead routes instantly to WhatsApp and CRM calendars within 4 seconds with 0 client leakage.
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] text-center">
                  <div className="font-display text-xl sm:text-2xl font-bold text-emerald-600">3.8x</div>
                  <div className="text-[11px] text-[#71717a] font-mono mt-0.5">LOCAL ROAS</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] text-center">
                  <div className="font-display text-xl sm:text-2xl font-bold text-[#0071e3]">#1</div>
                  <div className="text-[11px] text-[#71717a] font-mono mt-0.5">MAP PACK RANK</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#fbfbfd] border border-black/[0.06] text-center">
                  <div className="font-display text-xl sm:text-2xl font-bold text-purple-600">4s</div>
                  <div className="text-[11px] text-[#71717a] font-mono mt-0.5">SPEED TO LEAD</div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onOpenIntake}
                  className="apple-button-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] inline-flex items-center gap-2.5 shadow-md cursor-pointer justify-center"
                >
                  <span>Build Your Local Sales Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Architectural 9:16 Video Player Mockup (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] rounded-[36px] bg-white p-3 border border-black/[0.1] shadow-2xl shadow-black/10 overflow-hidden flex flex-col">
                {/* Speaker Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Video Container */}
                <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src="/videos/nova-sales-geo.mp4"
                    poster="/videos/nova-sales-geo-poster.jpg"
                    loop
                    autoPlay
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={togglePlay}
                  />

                  {/* Play/Pause Overlay Indicator on manual pause */}
                  {!isPlaying && (
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-105">
                        <Play className="w-7 h-7 translate-x-0.5 fill-black" />
                      </div>
                    </div>
                  )}

                  {/* Perfectly Timed Arabic Subtitles */}
                  <AnimatePresence mode="wait">
                    {currentSubtitle && (
                      <motion.div
                        key={currentSubtitle.text}
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        dir="rtl"
                        className="absolute bottom-4 inset-x-3 z-30 flex items-center justify-center pointer-events-none text-center px-1 pr-12"
                      >
                        <div className="px-4 py-2 rounded-2xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-2xl max-w-full select-none">
                          <p className="font-sans font-bold text-xs sm:text-sm text-white tracking-normal leading-relaxed drop-shadow-md">
                            {currentSubtitle.text}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom-Right Clean Mute/Unmute Icon */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    className="absolute bottom-3.5 right-3.5 z-40 w-9 h-9 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
                    aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </button>

                  {/* Top-Left Live Tag */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-white border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>GEO CAMPAIGN</span>
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
