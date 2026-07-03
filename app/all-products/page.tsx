"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { products, categoriesList } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { PageTransition, SplitText, FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { useTransition } from "@/components/TransitionContext";

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const { navigate } = useTransition();

  const categoryParam = searchParams.get("category");
  const saleParam = searchParams.get("sale");

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [saleOnly, setSaleOnly] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("DEFAULT");
  const [columnsCount, setColumnsCount] = useState<3 | 4>(4);

  useEffect(() => {
    if (categoryParam) {
      const upperParam = categoryParam.toUpperCase();
      setSelectedCategory(categoriesList.includes(upperParam) ? upperParam : "ALL");
    } else {
      setSelectedCategory("ALL");
    }
    setSaleOnly(saleParam === "true");
  }, [categoryParam, saleParam]);

  const handleFilterChange = (cat: string, sale: boolean) => {
    const query = new URLSearchParams();
    if (cat !== "ALL") query.set("category", cat);
    if (sale) query.set("sale", "true");
    const qs = query.toString();
    navigate(qs ? `/all-products?${qs}` : "/all-products");
  };

  let filtered = [...products];
  if (selectedCategory !== "ALL") filtered = filtered.filter(p => p.category.toUpperCase() === selectedCategory);
  if (saleOnly) filtered = filtered.filter(p => p.originalPrice !== undefined);
  if (selectedSize !== "ALL") filtered = filtered.filter(p => p.sizes.includes(selectedSize));
  if (sortBy === "PRICE_ASC") filtered.sort((a, b) => a.price - b.price);
  if (sortBy === "PRICE_DESC") filtered.sort((a, b) => b.price - a.price);

  const selectStyle = {
    background: "#f0ece4",
    border: "1.5px solid rgba(10,10,10,0.25)",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: "11px",
    letterSpacing: "0.1em",
    padding: "4px 10px",
    cursor: "pointer",
    outline: "none",
    appearance: "none" as const,
  };

  return (
    <PageTransition>
    <div className="w-full min-h-screen select-none" style={{ background: "#f0ece4", color: "#0a0a0a" }}>
      <div className="px-5 sm:px-8 py-6">

        {/* ── Title bar ── */}
        <div className="flex items-end justify-between mb-6 overflow-hidden">
          <SplitText
            text={`[ ${selectedCategory === "ALL" ? "ALL PRODUCTS" : selectedCategory} ]`}
            as="h1"
            className="font-black uppercase"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(24px, 4vw, 48px)",
              letterSpacing: "-0.01em",
              color: "#e8291c",
            } as React.CSSProperties}
          />
          <FadeUp delay={0.2}>
            <span
              className="font-bold uppercase text-xs tracking-widest opacity-60"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              [ {filtered.length} - ITEMS ]
            </span>
          </FadeUp>
        </div>

        {/* ── Toolbar ── */}
        <FadeUp delay={0.3}>
          <div
            className="flex flex-wrap items-center gap-4 py-3 mb-8"
            style={{ borderTop: "1.5px solid rgba(10,10,10,0.15)", borderBottom: "1.5px solid rgba(10,10,10,0.15)" }}
          >
          {/* SIZE + */}
          <div className="flex items-center gap-2">
            <span
              className="font-bold uppercase text-xs tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              SIZE +
            </span>
            <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)} style={selectStyle}>
              <option value="ALL">ALL</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>

          {/* SORT BY + */}
          <div className="flex items-center gap-2">
            <span
              className="font-bold uppercase text-xs tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              SORT BY +
            </span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
              <option value="DEFAULT">BEST SEL...</option>
              <option value="PRICE_ASC">PRICE LOW-HIGH</option>
              <option value="PRICE_DESC">PRICE HIGH-LOW</option>
            </select>
          </div>

          {/* CATEGORY + */}
          <div className="flex items-center gap-2">
            <span
              className="font-bold uppercase text-xs tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              CATEGORY +
            </span>
            <select value={selectedCategory} onChange={e => handleFilterChange(e.target.value, saleOnly)} style={selectStyle}>
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* SALE toggle */}
          <button
            onClick={() => handleFilterChange(selectedCategory, !saleOnly)}
            className="font-black uppercase text-xs tracking-widest transition-colors cursor-pointer px-3 py-1"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              background: saleOnly ? "#e8291c" : "transparent",
              color: saleOnly ? "#f0ece4" : "#e8291c",
              border: "1.5px solid #e8291c",
            }}
          >
            SALE
          </button>

          {/* Column density */}
          <div className="ml-auto hidden md:flex items-center gap-2">
            {([3, 4] as const).map(n => (
              <button
                key={n}
                onClick={() => setColumnsCount(n)}
                className="font-black uppercase text-xs tracking-widest transition-all cursor-pointer px-3 py-1"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  background: columnsCount === n ? "#0a0a0a" : "transparent",
                  color: columnsCount === n ? "#f0ece4" : "rgba(10,10,10,0.4)",
                  border: "1.5px solid rgba(10,10,10,0.2)",
                }}
              >
                {n === 3 ? "☷" : "⊞"}
              </button>
            ))}
          </div>
          </div>
        </FadeUp>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-32">
            <span
              className="font-bold uppercase text-sm tracking-widest opacity-40"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              NO ITEMS MATCH YOUR FILTERS
            </span>
          </div>
        ) : (
          <StaggerContainer
            className={`grid gap-0 grid-cols-2 ${columnsCount === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}
            delay={0.4}
            stagger={0.05}
          >
            {filtered.map(product => (
              <StaggerItem key={product.id}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  <ProductCard product={product} showBestSeller />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

      </div>
    </div>
    </PageTransition>
  );
}

export default function AllProductsPage() {
  return (
    <Suspense
      fallback={
        <div
          className="w-full min-h-screen flex items-center justify-center font-bold uppercase tracking-widest text-sm opacity-40"
          style={{ background: "#f0ece4", fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          LOADING CATALOG...
        </div>
      }
    >
      <ProductsCatalogContent />
    </Suspense>
  );
}
