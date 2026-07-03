"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const images = [
  "/images/hero4-removebg-preview.png",
  "/images/hero1-removebg-preview.png",
  "/images/hero2-removebg-preview.png"
];

const heroTexts = [
  "NEW DROP",
  "AUTUMN COLLECTION",
  "ARCHIVE PIECES"
];

// A jagged polygon that looks like a torn edge running vertically near 50% width.
const tornEdgeClipPath = "polygon(0 0, 49% 0, 52% 4%, 48% 8%, 51% 12%, 49% 16%, 53% 20%, 48% 24%, 52% 28%, 49% 32%, 51% 36%, 47% 40%, 52% 44%, 48% 48%, 51% 52%, 49% 56%, 53% 60%, 48% 64%, 52% 68%, 49% 72%, 51% 76%, 47% 80%, 52% 84%, 48% 88%, 51% 92%, 49% 96%, 52% 100%, 0 100%)";

// Bold, immediately-visible animated hero background
function HeroBackground() {
  // Big staggered letters that animate in from below immediately
  const letters = ["N", "O", "R", "I", "E"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">

      {/* Giant letter spread — immediately visible, high contrast */}
      <div className="absolute inset-0 flex items-center justify-around px-4">
        {letters.map((letter, i) => (
          <motion.span
            key={letter}
            className="font-black uppercase leading-none select-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(60px, 14vw, 200px)",
              color: "rgba(10,10,10,0.07)",
              letterSpacing: "-0.02em",
            }}
            initial={{ y: i % 2 === 0 ? "60px" : "-60px", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Visible geometric rings */}
      {[
        { size: 320, x: "12%", y: "15%", delay: 0 },
        { size: 500, x: "82%", y: "70%", delay: 0.3 },
        { size: 200, x: "70%", y: "18%", delay: 0.6 },
      ].map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ring.size,
            height: ring.size,
            left: ring.x,
            top: ring.y,
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(10,10,10,0.12)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: ring.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Animated scan lines — bold enough to see */}
      {[25, 50, 75].map((pct, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute left-0 right-0"
          style={{ top: `${pct}%`, height: "1px", background: "rgba(10,10,10,0.10)" }}
          initial={{ scaleX: 0, transformOrigin: i % 2 === 0 ? "left" : "right" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {[20, 50, 80].map((pct, i) => (
        <motion.div
          key={`vline-${i}`}
          className="absolute top-0 bottom-0"
          style={{ left: `${pct}%`, width: "1px", background: "rgba(10,10,10,0.06)" }}
          initial={{ scaleY: 0, transformOrigin: "top" }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.8, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Bold red accent dots — large & pulsing */}
      {[
        { x: "8%", y: "8%" }, { x: "92%", y: "8%" },
        { x: "8%", y: "92%" }, { x: "92%", y: "92%" },
        { x: "50%", y: "6%" },
      ].map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute rounded-full bg-[#e8291c]"
          style={{ left: dot.x, top: dot.y, width: 6, height: 6, transform: "translate(-50%,-50%)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 0.7] }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: "backOut" }}
        />
      ))}

      {/* Corner bracket decorations */}
      {[
        { top: "5%", left: "3%", rotate: 0 },
        { top: "5%", right: "3%", rotate: 90 },
        { bottom: "5%", left: "3%", rotate: 270 },
        { bottom: "5%", right: "3%", rotate: 180 },
      ].map((pos, i) => (
        <motion.div
          key={`bracket-${i}`}
          className="absolute"
          style={{ ...pos, width: 24, height: 24 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
        >
          <svg viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${pos.rotate}deg)` }}>
            <path d="M0 12V0H12" stroke="rgba(10,10,10,0.3)" strokeWidth="1.5" fill="none"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  // Background images parallax (moves down slower than page scrolls up)
  const imageY = useTransform(scrollY, [0, 800], ["0%", "30%"]);
  // Typography parallax (moves down even slower)
  const textY = useTransform(scrollY, [0, 800], ["0%", "50%"]);
  // Fade out text as you scroll
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-[#e5e5e5] select-none">

      {/* ========================================
          ALWAYS-VISIBLE ANIMATED BACKGROUND
          Shows immediately, before images load
      ======================================== */}
      <HeroBackground />

      {/* 
        ========================================
        BASE LAYER (RIGHT SIDE)
        Background: Textured Gray (#d8d0c4)
        Image: Grayscale
        Text: WHERE GLAM MEETS GRUNGE (ON TOP)
        ========================================
      */}
      <div className="absolute inset-0 flex items-center justify-end px-6 md:px-16 overflow-hidden">

        {/* Grayscale images fading in/out */}
        <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
          <AnimatePresence mode="popLayout">
            <motion.img
              key={index}
              src={images[index]}
              alt="Model Background"
              className="absolute inset-0 w-full h-full object-contain object-center grayscale"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Text ON TOP of the image */}
        <motion.div className="z-20 text-right pr-4 md:pr-12 w-[50vw]" style={{ y: textY, opacity }}>
          <h2
            className="uppercase font-black leading-none text-[#0a0a0a]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(30px, 6vw, 90px)",
              letterSpacing: "-0.01em",
            }}
          >
            WHERE<br />GLAM<br />MEETS<br />GRUNGE
          </h2>
        </motion.div>
      </div>

      {/* 
        ========================================
        OVERLAY LAYER (LEFT SIDE)
        Masked by Torn Edge ClipPath
        Background: Solid White (#f0ece4)
        Image: Full Color
        Text: NORIE (ON TOP)
        ========================================
      */}
      <div
        className="absolute inset-0 flex items-center justify-start bg-[#ffffff]"
        style={{ clipPath: tornEdgeClipPath }}
      >
        {/* Color images fading in/out exactly synced with grayscale */}
        <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
          <AnimatePresence mode="popLayout">
            <motion.img
              key={index}
              src={images[index]}
              alt="Model Overlay"
              className="absolute inset-0 w-full h-full object-contain object-center"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Text ON TOP of the image */}
        <motion.div className="absolute left-6 md:left-16 z-20" style={{ y: textY, opacity }}>
          <h1
            className="uppercase font-black leading-none text-[#0a0a0a]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(40px, 8vw, 130px)",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap"
            }}
          >
            NORIE
          </h1>
        </motion.div>
      </div>

      {/* 
        ========================================
        CTA BUTTON 
        Centered at the bottom of the hero
        ========================================
      */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[50] text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link href="/all-products">
          <motion.span
            className="inline-block px-8 py-3 font-black uppercase text-sm tracking-widest"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              border: "2px solid #0a0a0a",
              background: "#f0ece4",
              color: "#0a0a0a",
              letterSpacing: "0.2em",
              display: "inline-block",
            }}
            whileHover={{
              background: "#0a0a0a",
              color: "#f0ece4",
              scale: 1.03,
            }}
            transition={{ duration: 0.25 }}
          >
            [ SEE COLLECTION ]
          </motion.span>
        </Link>
        <div className="mt-6 relative h-5 w-full flex justify-center pointer-events-none overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={index}
              className="absolute text-xs font-bold uppercase tracking-widest whitespace-nowrap"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            >
              {heroTexts[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Slide-count indicator bottom right */}
      <div className="absolute bottom-10 right-8 z-50 flex flex-col gap-2">
        {images.map((_, i) => (
          <motion.div
            key={i}
            className="w-px origin-top"
            style={{ background: "#0a0a0a" }}
            animate={{ height: i === index ? 32 : 12, opacity: i === index ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>

    </div>
  );
}
