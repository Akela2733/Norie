"use client";

import Link from "next/link";
import { useStore } from "@/app/store-context";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

// Animated nav link — letters shift on hover
function NavLink({
  href,
  children,
  onClick,
  className,
  style,
}: {
  href?: string;
  children: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);
  const chars = children.split("");

  const inner = (
    <span
      className="inline-flex overflow-hidden relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-flex", cursor: "none" }}
    >
      {/* Primary text */}
      <span className="flex">
        {chars.map((c, i) => (
          <motion.span
            key={`a-${i}`}
            animate={{ y: hovered ? "-110%" : "0%" }}
            transition={{ duration: 0.3, delay: i * 0.025, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "inline-block", whiteSpace: c === " " ? "pre" : "normal" }}
          >
            {c === " " ? "\u00a0" : c}
          </motion.span>
        ))}
      </span>
      {/* Secondary text (slides up from below) */}
      <span className="flex absolute inset-0" style={{ color: "#e8291c" }}>
        {chars.map((c, i) => (
          <motion.span
            key={`b-${i}`}
            animate={{ y: hovered ? "0%" : "110%" }}
            transition={{ duration: 0.3, delay: i * 0.025, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "inline-block", whiteSpace: c === " " ? "pre" : "normal" }}
          >
            {c === " " ? "\u00a0" : c}
          </motion.span>
        ))}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={className} style={style} onClick={onClick}>
      {inner}
    </button>
  );
}

export default function Header() {
  const { cart, setActiveDrawer } = useStore();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Scroll-aware header — compact on scroll
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 60);
  });

  const navStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "11px",
    fontWeight: 900,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: "none",
    background: "transparent",
    border: "none",
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 select-none"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: scrolled ? "rgba(240,236,228,0.96)" : "#f0ece4",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(10,10,10,0.08)" : "none",
        transition: "background 0.4s ease, border 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <motion.div
        className="flex items-start justify-between px-5"
        animate={{ paddingTop: scrolled ? 10 : 16, paddingBottom: scrolled ? 8 : 10 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* LEFT GROUP */}
        <div className="flex flex-col gap-[3px]">
          <NavLink
            style={navStyle}
            onClick={() => setActiveDrawer("menu")}
          >
            MENU +
          </NavLink>
          <NavLink href="/all-products" style={navStyle}>
            SHOP ALL +
          </NavLink>
          <NavLink
            style={navStyle}
            onClick={() => setActiveDrawer("categories")}
          >
            CATEGORIES +
          </NavLink>
        </div>

        {/* CENTER LOGO */}
        <div className="hidden md:block absolute left-1/2 top-4 -translate-x-1/2">
          <Link href="/" style={{ cursor: "none" }}>
            <motion.span
              className="font-black tracking-[0.3em] uppercase block"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: scrolled ? "18px" : "22px",
                transition: "font-size 0.4s ease",
                cursor: "none",
              }}
              whileHover={{ color: "#e8291c" }}
              transition={{ duration: 0.2 }}
            >
              NORIE
            </motion.span>
          </Link>
        </div>

        {/* Mobile logo */}
        <Link href="/" className="md:hidden absolute left-1/2 top-4 -translate-x-1/2" style={{ cursor: "none" }}>
          <span
            className="font-black tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px" }}
          >
            NORIE
          </span>
        </Link>

        {/* RIGHT GROUP */}
        <div className="flex flex-col items-end gap-[3px]">
          <NavLink
            style={navStyle}
            onClick={() => setActiveDrawer("search")}
          >
            SEARCH
          </NavLink>
          <NavLink
            style={navStyle}
            onClick={() => setActiveDrawer("cart")}
          >
            {cartCount > 0 ? `BAG [ ${cartCount} ]` : "BAG"}
          </NavLink>
          <NavLink
            href="/all-products?sale=true"
            style={{ ...navStyle, color: "#e8291c" }}
          >
            SALE
          </NavLink>
        </div>
      </motion.div>
    </motion.header>
  );
}
