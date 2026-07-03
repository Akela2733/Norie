"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function FooterTicker() {
  const texts = ["WHERE GLAM MEETS GRUNGE", "LATEST DROPS", "THE ARCHIVE", "STRUCTURAL DESIGN"];
  const repeated = [...texts, ...texts, ...texts, ...texts, ...texts];
  
  return (
    <div className="w-full overflow-hidden py-4 border-b border-[rgba(240,236,228,0.1)] group transition-colors duration-700 hover:bg-[#e8291c]">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-6 flex-shrink-0">
            <span
              className="font-black uppercase text-xs tracking-widest whitespace-nowrap px-6 transition-colors duration-700 text-[#f0ece4] group-hover:text-[#0a0a0a]"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.2em" }}
            >
              {text}
            </span>
            <span className="font-black text-[16px] transition-colors duration-700 text-[#e8291c] group-hover:text-[#0a0a0a]">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Advanced hover component: a line strikes through the text
function StrikeLink({ children, href }: { children: string, href?: string }) {
  const inner = (
    <span className="relative inline-block group cursor-pointer text-sm font-bold uppercase tracking-widest text-[#f0ece4] transition-colors" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
      <span className="relative z-10 group-hover:text-[#e8291c] transition-colors duration-300">{children}</span>
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[1px] bg-[#e8291c] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full z-20 pointer-events-none" />
    </span>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a flawless parallax scroll effect for the footer content
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  // Color change for the massive background text
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 0.05]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-[#0a0a0a]">
      <motion.footer 
        style={{ y }}
        className="w-full relative select-none text-[#f0ece4]"
      >
        
        {/* Top Endless Marquee */}
        <FooterTicker />

        <div className="px-6 md:px-12 pt-16 pb-8 max-w-[1600px] mx-auto relative z-10">
          
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-32">
            
            {/* Column 1: Brand */}
            <div className="md:col-span-1">
              <h3 className="font-black uppercase text-2xl tracking-widest mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                NORIE STUDIO
              </h3>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60 leading-relaxed max-w-xs" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Our pieces are built to last, not to be replaced. Structural design for the modern era.
              </p>
            </div>

            {/* Column 2: Shop */}
            <div className="flex flex-col gap-4 items-start">
              <span className="font-black text-xs opacity-40 uppercase tracking-widest mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>SHOP</span>
              <StrikeLink href="/all-products">ALL PRODUCTS</StrikeLink>
              <StrikeLink href="/all-products?category=CORSETS">CORSETS</StrikeLink>
              <StrikeLink href="/all-products?category=DRESSES">DRESSES</StrikeLink>
              <Link href="/all-products?sale=true" className="text-sm font-bold uppercase tracking-widest text-[#e8291c] hover:opacity-80 transition-opacity inline-block relative group" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                SALE
              </Link>
            </div>

            {/* Column 3: Support */}
            <div className="flex flex-col gap-4 items-start">
              <span className="font-black text-xs opacity-40 uppercase tracking-widest mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>SUPPORT</span>
              <StrikeLink href="/contact">CONTACT US</StrikeLink>
              <StrikeLink>SHIPPING & RETURNS</StrikeLink>
              <StrikeLink>FAQ</StrikeLink>
              <StrikeLink>IMPRESSUM</StrikeLink>
            </div>

            {/* Column 4: Social & Back to Top */}
            <div className="flex flex-col justify-between items-start md:items-end h-full gap-12">
              <div className="flex flex-col gap-4 md:text-right items-start md:items-end">
                <span className="font-black text-xs opacity-40 uppercase tracking-widest mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>SOCIAL</span>
                <StrikeLink>INSTAGRAM</StrikeLink>
                <StrikeLink>TIKTOK</StrikeLink>
              </div>
              
              <button 
                onClick={scrollToTop}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-[rgba(240,236,228,0.2)] hover:border-[#e8291c] hover:bg-[#e8291c] hover:text-[#0a0a0a] transition-all group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:-translate-y-1 transition-transform">
                  <path d="M12 20V4M12 4L5 11M12 4L19 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
                </svg>
              </button>
            </div>

          </div>
          
          {/* Bottom Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[rgba(240,236,228,0.1)]">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              © {new Date().getFullYear()} NORIE. ALL RIGHTS RESERVED.
            </span>
            <span className="text-xs font-bold uppercase tracking-widest opacity-40 mt-4 md:mt-0" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              DESIGNED IN SRI LANKA
            </span>
          </div>
        </div>

        {/* Massive Dynamic Logo Background */}
        <div className="absolute bottom-[-10%] left-0 right-0 pointer-events-none flex justify-center overflow-hidden">
          <motion.span 
            className="font-black uppercase leading-[0.75] text-[#f0ece4]"
            style={{ 
              fontFamily: "'Barlow Condensed', sans-serif", 
              fontSize: "clamp(120px, 28vw, 600px)",
              letterSpacing: "-0.03em",
              opacity,
              scale
            }}
          >
            NORIE
          </motion.span>
        </div>

      </motion.footer>
    </div>
  );
}
