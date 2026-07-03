"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  FadeUp,
  SplitText,
  StaggerContainer,
  StaggerItem,
  ScaleReveal,
  SlideIn,
  LineDraw,
  ParallaxImage,
  PageTransition,
} from "@/components/Animations";
import HeroSlider from "@/components/HeroSlider";
import InteractiveBoldSection from "@/components/InteractiveBoldSection";
import ProductCard from "@/components/ProductCard";
import Tilt3DCard from "@/components/Tilt3DCard";

import { Product } from "@/data/products";

// ── Animated ticker ──────────────────────────
function AnimatedTicker({ texts }: { texts: string[] }) {
  const repeated = [...texts, ...texts, ...texts, ...texts];
  return (
    <div className="w-full overflow-hidden py-3" style={{ background: "#0a0a0a" }}>
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-4 flex-shrink-0">
            <span
              className="font-black uppercase text-xs tracking-widest whitespace-nowrap px-5"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#f0ece4", letterSpacing: "0.2em" }}
            >
              {text}
            </span>
            <span style={{ color: "#e8291c", fontWeight: 900, fontSize: "18px" }}>+</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Skeleton Card ────────────────────────────
function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.06 }}
      className="relative overflow-hidden"
      style={{ background: "#e8e2da" }}
    >
      <div style={{ aspectRatio: "2/3" }} className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
          }}
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: index * 0.15 }}
        />
      </div>
      <div className="px-3 py-3">
        <div className="h-3 rounded bg-[#d8d0c4] mb-2 w-3/4 overflow-hidden relative">
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: index * 0.15 }}
          />
        </div>
        <div className="h-3 rounded bg-[#d8d0c4] w-1/3" />
      </div>
    </motion.div>
  );
}

// ── 3D Tilt Product Card ──────────────────────
function AnimatedProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tilt3DCard intensity={8}>
        <ProductCard product={product} showBestSeller />
      </Tilt3DCard>
    </motion.div>
  );
}

// ── Scroll-Driven Text Fill ───────────────────
function ScrollTextFill({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative inline-block select-none">
      {/* Outline version (always visible) */}
      <span
        className="font-black uppercase leading-none"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(50px, 8vw, 110px)",
          color: "transparent",
          WebkitTextStroke: "2px #0a0a0a",
          letterSpacing: "-0.02em",
          display: "block",
        }}
      >
        {text}
      </span>
      {/* Solid fill that clips from left to right as you scroll */}
      <motion.span
        className="absolute inset-0 font-black uppercase leading-none overflow-hidden whitespace-nowrap"
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "clamp(50px, 8vw, 110px)",
          color: "#0a0a0a",
          letterSpacing: "-0.02em",
          display: "block",
          width: fillWidth,
        }}
        aria-hidden
      >
        {text}
      </motion.span>
    </div>
  );
}

// ── Mask-Expanding Campaign Section ──────────
function CampaignSection({ sectionLabel }: { sectionLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Mask grows from a small box to full screen as you scroll through the section
  const maskSize = useTransform(scrollYProgress, [0.1, 0.55], ["20%", "100%"]);
  const maskBorderRadius = useTransform(scrollYProgress, [0.1, 0.45], ["20px", "0px"]);
  // Image parallaxes inside the mask
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  // Text rises with scroll
  const textY = useTransform(scrollYProgress, [0, 1], ["60px", "-60px"]);
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden flex flex-col items-center justify-center" style={{ minHeight: "120vh", background: "#0a0a0a" }}>

      {/* The expanding mask container */}
      <motion.div
        className="relative overflow-hidden"
        style={{
          width: maskSize,
          height: "70vh",
          borderRadius: maskBorderRadius,
        }}
      >
        {/* Parallaxing image inside mask */}
        <motion.div className="absolute inset-0 w-full" style={{ y: imageY, height: "130%" }}>
          <Image
            src="/images/background1.webp"
            alt="Campaign"
            fill
            className="object-cover"
            style={{ opacity: 0.7 }}
          />
        </motion.div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Text inside mask */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
          <span
            className="text-sm font-black uppercase tracking-widest"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
          >
            {sectionLabel}
          </span>
          <motion.div style={{ y: textY, opacity: textOpacity }}>
            <SplitText
              text="AUTUMN"
              className="font-black uppercase leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(50px, 10vw, 120px)",
                color: "#f0ece4",
                letterSpacing: "-0.02em",
              } as React.CSSProperties}
              as="h2"
              stagger={0.04}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Pinned Horizontal Scroll for Categories ───
function PinnedCategories({ categories }: { categories: { name: string; count: number; image: string }[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Translate the inner track so we scroll it left as user scrolls down
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(categories.length - 1) * 25}%`]
  );
  const smoothX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div
      ref={containerRef}
      // Height = screen height × number of extra categories to reveal
      style={{ height: `${categories.length * 80}vh` }}
      className="relative"
    >
      {/* Sticky container that stays on screen */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden" style={{ background: "#f0ece4" }}>
        
        <div className="px-5 sm:px-8 mb-6">
          <FadeUp>
            <span
              className="block text-sm font-black uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
            >
              05. CATEGORIES
            </span>
          </FadeUp>
          <p className="text-xs font-bold uppercase tracking-widest opacity-40 mt-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            ← SCROLL TO EXPLORE →
          </p>
        </div>

        {/* Horizontally scrolling track */}
        <div className="flex-1 overflow-hidden flex items-center">
          <motion.div
            className="flex gap-4 pl-5 sm:pl-8"
            style={{ x: smoothX, width: "max-content" }}
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: "30vw", minWidth: "220px", maxWidth: "340px", height: "65vh", minHeight: "400px", flexShrink: 0 }}
              >
                <Link href={`/all-products?category=${cat.name}`} className="block h-full relative group overflow-hidden">
                  {/* Image with zoom on hover */}
                  <motion.div
                    className="absolute inset-0"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ background: "#d8d0c4" }}
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover object-top"
                      style={{ opacity: 0.85 }}
                    />
                  </motion.div>

                  {/* Bottom label bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a]/80 px-4 py-3 flex items-center justify-between z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <span
                      className="font-black uppercase text-sm tracking-widest text-[#f0ece4]"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {cat.name}
                    </span>
                    <span
                      className="font-bold text-xs text-[#e8291c]"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      [ {cat.count} ]
                    </span>
                  </div>

                  {/* Hover red bottom line */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 z-20"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: "#e8291c", transformOrigin: "left" }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll progress indicators */}
        <div className="flex gap-2 px-5 sm:px-8 pb-6 mt-4">
          {categories.map((_, i) => (
            <motion.div
              key={i}
              className="h-[2px] flex-1 bg-[#0a0a0a]/10"
              style={{ maxWidth: "60px" }}
            >
              <motion.div
                className="h-full bg-[#e8291c]"
                style={{
                  scaleX: useTransform(
                    scrollYProgress,
                    [i / categories.length, (i + 1) / categories.length],
                    [0, 1]
                  ),
                  transformOrigin: "left",
                }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const newArrivals = products.filter((p) => p.isNewArrival);

  const structureRef = useRef<HTMLElement>(null);
  const { scrollYProgress: structureScroll } = useScroll({ target: structureRef, offset: ["start end", "end start"] });
  const bgImageY = useTransform(structureScroll, [0, 1], ["-15%", "15%"]);

  const categories = [
    { name: "CORSETS", count: products.filter(p => p.category === "CORSETS").length, image: "/categories/corsets1.jpg" },
    { name: "DRESSES", count: products.filter(p => p.category === "DRESSES").length, image: "/categories/dresses1.webp" },
    { name: "PANTS",   count: products.filter(p => p.category === "PANTS").length,   image: "/categories/pants1.webp" },
    { name: "JACKETS", count: products.filter(p => p.category === "JACKETS").length, image: "/categories/jackets1.jpg" },
    { name: "TOPS",    count: products.filter(p => p.category === "TOPS").length,    image: "/categories/tops1.jpg" },
  ];

  return (
    <PageTransition>
      <div className="w-full select-none" style={{ background: "#f0ece4", color: "#0a0a0a" }}>

        {/* ── HERO ────────────────────────────── */}
        <HeroSlider />

        {/* ── TICKER 1 ────────────────────────── */}
        <AnimatedTicker texts={["NORIE STUDIO", "WHERE GLAM MEETS GRUNGE", "AUTUMN COLLECTION", "STRUCTURAL DESIGN", "COLLECTION NO. 01"]} />

        {/* ═══════════════════════════════════
            02. NEW ARRIVALS — 3D Tilt Cards
        ═══════════════════════════════════ */}
        <section className="w-full py-16 px-5 sm:px-8" style={{ background: "#f0ece4" }}>
          <div className="flex items-end justify-between mb-10">
            <FadeUp>
              <span
                className="text-sm font-black uppercase tracking-widest"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
              >
                02. NEW ARRIVALS
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Link href="/all-products">
                <motion.span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  whileHover={{ color: "#e8291c", x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  [ SEE ALL ] →
                </motion.span>
              </Link>
            </FadeUp>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-0">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} index={i} />)
              : newArrivals.map((product, i) => (
                  <AnimatedProductCard key={product.id} product={product} index={i} />
                ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            03. CAMPAIGN — Mask Expansion Reveal
        ═══════════════════════════════════ */}
        <CampaignSection sectionLabel="03. CAMPAIGN" />

        {/* ═══════════════════════════════════
            04. EDITORIAL — Scroll-Driven Text Fill
        ═══════════════════════════════════ */}
        <section
          ref={structureRef}
          className="relative w-full overflow-hidden flex flex-col justify-between"
          style={{ minHeight: "70vh", background: "#d8d0c4" }}
        >
          {/* Background image parallaxes */}
          <motion.div
            className="absolute inset-0 w-full"
            style={{ y: bgImageY, height: "130%", top: "-15%" }}
          >
            <Image src="/images/background2.avif" alt="Editorial" fill className="object-cover object-top" style={{ opacity: 0.4 }} />
          </motion.div>

          <div className="relative z-10 flex flex-col justify-between h-full px-6 sm:px-12 py-16 gap-16">
            <SlideIn direction="left" delay={0.1}>
              <span
                className="text-sm font-black uppercase tracking-widest"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
              >
                04. EDITORIAL
              </span>
            </SlideIn>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                {/* Scroll-driven text fill */}
                <ScrollTextFill text="STRUCTURE" />
                <ScrollTextFill text="SUBVERSION" />
              </div>

              <SlideIn direction="right" delay={0.3}>
                <p
                  className="uppercase font-bold text-xs leading-relaxed text-right max-w-xs"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}
                >
                  OUR PIECES ARE BUILT TO{" "}
                  <span style={{ color: "#e8291c" }}>LAST,</span>
                  <br />
                  NOT TO BE{" "}
                  <span style={{ color: "#e8291c" }}>REPLACED.</span>
                </p>
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ── TICKER 2 ────────────────────────── */}
        <AnimatedTicker texts={["CORSETS", "DRESSES", "PANTS", "JACKETS", "TOPS", "KNITWEAR", "STRUCTURAL PIECES"]} />

        {/* ═══════════════════════════════════
            05. CATEGORIES — Pinned Horizontal Scroll
        ═══════════════════════════════════ */}
        <PinnedCategories categories={categories} />

        {/* ═══════════════════════════════════
            06. INTERACTIVE BOLD SECTION
        ═══════════════════════════════════ */}
        <InteractiveBoldSection />

        {/* ═══════════════════════════════════
            07. FULL-WIDTH CTA STRIP
        ═══════════════════════════════════ */}
        <ScaleReveal>
          <section
            className="w-full flex flex-col items-center justify-center py-20 px-6 text-center"
            style={{ background: "#0a0a0a" }}
          >
            <SplitText
              text="THE COLLECTION"
              as="h2"
              className="font-black uppercase leading-none mb-8"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(40px, 7vw, 96px)",
                color: "#f0ece4",
                letterSpacing: "-0.02em",
              } as React.CSSProperties}
              stagger={0.04}
            />
            <FadeUp delay={0.6}>
              <Link href="/all-products">
                <motion.span
                  className="inline-block px-10 py-4 font-black uppercase text-sm tracking-widest"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    border: "2px solid #f0ece4",
                    color: "#f0ece4",
                    letterSpacing: "0.2em",
                    display: "inline-block",
                  }}
                  whileHover={{
                    background: "#f0ece4",
                    color: "#0a0a0a",
                    scale: 1.03,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  [ SHOP NOW ]
                </motion.span>
              </Link>
            </FadeUp>
          </section>
        </ScaleReveal>

      </div>
    </PageTransition>
  );
}
