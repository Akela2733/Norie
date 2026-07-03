import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  showBestSeller?: boolean;
  size?: "normal" | "large";
}

export default function ProductCard({ product, showBestSeller = false, size = "normal" }: ProductCardProps) {
  const isBestSeller = showBestSeller && product.isBestSeller;
  const hasDiscount = !!product.originalPrice;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block relative"
      style={{ background: "#f0ece4" }}
    >
      {/* Image container — full bleed, no border */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "2/3",
          background: "#e8e2da",
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* BEST SELLER badge — black painted brushstroke style */}
        {isBestSeller && (
          <div
            className="absolute top-4 left-0 z-10 px-4 py-1"
            style={{
              background: "#0a0a0a",
              clipPath: "polygon(0 15%, 2% 0%, 98% 5%, 100% 0%, 100% 85%, 98% 100%, 2% 95%, 0 100%)",
              transform: "rotate(-1.5deg)",
            }}
          >
            <span
              className="text-white font-black text-xs uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              BEST SELLER
            </span>
          </div>
        )}

        {/* NEW badge */}
        {product.isNewArrival && !isBestSeller && (
          <div className="absolute top-4 left-4 z-10 bg-[#e8291c] px-2 py-0.5">
            <span
              className="text-white font-black text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              NEW
            </span>
          </div>
        )}

        {/* SALE badge */}
        {hasDiscount && (
          <div className="absolute top-4 right-4 z-10 bg-black px-2 py-0.5">
            <span
              className="text-white font-black text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              SALE
            </span>
          </div>
        )}
      </div>

      {/* Info below image */}
      <div className="px-3 py-3">
        <p
          className="font-black uppercase text-sm tracking-wide leading-tight group-hover:text-[#e8291c] transition-colors"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {product.name}
        </p>
        <div className="flex items-center gap-2 mt-1">
          {hasDiscount && (
            <span className="text-xs line-through opacity-40" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              {product.originalPrice}_$
            </span>
          )}
          <span
            className="text-sm font-bold"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: hasDiscount ? "#e8291c" : "#0a0a0a",
            }}
          >
            {product.price}_$
          </span>
        </div>
      </div>
    </Link>
  );
}
