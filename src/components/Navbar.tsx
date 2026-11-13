"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import NovaLogo from "./NovaLogo";

interface NavbarProps {
  onOpenIntake: () => void;
}

export default function Navbar({ onOpenIntake }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08080a]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-2xl"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Logo in Inverted White/Graphite */}
          <a
            href="#"
            className="flex items-center hover:opacity-85 transition-opacity"
            aria-label="Nova Scale Systems Home"
          >
            <NovaLogo size="md" variant="full" inverted={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-[#94949e]">
            <a
              href="#services"
              className="hover:text-white transition-colors duration-200"
            >
              Services
            </a>
            <a
              href="#see-in-action"
              className="hover:text-white transition-colors duration-200"
            >
              See It in Action
            </a>
            <a
              href="#who-we-help"
              className="hover:text-white transition-colors duration-200"
            >
              Who We Help
            </a>
            <a
              href="#simulator"
              className="hover:text-white transition-colors duration-200"
            >
              ROI Estimator
            </a>
            <a
              href="#technical-inspection"
              className="hover:text-white transition-colors duration-200"
            >
              Architecture
            </a>
            <a
              href="#pricing"
              className="hover:text-white transition-colors duration-200"
            >
              Packages
            </a>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenIntake}
              className="graphite-button-primary text-xs px-5 py-2.5 flex items-center gap-1.5 font-semibold cursor-pointer shadow-lg shadow-blue-500/20"
            >
              <span>Build My Growth Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#94949e] hover:text-white transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#101014] border-b border-white/[0.08] px-4 pt-3 pb-6 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#f4f4f6] hover:text-[#0071e3]"
          >
            Services
          </a>
          <a
            href="#see-in-action"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#f4f4f6] hover:text-[#0071e3]"
          >
            See It in Action
          </a>
          <a
            href="#who-we-help"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#f4f4f6] hover:text-[#0071e3]"
          >
            Who We Help
          </a>
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#f4f4f6] hover:text-[#0071e3]"
          >
            ROI Estimator
          </a>
          <a
            href="#technical-inspection"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#f4f4f6] hover:text-[#0071e3]"
          >
            Architecture
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#f4f4f6] hover:text-[#0071e3]"
          >
            Packages
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenIntake();
              }}
              className="w-full graphite-button-primary text-xs py-3 font-semibold flex items-center justify-center gap-2"
            >
              <span>Build My Growth Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
