"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product, products } from "@/data/products";
import { useStore } from "@/app/store-context";
import ProductCard from "@/components/ProductCard";
import { FadeUp, SplitText, StaggerContainer, StaggerItem, PageTransition } from "@/components/Animations";


interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart, favorites, toggleFavorite } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [sizeWarning, setSizeWarning] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isCareOpen, setIsCareOpen] = useState<boolean>(false);
  const [addedToBag, setAddedToBag] = useState<boolean>(false);

  const isFavorited = favorites.includes(product.id);
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToBag = () => {
    if (!selectedSize) { setSizeWarning(true); return; }
    setSizeWarning(false);
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image, size: selectedSize, slug: product.slug });
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2500);
  };

  return (
    <PageTransition>
    <div className="w-full select-none" style={{ background: "#f0ece4", color: "#0a0a0a" }}>

      {/* ── Left sidebar breadcrumb (like Serotoninn's left column) ── */}
      <div className="flex min-h-screen">

        {/* Left sidebar — only desktop */}
        <div
          className="hidden lg:flex flex-col justify-between py-8 px-5 text-xs font-bold uppercase tracking-widest"
          style={{
            width: "160px",
            flexShrink: 0,
            fontFamily: "'Barlow Condensed', sans-serif",
            borderRight: "1px solid rgba(10,10,10,0.1)",
          }}
        >
          <div className="space-y-6 opacity-40">
            <Link href="/" className="block hover:opacity-100 hover:text-[#e8291c] transition-all">HOME</Link>
            <Link href="/all-products" className="block hover:opacity-100 hover:text-[#e8291c] transition-all">ALL PRODUCTS</Link>
            <span className="block">{product.category}</span>
          </div>
          <div className="opacity-30 text-[10px] rotate-90 origin-bottom-left translate-x-8 -translate-y-4">
            NORIE 2026
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 px-5 sm:px-8 py-8">

          {/* Mobile breadcrumb */}
          <div
            className="lg:hidden flex gap-3 text-xs font-bold uppercase tracking-widest mb-8 opacity-40"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <Link href="/" className="hover:text-[#e8291c] transition-colors">HOME</Link>
            <span>/</span>
            <Link href="/all-products" className="hover:text-[#e8291c] transition-colors">PRODUCTS</Link>
            <span>/</span>
            <span className="opacity-70">{product.name.toUpperCase()}</span>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-12">

            {/* ── Left: Big product image ── */}
            <FadeUp delay={0.1} className="w-full">
              <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "2/3", background: "#e8e2da" }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
            </FadeUp>

            {/* ── Right: Config panel ── */}
            <StaggerContainer delay={0.2} stagger={0.08} className="py-6 md:py-0 flex flex-col justify-start gap-6">

              {/* Name */}
              <StaggerItem>
                <SplitText
                  text={product.name}
                  as="h1"
                  className="font-black uppercase leading-none"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "clamp(32px, 4vw, 60px)",
                    letterSpacing: "-0.01em",
                  } as React.CSSProperties}
                  stagger={0.03}
                />

                {/* Price */}
                <div className="mt-3 flex items-center gap-3">
                  {product.originalPrice && (
                    <span
                      className="text-base line-through opacity-35 font-bold"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      ({product.originalPrice},00_$)
                    </span>
                  )}
                  <span
                    className="text-xl font-black"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: product.originalPrice ? "#e8291c" : "#e8291c",
                    }}
                  >
                    ({product.price},00_$)
                  </span>
                </div>
              </StaggerItem>

              {/* In stock indicator */}
              <StaggerItem className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: "#2ecc71" }} />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  IN STOCK
                </span>
              </StaggerItem>

              {/* Size selector */}
              <StaggerItem>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-black uppercase tracking-widest"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    SELECT SIZE:
                  </span>
                  <button
                    className="text-xs font-bold uppercase tracking-widest underline opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    SIZE GUIDE
                  </button>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeWarning(false); }}
                      className="font-black uppercase tracking-widest cursor-pointer transition-all"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "13px",
                        padding: "6px 14px",
                        border: selectedSize === size
                          ? "2px solid #0a0a0a"
                          : "1.5px solid rgba(10,10,10,0.25)",
                        background: selectedSize === size ? "#0a0a0a" : "transparent",
                        color: selectedSize === size ? "#f0ece4" : "#0a0a0a",
                      }}
                    >
                      [{size}]
                    </button>
                  ))}
                </div>

                {sizeWarning && (
                  <p
                    className="text-xs font-bold uppercase tracking-widest mt-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
                  >
                    SELECT A SIZE FIRST
                  </p>
                )}
              </StaggerItem>

              {/* Add to Bag — brushstroke button style */}
              <StaggerItem>
                <button
                  onClick={handleAddToBag}
                  className="w-full py-4 font-black uppercase text-sm tracking-widest transition-all cursor-pointer"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    background: addedToBag ? "#2ecc71" : (selectedSize ? "#0a0a0a" : "#8a7a6a"),
                    color: "#f0ece4",
                    letterSpacing: "0.2em",
                    clipPath: selectedSize
                      ? "polygon(0 8%, 1% 0%, 99% 3%, 100% 0%, 100% 92%, 99% 100%, 1% 97%, 0 100%)"
                      : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {addedToBag ? "[ ADDED TO BAG ✓ ]" : (selectedSize ? "[ ADD TO BAG ]" : "[ SELECT SIZE ]")}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="w-full py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer mt-2 hover:text-[#e8291c]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {isFavorited ? "♥ SAVED TO WISHLIST" : "♡ ADD TO WISHLIST"}
                </button>
              </StaggerItem>

              {/* Accordion: 01. DETAILS */}
              <StaggerItem style={{ borderTop: "1.5px solid rgba(10,10,10,0.15)" }}>
                <button
                  onClick={() => setIsDetailsOpen(v => !v)}
                  className="w-full flex justify-between items-center py-4 font-black uppercase tracking-widest text-sm cursor-pointer hover:text-[#e8291c] transition-colors"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  <span>01. DETAILS</span>
                  <span>{isDetailsOpen ? "−" : "+"}</span>
                </button>
                {isDetailsOpen && (
                  <ul className="pb-4 space-y-2">
                    {product.details.map((d, i) => (
                      <li
                        key={i}
                        className="text-xs font-bold uppercase tracking-wide opacity-60 leading-relaxed"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        — {d}
                      </li>
                    ))}
                  </ul>
                )}
              </StaggerItem>

              {/* Accordion: 02. CARE */}
              <StaggerItem style={{ borderTop: "1.5px solid rgba(10,10,10,0.15)", borderBottom: "1.5px solid rgba(10,10,10,0.15)" }}>
                <button
                  onClick={() => setIsCareOpen(v => !v)}
                  className="w-full flex justify-between items-center py-4 font-black uppercase tracking-widest text-sm cursor-pointer hover:text-[#e8291c] transition-colors"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  <span>02. CARE</span>
                  <span>{isCareOpen ? "−" : "+"}</span>
                </button>
                {isCareOpen && (
                  <ul className="pb-4 space-y-2">
                    {product.care.map((c, i) => (
                      <li
                        key={i}
                        className="text-xs font-bold uppercase tracking-wide opacity-60 leading-relaxed"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        — {c}
                      </li>
                    ))}
                  </ul>
                )}
              </StaggerItem>

            </StaggerContainer>
          </div>

          {/* ── YOU MAY ALSO LIKE ── */}
          <div className="mt-20">
            <FadeUp className="flex items-end justify-between mb-8">
              <span
                className="font-black uppercase text-sm tracking-widest"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
              >
                YOU MAY ALSO LIKE
              </span>
              <Link
                href="/all-products"
                className="text-xs font-bold uppercase tracking-widest hover:text-[#e8291c] transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                [ SEE ALL ]
              </Link>
            </FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {relatedProducts.map((p, i) => (
                <FadeUp key={p.id} delay={0.1 * i}>
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                    <ProductCard product={p} />
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
    </PageTransition>
  );
}
