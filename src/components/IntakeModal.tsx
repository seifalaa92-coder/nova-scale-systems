"use client";

import React, { useState } from "react";
import { X, Check, ArrowRight, Sparkles, Building2, Briefcase, Store, Users, Wrench } from "lucide-react";

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: string;
}

export default function IntakeModal({ isOpen, onClose, initialTier }: IntakeModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [businessType, setBusinessType] = useState<string>("Professional Services & Consultancies");
  const [primaryObjective, setPrimaryObjective] = useState<string>(
    initialTier ? `Package: ${initialTier}` : "Websites that convert"
  );
  const [timeline, setTimeline] = useState<string>("Ready to start in 2–4 weeks");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    currentSite: "",
    biggestBottleneck: "Need more enquiries and want to automate lead follow-up",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setStep(1);
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#101014] text-[#f4f4f6] border border-white/[0.1] rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#181824] border border-white/[0.08] text-[#94949e] hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#2997ff] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-3 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BUILD MY GROWTH PLAN</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Tell us about your business goals.
              </h3>
              <p className="text-xs sm:text-sm text-[#94949e] mt-1.5 leading-relaxed">
                We will review your current website, tools, and enquiry process, then present a clear proposal
                with defined deliverables, timeline, and transparent pricing.
              </p>

              {/* Progress Steps */}
              <div className="flex items-center gap-2 mt-4">
                <div
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    step >= 1 ? "bg-[#0071e3]" : "bg-white/10"
                  }`}
                />
                <div
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    step >= 2 ? "bg-[#0071e3]" : "bg-white/10"
                  }`}
                />
              </div>
            </div>

            {/* Step 1: Business Profile & Primary Objective */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                <div>
                  <label className="block text-xs font-semibold text-[#94949e] uppercase tracking-wider mb-2.5 font-mono">
                    1. Your Business Category
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Professional Services & Consultancies",
                      "Clinics & Healthcare Practices",
                      "Local Services & Contractors",
                      "Retail & Modern Stores",
                      "B2B Companies & Scaled SMEs",
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setBusinessType(type)}
                        className={`p-3 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                          businessType === type
                            ? "bg-[#141b2b] border-[#0071e3] text-white font-bold shadow-md"
                            : "bg-[#181824] border-white/[0.08] text-[#94949e] hover:border-white/[0.18] hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94949e] uppercase tracking-wider mb-2.5 font-mono">
                    2. Primary Service or Need
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      "Websites that convert",
                      "Lead capture and follow-up",
                      "Booking and customer reminders",
                      "Online sales and payments",
                      "Business workflow automation",
                      "Retention and reputation",
                    ].map((obj) => (
                      <button
                        key={obj}
                        type="button"
                        onClick={() => setPrimaryObjective(obj)}
                        className={`p-3 rounded-xl text-left text-xs transition-all border cursor-pointer ${
                          primaryObjective === obj
                            ? "bg-[#0d2218] border-emerald-500 text-emerald-200 font-bold shadow-md"
                            : "bg-[#181824] border-white/[0.08] text-[#94949e] hover:border-white/[0.18] hover:text-white"
                        }`}
                      >
                        {obj}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#94949e] uppercase tracking-wider mb-2.5 font-mono">
                    3. Estimated Start Timeline
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Ready to start immediately", "In 2–4 weeks", "Planning phase / exploring"].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setTimeline(time)}
                        className={`p-2.5 rounded-xl text-center text-xs transition-all border cursor-pointer ${
                          timeline === time
                            ? "bg-[#0071e3] text-white font-bold border-[#0071e3]"
                            : "bg-[#181824] border-white/[0.08] text-[#94949e] hover:border-white/[0.18] hover:text-white"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="graphite-button-primary px-6 py-3 text-xs font-semibold flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Next: Contact Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#94949e] mb-1 font-mono">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#181824] text-white text-sm focus:outline-none focus:border-[#0071e3]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#94949e] mb-1 font-mono">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Acme Advisory Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#181824] text-white text-sm focus:outline-none focus:border-[#0071e3]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#94949e] mb-1 font-mono">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#181824] text-white text-sm focus:outline-none focus:border-[#0071e3]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#94949e] mb-1 font-mono">
                      Phone Number (For direct follow-up)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#181824] text-white text-sm focus:outline-none focus:border-[#0071e3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#94949e] mb-1 font-mono">
                    Current Website URL (if any)
                  </label>
                  <input
                    type="text"
                    placeholder="https://yourcompany.com"
                    value={formData.currentSite}
                    onChange={(e) => setFormData({ ...formData, currentSite: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#181824] text-white text-sm focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#94949e] mb-1 font-mono">
                    What is the biggest friction or challenge in your current setup?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Website doesn't convert, staff waste hours manually booking calls, leads cool off before we can reply..."
                    value={formData.biggestBottleneck}
                    onChange={(e) => setFormData({ ...formData, biggestBottleneck: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#181824] text-white text-sm focus:outline-none focus:border-[#0071e3] resize-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-mono text-[#71717a] hover:text-white cursor-pointer"
                  >
                    ← Back to Step 1
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="graphite-button-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] flex items-center gap-2 shadow-xl shadow-blue-500/25 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <span>Submit Growth Plan Request</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Submission Complete Confirmation */
          <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Growth Plan Request Received
            </h3>
            <p className="text-sm text-[#94949e] max-w-md mx-auto leading-relaxed">
              Thank you, {formData.name || "there"}. We have received your request regarding{" "}
              <span className="font-semibold text-white">{primaryObjective}</span> for {formData.company || "your company"}.
              Our team will review your requirements and reach out within one business day with next steps.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="graphite-button-secondary text-xs px-6 py-2.5 font-semibold cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
