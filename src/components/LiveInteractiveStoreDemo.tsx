"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Check,
  Shield,
  Zap,
  ArrowRight,
  Plus,
  Minus,
  RotateCcw,
  Sparkles,
  Eye,
  Lock,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  price: number;
  rating: number;
  reviews: number;
  colors: { name: string; hex: string; accent: string }[];
  specs: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "vision",
    name: "Nova Vision Studio",
    category: "Spatial Display System",
    tagline: "Ultra-high resolution spatial computing display with seamless eye and haptic tracking.",
    price: 2499,
    rating: 4.98,
    reviews: 1420,
    colors: [
      { name: "Space Black", hex: "#1e1e24", accent: "#38bdf8" },
      { name: "Natural Titanium", hex: "#94a3b8", accent: "#cbd5e1" },
      { name: "Midnight Indigo", hex: "#1e293b", accent: "#818cf8" },
    ],
    specs: ["Dual 4K Micro-OLED", "0.08ms latency", "MagSafe Fast Charge"],
  },
  {
    id: "chrono",
    name: "Aero Chronograph Pro",
    category: "High-Horology Wearable",
    tagline: "Grade 5 titanium chassis, sapphire crystal display, and multi-day telemetry battery.",
    price: 649,
    rating: 4.95,
    reviews: 2890,
    colors: [
      { name: "Titanium Slate", hex: "#334155", accent: "#94a3b8" },
      { name: "Brushed Silver", hex: "#e2e8f0", accent: "#64748b" },
      { name: "Solar Gold", hex: "#d97706", accent: "#fef3c7" },
    ],
    specs: ["Sub-100m Water Resist", "Always-On 3000nit Display", "Biometric Radar"],
  },
  {
    id: "pods",
    name: "Nova Acoustic Pods",
    category: "Acoustic Engineering",
    tagline: "Custom-tuned 40mm transducers delivering pristine studio acoustics everywhere.",
    price: 299,
    rating: 4.92,
    reviews: 4120,
    colors: [
      { name: "Glacier White", hex: "#f8fafc", accent: "#94a3b8" },
      { name: "Space Gray", hex: "#374151", accent: "#6b7280" },
      { name: "Carbon Noir", hex: "#18181b", accent: "#3f3f46" },
    ],
    specs: ["Lossless 24-bit/192kHz", "Adaptive Active Cancellation", "42-Hour Case"],
  },
];

export default function LiveInteractiveStoreDemo() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [includeWarranty, setIncludeWarranty] = useState(true);
  const [cartCount, setCartCount] = useState(1);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const product = PRODUCTS[selectedProductIndex];
  const activeColor = product.colors[selectedColorIndex];
  const warrantyPrice = 49;
  const unitPrice = product.price;
  const subtotal = unitPrice * cartCount + (includeWarranty ? warrantyPrice : 0);

  const handleSimulateCheckout = () => {
    setIsProcessingCheckout(true);
    setTimeout(() => {
      setIsProcessingCheckout(false);
      setOrderComplete(true);
    }, 1100);
  };

  const handleResetOrder = () => {
    setOrderComplete(false);
    setCartCount(1);
  };

  return (
    <section id="ecommerce" className="py-24 md:py-36 relative bg-[#fbfbfd] text-[#0e0e11] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-4 font-semibold">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
            <span>INTERACTIVE STORE DEMO</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.038em] text-[#0e0e11] mb-6">
            Experience what we build for modern online stores.
          </h2>
          <p className="text-[#515154] text-base md:text-lg leading-relaxed">
            Interact with our live ecommerce demo below. Test product switching, examine mobile-friendly layouts,
            test 1-click digital wallet checkout, and see practical options for increasing order value.
          </p>
        </div>

        {/* Interactive Store Demo Frame */}
        <div className="apple-card rounded-3xl p-6 sm:p-10 md:p-12 border border-black/[0.08] relative overflow-hidden shadow-xl bg-white">
          {/* Top Demo Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-black/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono text-[#515154]">
                SANDBOX DEMO: <span className="text-[#0e0e11] font-bold">ONLINE SALES & CHECKOUT FLOW</span>
              </span>
            </div>

            {/* Product Switcher Pills */}
            <div className="flex items-center gap-2 p-1.5 bg-[#f5f5f7] rounded-2xl border border-black/[0.06]">
              {PRODUCTS.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProductIndex(idx);
                    setSelectedColorIndex(0);
                    setOrderComplete(false);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedProductIndex === idx
                      ? "bg-[#0e0e11] text-white shadow-md font-bold scale-[1.02]"
                      : "text-[#515154] hover:text-[#0e0e11]"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Interactive Store Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Visual Product Display with Studio Lighting & Custom Layered SVGs */}
            <div className="lg:col-span-6 relative">
              <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] border border-black/[0.06] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                {/* Visual Ambient Rim Light */}
                <div
                  className="absolute inset-0 opacity-40 transition-colors duration-700 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${activeColor.accent}30 0%, transparent 70%)`,
                  }}
                />

                {/* Highly Crafted Visual Device Renders based on selection */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${product.id}-${selectedColorIndex}`}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full flex items-center justify-center"
                  >
                    {product.id === "vision" && (
                      <div className="relative w-64 h-48 sm:w-80 sm:h-56 flex items-center justify-center">
                        {/* Spatial Visor Headset SVG Illustration */}
                        <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-2xl">
                          <defs>
                            <linearGradient id="visorGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#1e293b" />
                              <stop offset="50%" stopColor={activeColor.hex} />
                              <stop offset="100%" stopColor="#0f172a" />
                            </linearGradient>
                            <linearGradient id="glare" x1="0%" y1="0%" x2="100%" y2="50%">
                              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.1" />
                              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                            </linearGradient>
                          </defs>

                          {/* Outer Aluminum Frame */}
                          <rect x="20" y="55" width="280" height="110" rx="55" fill={activeColor.hex} stroke="#ffffff" strokeWidth="2" opacity="0.9" />
                          {/* Inner Curved OLED Glass */}
                          <rect x="30" y="65" width="260" height="90" rx="45" fill="url(#visorGlass)" />
                          {/* Glass Reflection Glare */}
                          <path d="M45,70 Q160,110 275,70 L260,110 Q160,135 60,110 Z" fill="url(#glare)" />
                          {/* Dual Eye Sensor Lenses */}
                          <circle cx="110" cy="110" r="24" fill="#000000" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
                          <circle cx="210" cy="110" r="24" fill="#000000" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
                          {/* Micro Laser Emitters */}
                          <circle cx="110" cy="110" r="6" fill="#38bdf8" className="animate-pulse" />
                          <circle cx="210" cy="110" r="6" fill="#38bdf8" className="animate-pulse" />
                          {/* Audio Ribbed Band */}
                          <path d="M20,95 L0,95 Q0,125 20,125 Z" fill="#64748b" />
                          <path d="M300,95 L320,95 Q320,125 300,125 Z" fill="#64748b" />
                        </svg>
                      </div>
                    )}

                    {product.id === "chrono" && (
                      <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
                        {/* Luxury Ceramic Chronograph Watch SVG */}
                        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-2xl">
                          <defs>
                            <radialGradient id="watchDial" cx="50%" cy="50%" r="50%">
                              <stop offset="60%" stopColor="#0f172a" />
                              <stop offset="100%" stopColor={activeColor.hex} />
                            </radialGradient>
                          </defs>

                          {/* Watch Straps */}
                          <rect x="80" y="0" width="80" height="45" rx="6" fill="#1e293b" />
                          <rect x="80" y="195" width="80" height="45" rx="6" fill="#1e293b" />

                          {/* Outer Titanium Bezel */}
                          <circle cx="120" cy="120" r="88" fill={activeColor.hex} stroke="#ffffff" strokeWidth="3" />
                          <circle cx="120" cy="120" r="76" fill="url(#watchDial)" stroke="#475569" strokeWidth="1.5" />

                          {/* Tachymeter Markers */}
                          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                            <line
                              key={deg}
                              x1="120"
                              y1="48"
                              x2="120"
                              y2="54"
                              stroke="#94a3b8"
                              strokeWidth="2"
                              transform={`rotate(${deg} 120 120)`}
                            />
                          ))}

                          {/* Chrono Hands */}
                          <line x1="120" y1="120" x2="120" y2="70" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
                          <line x1="120" y1="120" x2="160" y2="120" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" />
                          <line x1="120" y1="130" x2="120" y2="60" stroke="#0071e3" strokeWidth="1.5" strokeLinecap="round" />
                          <circle cx="120" cy="120" r="5" fill="#0071e3" />
                        </svg>
                      </div>
                    )}

                    {product.id === "pods" && (
                      <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
                        {/* High Fidelity Acoustic Pods SVG */}
                        <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-2xl">
                          <defs>
                            <linearGradient id="caseShine" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                              <stop offset="100%" stopColor={activeColor.hex} />
                            </linearGradient>
                          </defs>

                          {/* Left Pod */}
                          <g transform="translate(45, 40) rotate(-12 60 70)">
                            <ellipse cx="60" cy="60" rx="30" ry="26" fill={activeColor.hex} stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="52" y="70" width="16" height="50" rx="8" fill={activeColor.hex} stroke="#cbd5e1" strokeWidth="1.5" />
                            <circle cx="58" cy="58" r="10" fill="#0f172a" />
                            <circle cx="60" cy="115" r="3" fill="#cbd5e1" />
                          </g>

                          {/* Right Pod */}
                          <g transform="translate(115, 40) rotate(12 60 70)">
                            <ellipse cx="60" cy="60" rx="30" ry="26" fill={activeColor.hex} stroke="#cbd5e1" strokeWidth="1.5" />
                            <rect x="52" y="70" width="16" height="50" rx="8" fill={activeColor.hex} stroke="#cbd5e1" strokeWidth="1.5" />
                            <circle cx="62" cy="58" r="10" fill="#0f172a" />
                            <circle cx="60" cy="115" r="3" fill="#cbd5e1" />
                          </g>
                        </svg>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Floating Specs Badges */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 overflow-x-auto py-1 z-20">
                  {product.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/95 border border-black/[0.08] text-[11px] font-medium text-[#515154] whitespace-nowrap shadow-xs backdrop-blur-md"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: High-Conversion Buying Flow */}
            <div className="lg:col-span-6 space-y-6">
              {!orderComplete ? (
                <>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
                        ★ {product.rating}
                      </span>
                      <span className="text-xs text-[#6e6e73]">({product.reviews.toLocaleString()} verified buyers)</span>
                      <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 ml-auto font-semibold">
                        In Stock • Ships in 24h
                      </span>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-bold text-[#0e0e11] tracking-tight">{product.name}</h3>
                    <p className="text-sm text-[#515154] mt-1.5 leading-relaxed">{product.tagline}</p>
                    <div className="text-3xl font-extrabold text-[#0e0e11] mt-4 font-mono">
                      ${product.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Material / Color Finish Picker with Micro-Interactions */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-semibold text-[#515154] uppercase tracking-wider flex items-center justify-between">
                      <span>Finish: <strong className="text-[#0e0e11]">{activeColor.name}</strong></span>
                      <span className="text-[11px] text-[#0071e3] font-normal">Physical Vapor Deposition</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {product.colors.map((c, i) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColorIndex(i)}
                          className={`w-10 h-10 rounded-full transition-all flex items-center justify-center cursor-pointer ${
                            selectedColorIndex === i
                              ? "ring-2 ring-[#0071e3] ring-offset-2 ring-offset-white scale-110 shadow-md"
                              : "opacity-80 hover:opacity-100 hover:scale-105"
                          }`}
                          style={{ backgroundColor: c.hex, border: "2px solid rgba(0,0,0,0.1)" }}
                          title={c.name}
                        >
                          {selectedColorIndex === i && <Check className="w-4 h-4 text-white drop-shadow" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#515154] font-medium">Quantity:</span>
                    <div className="flex items-center bg-[#f5f5f7] border border-black/[0.06] rounded-xl px-2 py-1 shadow-xs">
                      <button
                        onClick={() => setCartCount(Math.max(1, cartCount - 1))}
                        className="p-1 text-[#515154] hover:text-[#0e0e11] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-xs font-mono font-bold text-[#0e0e11]">{cartCount}</span>
                      <button
                        onClick={() => setCartCount(cartCount + 1)}
                        className="p-1 text-[#515154] hover:text-[#0e0e11] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* High-Converting Order Bump */}
                  <div
                    onClick={() => setIncludeWarranty(!includeWarranty)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      includeWarranty
                        ? "bg-blue-50/70 border-[#0071e3] shadow-sm text-[#0e0e11]"
                        : "bg-[#f5f5f7] border-black/[0.06] text-[#515154] hover:border-black/[0.18]"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          includeWarranty ? "bg-[#0071e3] border-[#0071e3] text-white" : "border-black/20 bg-white"
                        }`}
                      >
                        {includeWarranty && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0e0e11] flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-[#0071e3]" />
                          <span>Nova Care+ 2-Year Express Replacement</span>
                        </div>
                        <div className="text-[11px] text-[#86868b]">Accidental damage coverage, zero deductible ($49)</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-700">+$49</span>
                  </div>

                  {/* Pricing Breakdown & Checkout Action */}
                  <div className="pt-2 border-t border-black/[0.06] space-y-3.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#515154] font-medium">Total Checkout Amount:</span>
                      <span className="text-2xl font-extrabold text-[#0e0e11] font-mono">${subtotal.toLocaleString()}</span>
                    </div>

                    <button
                      onClick={handleSimulateCheckout}
                      disabled={isProcessingCheckout}
                      className="w-full apple-button-primary py-4 text-sm font-semibold flex items-center justify-center gap-2 group shadow-md active:scale-95 cursor-pointer"
                    >
                      {isProcessingCheckout ? (
                        <div className="flex items-center gap-2 text-white">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processing 1-Click Biometric Payment...</span>
                        </div>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 fill-white text-white" />
                          <span>Simulate 1-Click Instant Checkout</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[11px] text-[#6e6e73]">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      <span>Encrypted with Biometrics & WebAuthn • No card required for demo</span>
                    </div>
                  </div>
                </>
              ) : (
                /* Order Complete Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50/70 border border-emerald-300 p-8 rounded-3xl text-center space-y-4 shadow-xl"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] tracking-tight">
                    Order Processed in 1.1 Seconds
                  </h4>
                  <p className="text-xs text-[#515154] max-w-md mx-auto leading-relaxed">
                    Zero redirects, zero slow loading wheels. The customer receipt is generated, inventory decremented
                    in real-time, and post-purchase upsell sequence queued automatically.
                  </p>
                  <div className="p-4 rounded-xl bg-white border border-emerald-200 text-left text-xs font-mono space-y-1.5 max-w-sm mx-auto shadow-xs">
                    <div className="text-[#6e6e73]">TRANSACTION: #NVS-98421</div>
                    <div className="text-[#1d1d1f] font-bold">ITEM: {product.name} (x{cartCount})</div>
                    <div className="text-emerald-700 font-bold">TOTAL: ${subtotal.toLocaleString()} (PAID via 1-Click Express)</div>
                    <div className="text-blue-700">ESTIMATED FULFILLMENT: 24 Hours</div>
                  </div>
                  <button
                    onClick={handleResetOrder}
                    className="apple-button-secondary text-xs px-6 py-2.5 inline-flex items-center gap-2 shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Store Demo</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
