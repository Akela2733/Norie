"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { Permanent_Marker } from "next/font/google";

// Painted graffiti style font
const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });

export default function InteractiveBoldSection() {
  const containerRef = useRef<HTMLElement>(null);
  const router = useRouter();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Coordinates for the custom "[ WHO WE ARE ]" cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const smoothCursorX = useSpring(cursorX, { damping: 40, stiffness: 300 });
  const smoothCursorY = useSpring(cursorY, { damping: 40, stiffness: 300 });

  const textX = useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]);
  const textY = useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // For parallax
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    // For custom cursor
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    // Hide cursor slightly off screen when leaving
    cursorX.set(-100);
    cursorY.set(-100);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.push("/who-are-we")}
      className="relative w-full overflow-hidden bg-[#ffffff] select-none cursor-none"
      style={{ minHeight: "100vh" }}
    >
      {/* CUSTOM CURSOR */}
      <motion.div
        className="absolute z-50 pointer-events-none font-bold text-sm tracking-widest whitespace-nowrap text-[#0a0a0a]"
        style={{
          x: smoothCursorX,
          y: smoothCursorY,
          translateX: "-50%",
          translateY: "-50%",
          fontFamily: "'Barlow Condensed', sans-serif"
        }}
      >
        [ WHO WE ARE ]
      </motion.div>

      {/* TOP LEFT TEXT */}
      <div className="absolute top-24 left-6 sm:left-12 z-20 pointer-events-none max-w-[80vw]">
        <h2 
          className="uppercase font-black leading-none text-[#0a0a0a] flex items-end gap-2 flex-wrap sm:flex-nowrap"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          <span style={{ fontSize: "clamp(30px, 5vw, 60px)", letterSpacing: "-0.04em" }}>SPACE</span>
          <span style={{ fontSize: "clamp(12px, 1.5vw, 20px)", paddingBottom: "8px" }}>(TRANSFORMATION)</span>
        </h2>
      </div>

      {/* CENTER PAINTED RED TEXT (PARALLAX) */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        style={{ x: textX, y: textY }}
      >
        <h1
          className={`uppercase leading-none text-center ${markerFont.className}`}
          style={{
            fontSize: "clamp(40px, 12vw, 200px)",
            color: "#e8291c",
            // Add a slight text shadow for extra spray paint effect
            textShadow: "0px 0px 15px rgba(232, 41, 28, 0.4)",
          }}
        >
          BOLD FASHION
        </h1>
      </motion.div>

      {/* CENTER MODEL IMAGE */}
      <div className="absolute inset-0 flex items-end justify-center z-20 pointer-events-none pb-0">
        <div className="relative w-[90vw] sm:w-[50vw] max-w-[600px] h-[65vh] sm:h-[80vh]">
          <img 
            src="/images/background-removed.png" 
            alt="Model" 
            className="absolute inset-0 w-full h-full object-contain object-bottom"
          />
        </div>
      </div>



      {/* BOTTOM LEFT TEXT */}
      <div className="absolute bottom-10 left-6 sm:left-12 z-20 pointer-events-none max-w-[80vw] sm:max-w-[320px]">
        <p className="uppercase font-bold text-[10px] sm:text-xs leading-relaxed" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>
          NORIE IS ABOUT WEARING WHAT EMPOWERS YOU — WHAT MIRRORS YOUR <span style={{ color: "#e8291c" }}>EMOTIONS,</span> YOUR ENERGY, YOUR <span style={{ color: "#e8291c" }}>ESSENCE.</span>
        </p>
      </div>

      {/* BOTTOM RIGHT TEXT */}
      <div className="absolute bottom-28 sm:bottom-10 right-6 sm:right-12 z-20 pointer-events-none flex items-end justify-end">
        <span className="text-5xl sm:text-6xl md:text-8xl font-black leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.04em" }}>FREEDOM.</span>
      </div>

    </section>
  );
}
