"use client";

import Link from "next/link";
import { useStore } from "@/app/store-context";
import { motion, useScroll, useMotionValueEvent, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, MouseEvent } from "react";
import { usePathname } from "next/navigation";

// Magnetic Button Component for Links
function MagneticLink({
  href,
  children,
  onClick,
  className,
  style,
  isActive
}: {
  href?: string;
  children: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    
    // Magnetic pull strength (closer to 1 = stronger pull)
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.4);
    y.set(distanceY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      className="relative flex items-center justify-center overflow-hidden group"
      style={{ x: mouseXSpring, y: mouseYSpring, zIndex: 10 }}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-[#e8291c]">
        {children}
      </span>
      {isActive && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#e8291c]" 
        />
      )}
    </motion.span>
  );

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: `relative px-3 py-2 cursor-pointer ${className || ""}`,
    style
  };

  if (href) {
    return (
      <Link href={href} {...sharedProps} ref={ref as any}>
        {inner}
      </Link>
    );
  }
  
  return (
    <button onClick={onClick} {...sharedProps} ref={ref as any}>
      {inner}
    </button>
  );
}

export default function Header() {
  const { cart, setActiveDrawer } = useStore();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Hide header on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    background: "transparent",
    border: "none",
  };

  return (
    <motion.header
      className="fixed top-6 left-1/2 z-50 select-none flex justify-center w-full max-w-4xl px-4 pointer-events-none"
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ 
        y: hidden ? -100 : 0, 
        x: "-50%", 
        opacity: hidden ? 0 : 1 
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="pointer-events-auto rounded-full flex items-center shadow-lg"
        style={{
          background: "rgba(240, 236, 228, 0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(10, 10, 10, 0.08)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        layout
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="flex items-center"
          animate={{ gap: isHovered ? "2rem" : "1.5rem", padding: isHovered ? "12px 32px" : "12px 24px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* LEFT LINKS (Hidden on small mobile, visible on sm+) */}
          <div className="hidden sm:flex items-center gap-2">
            <MagneticLink onClick={() => setActiveDrawer("menu")} style={navStyle}>
              MENU
            </MagneticLink>
            <MagneticLink href="/all-products" style={navStyle} isActive={pathname === '/all-products'}>
              SHOP
            </MagneticLink>
          </div>

          {/* MOBILE MENU ICON (Only on tiny screens) */}
          <div className="sm:hidden flex items-center">
             <MagneticLink onClick={() => setActiveDrawer("menu")} style={navStyle}>
              MENU
            </MagneticLink>
          </div>

          {/* CENTER LOGO */}
          <div className="flex items-center justify-center px-4">
            <Link href="/" className="relative group overflow-hidden">
              <motion.span
                className="block font-black tracking-[0.25em] uppercase text-[#0a0a0a]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px" }}
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                NORIE
              </motion.span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e8291c] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </Link>
          </div>

          {/* RIGHT LINKS (Hidden on small mobile, visible on sm+) */}
          <div className="hidden sm:flex items-center gap-2">
            <MagneticLink onClick={() => setActiveDrawer("search")} style={navStyle}>
              SEARCH
            </MagneticLink>
            <MagneticLink onClick={() => setActiveDrawer("cart")} style={navStyle}>
              {cartCount > 0 ? `BAG [${cartCount}]` : "BAG"}
            </MagneticLink>
          </div>

          {/* MOBILE BAG ICON (Only on tiny screens) */}
          <div className="sm:hidden flex items-center">
             <MagneticLink onClick={() => setActiveDrawer("cart")} style={navStyle}>
              {cartCount > 0 ? `BAG [${cartCount}]` : "BAG"}
            </MagneticLink>
          </div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
