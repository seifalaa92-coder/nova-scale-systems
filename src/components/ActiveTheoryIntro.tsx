"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import NovaLogo from "./NovaLogo";

interface SubtitleSegment {
  start: number;
  end: number;
  text: string;
}

const ARABIC_SUBTITLES: Record<string, SubtitleSegment[]> = {
  system: [
    { start: 0.0, end: 2.1, text: "عندك بزنس وتبغى ترتب شغلك؟" },
    { start: 2.1, end: 3.75, text: "مع نوفا سكيل سيستمز" },
    { start: 3.75, end: 5.1, text: "موقع احترافي" },
    { start: 5.1, end: 6.44, text: "متابعة للعملاء" },
    { start: 6.44, end: 7.82, text: "وحجوزات تلقائية" },
    { start: 7.82, end: 9.7, text: "خفف الشغل اليدوي" },
    { start: 9.7, end: 11.56, text: "وركز على نمو مشروعك" },
    { start: 11.56, end: 13.2, text: "ادخل موقعنا" },
    { start: 13.2, end: 15.04, text: "واطلب خطة نموك ألحين" },
  ],
  reels: [
    { start: 0.0, end: 3.92, text: "موقع يلفت النظر وموظف استقبال واتساب يرد على عملاءك" },
    { start: 3.92, end: 7.6, text: "ونظام يجمع بياناتهم من أول الرسالة لين الحجز" },
    { start: 7.6, end: 10.64, text: "كلها مترابطة.. لا تخلي فرصة تضيع عليك" },
    { start: 11.8, end: 14.5, text: "نوفا سكيل سيستمز" },
  ],
};

interface ActiveTheoryIntroProps {
  onComplete: () => void;
}

const INTRO_VIDEOS = [
  {
    id: "system",
    part: "01",
    tag: "CORE SYSTEM",
    label: "Autonomous CRM & Pipeline Flow",
    src: "/videos/nova-intro.mp4",
    poster: "/videos/nova-intro-poster.jpg",
    kicker: "HOW NOVA TRANSFORMS CLIENT ACQUISITION",
    headlinePart1: "Watch an inquiry turn into a ",
    headlineHighlight: "secured CRM deal.",
    description:
      "Watch the system in action: from the instant a prospect reaches out, to an automated 4-second response, pre-qualified calendar booking, and CRM pipeline sync.",
    milestones: [
      { step: "1", title: "Inbound Lead Capture", desc: "Instant notification dispatched to team", badge: "Instant", color: "blue" },
      { step: "2", title: "Automated Booking Concierge", desc: "Calendar self-scheduling & intake questions", badge: "4s Reply", color: "emerald" },
      { step: "3", title: "Autonomous CRM Ingestion", desc: "HubSpot/Google sync & deal secured", badge: "Live Sync", color: "purple" },
    ],
  },
  {
    id: "reels",
    part: "02",
    tag: "CREATIVE ENGINE",
    label: "Meta Reels & Creative Ad Campaign",
    src: "/videos/nova-reels-ad.mp4",
    poster: "/videos/nova-reels-poster.jpg",
    kicker: "TOP-OF-FUNNEL CUSTOMER ACQUISITION",
    headlinePart1: "High-impact creative that captures ",
    headlineHighlight: "ready-to-buy clients.",
    description:
      "See the customer attraction engine: high-performing short-form video reels and targeted social campaigns designed to stop the scroll and feed qualified enquiries into your pipeline.",
    milestones: [
      { step: "1", title: "Scroll-Stopping Visuals", desc: "Short-form video tailored for Meta Reels & TikTok", badge: "High CTR", color: "blue" },
      { step: "2", title: "Direct Lead Intake Hook", desc: "Frictionless 1-tap enquiry routing into WhatsApp & web", badge: "Direct Ping", color: "emerald" },
      { step: "3", title: "Automated Lead Routing", desc: "Leads automatically queued for follow-up and booking", badge: "No Leakage", color: "purple" },
    ],
  },
];

export default function ActiveTheoryIntro({ onComplete }: ActiveTheoryIntroProps) {
  const [videoIndex, setVideoIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const [isExiting, setIsExiting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Audio starts muted for guaranteed 0-delay browser autoplay compliance, attempts instant unmute
  const [isMuted, setIsMuted] = useState(true);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);

  const video0Ref = useRef<HTMLVideoElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hasEnteredRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const videoIndexRef = useRef(videoIndex);

  useEffect(() => {
    videoIndexRef.current = videoIndex;
  }, [videoIndex]);

  const activeVideo = INTRO_VIDEOS[videoIndex];
  const activeSubtitles = ARABIC_SUBTITLES[activeVideo.id] || [];
  const currentSubtitle = activeSubtitles.find(
    (s) => currentVideoTime >= s.start && currentVideoTime <= s.end
  );

  // Transition into main site
  const handleEnter = useCallback(() => {
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 650);
  }, [onComplete]);

  // Seamless switch between Part 01 and Part 02
  const switchVideo = useCallback(
    (targetIndex: number) => {
      const activeEl = targetIndex === 0 ? video0Ref.current : video1Ref.current;
      const inactiveEl = targetIndex === 0 ? video1Ref.current : video0Ref.current;

      // Keep only the active intro clip visible and playing; pause any inactive copy immediately
      if (inactiveEl) {
        inactiveEl.pause();
      }

      setVideoIndex(targetIndex);
      setProgress(0);
      setSecondsRemaining(15);

      if (activeEl) {
        activeEl.currentTime = 0;
        activeEl.muted = isMuted;
        if (!isMuted) activeEl.volume = 1.0;

        // Start clip immediately through an explicit play() call and handle its promise
        const playPromise = activeEl.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setIsMuted(activeEl.muted);
            })
            .catch((err) => {
              console.warn("Explicit switch play unmuted failed, falling back to muted:", err);
              activeEl.muted = true;
              setIsMuted(true);
              activeEl.play().then(() => setIsPlaying(true)).catch(() => {});
            });
        }
      }
    },
    [isMuted]
  );

  // Seamless unmuting without interrupting video playback
  const unmuteAndPlay = useCallback(() => {
    const active = videoIndexRef.current === 0 ? video0Ref.current : video1Ref.current;
    if (!active) return;
    active.muted = false;
    active.volume = 1.0;
    const playPromise = active.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Unmute play rejected by browser policy, keeping video running:", err);
          active.muted = true;
          active.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }

    // Keep the other video synchronized so if user transitions later, it remains unmuted
    const inactive = videoIndexRef.current === 0 ? video1Ref.current : video0Ref.current;
    if (inactive) {
      inactive.muted = false;
      inactive.volume = 1.0;
    }
  }, []);

  // Guaranteed instant autoplay on mount + seamless unmuting on first interaction
  useEffect(() => {
    const v0 = video0Ref.current;
    const v1 = video1Ref.current;

    // Preload Part 02 in background so transition has 0ms gap
    if (v1) {
      v1.preload = "auto";
      v1.muted = true;
      v1.pause();
    }

    if (!v0) return;

    // Start video playback immediately (muted is guaranteed to succeed 100% across all browser engines)
    v0.muted = true;
    v0.play()
      .then(() => {
        setIsPlaying(true);
        // Video is rolling. Now attempt to unmute immediately if browser policy allows
        v0.muted = false;
        v0.volume = 1.0;
        const unmutedPromise = v0.play();
        if (unmutedPromise !== undefined) {
          unmutedPromise
            .then(() => {
              setIsMuted(false);
            })
            .catch(() => {
              // Browser requires user gesture for audio; keep rolling muted smoothly
              v0.muted = true;
              setIsMuted(true);
              v0.play().catch(() => {});
            });
        }
      })
      .catch((err) => {
        console.warn("Initial play failed, retrying muted:", err);
        v0.muted = true;
        setIsMuted(true);
        v0.play().then(() => setIsPlaying(true)).catch(() => {});
      });

    // On user's first interaction anywhere on page (click, tap, keypress), seamlessly enable audio
    // NOTE: NEVER listen to mousemove/pointermove/scroll as non-activation events trigger browser audio pauses
    const userActivationEvents = ["click", "pointerdown", "touchstart", "keydown"];
    const handleFirstActivation = () => {
      const active = videoIndexRef.current === 0 ? video0Ref.current : video1Ref.current;
      if (active && active.muted) {
        active.muted = false;
        active.volume = 1.0;
        const p = active.play();
        if (p !== undefined) {
          p.then(() => {
            setIsMuted(false);
            setIsPlaying(true);
          }).catch(() => {
            active.muted = true;
            active.play().then(() => setIsPlaying(true)).catch(() => {});
          });
        }
      }
      const inactive = videoIndexRef.current === 0 ? video1Ref.current : video0Ref.current;
      if (inactive) {
        inactive.muted = false;
        inactive.volume = 1.0;
      }
      userActivationEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstActivation, true);
      });
    };

    userActivationEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstActivation, { capture: true, passive: true });
    });

    return () => {
      userActivationEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstActivation, true);
      });
    };
  }, []);

  // High-frequency 60fps subtitle synchronizer & status verification
  useEffect(() => {
    let animId: number;
    const syncTime = () => {
      const active = videoIndex === 0 ? video0Ref.current : video1Ref.current;
      if (active) {
        setCurrentVideoTime(active.currentTime);
        if (!active.paused && !isPlaying) {
          setIsPlaying(true);
        } else if (active.paused && isPlaying) {
          setIsPlaying(false);
        }
        if (active.duration) {
          const cur = active.currentTime;
          const dur = active.duration;
          const pct = Math.min(100, Math.floor((cur / dur) * 100));
          const rem = Math.max(0, Math.ceil(dur - cur));
          setProgress(pct);
          setSecondsRemaining(rem);
        }
      }
      animId = requestAnimationFrame(syncTime);
    };
    animId = requestAnimationFrame(syncTime);
    return () => cancelAnimationFrame(animId);
  }, [videoIndex, isPlaying]);

  // Timeupdate handlers for direct DOM precision
  const handleTimeUpdate0 = () => {
    if (videoIndex !== 0) return;
    const v0 = video0Ref.current;
    if (!v0 || !v0.duration) return;
    setCurrentVideoTime(v0.currentTime);
    const pct = Math.min(100, Math.floor((v0.currentTime / v0.duration) * 100));
    const remaining = Math.max(0, Math.ceil(v0.duration - v0.currentTime));
    setProgress(pct);
    setSecondsRemaining(remaining);
  };

  const handleTimeUpdate1 = () => {
    if (videoIndex !== 1) return;
    const v1 = video1Ref.current;
    if (!v1 || !v1.duration) return;
    setCurrentVideoTime(v1.currentTime);
    const pct = Math.min(100, Math.floor((v1.currentTime / v1.duration) * 100));
    const remaining = Math.max(0, Math.ceil(v1.duration - v1.currentTime));
    setProgress(pct);
    setSecondsRemaining(remaining);
  };

  // Video 0 finished -> start Part 02 immediately through explicit play() call and handle promise
  const handleVideo0Ended = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setProgress(100);
    setSecondsRemaining(0);
    switchVideo(1);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 800);
  }, [switchVideo]);

  // Video 1 finished -> enter main digital headquarters
  const handleVideo1Ended = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setProgress(100);
    setSecondsRemaining(0);
    setTimeout(() => {
      handleEnter();
    }, 400);
  }, [handleEnter]);

  // Native DOM listeners for guaranteed 100% reliable ended event triggering across all browser engines
  useEffect(() => {
    const v0 = video0Ref.current;
    if (!v0) return;
    const onEnded = () => handleVideo0Ended();
    v0.addEventListener("ended", onEnded);
    return () => v0.removeEventListener("ended", onEnded);
  }, [handleVideo0Ended]);

  useEffect(() => {
    const v1 = video1Ref.current;
    if (!v1) return;
    const onEnded = () => handleVideo1Ended();
    v1.addEventListener("ended", onEnded);
    return () => v1.removeEventListener("ended", onEnded);
  }, [handleVideo1Ended]);

  const togglePlay = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      const active = videoIndexRef.current === 0 ? video0Ref.current : video1Ref.current;
      if (!active) return;
      if (active.paused) {
        active
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        active.pause();
        setIsPlaying(false);
      }
    },
    []
  );

  const toggleMute = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      const active = videoIndexRef.current === 0 ? video0Ref.current : video1Ref.current;
      if (!active) return;
      const nextMuted = !active.muted;
      active.muted = nextMuted;
      if (!nextMuted) {
        active.volume = 1.0;
        active.play().catch(() => {});
      }
      setIsMuted(nextMuted);

      // Keep inactive video in sync
      const inactive = videoIndexRef.current === 0 ? video1Ref.current : video0Ref.current;
      if (inactive) {
        inactive.muted = nextMuted;
        if (!nextMuted) inactive.volume = 1.0;
      }
    },
    []
  );

  const handleVideoClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isMuted) {
        unmuteAndPlay();
      } else {
        togglePlay();
      }
    },
    [isMuted, unmuteAndPlay, togglePlay]
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.isComposing || e.keyCode === 229) return;
      if (e.key === "Escape" || e.key === "Enter") {
        handleEnter();
      } else if (e.key === " " && e.target === document.body) {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === "m") {
        toggleMute();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEnter, togglePlay, toggleMute]);

  // Fluid ribbon canvas
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
        vx: dx * 0.1,
        vy: dy * 0.1,
        age: 0,
        maxAge: 32,
      });
      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("pointermove", handlePointerMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;

        if (p.age >= p.maxAge) {
          points.splice(i, 1);
          continue;
        }

        const alpha = (1 - p.age / p.maxAge) * 0.25;
        const radius = (1 - p.age / p.maxAge) * 14;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 113, 227, ${alpha})`;
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
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => {
            if (isMuted) unmuteAndPlay();
          }}
          className="fixed inset-0 z-[100] overflow-y-auto select-none bg-[#fbfbfd] text-[#0e0e11] flex flex-col justify-between"
        >
          {/* Subtle Fluid Ribbon Canvas */}
          <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" />

          {/* Top Bar - Brand & Fast Skip */}
          <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#71717a] uppercase shrink-0">
            <div className="flex items-center">
              <NovaLogo size="md" variant="full" inverted={false} />
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnter();
                }}
                className="text-[#0e0e11] hover:text-[#0071e3] transition-colors border-b border-black/20 pb-0.5 tracking-wider cursor-pointer font-bold text-xs"
              >
                [ SKIP INTRO → ]
              </button>
            </div>
          </header>

          {/* Center Stage: The 2-Column Experience */}
          <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto my-auto py-4 sm:py-6 w-full">
            {/* Live Video HUD Banner with Two-Part Toggle */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs font-mono shadow-xs">
                <span className="flex items-center gap-1 text-red-500 font-bold">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  LIVE
                </span>
                <span className="text-[#86868b]">•</span>
                <span className="text-[#0e0e11] font-semibold">NOVA CINEMATIC SHOWCASE</span>
              </div>

              {/* Two-Part Switcher */}
              <div className="inline-flex p-1 rounded-full bg-white border border-black/[0.08] shadow-xs text-xs font-mono">
                {INTRO_VIDEOS.map((item, idx) => {
                  const isActive = videoIndex === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        switchVideo(idx);
                      }}
                      className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#0e0e11] text-white shadow-xs"
                          : "text-[#515154] hover:text-[#0e0e11]"
                      }`}
                    >
                      {item.part}: {item.tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video & Info Grid */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-left my-2 max-w-5xl">
              {/* Left Column: Context & Milestones (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono text-[#0071e3] uppercase tracking-wider block mb-2 font-semibold">
                    {activeVideo.kicker}
                  </span>
                  <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0e0e11] tracking-[-0.038em] leading-[1.08] mb-3">
                    {activeVideo.headlinePart1}
                    <span className="text-[#0071e3]">
                      {activeVideo.headlineHighlight}
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base text-[#515154] leading-relaxed">
                    {activeVideo.description}
                  </p>
                </div>

                {/* Milestone Cards */}
                <div className="space-y-3">
                  {activeVideo.milestones.map((m, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-white border border-black/[0.08] flex items-center justify-between text-xs shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                            m.color === "blue"
                              ? "bg-blue-50 text-[#0071e3]"
                              : m.color === "emerald"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-purple-50 text-purple-700"
                          }`}
                        >
                          {m.step}
                        </div>
                        <div>
                          <div className="font-semibold text-[#0e0e11]">{m.title}</div>
                          <div className="text-[11px] text-[#71717a]">{m.desc}</div>
                        </div>
                      </div>
                      <span
                        className={`font-mono text-[11px] font-semibold ${
                          m.color === "blue"
                            ? "text-[#0071e3]"
                            : m.color === "emerald"
                            ? "text-emerald-700"
                            : "text-purple-700"
                        }`}
                      >
                        {m.badge}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Direct Action Button */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnter();
                    }}
                    className="apple-button-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] inline-flex items-center gap-2.5 shadow-md cursor-pointer w-full sm:w-auto justify-center"
                  >
                    <span>Enter Digital Headquarters</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {videoIndex === 0 ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        switchVideo(1);
                      }}
                      className="apple-button-secondary px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] inline-flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <span>Watch Part 02: Reels Ad →</span>
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        switchVideo(0);
                      }}
                      className="apple-button-secondary px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] inline-flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <span>← Replay Part 01: Core System</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Architectural Phone Frame Mockup (6 cols) */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-[36px] bg-white p-3 border border-black/[0.1] shadow-2xl shadow-black/10 overflow-hidden flex flex-col">
                  {/* Speaker Notch */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* Dual Video Elements & Seamless Crossfade */}
                  <div className="relative w-full h-full rounded-[26px] overflow-hidden bg-black flex items-center justify-center">
                    {/* Part 01: Core System */}
                    <video
                      ref={video0Ref}
                      data-intro-video={videoIndex === 0 ? "true" : undefined}
                      data-intro-video-0="true"
                      src={INTRO_VIDEOS[0].src}
                      poster={INTRO_VIDEOS[0].poster}
                      autoPlay
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      onPlay={() => {
                        if (videoIndex === 0) setIsPlaying(true);
                      }}
                      onPause={() => {
                        if (videoIndex === 0) setIsPlaying(false);
                      }}
                      onTimeUpdate={handleTimeUpdate0}
                      onSeeked={(e) => {
                        if (videoIndex === 0) setCurrentVideoTime(e.currentTarget.currentTime);
                      }}
                      onEnded={handleVideo0Ended}
                      className={`absolute inset-0 w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
                        videoIndex === 0
                          ? "opacity-100 z-10 pointer-events-auto"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                      onClick={handleVideoClick}
                    />

                    {/* Part 02: Reels Ad (Preloaded in background so transition has 0ms gap / 0 blank frames) */}
                    <video
                      ref={video1Ref}
                      data-intro-video={videoIndex === 1 ? "true" : undefined}
                      data-intro-video-1="true"
                      src={INTRO_VIDEOS[1].src}
                      poster={INTRO_VIDEOS[1].poster}
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      onPlay={() => {
                        if (videoIndex === 1) setIsPlaying(true);
                      }}
                      onPause={() => {
                        if (videoIndex === 1) setIsPlaying(false);
                      }}
                      onTimeUpdate={handleTimeUpdate1}
                      onSeeked={(e) => {
                        if (videoIndex === 1) setCurrentVideoTime(e.currentTarget.currentTime);
                      }}
                      onEnded={handleVideo1Ended}
                      className={`absolute inset-0 w-full h-full object-cover cursor-pointer transition-opacity duration-300 ${
                        videoIndex === 1
                          ? "opacity-100 z-10 pointer-events-auto"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                      onClick={handleVideoClick}
                    />

                    {/* Perfectly Timed Arabic Subtitles in the Bottom of the Video */}
                    <AnimatePresence mode="wait">
                      {currentSubtitle && (
                        <motion.div
                          key={currentSubtitle.text}
                          initial={{ opacity: 0, y: 6, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          dir="rtl"
                          className="absolute bottom-4 sm:bottom-5 inset-x-3 z-30 flex items-center justify-center pointer-events-none text-center px-1 pr-12"
                        >
                          <div className="px-4 py-2 rounded-2xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-2xl max-w-full select-none">
                            <p className="font-sans font-bold text-xs sm:text-sm md:text-base text-white tracking-normal leading-relaxed drop-shadow-md">
                              {currentSubtitle.text}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Floating Bottom-Right Mute/Unmute Icon Only */}
                    <button
                      type="button"
                      data-intro-mute-btn="true"
                      onClick={toggleMute}
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
                  </div>
                </div>
              </div>
            </div>

            {/* Video Scrubber & Auto-Enter Bar */}
            <div className="w-full max-w-5xl mt-6">
              <div className="flex items-center justify-between text-xs font-mono tracking-wider mb-2">
                <div className="flex items-center gap-2 text-[#71717a]">
                  <Clock className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span data-intro-status="true">
                    {isPlaying ? (
                      progress >= 100
                        ? videoIndex === 0
                          ? "✓ PART 01 COMPLETE — PLAYING REELS ADVERT..."
                          : "✓ SHOWCASE COMPLETE — OPENING HEADQUARTERS..."
                        : `PLAYING ${activeVideo.tag} (${secondsRemaining}s REMAINING)`
                    ) : (
                      `PAUSED • ${activeVideo.tag} (${secondsRemaining}s REMAINING)`
                    )}
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-[#0e0e11]" data-intro-progress="true">
                  {progress}%
                </div>
              </div>

              {/* Scrubber Line */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const pct = Math.max(0, Math.min(1, clickX / rect.width));
                  const active = videoIndex === 0 ? video0Ref.current : video1Ref.current;
                  if (active && active.duration) {
                    const newTime = pct * active.duration;
                    active.currentTime = newTime;
                    setCurrentVideoTime(newTime);
                    setProgress(Math.floor(pct * 100));
                    setSecondsRemaining(Math.max(0, Math.ceil(active.duration - newTime)));
                  }
                }}
                className="w-full h-2.5 bg-black/[0.08] rounded-full overflow-hidden relative cursor-pointer shadow-inner"
                title="Click to scrub video"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0071e3] via-emerald-500 to-[#0e0e11] rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>

              {/* Fast Track & Replay Navigation */}
              <div className="flex items-center justify-between mt-2.5 text-xs font-mono text-[#86868b]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnter();
                  }}
                  className="hover:text-[#0071e3] transition-colors cursor-pointer flex items-center gap-1 font-semibold text-[#0e0e11]"
                >
                  <span>[ CLICK TO ENTER MAIN SITE NOW ]</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div>
                  {videoIndex === 0 ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        switchVideo(1);
                      }}
                      className="text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer font-medium"
                    >
                      PART 02 UP NEXT →
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        switchVideo(0);
                      }}
                      className="text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer font-medium"
                    >
                      ← REPLAY PART 01
                    </button>
                  )}
                </div>
              </div>
            </div>
          </main>

          {/* Footer Metas */}
          <footer className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#71717a] border-t border-black/[0.06] shrink-0">
            <div>© 2026 NOVA SCALE SYSTEMS</div>
            <div className="hidden sm:inline">ZERO CLIENT LEAKAGE • CONVERSATION → CRM AUTOPILOT</div>
            <div>STATUS: SECURED PIPELINE ACTIVE</div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
