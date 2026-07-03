"use client";

import Link from "next/link";
import { useStore } from "@/app/store-context";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

function FlipText({
  children,
  href,
  onClick,
  className = "",
}: {
  children: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const chars = children.split("");
  
  const inner = (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap cursor-pointer"
      style={{ lineHeight: 1, padding: "4px 0" }}
    >
      <div>
        {chars.map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0, rotateX: 0, opacity: 1 },
              hovered: { y: "-100%", rotateX: 80, opacity: 0 }
            }}
            transition={{
              duration: 0.4,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.02 * i
            }}
            className="inline-block origin-top"
            key={`top-${i}`}
          >
            {l === " " ? "\u00a0" : l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0 top-[4px]">
        {chars.map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%", rotateX: -80, opacity: 0 },
              hovered: { y: 0, rotateX: 0, opacity: 1 }
            }}
            transition={{
              duration: 0.4,
              ease: [0.33, 1, 0.68, 1],
              delay: 0.02 * i
            }}
            className="inline-block origin-bottom"
            key={`bottom-${i}`}
          >
            {l === " " ? "\u00a0" : l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {inner}
    </button>
  );
}

export default function Header() {
  const { cart, setActiveDrawer } = useStore();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      // The header itself is fully transparent — no background here.
      // The content div uses mix-blend-mode: difference so white text
      // automatically inverts to appear readable over ANY background color:
      // → dark sections (#0a0a0a): text appears white ✓
      // → light/cream sections (#f0ece4): text appears dark ✓
      // → red ticker (#e8291c): text appears cyan (editorial look) ✓
      className="fixed top-0 left-0 right-0 z-[100] select-none pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: hidden ? -100 : 0, 
        opacity: hidden ? 0 : 1 
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div 
        className="flex items-start justify-between w-full pointer-events-auto px-6 md:px-12 py-6"
        style={{
          // mix-blend-mode: difference inverts text color relative to background
          mixBlendMode: "difference",
          color: "#ffffff",
        }}
      >
        
        {/* LEFT LOGO */}
        <div className="flex-1">
          <Link href="/" className="inline-block cursor-pointer">
            <span
              className="font-black tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "28px", lineHeight: 1 }}
            >
              NORIE
            </span>
          </Link>
        </div>

        {/* RIGHT LINKS */}
        <div 
          className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-10 font-bold uppercase tracking-[0.15em] text-[13px]"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          <FlipText onClick={() => setActiveDrawer("menu")}>MENU</FlipText>
          <FlipText href="/all-products" className="hidden sm:block">SHOP</FlipText>
          <FlipText onClick={() => setActiveDrawer("search")} className="hidden sm:block">SEARCH</FlipText>
          <FlipText onClick={() => setActiveDrawer("cart")}>
            {cartCount > 0 ? `BAG [${cartCount}]` : "BAG"}
          </FlipText>
        </div>

      </div>
    </motion.header>
  );
}
