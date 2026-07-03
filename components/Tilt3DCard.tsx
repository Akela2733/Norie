"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // degrees of tilt (default 12)
}

/**
 * A wrapper that gives children a physics-based 3D tilt + glare
 * as the user moves their mouse over the card.
 */
export default function Tilt3DCard({
  children,
  className = "",
  intensity = 12,
}: Tilt3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const springConfig = { stiffness: 220, damping: 22 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width; // 0 → 1
    const relY = (e.clientY - rect.top) / rect.height;  // 0 → 1

    rotateY.set((relX - 0.5) * intensity * 2);
    rotateX.set(-(relY - 0.5) * intensity * 2);
    setGlarePos({ x: relX * 100, y: relY * 100 });
  };

  const handleMouseEnter = () => {
    scale.set(1.04);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
        willChange: "transform",
      }}
    >
      {children}

      {/* Dynamic glare overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-30 rounded-inherit overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.22) 0%, transparent 65%)`,
          transition: "background 0.05s linear",
        }}
      />
    </motion.div>
  );
}
