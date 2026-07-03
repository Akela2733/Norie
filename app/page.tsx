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
import { products } from "@/data/products";

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

// ── Product Card with advanced hover animation ──
function AnimatedProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
        <ProductCard product={product} showBestSeller />
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const newArrivals = products.filter((p) => p.isNewArrival);
  const bestSellers = products.filter((p) => p.isBestSeller);


  const autumnRef = useRef<HTMLElement>(null);
  const { scrollYProgress: autumnScroll } = useScroll({ target: autumnRef, offset: ["start end", "end start"] });
  const autumnTextY = useTransform(autumnScroll, [0, 1], [150, -150]);

  const structureRef = useRef<HTMLElement>(null);
  const { scrollYProgress: structureScroll } = useScroll({ target: structureRef, offset: ["start end", "end start"] });
  const structureTextY = useTransform(structureScroll, [0, 1], [150, -150]);
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

        <HeroSlider />

        {/* TICKER 1 */}
        <AnimatedTicker texts={["NORIE STUDIO", "WHERE GLAM MEETS GRUNGE", "AUTUMN COLLECTION", "STRUCTURAL DESIGN", "COLLECTION NO. 01"]} />

        {/* ═══════════════════════════════════
            02. NEW ARRIVALS
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {newArrivals.map((product, i) => (
              <AnimatedProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════
            03. CAMPAIGN — Dark strip with parallax
        ═══════════════════════════════════ */}
        <section ref={autumnRef} className="relative w-full overflow-hidden" style={{ minHeight: "70vh", background: "#0a0a0a" }}>
          <ParallaxImage speed={0.2} className="absolute inset-0 w-full h-full">
            <div className="relative w-full h-full" style={{ minHeight: "85vh" }}>
              <Image src="/images/background1.webp" alt="Campaign" fill className="object-cover" style={{ opacity: 0.55 }} />
            </div>
          </ParallaxImage>

          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
            <FadeUp>
              <span
                className="text-sm font-black uppercase tracking-widest"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
              >
                03. CAMPAIGN
              </span>
            </FadeUp>

            <div className="flex justify-between items-end">
              <FadeUp delay={0.2}>
                <motion.div style={{ y: autumnTextY }}>
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
              </FadeUp>
              <SlideIn direction="right" delay={0.3}>
                <span
                  className="text-xs font-bold uppercase tracking-widest text-white/50"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  (UA)
                </span>
              </SlideIn>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            04. EDITORIAL STATEMENT with parallax
        ═══════════════════════════════════ */}
        <section
          ref={structureRef}
          className="relative w-full overflow-hidden"
          style={{ minHeight: "60vh", background: "#d8d0c4" }}
        >
          <ParallaxImage speed={0.15} className="absolute inset-0 w-full h-full">
            <div className="relative w-full h-full" style={{ minHeight: "75vh" }}>
              <Image src="/images/background2.avif" alt="Editorial" fill className="object-cover object-top" style={{ opacity: 0.55 }} />
            </div>
          </ParallaxImage>

          <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-12">
            <SlideIn direction="left" delay={0.1}>
              <motion.h2
                className="uppercase font-black leading-none"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(50px, 8vw, 110px)",
                  color: "#0a0a0a",
                  letterSpacing: "-0.02em",
                  y: structureTextY,
                }}
              >
                STRUCTURE
                <br />
                <motion.span
                  style={{ fontStyle: "italic", fontSize: "0.7em", color: "#0a0a0a" }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.7 }}
                >
                  (SUBVERSION)
                </motion.span>
              </motion.h2>
            </SlideIn>

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
        </section>

        {/* TICKER 2 */}
        <AnimatedTicker texts={["CORSETS", "DRESSES", "PANTS", "JACKETS", "TOPS", "KNITWEAR", "STRUCTURAL PIECES"]} />

        {/* ═══════════════════════════════════
            05. CATEGORIES — Scroll reveal + hover
        ═══════════════════════════════════ */}
        <section className="w-full py-12 px-5 sm:px-8" style={{ background: "#f0ece4" }}>
          <FadeUp>
            <span
              className="block text-sm font-black uppercase tracking-widest mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
            >
              05. CATEGORIES
            </span>
          </FadeUp>

          <div className="flex gap-0 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ flexShrink: 0, width: "20vw", minWidth: "180px", maxWidth: "260px", height: "55vh", minHeight: "380px" }}
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

                  {/* Vertical label */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center z-10"
                    whileHover={{ backgroundColor: "rgba(232, 41, 28, 0.12)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      className="vertical-text font-black uppercase leading-none select-none"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "clamp(24px, 3vw, 48px)",
                        color: "#0a0a0a",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {cat.name}
                    </span>
                  </motion.div>

                  {/* Count badge */}
                  <motion.div
                    className="absolute bottom-4 right-4 z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span
                      className="font-bold text-xs"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      [ {cat.count} ]
                    </span>
                  </motion.div>

                  {/* Hover overlay — red tint bar at bottom */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 z-20"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ background: "#e8291c", transformOrigin: "left" }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

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
