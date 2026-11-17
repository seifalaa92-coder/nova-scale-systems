"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCheck, MessageSquare, Calendar, Star, Sparkles } from "lucide-react";

interface Toast {
  id: number;
  icon: any;
  iconColor: string;
  badge: string;
  text: string;
  time: string;
}

const TOASTS: Toast[] = [
  {
    id: 1,
    icon: MessageSquare,
    iconColor: "text-emerald-600",
    badge: "WhatsApp Ping",
    text: "London commercial client booked strategy call in 4s (Qualified Lead)",
    time: "Just now",
  },
  {
    id: 2,
    icon: Calendar,
    iconColor: "text-blue-600",
    badge: "Calendar Synced",
    text: "New York clinic: Patient self-booked cosmetic treatment ($3,200)",
    time: "2m ago",
  },
  {
    id: 3,
    icon: Star,
    iconColor: "text-amber-500",
    badge: "5-Star Google Review",
    text: "Automated review collected: 'Best onboarding experience ever'",
    time: "6m ago",
  },
  {
    id: 4,
    icon: Sparkles,
    iconColor: "text-purple-600",
    badge: "Lead Secured",
    text: "Commercial contractor quote sent via WhatsApp in 6 seconds",
    time: "9m ago",
  },
];

export default function LiveNotificationToasts() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % TOASTS.length);
        setVisible(true);
      }, 700);
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  const toast = TOASTS[currentIdx];
  const IconComponent = toast.icon;

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block select-none pointer-events-none">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 p-3 pl-3.5 pr-4 rounded-full bg-white/95 backdrop-blur-md border border-black/[0.08] shadow-lg text-xs"
          >
            <div className="w-7 h-7 rounded-full bg-[#f4f4f7] flex items-center justify-center shrink-0">
              <IconComponent className={`w-3.5 h-3.5 ${toast.iconColor}`} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {toast.badge}
              </span>
              <span className="text-[#0e0e11] font-medium leading-none max-w-xs truncate">
                {toast.text}
              </span>
              <span className="text-[10px] font-mono text-[#86868b] shrink-0 ml-1">
                {toast.time}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
