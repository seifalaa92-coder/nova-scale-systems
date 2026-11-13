"use client";

import React, { useState } from "react";
import { Calculator, ArrowRight, Briefcase, Store, ShieldAlert } from "lucide-react";

interface ScaleSimulatorProps {
  onOpenIntake: () => void;
}

export default function ScaleSimulator({ onOpenIntake }: ScaleSimulatorProps) {
  const [businessModel, setBusinessModel] = useState<"services" | "ecommerce">("services");

  // State for Service Business & SMEs
  const [monthlyInquiries, setMonthlyInquiries] = useState<number>(40);
  const [clientValue, setClientValue] = useState<number>(2500);
  const [currentCloseRate, setCurrentCloseRate] = useState<number>(20); // 20%

  // State for E-Commerce / Retail
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(15000);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(95);
  const [currentConversionRate, setCurrentConversionRate] = useState<number>(1.5); // 1.5%

  // Calculations for Service Business:
  const currentDeals = Math.round(monthlyInquiries * (currentCloseRate / 100));
  const currentServiceMonthlyRev = currentDeals * clientValue;
  const currentServiceAnnualRev = currentServiceMonthlyRev * 12;

  // Illustrative Model:
  const projectedInquiries = Math.round(monthlyInquiries * 1.2);
  const projectedCloseRate = Math.min(50, Math.round(currentCloseRate * 1.2));
  const projectedDeals = Math.round(projectedInquiries * (projectedCloseRate / 100));
  const projectedServiceMonthlyRev = projectedDeals * clientValue;
  const projectedServiceAnnualRev = projectedServiceMonthlyRev * 12;

  const serviceMonthlyLift = Math.max(0, projectedServiceMonthlyRev - currentServiceMonthlyRev);
  const serviceAnnualLift = Math.max(0, projectedServiceAnnualRev - currentServiceAnnualRev);

  // Calculations for E-Commerce:
  const currentOrders = Math.round(monthlyVisitors * (currentConversionRate / 100));
  const currentEcomMonthlyRev = currentOrders * averageOrderValue;
  const currentEcomAnnualRev = currentEcomMonthlyRev * 12;

  const projectedEcomCVR = Number((currentConversionRate * 1.25).toFixed(2));
  const projectedAOV = Math.round(averageOrderValue * 1.1);
  const projectedOrders = Math.round(monthlyVisitors * (projectedEcomCVR / 100));
  const projectedEcomMonthlyRev = projectedOrders * projectedAOV;
  const projectedEcomAnnualRev = projectedEcomMonthlyRev * 12;

  const ecomMonthlyLift = Math.max(0, projectedEcomMonthlyRev - currentEcomMonthlyRev);
  const ecomAnnualLift = Math.max(0, projectedEcomAnnualRev - currentEcomAnnualRev);

  const displayAnnualLift = businessModel === "services" ? serviceAnnualLift : ecomAnnualLift;
  const displayMonthlyLift = businessModel === "services" ? serviceMonthlyLift : ecomMonthlyLift;

  return (
    <section id="simulator" className="py-24 md:py-36 relative bg-[#08080a] text-[#f4f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-[#2997ff] uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Illustrative Value & ROI Estimator</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-[-0.038em] leading-[1.06] mb-6">
            Estimate the impact of <br />
            <span className="text-[#2997ff]">faster follow-up and conversion.</span>
          </h2>
          <p className="text-[#94949e] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Use this interactive calculator to explore how modest improvements in enquiry capture, booking speed,
            and checkout conversion compound over a year.
          </p>

          {/* Model Switcher Pills */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() => setBusinessModel("services")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                businessModel === "services"
                  ? "bg-[#14141e] text-white border border-[#0071e3] shadow-md shadow-blue-500/20"
                  : "bg-[#101014] text-[#71717a] border border-white/[0.08] hover:text-white hover:border-white/[0.18]"
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#2997ff]" />
              <span>Service Business & SME</span>
            </button>
            <button
              onClick={() => setBusinessModel("ecommerce")}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                businessModel === "ecommerce"
                  ? "bg-[#14141e] text-white border border-[#0071e3] shadow-md shadow-blue-500/20"
                  : "bg-[#101014] text-[#71717a] border border-white/[0.08] hover:text-white hover:border-white/[0.18]"
              }`}
            >
              <Store className="w-4 h-4 text-[#2997ff]" />
              <span>Retail / Online Store</span>
            </button>
          </div>
        </div>

        {/* Interactive Calculator Card */}
        <div className="graphite-card rounded-3xl p-6 sm:p-10 md:p-12 border border-white/[0.08] shadow-2xl bg-[#101014] max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Sliders Area (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {businessModel === "services" ? (
                <>
                  {/* Service Slider 1: Monthly Inquiries */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#94949e] font-medium">Monthly Inquiries / Quote Requests</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-white">
                        {monthlyInquiries} enquiries / mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="5"
                      value={monthlyInquiries}
                      onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                      className="w-full h-2 bg-[#1a1a24] rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
                    />
                    <div className="flex justify-between text-[11px] text-[#71717a] font-mono">
                      <span>10/mo</span>
                      <span>100/mo</span>
                      <span>200/mo</span>
                    </div>
                  </div>

                  {/* Service Slider 2: Average Deal Value */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#94949e] font-medium">Average Client / Deal Value</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-white">
                        ${clientValue.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="15000"
                      step="250"
                      value={clientValue}
                      onChange={(e) => setClientValue(Number(e.target.value))}
                      className="w-full h-2 bg-[#1a1a24] rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
                    />
                    <div className="flex justify-between text-[11px] text-[#71717a] font-mono">
                      <span>$500</span>
                      <span>$7,500</span>
                      <span>$15,000+</span>
                    </div>
                  </div>

                  {/* Service Slider 3: Current Close Rate */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#94949e] font-medium">Current Close Rate (Estimated)</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-white">
                        {currentCloseRate}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="1"
                      value={currentCloseRate}
                      onChange={(e) => setCurrentCloseRate(Number(e.target.value))}
                      className="w-full h-2 bg-[#1a1a24] rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
                    />
                    <div className="flex justify-between text-[11px] text-[#71717a] font-mono">
                      <span>5%</span>
                      <span>25%</span>
                      <span>50%</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* E-Com Slider 1: Monthly Visitors */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#94949e] font-medium">Monthly Store Visitors</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-white">
                        {monthlyVisitors.toLocaleString()} visitors
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2000"
                      max="100000"
                      step="1000"
                      value={monthlyVisitors}
                      onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                      className="w-full h-2 bg-[#1a1a24] rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
                    />
                    <div className="flex justify-between text-[11px] text-[#71717a] font-mono">
                      <span>2k</span>
                      <span>50k</span>
                      <span>100k+</span>
                    </div>
                  </div>

                  {/* E-Com Slider 2: Average Order Value */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#94949e] font-medium">Average Order Value (AOV)</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-white">
                        ${averageOrderValue}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="500"
                      step="5"
                      value={averageOrderValue}
                      onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                      className="w-full h-2 bg-[#1a1a24] rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
                    />
                    <div className="flex justify-between text-[11px] text-[#71717a] font-mono">
                      <span>$25</span>
                      <span>$250</span>
                      <span>$500+</span>
                    </div>
                  </div>

                  {/* E-Com Slider 3: Conversion Rate */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#94949e] font-medium">Current Store Conversion Rate</span>
                      <span className="text-base sm:text-lg font-bold font-mono text-white">
                        {currentConversionRate}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="5.0"
                      step="0.1"
                      value={currentConversionRate}
                      onChange={(e) => setCurrentConversionRate(Number(e.target.value))}
                      className="w-full h-2 bg-[#1a1a24] rounded-lg appearance-none cursor-pointer accent-[#0071e3]"
                    />
                    <div className="flex justify-between text-[11px] text-[#71717a] font-mono">
                      <span>0.5%</span>
                      <span>2.5%</span>
                      <span>5.0%</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Projected Outputs Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#14141e] rounded-2xl p-6 sm:p-8 border border-white/[0.08] text-white flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#2997ff] font-semibold block mb-2">
                  ILLUSTRATIVE ANNUAL VALUE LIFT
                </span>
                <div className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                  +${displayAnnualLift.toLocaleString()}
                </div>
                <div className="text-xs text-[#94949e]">
                  Estimated annual revenue gain (~${displayMonthlyLift.toLocaleString()}/mo)
                </div>
              </div>

              {/* Comparison Breakdown */}
              <div className="space-y-3 py-4 border-y border-white/[0.08] text-xs font-mono">
                {businessModel === "services" ? (
                  <>
                    <div className="flex justify-between text-[#94949e]">
                      <span>Baseline Closed Deals:</span>
                      <span className="text-white">{currentDeals} / mo</span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>Projected with Fast Intake:</span>
                      <span className="font-bold">~{projectedDeals} / mo (+{Math.max(0, projectedDeals - currentDeals)})</span>
                    </div>
                    <div className="flex justify-between text-[#71717a] text-[11px] pt-1">
                      <span>Based on:</span>
                      <span>+20% leads & +20% faster follow-up close</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-[#94949e]">
                      <span>Baseline Monthly Orders:</span>
                      <span className="text-white">{currentOrders} / mo</span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>Projected with 1-Click Pay:</span>
                      <span className="font-bold">~{projectedOrders} / mo</span>
                    </div>
                    <div className="flex justify-between text-[#71717a] text-[11px] pt-1">
                      <span>Projected AOV:</span>
                      <span>~${projectedAOV} (+10% bump)</span>
                    </div>
                  </>
                )}
              </div>

              {/* Call to Action Button */}
              <button
                onClick={onOpenIntake}
                className="w-full graphite-button-primary py-3.5 px-5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
              >
                <span>Build My Growth Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Model Assumptions & Disclaimer */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-start gap-3 text-[11px] text-[#71717a] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-[#2997ff] shrink-0 mt-0.5" />
            <div>
              <strong>Calculator Assumptions & Disclaimer:</strong> Outputs are illustrative estimates based on standard project improvements (assumes a conservative 20% increase in captured inquiries via clearer layouts, and a 20% relative improvement in close rate via prompt follow-up). Actual business outcomes depend on baseline website traffic quality, market demand, offer pricing, and staff sales execution. These projections are not guarantees.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
