import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Comprehensive System Instructions for NOVA Scale Systems AI Concierge
const NOVA_SYSTEM_PROMPT = `
You are the senior conversational AI concierge for NOVA Scale Systems (founded in Riyadh & serving GCC & global enterprise clients).
You are chatting with a business owner or marketing executive via WhatsApp.

YOUR PERSONALITY & TONE:
- You speak naturally, warmly, and with high authority—like an elite technical sales engineer and growth consultant.
- NEVER sound like a canned brochure or generic FAQ robot. Never dump giant bullet lists unless specifically asked for a breakdown.
- Chat like a real human on WhatsApp: concise (2-4 punchy sentences per message), authentic, helpful, and perceptive.
- If the user writes in Arabic, respond in natural, polite Saudi/Khaleeji business Arabic (e.g. "أهلاً وسهلاً بك يا غالي", "بالضبط، فكرة النظام...", "وش نوع نشاطك الحالي؟").
- If the user writes in English, reply in crisp, confident, modern tech-founder English.
- Always ask a relevant conversational follow-up to keep the discussion moving towards solving their real problem (e.g. asking about their lead volume, current response time, ad channels, or industry).

ABOUT NOVA SCALE SYSTEMS:
1. Core Philosophy: "Speed to Lead". If an inbound prospect isn't answered within 5 minutes, 78% buy from a competitor. NOVA guarantees an intelligent WhatsApp response in under 4 seconds.
2. Architecture:
   - High-conversion Next.js 15 / React 19 web infrastructure (sub-1-second loads, 99+ PageSpeed score).
   - Automated WhatsApp Cloud API workflow that captures lead intent, answers technical questions, qualifies budget, and auto-schedules meetings on Google Calendar / Calendly.
   - 100% 2-way sync to CRM (HubSpot, Salesforce, Zoho, Google Sheets, Make, Zapier).
   - Local SEO & Google Maps (GEO) 3-Pack ranking dominance for targeted neighborhoods (e.g. Olaya, Malqa, KAFD in Riyadh, or Dubai Marina/Business Bay).
3. Packages & Pricing:
   - Rapid Launch: $1,490 (~5,580 SAR) — 7 business days delivery.
   - Growth Engine: $2,890 (~10,830 SAR) — Full multi-page + CRM sync + auto-booking calendar + automated Google reviews.
   - Custom Scale: $4,500+ (~16,800 SAR) — Multi-location GEO expansion, custom AI workflows, dedicated engineer.
4. Specific Industry Scenarios:
   - Clinics / Dental: Stops receptionists from missing patient calls from Snap/TikTok ads; instantly books consultations into clinic software.
   - Real Estate: Immediately qualifies buyer budget and preferred district, then alerts the top broker with full lead dossier.
   - Contracting / Interior Design: Collects floor plans or project scope over WhatsApp, schedules site visit.
   - Law / Consulting: Screens high-ticket retainers, handles scheduling without back-and-forth emails.

GOAL: Build genuine trust, answer their specific question with concrete insight, and invite them to claim a free 15-minute business blueprint call or connect on live WhatsApp.
`;

// Advanced Offline/Fallback Semantic Reasoning Engine
function runAdvancedSemanticEngine(
  messages: Array<{ sender: "user" | "bot"; text: string }>,
  latestUserText: string
): { reply: string; badge: string; chips: string[]; action?: { type: "intake" | "whatsapp"; label: string } } {
  const text = latestUserText.toLowerCase().trim();
  const isArabic = /[\u0600-\u06FF]/.test(latestUserText);

  // Check conversational history context
  const fullConversation = messages.map((m) => m.text).join(" ").toLowerCase();
  const mentionedRealEstate = fullConversation.includes("عقار") || fullConversation.includes("real estate") || fullConversation.includes("فلل") || fullConversation.includes("شقق");
  const mentionedClinic = fullConversation.includes("عياد") || fullConversation.includes("dental") || fullConversation.includes("clinic") || fullConversation.includes("طبي") || fullConversation.includes("دكتور");
  const mentionedPricing = fullConversation.includes("سعر") || fullConversation.includes("price") || fullConversation.includes("cost") || fullConversation.includes("بكم");

  // 1. SPECIFIC INDUSTRY: DENTAL / MEDICAL CLINICS
  if (
    text.includes("عياد") ||
    text.includes("طبيب") ||
    text.includes("دكتور") ||
    text.includes("اسنان") ||
    text.includes("أسنان") ||
    text.includes("clinic") ||
    text.includes("dental") ||
    text.includes("doctor") ||
    text.includes("patient")
  ) {
    if (isArabic) {
      return {
        reply:
          "أهلاً بك! في العيادات والمراكز الطبية المشكلة الكبرى هي هدر إعلانات سناب وتيك توك بسبب تأخر موظف الاستقبال في الرد على الواتساب.\n\nنظام نوفا يرد على المريض في 4 ثواني، يحدد الخدمة المطلوبة (مثلاً: زراعة، تقويم، تنظيف)، ويحجز له موعد مبدئي في جدول الأطباء فوراً!\n\nكم مريض أو استفسار يوصلكم في اليوم تقريباً؟",
        badge: "نظام مخصص للعيادات 🏥",
        chips: ["كيف يربط مع سيستم المواعيد؟", "كم تكلفة الباقة للعيادات؟", "احجز مكالمة استشارية"],
        action: { type: "intake", label: "احصل على مخطط أتمتة العيادات 📋" },
      };
    }
    return {
      reply:
        "For medical and dental clinics, speed-to-lead is everything. When patients click your TikTok, Snap, or Google ads, they won't wait 30 minutes for a receptionist to reply—they just click the next clinic.\n\nNOVA engages them in 4 seconds, qualifies their requested procedure, and slots them directly into your calendar.\n\nHow many patient inquiries are you typically getting per week right now?",
      badge: "CLINIC WORKFLOW 🏥",
      chips: ["How does calendar sync work?", "What's the clinic pricing?", "Book Blueprint Call"],
      action: { type: "intake", label: "Get Clinic Automation Blueprint 📋" },
    };
  }

  // 2. SPECIFIC INDUSTRY: REAL ESTATE / BROKERAGE
  if (
    text.includes("عقار") ||
    text.includes("وساطة") ||
    text.includes("فلل") ||
    text.includes("شقق") ||
    text.includes("مطور") ||
    text.includes("real estate") ||
    text.includes("property") ||
    text.includes("villa") ||
    text.includes("broker")
  ) {
    if (isArabic) {
      return {
        reply:
          "المجال العقاري هو أكثر مجال يحقق أعلى عائد من نظامنا! 🏡\n\nبدل ما يضيع الليد بين أرقام المسوقين، أول ما العميل يسأل عن مشروع معين، البوت يسأله عن الميزانية والحي المفضل (مثلاً: حطين، النرجس، الياسمين)، ويفتح له موعد معاينة في تقويم الوسيط مباشرة مع تنبيه فوري لفريق المبيعات.\n\nهل تركزون على البيع والتطوير ولا الوساطة وإدارة الأملاك؟",
        badge: "محرك الصفقات العقارية 🏢",
        chips: ["نركز على البيع والتطوير", "وساطة وتسويق عقاري", "كم سعر باقة العقارات؟"],
        action: { type: "intake", label: "طلب استشارة عقارية مخصصة 🚀" },
      };
    }
    return {
      reply:
        "Real estate is where our 4-second speed delivers the highest ROI. When a buyer reaches out about a luxury listing, they are simultaneously messaging 3 other brokers.\n\nNOVA engages them instantly, collects their buying budget and target district, and locks in a private showing slot directly on your agent's phone.\n\nAre you primarily handling residential sales, off-plan projects, or commercial brokerage?",
      badge: "REAL ESTATE ENGINE 🏢",
      chips: ["Residential & Luxury", "Off-plan Development", "See Live Demo"],
      action: { type: "intake", label: "Claim Real Estate Scale Plan 🚀" },
    };
  }

  // 3. COMPARISON / "WHY ARE YOU DIFFERENT?" / OBJECTIONS
  if (
    text.includes("fiverr") ||
    text.includes("haraj") ||
    text.includes("agency") ||
    text.includes("different") ||
    text.includes("why you") ||
    text.includes("ليش") ||
    text.includes("فرق") ||
    text.includes("حراج") ||
    text.includes("مستقل") ||
    text.includes("وكالة") ||
    text.includes("أفضل")
  ) {
    if (isArabic) {
      return {
        reply:
          "سؤال ذكي جداً ومهم! 💡\n\nأغلب اللي في السوق يسوون لك موقع 'شكلي' على ووردبريس ببطء 5 ثواني وبدون أي ربط، وتدفع آلاف على الإعلانات والعملاء يهربون.\n\nنوفا تبني لك **بنية تحتية لتحصيل الإيرادات**:\n1. سرعة تحميل صاروخية (أقل من ثانية على الجوال).\n2. رد واتساب خلال 4 ثواني يحول المهتم إلى موعد مدفوع.\n3. ربط مباشر بقاعدة بياناتك وخرائط قوقل.\n\nالهدف هو أن النظام يرجع تكلفته من أول صفقتين أو ثلاث.",
        badge: "الفارق الجوهري 🎯",
        chips: ["أبي أشوف أرقام العائد المتوقع", "كم تاخذ مدة التنفيذ؟", "احجز موعد استشارة"],
      };
    }
    return {
      reply:
        "The fundamental difference is: freelance templates give you a slow digital brochure; NOVA builds an **automated revenue pipeline**.\n\nMost sites lose 60%+ of ad traffic because they load in 4+ seconds and take 45 minutes to reply on WhatsApp. We engineer sub-second page loads and a sub-4-second automated lead qualification engine that feeds your CRM and calendar.\n\nThe system is engineered to pay for itself within the first 2-3 closed deals.",
      badge: "THE NOVA MOAT 🎯",
      chips: ["Calculate My Potential ROI", "Turnaround Timeline", "Book Strategy Call"],
    };
  }

  // 4. PRICING & ROI INQUIRY
  if (
    text.includes("سعر") ||
    text.includes("أسعار") ||
    text.includes("اسعار") ||
    text.includes("بكم") ||
    text.includes("تكلفة") ||
    text.includes("ريال") ||
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("pricing") ||
    text.includes("how much")
  ) {
    if (isArabic) {
      return {
        reply:
          "أسعارنا واضحة وبدون أي رسوم خفية:\n\n" +
          "• **باقة الإطلاق السريع**: 5,580 ر.س ($1,490) — صفحة هبوط فائقة السرعة مع ربط بوت الرد الآلي للواتساب، جاهزة في 7 أيام.\n" +
          "• **محرك النمو المتكامل (الأكثر طلباً)**: 10,830 ر.س ($2,890) — نظام شامل متعدد الصفحات مع ربط الـ CRM وحجز المواعيد الآلي ومضاعف تقييمات قوقل.\n" +
          "• **التوسع المخصص**: تبدأ من 16,800 ر.س ($4,500+) للأنظمة الكبيرة والتوسع الجغرافي.\n\nوش الباقة اللي تحسها أقرب لحجم شغلك الحالي؟",
        badge: "استثمار ذو عائد مباشر 💰",
        chips: ["محرك النمو المتكامل (10,830 ر.س)", "الإطلاق السريع (5,580 ر.س)", "تحدث مع مهندس الأنظمة"],
        action: { type: "intake", label: "اختيار الباقة وبدء التحليل 🚀" },
      };
    }
    return {
      reply:
        "Our pricing is transparent and built for fast ROI:\n\n" +
        "• **Rapid Launch ($1,490 / ~5,580 SAR)**: High-converting landing architecture + 4s WhatsApp responder live in 7 days.\n" +
        "• **Growth Engine ($2,890 / ~10,830 SAR)**: Complete multi-page infrastructure + full CRM sync + auto-calendar booking + Google review booster.\n" +
        "• **Custom Scale ($4,500+ / ~16,800 SAR)**: Multi-location enterprise GEO targeting & custom workflows.\n\nWhich stage best aligns with your current monthly lead flow?",
      badge: "CLEAR PRICING 💰",
      chips: ["Growth Engine ($2,890)", "Rapid Launch ($1,490)", "Enterprise Custom"],
      action: { type: "intake", label: "Get Exact System Blueprint 🚀" },
    };
  }

  // 5. CRM & SYSTEM INTEGRATION
  if (
    text.includes("crm") ||
    text.includes("ربط") ||
    text.includes("تكامل") ||
    text.includes("hubspot") ||
    text.includes("sheets") ||
    text.includes("سلة") ||
    text.includes("زد") ||
    text.includes("zoho")
  ) {
    if (isArabic) {
      return {
        reply:
          "نعم، نربط كل شيء بشكل تلقائي وموثوق! ⚡\n\nنربط موقعك والواتساب مع أي نظام تستخدمه:\n• HubSpot, Salesforce, Zoho, Google Sheets, Airtable.\n• منصات المتاجر: زد وسلة وشوبيفاي.\n• مواعيد Google Calendar و Calendly.\n\nبمجرد أن يرسل العميل رسالة، تنزل بياناته ورقم جواله والخدمة المهتم فيها مباشرة في نظامك بدون أي تدخل يدوي.\n\nوش النظام أو البرنامج اللي فريقك شغال عليه حالياً؟",
        badge: "ربط متكامل 100% 🔗",
        chips: ["Google Sheets / إكسل", "HubSpot / Zoho", "نظام مواعيد مخصص"],
      };
    }
    return {
      reply:
        "Yes, we handle deep two-way integration. ⚡\n\nWe connect your website and WhatsApp flows directly to your core tools:\n• CRM: HubSpot, Salesforce, Zoho, Google Sheets, Airtable.\n• Calendars: Google Calendar, Calendly, Cal.com.\n• Notifications: Instant Slack or Telegram pings to your closers.\n\nEvery inbound lead arrives fully tagged with source, project budget, and timestamp. What stack is your team currently running on?",
      badge: "100% CRM SYNC 🔗",
      chips: ["Google Sheets / Notion", "HubSpot / Salesforce", "Custom In-House Stack"],
    };
  }

  // 6. DEFAULT NATURAL HUMAN RESPONSE
  if (isArabic) {
    return {
      reply:
        `أهلاً بك! بخصوص استفسارك، نحن نخصص بنيتنا التحتية بالضبط حسب أهداف نمو نشاطك التجاري وطبيعة عملائك.\n\nهل ترغب في توضيح مجال عملك الحالي، أو تفضل التحدث مباشرة مع مهندس الأنظمة في مكالمة استشارية مجانية لمدة 15 دقيقة لمراجعة موقعك الحالي؟`,
      badge: "استجابة فورية 💬",
      chips: ["احجز مكالمة 15 دقيقة مجانية", "كم الأسعار المتاحة؟", "كلمنا على الواتساب"],
      action: { type: "intake", label: "حجز جلسة استشارية مجانية 📅" },
    };
  }

  return {
    reply:
      `Great point. Every NOVA architecture is tailored specifically to your acquisition funnel and closing process so you never lose high-intent prospects.\n\nWould you like to share what type of business you're scaling, or would you prefer a quick 15-minute discovery blueprint call with our solutions engineer?`,
    badge: "CONCIERGE ACTIVE 💬",
    chips: ["Book 15-min Blueprint", "See Transparent Pricing", "Chat on Live WhatsApp"],
    action: { type: "intake", label: "Book Free Strategy Blueprint 📅" },
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, userMessage } = body;

    const query = (userMessage || "").trim();
    if (!query) {
      return NextResponse.json({ error: "Missing user message" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    // 1. If Gemini API key is configured, use live LLM power!
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        const historyContents = (messages || []).map((m: { sender: string; text: string }) => ({
          role: m.sender === "user" ? ("user" as const) : ("model" as const),
          parts: [{ text: m.text }],
        }));

        historyContents.push({
          role: "user" as const,
          parts: [{ text: query }],
        });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction: NOVA_SYSTEM_PROMPT,
            temperature: 0.7,
            maxOutputTokens: 300,
          },
          contents: historyContents,
        });

        const generatedText = response.text || "";
        const isArabic = /[\u0600-\u06FF]/.test(generatedText);

        return NextResponse.json({
          reply: generatedText,
          badge: isArabic ? "ذكاء اصطناعي مباشر • 0.4s" : "LIVE GEMINI AI • 0.4s",
          chips: isArabic
            ? ["كم الأسعار؟", "كيف يربط مع الـ CRM؟", "احجز مكالمة استشارية"]
            : ["View Pricing", "How CRM sync works", "Book Strategy Call"],
          action: {
            type: "intake",
            label: isArabic ? "حجز موعد استشاري 📅" : "Claim Growth Blueprint 🚀",
          },
        });
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to advanced semantic engine:", geminiErr);
        // Fall back seamlessly to advanced engine below
      }
    }

    // 2. High-context conversational reasoning engine
    const result = runAdvancedSemanticEngine(messages || [], query);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      {
        reply:
          "Our system is operating at high demand! You can connect directly with our engineering team on WhatsApp or book a free discovery blueprint.",
        badge: "DIRECT CONNECT",
        chips: ["Chat on WhatsApp", "Book Blueprint Call"],
        action: { type: "whatsapp", label: "Open WhatsApp Live 💬" },
      },
      { status: 200 }
    );
  }
}
