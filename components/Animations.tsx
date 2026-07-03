"use client";

import { useRef, useEffect, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useAnimation,
} from "framer-motion";

// ─────────────────────────────────────────────
// 1. FADE UP — elements slide up on scroll enter
// ─────────────────────────────────────────────
interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  distance = 40,
  className,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// 2. STAGGER CONTAINER — children animate in sequence
// ─────────────────────────────────────────────
interface StaggerProps {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function StaggerContainer({ children, delay = 0, stagger = 0.1, className, style }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  distance = 40,
  style,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// 3. SPLIT TEXT — letter-by-letter animation
// ─────────────────────────────────────────────
interface SplitTextProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  charClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  style?: React.CSSProperties;
}

export function SplitText({
  text,
  delay = 0,
  stagger = 0.03,
  className,
  charClassName,
  as: Tag = "h1",
  style,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const chars = text.split("");

  return (
    <div ref={ref} className="overflow-hidden">
      <Tag className={className} style={{ display: "inline-flex", flexWrap: "wrap", ...style }}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className={charClassName}
            style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.55,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char === " " ? "\u00a0" : char}
          </motion.span>
        ))}
      </Tag>
    </div>
  );
}

// ─────────────────────────────────────────────
// 4. SLIDE IN — horizontal slide on enter
// ─────────────────────────────────────────────
interface SlideInProps {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}

export function SlideIn({ children, direction = "left", delay = 0, className }: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });
  const x = direction === "left" ? -60 : 60;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// 5. SCALE REVEAL — clip-path scale reveal
// ─────────────────────────────────────────────
export function ScaleReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.92, clipPath: "inset(10% 0% 10% 0%)" }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }
          : { opacity: 0, scale: 0.92, clipPath: "inset(10% 0% 10% 0%)" }
      }
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// 6. PARALLAX IMAGE — image moves at different speed
// ─────────────────────────────────────────────
export function ParallaxImage({
  children,
  speed = 0.3,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Increase parallax depth significantly by using % instead of px
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);
  const springY = useSpring(y, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y: springY }}>{children}</motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 7. COUNTER — number counting animation
// ─────────────────────────────────────────────
export function CountUp({
  to,
  duration = 1.5,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      const controls = { start: () => {} };
      const start = performance.now();
      const update = () => {
        const elapsed = (performance.now() - start) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        count.set(Math.round(eased * to));
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      return () => {};
    }
  }, [isInView, to, duration, count]);

  return (
    <motion.span ref={ref} className={className}>
      {isInView ? to : 0}
    </motion.span>
  );
}

// ─────────────────────────────────────────────
// 8. LINE DRAW — horizontal line that expands
// ─────────────────────────────────────────────
export function LineDraw({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scaleX: 0, transformOrigin: "left" }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

// ─────────────────────────────────────────────
// 9. PAGE TRANSITION wrapper
// ─────────────────────────────────────────────
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname + "-content"}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// 10. MAGNETIC BUTTON — pulls toward cursor
// ─────────────────────────────────────────────
export function MagneticButton({
  children,
  className,
  style,
  onClick,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ ...style, x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
