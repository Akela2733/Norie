"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function FooterTicker() {
  const texts = ["WHERE GLAM MEETS GRUNGE", "LATEST DROPS", "THE ARCHIVE", "STRUCTURAL DESIGN"];
  const repeated = [...texts, ...texts, ...texts, ...texts, ...texts];
  
  return (
    <div className="w-full overflow-hidden py-4 border-b border-[rgba(240,236,228,0.1)]" style={{ background: "#0a0a0a" }}>
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-6 flex-shrink-0">
            <span
              className="font-black uppercase text-xs tracking-widest whitespace-nowrap px-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#f0ece4", letterSpacing: "0.2em" }}
            >
              {text}
            </span>
            <span style={{ color: "#e8291c", fontWeight: 900, fontSize: "16px" }}>•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Giant logo parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const linkStyle = "text-sm font-bold uppercase tracking-widest text-[#f0ece4] hover:text-[#e8291c] transition-colors inline-block relative group";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={containerRef} className="relative w-full overflow-hidden select-none bg-[#0a0a0a] text-[#f0ece4]">
      
      {/* Top Endless Marquee */}
      <FooterTicker />

      <div className="px-6 md:px-12 pt-16 pb-8 max-w-[1600px] mx-auto relative z-10">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          
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
          <div className="flex flex-col gap-4">
            <span className="font-black text-xs opacity-40 uppercase tracking-widest mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>SHOP</span>
            <Link href="/all-products" className={linkStyle} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>ALL PRODUCTS</Link>
            <Link href="/all-products?category=CORSETS" className={linkStyle} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>CORSETS</Link>
            <Link href="/all-products?category=DRESSES" className={linkStyle} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>DRESSES</Link>
            <Link href="/all-products?sale=true" className={`${linkStyle} !text-[#e8291c]`} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>SALE</Link>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col gap-4">
            <span className="font-black text-xs opacity-40 uppercase tracking-widest mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>SUPPORT</span>
            <Link href="/contact" className={linkStyle} style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>CONTACT US</Link>
            <span className={linkStyle} style={{ fontFamily: "'Barlow Condensed', sans-serif", cursor: "default" }}>SHIPPING & RETURNS</span>
            <span className={linkStyle} style={{ fontFamily: "'Barlow Condensed', sans-serif", cursor: "default" }}>FAQ</span>
            <span className={linkStyle} style={{ fontFamily: "'Barlow Condensed', sans-serif", cursor: "default" }}>IMPRESSUM</span>
          </div>

          {/* Column 4: Social & Back to Top */}
          <div className="flex flex-col justify-between items-start md:items-end h-full gap-12">
            <div className="flex flex-col gap-4 md:text-right">
              <span className="font-black text-xs opacity-40 uppercase tracking-widest mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>SOCIAL</span>
              <span className={linkStyle} style={{ fontFamily: "'Barlow Condensed', sans-serif", cursor: "pointer" }}>INSTAGRAM</span>
              <span className={linkStyle} style={{ fontFamily: "'Barlow Condensed', sans-serif", cursor: "pointer" }}>TIKTOK</span>
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

      {/* Massive Parallax Logo Background */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none flex justify-center overflow-hidden"
        style={{ y, scale, opacity }}
      >
        <span 
          className="font-black uppercase leading-[0.75] text-[rgba(240,236,228,0.03)]"
          style={{ 
            fontFamily: "'Barlow Condensed', sans-serif", 
            fontSize: "clamp(120px, 28vw, 600px)",
            letterSpacing: "-0.03em"
          }}
        >
          NORIE
        </span>
      </motion.div>

    </footer>
  );
}
