"use client";

import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  color: string;
  width: number;
}

const PALETTE = [
  "rgba(0, 113, 227, ", // Cupertino Royal Blue
  "rgba(56, 189, 248, ", // Sky Blue
  "rgba(99, 102, 241, ", // Indigo
  "rgba(14, 165, 233, ", // Cyan
];

export default function FluidCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const points: Point[] = [];
    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;

    const handlePointerMove = (e: PointerEvent | MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!hasMoved) {
        lastX = x;
        lastY = y;
        hasMoved = true;
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        const speed = Math.min(dist, 40);
        const colorBase = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        points.push({
          x,
          y,
          vx: dx * 0.15,
          vy: dy * 0.15,
          age: 0,
          color: colorBase,
          width: Math.max(2, Math.min(speed * 0.7, 18)),
        });

        lastX = x;
        lastY = y;
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    // Continuous rendering loop for silky smooth ribbon dissipation
    const maxAge = 45; // Frames of lifetime

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render connected fluid ribbon
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;

        if (p.age >= maxAge) {
          points.splice(i, 1);
          continue;
        }

        const progress = p.age / maxAge;
        const alpha = Math.max(0, (1 - progress) * 0.35); // Subtle, luxury opacity
        const currentWidth = p.width * (1 - progress * 0.7);

        if (i > 0) {
          const prev = points[i - 1];
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `${p.color}${alpha})`;
          ctx.lineWidth = currentWidth;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-700"
      style={{ opacity: 0.85 }}
    />
  );
}
