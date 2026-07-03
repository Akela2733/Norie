"use client";

import Link from "next/link";
import { useStore } from "@/app/store-context";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
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
  const [logoTheme, setLogoTheme] = useState<"light" | "dark">("dark");
  const [menuTheme, setMenuTheme] = useState<"light" | "dark">("dark");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const detectBrightness = (r: number, g: number, b: number) => {
      // YIQ brightness formula
      return (r * 299 + g * 587 + b * 114) / 1000;
    };

    const getBgColorAtPoint = (x: number, y: number): "light" | "dark" => {
      const header = document.querySelector("header");
      if (!header) return "light";

      // Temporarily hide the header to find the element behind it
      const originalDisplay = header.style.display;
      header.style.display = "none";
      let el = document.elementFromPoint(x, y);
      header.style.display = originalDisplay;

      if (!el) return "light";

      while (el) {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;

        // If it's an image, we handle image visibility based on its context
        if (el.tagName === "IMG") {
          const container = el.closest("[style*='grayscale']") || el.closest(".grayscale");
          if (container) {
            return "dark"; // Grayscale hero image is dark
          }
          return "dark"; // Default image overlay is dark campaign
        }

        if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
          const rgb = bg.match(/\d+/g);
          if (rgb) {
            const r = parseInt(rgb[0]);
            const g = parseInt(rgb[1]);
            const b = parseInt(rgb[2]);
            const brightness = detectBrightness(r, g, b);
            return brightness < 125 ? "dark" : "light";
          }
        }
        el = el.parentElement as HTMLElement;
      }
      return "light";
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Check theme at logo (left side) and menu (right side)
          const logo = getBgColorAtPoint(50, 30);
          const menu = getBgColorAtPoint(window.innerWidth - 50, 30);
          
          setLogoTheme(logo);
          setMenuTheme(menu);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    
    // Check periodically in case layout updates or slides shift without scroll
    const interval = setInterval(handleScroll, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100] select-none pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: hidden ? -100 : 0, 
        opacity: hidden ? 0 : 1 
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-start justify-between w-full pointer-events-auto px-6 md:px-12 py-6">
        
        {/* LEFT LOGO */}
        <div className="flex-1" style={{ color: logoTheme === "dark" ? "#f0ece4" : "#0a0a0a", transition: "color 0.4s ease" }}>
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
          style={{ 
            fontFamily: "'Barlow Condensed', sans-serif",
            color: menuTheme === "dark" ? "#f0ece4" : "#0a0a0a",
            transition: "color 0.4s ease"
          }}
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
