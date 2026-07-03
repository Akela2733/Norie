"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const images = [
  "/images/hero4-removebg-preview.png",
  "/images/hero1-removebg-preview.png",
  "/images/hero2-removebg-preview.png"
];

// A jagged polygon that looks like a torn edge running vertically near 50% width.
const tornEdgeClipPath = "polygon(0 0, 49% 0, 52% 4%, 48% 8%, 51% 12%, 49% 16%, 53% 20%, 48% 24%, 52% 28%, 49% 32%, 51% 36%, 47% 40%, 52% 44%, 48% 48%, 51% 52%, 49% 56%, 53% 60%, 48% 64%, 52% 68%, 49% 72%, 51% 76%, 47% 80%, 52% 84%, 48% 88%, 51% 92%, 49% 96%, 52% 100%, 0 100%)";

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
    <div ref={containerRef} className="relative w-full h-[90vh] overflow-hidden bg-[#e5e5e5] select-none">

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
        <motion.div
          className="mt-6 text-xs font-bold uppercase tracking-widest pointer-events-none"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          01. NEW DROP
        </motion.div>
      </motion.div>

    </div>
  );
}
