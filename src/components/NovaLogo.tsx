import React from "react";

interface NovaLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "mark" | "full";
  inverted?: boolean;
  className?: string;
}

export default function NovaLogo({
  size = "md",
  variant = "full",
  inverted = false,
  className = "",
}: NovaLogoProps) {
  // Size metrics
  const iconDimensions = {
    sm: "w-6 h-6",
    md: "w-7 h-7 sm:w-8 sm:h-8",
    lg: "w-9 h-9",
  }[size];

  const textClasses = {
    sm: "text-[14px]",
    md: "text-[15px] sm:text-[16px]",
    lg: "text-[18px]",
  }[size];

  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}
    >
      {/* Precision Geometric Nova Monogram Icon */}
      <div className={`${iconDimensions} shrink-0 relative flex items-center justify-center`}>
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xs"
        >
          {/* Obsidian Cupertino Squircle Background */}
          <rect
            x="1.5"
            y="1.5"
            width="33"
            height="33"
            rx="8.5"
            fill={inverted ? "#ffffff" : "#141416"}
            stroke={inverted ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.12)"}
            strokeWidth="1.2"
          />

          {/* Left Vertical Pylon */}
          <rect
            x="8.5"
            y="9"
            width="3.2"
            height="18"
            rx="1.6"
            fill={inverted ? "#141416" : "#ffffff"}
          />

          {/* Right Vertical Pylon */}
          <rect
            x="24.3"
            y="9"
            width="3.2"
            height="18"
            rx="1.6"
            fill={inverted ? "#141416" : "#ffffff"}
          />

          {/* Diagonal Architectural Beam */}
          <path
            d="M10.1 10.5L25.9 25.5"
            stroke={inverted ? "#141416" : "#ffffff"}
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Mathematical 4-Point Astroid Nova Starburst */}
          <path
            d="M18 12.5 C18 15.5 15.5 18 12.5 18 C15.5 18 18 20.5 18 23.5 C18 20.5 20.5 18 23.5 18 C20.5 18 18 15.5 18 12.5 Z"
            fill="#0071e3"
          />

          {/* Central Micro Optical Core */}
          <circle cx="18" cy="18" r="1.4" fill="#ffffff" />
        </svg>
      </div>

      {/* Typography with Precision Optical Alignment */}
      {variant === "full" && (
        <div className={`flex items-baseline leading-none tracking-tight font-display ${textClasses}`}>
          <span
            className={`font-bold tracking-[-0.03em] ${
              inverted ? "text-white" : "text-[#1d1d1f]"
            }`}
          >
            Nova
          </span>
          <span
            className={`font-medium tracking-[-0.01em] ml-1.5 ${
              inverted ? "text-[#a1a1a6]" : "text-[#737378]"
            }`}
          >
            Scale Systems
          </span>
        </div>
      )}
    </div>
  );
}
