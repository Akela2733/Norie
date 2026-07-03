"use client";

import { useStore } from "@/app/store-context";
import { categoriesList } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Drawers() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    activeDrawer,
    setActiveDrawer,
    favorites,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when search drawer opens
  useEffect(() => {
    if (activeDrawer === "search" && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
    }
  }, [activeDrawer]);

  if (activeDrawer === "none") return null;

  // Cart helper calculations
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Upsell items (products not currently in cart)
  const upsellItems = products
    .filter((p) => !cart.some((c) => c.id === p.id))
    .slice(0, 2);

  // Search filtered products
  const filteredProducts = searchQuery.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Close drawers on ESC key
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActiveDrawer("none");
    }
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-300 pointer-events-auto"
        style={{ background: "rgba(10,10,10,0.45)" }}
        onClick={() => setActiveDrawer("none")}
      />

      {/* 1. MENU DRAWER */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-full max-w-sm z-50 transition-transform duration-500 ease-out p-6 sm:p-8 flex flex-col justify-between ${
          activeDrawer === "menu" ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#f0ece4", borderRight: "1px solid rgba(10,10,10,0.15)" }}
      >
        <div>
          <div className="flex justify-between items-center mb-12">
            <span className="text-sm font-black uppercase tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              NAVIGATION
            </span>
            <button
              onClick={() => setActiveDrawer("none")}
              className="text-xs font-black uppercase tracking-widest cursor-pointer hover:text-[#e8291c] transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              [ CLOSE ]
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { label: "SHOP ALL", href: "/all-products" },
              { label: "CAMPAIGN", href: "/all-products" },
              { label: "WHO WE ARE", href: "/who-are-we" },
              { label: "CONTACT", href: "/contact" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setActiveDrawer("none")}
                className="text-3xl font-black uppercase leading-tight hover:text-[#e8291c] transition-colors py-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", borderBottom: "1px solid rgba(10,10,10,0.1)" }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/all-products?sale=true"
              onClick={() => setActiveDrawer("none")}
              className="text-3xl font-black uppercase leading-tight py-2"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
            >
              SALE
            </Link>
          </nav>
        </div>

        <div className="text-xs font-bold uppercase tracking-widest opacity-30" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          <span>© NORIE 2026</span>
        </div>
      </div>

      {/* 2. CATEGORIES DRAWER */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-full max-w-sm z-50 transition-transform duration-500 ease-out p-6 sm:p-8 flex flex-col ${
          activeDrawer === "categories" ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#f0ece4", borderRight: "1px solid rgba(10,10,10,0.15)" }}
      >
        <div className="flex justify-between items-center mb-10">
          <span className="text-sm font-black uppercase tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            CATEGORIES
          </span>
          <button
            onClick={() => setActiveDrawer("none")}
            className="text-xs font-black uppercase tracking-widest cursor-pointer hover:text-[#e8291c] transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            [ CLOSE ]
          </button>
        </div>

        <div className="flex flex-col gap-0">
          {categoriesList.map((cat) => {
            const count = cat === "ALL" ? products.length : products.filter(p => p.category === cat).length;
            const targetUrl = cat === "ALL" ? "/all-products" : `/all-products?category=${cat}`;
            return (
              <Link
                key={cat}
                href={targetUrl}
                onClick={() => setActiveDrawer("none")}
                className="flex justify-between items-center py-3 text-2xl font-black uppercase hover:text-[#e8291c] transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", borderBottom: "1px solid rgba(10,10,10,0.1)" }}
              >
                <span>{cat}</span>
                <span className="text-sm opacity-40">[{count}]</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 3. CART DRAWER */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md z-50 transition-transform duration-500 ease-out p-6 sm:p-8 flex flex-col ${
          activeDrawer === "cart" ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "#f0ece4", borderLeft: "1px solid rgba(10,10,10,0.15)" }}
      >
        <div
          className="flex justify-between items-center mb-8 pb-4"
          style={{ borderBottom: "1px solid rgba(10,10,10,0.12)" }}
        >
          <span className="text-sm font-black uppercase tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            YOUR BAG
          </span>
          <button
            onClick={() => setActiveDrawer("none")}
            className="text-xs font-black uppercase tracking-widest cursor-pointer hover:text-[#e8291c] transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            [ CLOSE ]
          </button>
        </div>

        {/* Cart items list */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <span className="font-mono text-xs text-foreground/40 lowercase tracking-widest">
                your bag is empty
              </span>
            </div>
          ) : (
            cart.map((item) => (
                <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 pb-4 items-center"
                style={{ borderBottom: "1px solid rgba(10,10,10,0.1)" }}
              >
                <div className="relative w-16 aspect-[3/4] overflow-hidden shrink-0" style={{ background: "#e8e2da" }}>
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={() => setActiveDrawer("none")}
                    className="block text-sm font-black uppercase tracking-wide truncate hover:text-[#e8291c] transition-colors"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {item.name}
                  </Link>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-50 mt-1 flex gap-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    <span>SIZE: {item.size}</span>
                    <span>LKR {item.price}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.size, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center font-black text-sm cursor-pointer hover:text-[#e8291c] transition-colors"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", border: "1px solid rgba(10,10,10,0.2)" }}
                    >-</button>
                    <span className="text-sm font-black" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.size, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center font-black text-sm cursor-pointer hover:text-[#e8291c] transition-colors"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", border: "1px solid rgba(10,10,10,0.2)" }}
                    >+</button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-xs font-black uppercase tracking-widest opacity-30 hover:opacity-100 hover:text-[#e8291c] transition-all cursor-pointer"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  ✕
                </button>
              </div>
            ))
          )}

          {/* You may also like (Upsells) */}
          {cart.length > 0 && upsellItems.length > 0 && (
            <div className="mt-8 border-t border-border/20 pt-6">
              <span className="block text-[10px] font-mono lowercase tracking-[0.2em] text-foreground/45 mb-4">
                you may also like:
              </span>
              <div className="grid grid-cols-2 gap-4">
                {upsellItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.slug}`}
                    onClick={() => setActiveDrawer("none")}
                    className="flex items-center gap-2.5 border border-foreground/15 p-2 hover:border-foreground transition-all group"
                  >
                    <div className="relative w-10 aspect-[3/4] overflow-hidden bg-white border border-foreground/15 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[9px] font-mono lowercase tracking-wider truncate group-hover:text-foreground group-hover:underline transition-colors">
                        {item.name}
                      </span>
                      <span className="block text-[9px] font-mono text-foreground/45 mt-0.5">
                        {item.originalPrice ? (
                          <>
                            <span className="line-through text-foreground/25 mr-1.5">LKR {item.originalPrice}</span>
                            <span className="text-primary font-semibold">LKR {item.price}</span>
                          </>
                        ) : (
                          `LKR ${item.price}`
                        )}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="pt-4 mt-4 space-y-4" style={{ borderTop: "1px solid rgba(10,10,10,0.12)" }}>
            <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              <span>SUBTOTAL:</span>
              <span style={{ color: "#e8291c" }}>LKR {cartSubtotal}</span>
            </div>
            <button
              onClick={async () => {
                try {
                  const res = await fetch("/api/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ cart }),
                  });
                  const data = await res.json();
                  if (data.url) {
                    window.location.href = data.url;
                  } else {
                    alert("Checkout failed. Please try again.");
                  }
                } catch (e) {
                  console.error(e);
                  alert("Something went wrong");
                }
              }}
              className="w-full py-4 font-black text-sm uppercase tracking-widest transition-all cursor-pointer text-center"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                background: "#0a0a0a",
                color: "#f0ece4",
                letterSpacing: "0.2em",
              }}
            >
              [ CHECKOUT ]
            </button>
          </div>
        )}
      </div>

      {/* 4. SEARCH OVERLAY */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 p-6 flex flex-col items-center ${
          activeDrawer === "search"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ background: "rgba(240,236,228,0.97)", backdropFilter: "blur(20px)" }}
      >
        <div className="w-full max-w-2xl flex flex-col h-full justify-start pt-16">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-black uppercase tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              SEARCH NORIE
            </span>
            <button
              onClick={() => setActiveDrawer("none")}
              className="text-xs font-black uppercase tracking-widest cursor-pointer hover:text-[#e8291c] transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              [ CLOSE ]
            </button>
          </div>

          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="TYPE TO SEARCH..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-3 text-3xl font-black placeholder:opacity-20 outline-none uppercase"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                borderBottom: "2px solid #0a0a0a",
                letterSpacing: "0.05em",
              }}
            />
          </div>

          {/* Search results */}
          <div className="flex-1 overflow-y-auto mt-8 pr-2">
            {searchQuery.trim() === "" ? (
              <div className="text-center py-12 text-xs font-mono text-foreground/30 lowercase tracking-widest">
                type to begin searching...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-xs font-mono text-foreground/30 lowercase tracking-widest">
                no products found for "{searchQuery}"
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={() => setActiveDrawer("none")}
                    className="group border border-foreground/15 p-2.5 hover:border-foreground transition-all block text-center bg-white"
                  >
                    <div className="relative aspect-[3/4] w-full bg-white border border-foreground/15 overflow-hidden mb-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="block text-[10px] font-mono lowercase tracking-wider truncate text-foreground/80 group-hover:text-foreground group-hover:underline transition-colors">
                      {product.name}
                    </span>
                    <span className="block text-[9px] font-mono text-foreground/50 mt-1">
                      {product.originalPrice ? (
                        <>
                          <span className="line-through text-foreground/25 mr-1.5">LKR {product.originalPrice}</span>
                          <span className="text-foreground font-semibold">LKR {product.price}</span>
                        </>
                      ) : (
                        `LKR ${product.price}`
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
