"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, CheckCheck, ArrowRight, Sparkles, Phone } from "lucide-react";

export default function WhatsAppFloatingButton({ onOpenIntake }: { onOpenIntake: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [chatStep, setChatStep] = useState<"greeting" | "replied">("greeting");
  const [inputMsg, setInputMsg] = useState("");

  // Show a preview teaser bubble after 3 seconds if untouched
  const [showTeaser, setShowTeaser] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTeaser(true);
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleSendTestMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatStep("replied");
  };

  const handleOpenWhatsAppDirect = () => {
    // Direct WhatsApp web link with prefilled message
    const text = encodeURIComponent(
      "Hi Nova Scale Systems, I'm interested in upgrading our website and automating our client acquisition workflows."
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Teaser Preview Bubble */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-2 w-72 bg-white text-[#0e0e11] rounded-2xl p-4 shadow-2xl border border-black/[0.08] cursor-pointer"
            onClick={() => {
              setShowTeaser(false);
              setIsOpen(true);
              setHasInteracted(true);
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-[#0e0e11]">
                  NOVA LIVE WHATSAPP BOT
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTeaser(false);
                }}
                className="text-[#86868b] hover:text-[#0e0e11]"
                aria-label="Close message preview"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-[#515154] leading-relaxed">
              👋 <strong>Never lose a client.</strong> Test our 4-second instant WhatsApp lead responder right now.
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold text-emerald-600">
              <span>Test Instant Chat</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interactive WhatsApp Chat Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-[#f0f2f5] rounded-3xl shadow-2xl border border-black/[0.1] overflow-hidden flex flex-col h-[460px]"
          >
            {/* WhatsApp Branded Header */}
            <div className="bg-[#008069] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-white text-sm shadow-xs">
                  N
                </div>
                <div>
                  <div className="font-semibold text-sm leading-tight">Nova Scale Concierge</div>
                  <div className="text-[11px] text-emerald-100 flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span>Instant Automated Reply</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body simulating WhatsApp Conversation */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:16px_16px]">
              {/* Automated Welcome Msg */}
              <div className="flex flex-col items-start max-w-[85%]">
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-xs border border-black/[0.04] text-[#111b21] space-y-1.5">
                  <p className="font-semibold text-[11px] text-[#008069]">Nova Client Rescue System</p>
                  <p>
                    Hello! When a potential client messages your website, our automation responds within <strong>4 seconds</strong> so you never lose them to competitors.
                  </p>
                  <p className="text-[#54656f] text-[11px]">
                    What type of business are you scaling?
                  </p>
                  <div className="text-[10px] text-right text-[#667781] flex items-center justify-end gap-1">
                    <span>9:41 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* User Reply if submitted */}
              {chatStep === "replied" && (
                <>
                  <div className="flex flex-col items-end max-w-[85%] ml-auto">
                    <div className="bg-[#d9fdd3] p-3 rounded-2xl rounded-tr-sm shadow-xs text-[#111b21]">
                      <p>{inputMsg || "We run a 6-figure practice and need automated client booking."}</p>
                      <div className="text-[10px] text-right text-[#667781] flex items-center justify-end gap-1 mt-1">
                        <span>Just now</span>
                        <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                    </div>
                  </div>

                  {/* Immediate 4-second Bot Response */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-start max-w-[90%]"
                  >
                    <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-xs border border-black/[0.04] text-[#111b21] space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>REPLY DISPATCHED IN 0.4s</span>
                      </div>
                      <p>
                        Got it! We specialize in that exact architecture. We can wire your self-scheduling calendar, SMS confirmations, and Google review collection in 14 days.
                      </p>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          onOpenIntake();
                        }}
                        className="w-full py-2 rounded-xl bg-[#008069] text-white font-semibold text-center hover:bg-[#00705a] transition-colors"
                      >
                        Claim My Business Blueprint
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            {/* Bottom Input Area */}
            <div className="p-3 bg-white border-t border-black/[0.06]">
              {chatStep === "greeting" ? (
                <form onSubmit={handleSendTestMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type a message to test..."
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-[#f0f2f5] rounded-full text-xs text-[#111b21] focus:outline-none focus:ring-1 focus:ring-[#008069]"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-full bg-[#008069] text-white flex items-center justify-center hover:bg-[#00705a] transition-colors cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#54656f]">Demonstration Complete</span>
                  <button
                    onClick={handleOpenWhatsAppDirect}
                    className="text-[#008069] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Open Live WhatsApp</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circular WhatsApp Button (Official Brand Styling) */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTeaser(false);
          setHasInteracted(true);
        }}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative"
        aria-label="Open WhatsApp live inquiry"
      >
        {/* Pulsing Active Beacon */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white text-[9px] font-bold text-white items-center justify-center">
            1
          </span>
        </span>

        {/* WhatsApp Vector Icon */}
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
        >
          <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.97.57 3.824 1.559 5.39L2 22l4.707-1.531c1.516.922 3.297 1.453 5.324 1.453 5.535 0 10.031-4.496 10.031-10.031C22.062 6.496 17.566 2 12.031 2zm0 18.25c-1.789 0-3.465-.512-4.902-1.398l-.352-.219-3.238 1.055 1.074-3.156-.234-.375c-.98-1.547-1.547-3.344-1.547-5.125 0-4.523 3.676-8.2 8.2-8.2s8.2 3.676 8.2 8.2-3.676 8.219-8.203 8.219zm4.512-6.141c-.246-.125-1.465-.723-1.691-.809-.23-.086-.395-.125-.563.125-.164.246-.641.809-.785.973-.145.164-.289.184-.535.063-.246-.125-1.043-.383-1.988-1.227-.734-.656-1.23-1.465-1.375-1.711-.145-.246-.016-.379.105-.504.113-.113.246-.289.371-.434.125-.145.164-.246.246-.41.082-.164.043-.309-.02-.434-.063-.125-.563-1.355-.773-1.855-.203-.488-.41-.422-.563-.43-.145-.008-.309-.008-.473-.008-.164 0-.43.063-.656.309-.227.246-.863.844-.863 2.059 0 1.215.887 2.391 1.008 2.555.125.164 1.746 2.668 4.23 3.742.59.254 1.05.406 1.41.523.594.188 1.133.16 1.563.098.477-.07 1.465-.602 1.672-1.18.207-.578.207-1.074.145-1.18-.063-.105-.227-.168-.473-.293z" />
        </svg>
      </button>
    </div>
  );
}
