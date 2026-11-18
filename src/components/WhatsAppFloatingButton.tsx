"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCheck,
  ArrowRight,
  Sparkles,
  Phone,
  RotateCcw,
  ExternalLink,
  Bot,
  Calendar,
  DollarSign,
  Zap,
  Globe2,
  ShieldCheck,
  ChevronRight,
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

const QUICK_PROMPTS = [
  { label: "💰 Packages & Pricing", query: "What are your pricing packages and costs?" },
  { label: "⚡ 4-Second WhatsApp Bot", query: "How does the 4-second WhatsApp lead capture work?" },
  { label: "📍 Local SEO & GEO", query: "Tell me about your Local SEO & GEO expansion system" },
  { label: "🇸🇦 كم الأسعار بالريال؟", query: "كم أسعار باقات نوفا وكيف طريقة الدفع؟" },
  { label: "📅 Book Free Strategy Call", query: "I want to book a free discovery blueprint call" },
];

// Comprehensive Knowledge Base Engine
function generateBotResponse(userText: string): {
  reply: string;
  badge?: string;
  action?: { type: "intake" | "whatsapp" | "link"; label: string; url?: string };
} {
  const q = userText.toLowerCase().trim();

  // Arabic detection
  const isArabic = /[\u0600-\u06FF]/.test(userText);

  // 1. GREETINGS
  if (
    q.match(/^(hi|hello|hey|salam|marhaba|hola|greetings|good morning|good evening)/i) ||
    q.includes("مرحبا") ||
    q.includes("السلام عليكم") ||
    q.includes("أهلا") ||
    q.includes("هلا") ||
    q.includes("صباح الخير") ||
    q.includes("مساء الخير")
  ) {
    if (isArabic) {
      return {
        reply:
          "أهلاً وسهلاً بك في NOVA Scale Systems! 👋\nنحن نبني أنظمة مواقع فائقة السرعة مع ربط ذكي للواتساب والـ CRM لضمان الرد على عملائك في أقل من 4 ثوانٍ.\n\nكيف نقدر نخدمك اليوم؟ يمكنك السؤال عن الأسعار، طريقة الربط، أو سيو الخرائط.",
        badge: "رد فوري • 0.3s",
      };
    }
    return {
      reply:
        "Hello and welcome to NOVA Scale Systems! 👋\nWe engineer ultra-fast conversion websites with automated 4-second WhatsApp lead capture and CRM pipeline sync.\n\nHow can we help scale your business today? Feel free to ask about our pricing, CRM integrations, or Local SEO.",
      badge: "INSTANT BOT • 0.3s",
    };
  }

  // 2. PRICING & PACKAGES
  if (
    q.includes("price") ||
    q.includes("pricing") ||
    q.includes("cost") ||
    q.includes("package") ||
    q.includes("rate") ||
    q.includes("fee") ||
    q.includes("quote") ||
    q.includes("how much") ||
    q.includes("سعر") ||
    q.includes("أسعار") ||
    q.includes("اسعار") ||
    q.includes("بكم") ||
    q.includes("تكلفة") ||
    q.includes("باقات") ||
    q.includes("باقة")
  ) {
    if (isArabic) {
      return {
        reply:
          "باقات نوفا مصممة لتحقيق عائد استثماري فوري:\n\n" +
          "1️⃣ **الباقة الأساسية (Rapid Launch)**: $1,490 (~5,580 ر.س)\n• صفحة هبوط فائقة التحويل مع ربط الرد الآلي للواتساب خلال 7 أيام.\n\n" +
          "2️⃣ **محرك النمو (Growth Engine)**: $2,890 (~10,830 ر.س)\n• نظام كامل متكامل، ربط الـ CRM (HubSpot/Google Sheets)، جدولة المواعيد التلقائية، وجمع التقييمات.\n\n" +
          "3️⃣ **باقة التوسع المخصصة (Custom Scale)**: $4,500+ (~16,800 ر.س)\n• نظام متعدد الفروع مع استهداف جغرافي GEO محلي وأتمتة ذكاء اصطناعي مخصصة.\n\nهل ترغب في مراجعة الخطة الأنسب لمشروعك؟",
        badge: "شفافية الأسعار",
        action: {
          type: "intake",
          label: "طلب تحليل مشروعي مجاناً 📋",
        },
      };
    }
    return {
      reply:
        "Here is our clear, performance-driven investment structure:\n\n" +
        "1️⃣ **Rapid Launch ($1,490)**: High-converting landing infrastructure + 4s WhatsApp capture wired in 7 days.\n\n" +
        "2️⃣ **Growth Engine ($2,890)**: Full multi-page ecosystem + HubSpot/Sheets CRM sync + auto-calendar booking + review booster.\n\n" +
        "3️⃣ **Custom Scale ($4,500+)**: Enterprise multi-location GEO expansion, custom AI workflows, and dedicated scale engineer.\n\nWould you like a personalized architecture blueprint for your business?",
      badge: "VERIFIED PRICING",
      action: {
        type: "intake",
        label: "Get Free Blueprint & Quote 🚀",
      },
    };
  }

  // 3. WHATSAPP & 4-SECOND SPEED / AUTOMATION
  if (
    q.includes("whatsapp") ||
    q.includes("4 second") ||
    q.includes("4s") ||
    q.includes("speed") ||
    q.includes("bot") ||
    q.includes("auto") ||
    q.includes("responder") ||
    q.includes("واتساب") ||
    q.includes("الرد الالي") ||
    q.includes("الرد الآلي") ||
    q.includes("بوت") ||
    q.includes("4 ثواني") ||
    q.includes("سرعة") ||
    q.includes("أتمتة") ||
    q.includes("اتمتة")
  ) {
    if (isArabic) {
      return {
        reply:
          "⚡ **نظام الـ 4 ثواني الذكي من نوفا:**\n\n" +
          "الإحصائيات تثبت أن 78% من العملاء يشترون من أول من يرد عليهم!\n" +
          "عندما يضغط العميل على زر الواتساب أو يعبئ نموذج الاتصال:\n" +
          "• يستقبل رداً شخصياً فورياً خلال 4 ثوانٍ فقط عبر WhatsApp Business API.\n" +
          "• يقوم النظام بفرز العميل المؤهل (Qualifying) وجدولة موعد معه تلقائياً.\n" +
          "• يتم إرسال تنبيه مباشر إلى هاتفك مع ملخص بيانات العميل في الـ CRM.",
        badge: "أتمتة فورية • 4s SLA",
        action: {
          type: "whatsapp",
          label: "تجربة رسالة حية على الواتساب 💬",
        },
      };
    }
    return {
      reply:
        "⚡ **NOVA's 4-Second Speed-to-Lead Guarantee:**\n\n" +
        "78% of enterprise clients convert with the first provider to respond. When an inbound inquiry hits your site:\n" +
        "• Our cloud worker triggers an official WhatsApp Cloud API flow in < 4 seconds.\n" +
        "• It qualifies the lead, gathers project scope, and serves your booking link.\n" +
        "• Syncs all conversation data directly to your CRM with zero manual data entry.",
      badge: "SUB-4s RESPONSE",
      action: {
        type: "whatsapp",
        label: "Test Live on WhatsApp 💬",
      },
    };
  }

  // 4. SEO & GEO TARGETING
  if (
    q.includes("seo") ||
    q.includes("geo") ||
    q.includes("google") ||
    q.includes("map") ||
    q.includes("local") ||
    q.includes("ranking") ||
    q.includes("سيو") ||
    q.includes("خرائط") ||
    q.includes("قوقل") ||
    q.includes("استهداف") ||
    q.includes("جغرافي") ||
    q.includes("ترتيب")
  ) {
    if (isArabic) {
      return {
        reply:
          "📍 **محرك التوسع الجغرافي Local GEO & Maps:**\n\n" +
          "نحن نضمن ظهور نشاطك في المراكز الثلاثة الأولى (Map Pack 3-Pack) على خرائط قوقل والبحث المحلي:\n" +
          "• صفحات هبوط فائقة السرعة مخصصة لكل حي ومدينة (مثل: العليا، الملقا، KAFD في الرياض، أو دبي وأبوظبي).\n" +
          "• هيكلة Schema Markup محلية معززة لرفع نقاط جودة الإعلانات وخفض تكلفة النقرة بنسبة تصل إلى 40%.\n" +
          "• نظام تقييمات تلقائي يرسل طلب التقييم للعميل فور إتمام الخدمة.",
        badge: "سيطرة على الخرائط 📍",
        action: {
          type: "intake",
          label: "فحص ترتيب موقعك الحالي مجاناً",
        },
      };
    }
    return {
      reply:
        "📍 **NOVA Local GEO & Google Map Pack Engine:**\n\n" +
        "We capture high-intent local buyers actively searching for your high-ticket services:\n" +
        "• Hyper-targeted dynamic landing pages for specific districts and metro areas.\n" +
        "• Comprehensive LocalBusiness Schema Markup for Google 3-Pack ranking dominance.\n" +
        "• Automated post-service Google Review booster to build unstoppable social proof.",
      badge: "TOP 3 MAP PACK",
      action: {
        type: "intake",
        label: "Request Free Local SEO Audit",
      },
    };
  }

  // 5. CRM & INTEGRATIONS
  if (
    q.includes("crm") ||
    q.includes("hubspot") ||
    q.includes("salesforce") ||
    q.includes("zoho") ||
    q.includes("sheets") ||
    q.includes("zapier") ||
    q.includes("make") ||
    q.includes("ربط") ||
    q.includes("تكامل") ||
    q.includes("نظام") ||
    q.includes("قاعدة بيانات")
  ) {
    if (isArabic) {
      return {
        reply:
          "🔗 **الربط مع أنظمة إدارة العملاء (CRM):**\n\n" +
          "نربط موقعك والواتساب مباشرة مع نظامك المفضل:\n" +
          "• HubSpot, Salesforce, Zoho CRM, Google Sheets, Notion.\n" +
          "• ربط تقويم المواعيد: Google Calendar, Calendly, Cal.com.\n" +
          "• إشعارات فورية عبر تيليجرام أو سلاك لفريق مبيعاتك لحظة تسجيل أي عميل مهتم.",
        badge: "مزامنة كاملة 100%",
      };
    }
    return {
      reply:
        "🔗 **Seamless Enterprise CRM Integrations:**\n\n" +
        "We bi-directionally wire your website and WhatsApp flows into your core stack:\n" +
        "• HubSpot, Salesforce, Zoho, Google Sheets, Airtable.\n" +
        "• Self-scheduling calendars: Google Calendar, Calendly, Cal.com.\n" +
        "• Instant sales team alerts via Slack or Telegram with full lead history.",
      badge: "100% CRM SYNC",
    };
  }

  // 6. TIMELINE & IMPLEMENTATION
  if (
    q.includes("how long") ||
    q.includes("timeline") ||
    q.includes("delivery") ||
    q.includes("days") ||
    q.includes("time") ||
    q.includes("كم يستغرق") ||
    q.includes("وقت") ||
    q.includes("مدة") ||
    q.includes("متى يجهز") ||
    q.includes("كم يوم")
  ) {
    if (isArabic) {
      return {
        reply:
          "⏱️ **مدة التنفيذ والتسليم:**\n\n" +
          "• **صفحات الهبوط ونظام الرد الآلي**: جاهزة للإطلاق الحي خلال **7 أيام عمل**.\n" +
          "• **الأنظمة الكاملة والتوسعات الجغرافية**: من **14 إلى 21 يوم عمل** مع اختبار الجودة والربط الشامل.\n\n" +
          "نعمل وفق خطة واضحة ومحددة بدون تأخير أو هدر لوقتك.",
        badge: "تسليم في 7-14 يوم",
      };
    }
    return {
      reply:
        "⏱️ **Turnaround & Delivery Timeline:**\n\n" +
        "• **Rapid Launch Systems**: Live and taking client leads in **7 business days**.\n" +
        "• **Full Scale Multi-Location Engines**: **14–21 business days** with rigorous QA, CRM load testing, and tracking verification.",
      badge: "7–14 DAY SLA",
    };
  }

  // 7. BOOKING & INTAKE / CALL
  if (
    q.includes("book") ||
    q.includes("call") ||
    q.includes("meeting") ||
    q.includes("consult") ||
    q.includes("talk") ||
    q.includes("human") ||
    q.includes("agent") ||
    q.includes("حجز") ||
    q.includes("مكالمة") ||
    q.includes("استشارة") ||
    q.includes("موعد") ||
    q.includes("شخص") ||
    q.includes("تواصل")
  ) {
    if (isArabic) {
      return {
        reply:
          "يسعدنا جداً التحدث معك مباشرة! 🤝\nيمكنك فتح استمارة المشروع السريعة هنا لاختيار موعد مناسب لك، أو التواصل مباشرة مع فريق العمل على الواتساب.",
        badge: "حجز مباشر",
        action: {
          type: "intake",
          label: "فتح تقويم حجز الاستشارة المجانية 📅",
        },
      };
    }
    return {
      reply:
        "We'd love to discuss your growth goals directly! 🤝\nYou can open our quick blueprint form to reserve a slot on our executive calendar, or escalate straight to our team on WhatsApp.",
      badge: "STRATEGY CALL",
      action: {
        type: "intake",
        label: "Open Strategy Booking Calendar 📅",
      },
    };
  }

  // 8. DEFAULT INTELLIGENT FALLBACK
  if (isArabic) {
    return {
      reply:
        "شكراً لسؤالك! بخصوص ما ذكرت، في NOVA Scale Systems نحن نصمم حلولاً مخصصة لكل نشاط تجاري لضمان تحويل الزوار إلى عملاء فعليين وزيادة المبيعات.\n\nهل تود استعراض تفاصيل باقاتنا، أم تفضل حجز جلسة استشارية مجانية لمدة 15 دقيقة مع مهندس الأنظمة لدراسة مشروعك؟",
      badge: "دعم مخصص",
      action: {
        type: "intake",
        label: "حجز جلسة استشارية مجانية 🚀",
      },
    };
  }

  return {
    reply:
      "That is a great question. At NOVA Scale Systems, our engineering is specifically tailored to turn website traffic into paid bookings and recurring contracts through automated workflows.\n\nWould you like to explore our transparent packages, or would you prefer a quick 15-minute blueprint call with our solutions engineer?",
    badge: "CUSTOM SCALE",
    action: {
      type: "intake",
      label: "Claim Business Growth Blueprint 🚀",
    },
  };
}

export default function WhatsAppFloatingButton({ onOpenIntake }: { onOpenIntake: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome-1",
      sender: "bot",
      text: "👋 Welcome to **NOVA Scale Systems**! I am your AI scale assistant.\n\nOur system captures inbound leads and replies via WhatsApp within **4 seconds** so you never lose high-value clients.\n\nHow can I help you today?",
      time: "9:41 AM",
      badge: "INSTANT BOT",
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
      // focus input when opened
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isTyping]);

  // Teaser preview bubble after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowTeaser(true);
      }
    }, 2800);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputMsg).trim();
    if (!query || isTyping) return;

    const userTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessageId = "user-" + Date.now();

    // 1. Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        sender: "user",
        text: query,
        time: userTime,
      },
    ]);

    setInputMsg("");
    setIsTyping(true);

    // 2. Realistic bot response delay (between 700ms and 1200ms)
    const simulatedDelay = Math.floor(Math.random() * 500) + 750;

    setTimeout(() => {
      const response = generateBotResponse(query);
      const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setMessages((prev) => [
        ...prev,
        {
          id: "bot-" + Date.now(),
          sender: "bot",
          text: response.reply,
          time: botTime,
          badge: response.badge,
          action: response.action,
        },
      ]);
      setIsTyping(false);
    }, simulatedDelay);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "msg-welcome-reset",
        sender: "bot",
        text: "👋 Chat restarted! Feel free to ask about our packages, 4-second WhatsApp SLA, Local SEO, or book a strategy session.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        badge: "FRESH CHAT",
      },
    ]);
  };

  const handleOpenWhatsAppDirect = () => {
    const prefilled = encodeURIComponent(
      "Hi NOVA Scale Systems, I just chatted with your website bot and want to discuss scaling our client acquisition infrastructure."
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
              👋 <strong>Never lose a client.</strong> Test our intelligent 4-second WhatsApp lead responder right now!
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Ask pricing, speed, or SEO</span>
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
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[410px] bg-[#efeae2] rounded-3xl shadow-2xl border border-black/[0.12] overflow-hidden flex flex-col h-[560px] max-h-[82vh]"
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
                      <span className="text-white italic animate-pulse">typing...</span>
                    ) : (
                      <>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                        <span>Online • 4s Response Engine</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Restart Conversation"
                  className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Restart chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleOpenWhatsAppDirect}
                  title="Open in WhatsApp Web"
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
                Ask:
              </span>
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt.query)}
                  disabled={isTyping}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-[#111b21] hover:text-[#008069] border border-black/[0.08] hover:border-emerald-200 transition-all font-medium active:scale-95 shadow-2xs"
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            {/* Chat Body simulating WhatsApp Conversation */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3.5 text-xs bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:16px_16px]">
              {/* WhatsApp Security Notice */}
              <div className="flex justify-center my-1">
                <div className="bg-[#ffeecd] text-[#54656f] text-[10px] px-3 py-1 rounded-lg shadow-2xs text-center max-w-[85%] border border-[#fae2ab]">
                  🔒 Messages are automated with <strong>NOVA WhatsApp Cloud AI</strong>. Inquiries sync to CRM in real-time.
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
                        // Render bold headers cleanly
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
                    <span className="text-[10px] text-[#667781] ml-1">typing response...</span>
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
                  placeholder="Ask anything (pricing, 4s WhatsApp bot, SEO)..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 bg-[#f0f2f5] rounded-full text-xs text-[#111b21] placeholder:text-[#8696a0] focus:outline-none focus:ring-2 focus:ring-[#008069]/40 border border-transparent focus:bg-white transition-all"
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
                  Instant AI Answering
                </span>
                <button
                  onClick={handleOpenWhatsAppDirect}
                  className="hover:text-[#008069] hover:underline flex items-center gap-0.5 font-medium cursor-pointer"
                >
                  <span>Chat on WhatsApp</span>
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
        {/* Pulsing Active Beacon Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white text-[9px] font-bold text-white items-center justify-center">
              1
            </span>
          </span>
        )}

        {/* WhatsApp Official Vector Icon */}
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
