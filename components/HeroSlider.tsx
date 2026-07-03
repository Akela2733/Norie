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

// Animated floating geometric shapes for the loading background
function FloatingShapes() {
  const shapes = [
    { cx: "15%", cy: "20%", r: 80, delay: 0, dur: 7 },
    { cx: "80%", cy: "30%", r: 120, delay: 1, dur: 9 },
    { cx: "60%", cy: "70%", r: 60, delay: 0.5, dur: 6 },
    { cx: "30%", cy: "80%", r: 100, delay: 1.5, dur: 8 },
    { cx: "90%", cy: "75%", r: 50, delay: 0.3, dur: 5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: s.cx,
            top: s.cy,
            width: s.r * 2,
            height: s.r * 2,
            border: "1px solid rgba(10,10,10,0.08)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated horizontal lines */}
      {[20, 40, 60, 80].map((pct, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute left-0 right-0 h-px"
          style={{ top: `${pct}%`, background: "rgba(10,10,10,0.04)" }}
          initial={{ scaleX: 0, transformOrigin: i % 2 === 0 ? "left" : "right" }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.2 * i, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Large floating NORIE watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="font-black uppercase select-none"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(80px, 22vw, 380px)",
            color: "rgba(10,10,10,0.04)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
          animate={{
            y: [0, -16, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          NORIE
        </motion.span>
      </motion.div>

      {/* Animated accent dot grid */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full bg-[#e8291c]"
          style={{
            left: `${8 + (i % 4) * 28}%`,
            top: `${15 + Math.floor(i / 4) * 30}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2.5,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
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
      <FloatingShapes />

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
