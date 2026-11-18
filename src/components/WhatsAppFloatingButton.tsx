"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCheck,
  ArrowRight,
  Sparkles,
  RotateCcw,
  ExternalLink,
  Zap,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  badge?: string;
  action?: {
    type: "intake" | "whatsapp" | "link";
    label: string;
    url?: string;
  };
}

const INITIAL_CHIPS = [
  "🏥 كيف يساعد العيادات والمراكز الطبية؟",
  "🏢 كيف يشتغل للعقارات والوساطة؟",
  "💰 وش الفرق بينكم وبين المستقلين بحراج؟",
  "⚡ كم أسعار الباقات بالريال السعودي؟",
  "📅 حجز مكالمة استشارية مجانية 15 دقيقة",
];

export default function WhatsAppFloatingButton({ onOpenIntake }: { onOpenIntake: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [activeChips, setActiveChips] = useState<string[]>(INITIAL_CHIPS);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome-1",
      sender: "bot",
      text:
        "أهلاً وسهلاً بك في **NOVA Scale Systems**! 👋\n\nنحن نبني أنظمة مواقع فائقة السرعة مع ربط ذكي للواتساب والـ CRM لضمان الرد على عملائك خلال **4 ثوانٍ فقط** قبل أن يذهبوا للمنافسين.\n\nوش نوع نشاطك التجاري حالياً؟ (عقارات، عيادات، استشارات، أو مقاولات؟)",
      time: "9:41 AM",
      badge: "مساعد نوفا الذكي ⚡",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, messages, isTyping]);

  // Teaser preview bubble after 2.8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTeaser(true);
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMsg).trim();
    if (!query || isTyping) return;

    const userTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessageId = "user-" + Date.now();

    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMessageId,
        sender: "user",
        text: query,
        time: userTime,
      },
    ];

    setMessages(newMessages);
    setInputMsg("");
    setIsTyping(true);

    try {
      // Call our Next.js /api/chat route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.slice(-8).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
          userMessage: query,
        }),
      });

      if (!response.ok) {
        throw new Error("Chat network error");
      }

      const data = await response.json();
      const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "bot",
          text: data.reply,
          time: botTime,
          badge: data.badge || "استجابة فورية 0.4s",
          action: data.action,
        },
      ]);

      if (data.chips && Array.isArray(data.chips) && data.chips.length > 0) {
        setActiveChips(data.chips);
      }
    } catch (err) {
      console.error("Chat error:", err);
      // Fallback in case of network issue
      const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "bot",
          text:
            "يسعدنا جداً خدمتك! يمكنك التحدث مباشرة مع فريق العمل على الواتساب أو حجز جلسة استشارية مجانية لمدة 15 دقيقة لمراجعة موقعك.",
          time: botTime,
          badge: "تواصل مباشر",
          action: { type: "intake", label: "حجز موعد استشارة مجاني 📅" },
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "msg-welcome-reset",
        sender: "bot",
        text:
          "أهلاً بك مجدداً! تم تحديث المحادثة. 👋\nتفضل بالسؤال عن باقاتنا، ربط الواتساب مع الـ CRM، أو كيف نساعد نشاطك في مضاعفة المبيعات.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        badge: "محادثة جديدة ⚡",
      },
    ]);
    setActiveChips(INITIAL_CHIPS);
  };

  const handleOpenWhatsAppDirect = () => {
    const prefilled = encodeURIComponent(
      "مرحباً فريق نوفا (NOVA Scale Systems)، أرغب في استشارة حول تطوير البنية التحتية لموقعي وأتمتة الرد على العملاء عبر الواتساب."
    );
    window.open(`https://wa.me/?text=${prefilled}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none font-sans">
      {/* Teaser Preview Bubble */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-2 w-80 bg-white text-[#0e0e11] rounded-2xl p-4 shadow-2xl border border-black/[0.08] cursor-pointer"
            onClick={() => {
              setShowTeaser(false);
              setIsOpen(true);
              setHasInteracted(true);
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-black/[0.06] mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-[#0e0e11] tracking-wider">
                  NOVA LIVE WHATSAPP AI
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTeaser(false);
                }}
                className="text-[#86868b] hover:text-[#0e0e11] p-1"
                aria-label="Close message preview"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-[#515154] leading-relaxed">
              👋 <strong>لا تخسر أي عميل محتمل!</strong> جرّب نظام الرد الذكي في 4 ثوانٍ وتعرف كيف يضاعف مبيعاتك الآن.
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>جرّب التحدث مع البوت الذكي</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interactive WhatsApp Chat Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[410px] bg-[#efeae2] rounded-3xl shadow-2xl border border-black/[0.12] overflow-hidden flex flex-col h-[580px] max-h-[84vh]"
          >
            {/* WhatsApp Branded Header */}
            <div className="bg-[#008069] text-white px-4 py-3 flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center font-bold text-white text-base shadow-xs backdrop-blur-xs">
                    N
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#008069] rounded-full" />
                </div>
                <div>
                  <div className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                    <span>Nova Scale Bot</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-white/20 font-mono">
                      AI Verified
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-100 flex items-center gap-1.5 mt-0.5 font-medium">
                    {isTyping ? (
                      <span className="text-white italic animate-pulse">يكتب الآن...</span>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                        <span>متصل الآن • رد فوري 4 ثواني</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="إعادة بدء المحادثة"
                  className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Restart chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleOpenWhatsAppDirect}
                  title="فتح المحادثة على تطبيق واتساب"
                  className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Open official WhatsApp"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Prompt Carousel Chips */}
            <div className="bg-[#f0f2f5] border-b border-black/[0.06] px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
              <span className="text-[#667781] font-semibold text-[10px] uppercase shrink-0 mr-1">
                اقتراحات:
              </span>
              {activeChips.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(promptText)}
                  disabled={isTyping}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-[#111b21] hover:text-[#008069] border border-black/[0.08] hover:border-emerald-200 transition-all font-medium active:scale-95 shadow-2xs"
                >
                  {promptText}
                </button>
              ))}
            </div>

            {/* Chat Body simulating WhatsApp Conversation */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:16px_16px]">
              {/* WhatsApp Security Notice */}
              <div className="flex justify-center my-1">
                <div className="bg-[#ffeecd] text-[#54656f] text-[10px] px-3 py-1 rounded-lg shadow-2xs text-center max-w-[85%] border border-[#fae2ab]">
                  🔒 محادثة مؤتمتة عبر <strong>NOVA WhatsApp Cloud AI</strong>. يتم حفظ واسترجاع الاستفسارات في نظام الـ CRM مباشرة.
                </div>
              </div>

              {/* Render All Messages */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end ml-auto max-w-[85%]" : "items-start max-w-[92%]"
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl shadow-xs text-[#111b21] relative break-words leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#d9fdd3] rounded-tr-xs"
                        : "bg-white rounded-tl-xs border border-black/[0.05]"
                    }`}
                  >
                    {/* Bot Badge if present */}
                    {msg.sender === "bot" && msg.badge && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[9.5px] font-bold border border-emerald-200 mb-1.5">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{msg.badge}</span>
                      </div>
                    )}

                    {/* Formatted Text Content */}
                    <div className="whitespace-pre-wrap space-y-1.5">
                      {msg.text.split("\n\n").map((paragraph, pIdx) => {
                        const formatted = paragraph.split("**").map((chunk, cIdx) =>
                          cIdx % 2 === 1 ? (
                            <strong key={cIdx} className="font-semibold text-black">
                              {chunk}
                            </strong>
                          ) : (
                            chunk
                          )
                        );
                        return <p key={pIdx}>{formatted}</p>;
                      })}
                    </div>

                    {/* Contextual Action Button if included */}
                    {msg.action && (
                      <div className="mt-2.5 pt-2 border-t border-black/[0.06]">
                        {msg.action.type === "intake" ? (
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              onOpenIntake();
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-[#008069] hover:bg-[#00705a] text-white font-semibold text-center transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                          >
                            <span>{msg.action.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={handleOpenWhatsAppDirect}
                            className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-center transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                          >
                            <span>{msg.action.label}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}

                    {/* Timestamp & WhatsApp Status Checkmarks */}
                    <div className="text-[10px] text-right text-[#667781] flex items-center justify-end gap-1 mt-1 font-mono">
                      <span>{msg.time}</span>
                      <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Live Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 max-w-[80%]"
                >
                  <div className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-xs shadow-xs border border-black/[0.05] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#008069] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-[#008069] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[#008069] animate-bounce" />
                    <span className="text-[10px] text-[#667781] ml-1">يكتب الرد...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Input Form (Always Active & Multi-turn!) */}
            <div className="p-2.5 bg-white border-t border-black/[0.06] shadow-inner">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="اكتب سؤالك (مثلاً: كيف يفيد عيادتي؟ أو كم الأسعار؟)..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 bg-[#f0f2f5] rounded-full text-xs text-[#111b21] placeholder:text-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#008069]/40 border border-transparent focus:bg-white transition-all text-right"
                  dir="auto"
                />
                <button
                  type="submit"
                  disabled={!inputMsg.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-[#008069] disabled:opacity-40 text-white flex items-center justify-center hover:bg-[#00705a] transition-all cursor-pointer shrink-0 shadow-md active:scale-95"
                  aria-label="Send question to bot"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>

              {/* Bottom Quick Help Bar */}
              <div className="mt-2 flex items-center justify-between text-[10.5px] px-1 text-[#667781]">
                <span className="flex items-center gap-1 text-[#008069] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  ذكاء اصطناعي تفاعلي مباشر
                </span>
                <button
                  onClick={handleOpenWhatsAppDirect}
                  className="hover:text-[#008069] hover:underline flex items-center gap-0.5 font-medium cursor-pointer"
                >
                  <span>محادثة واتساب الرسمية</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circular WhatsApp Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTeaser(false);
          setHasInteracted(true);
        }}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative"
        aria-label="Open WhatsApp live inquiry"
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white text-[9px] font-bold text-white items-center justify-center">
              1
            </span>
          </span>
        )}

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
