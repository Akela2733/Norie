"use client";

import Link from "next/link";
import Image from "next/image";
import { PageTransition, SplitText, FadeUp, StaggerContainer, StaggerItem, ParallaxImage } from "@/components/Animations";

export default function WhoAreWe() {
  return (
    <PageTransition>
    <div className="w-full select-none" style={{ background: "#f0ece4", color: "#0a0a0a" }}>

      {/* ─── HERO ─── */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "55vh" }}>
        <ParallaxImage speed={0.15} className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full" style={{ minHeight: "75vh" }}>
            <Image
              src="/images/hero.png"
              alt="Norie Studio"
              fill
              priority
              className="object-cover"
              style={{ opacity: 0.45 }}
            />
          </div>
        </ParallaxImage>
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10">
          <FadeUp>
            <span
              className="text-sm font-black uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
            >
              WHO WE ARE
            </span>
          </FadeUp>
          <div>
            <SplitText
              text="NORIE STUDIO"
              as="h1"
              className="font-black uppercase leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(50px, 8vw, 110px)",
                color: "#0a0a0a",
                letterSpacing: "-0.02em",
              } as React.CSSProperties}
            />
          </div>
        </div>
      </section>

      {/* ─── MANIFESTO ─── */}
      <section className="px-5 sm:px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        <FadeUp>
          <span
            className="text-sm font-black uppercase tracking-widest"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
          >
            01. THE CORE MANIFESTO
          </span>
          <SplitText
            text="STRUCTURED SUBVERSION"
            as="h2"
            className="font-black uppercase mt-4 leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              letterSpacing: "-0.01em",
            } as React.CSSProperties}
            delay={0.2}
          />
          <div className="h-0.5 w-16 mt-6" style={{ background: "#0a0a0a" }} />
        </FadeUp>

        <StaggerContainer
          delay={0.2}
          className="space-y-6 text-sm leading-relaxed"
          style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(10,10,10,0.65)" }}
        >
          <StaggerItem>
            <p>
              Norie was founded as a design studio dedicated to exploring the boundaries of
              high-end tailoring and raw subcultural elements. We construct garments that speak
              to tension — the dynamic interplay between structured steel-boned architectures
              and the fluid elegance of velvet and satin.
            </p>
          </StaggerItem>
          <StaggerItem>
            <p
              className="pl-4 italic text-base"
              style={{ borderLeft: "3px solid #0a0a0a", color: "#0a0a0a" }}
            >
              "We do not design to blend in. Our collections represent a curation of dark
              elegance, crafted in limited runs with careful attention to material finishes,
              distressed textures, and metallic wax coatings."
            </p>
          </StaggerItem>
          <StaggerItem>
            <p>
              Every piece in our archival catalog is developed in-house, focusing on a
              monochrome, charcoal, and obsidian color palette. Our silhouettes are bold,
              deliberate, and designed to look and feel premium in every setting.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ─── PILLARS ─── */}
      <section className="px-5 sm:px-10 py-16" style={{ background: "#e8e2da" }}>
        <FadeUp>
          <span
            className="block text-sm font-black uppercase tracking-widest mb-10"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
          >
            02. ARCHITECTURAL PILLARS
          </span>
        </FadeUp>
        <StaggerContainer delay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {[
            {
              num: "01",
              title: "MATERIALITY",
              body: "Heavyweight cotton canvases, genuine lambskin coated with metallic wax, raw drop-stitch mohair, and liquid heavy-draped velvets form our physical foundation.",
              tag: "[ PREMIUM FIBER SOURCING ]",
            },
            {
              num: "02",
              title: "STRUCTURE",
              body: "From steel-boned internal corset cages to pleated articulated knees and ankle buckle adjustments, we construct garments that mold to shape.",
              tag: "[ SHAPE AND DURABILITY ]",
            },
            {
              num: "03",
              title: "CONTRAST",
              body: "Where glam meets grunge. Combining classic high-fashion luxury textures with industrial zippers, metal eyelets, distressed hems, and asymmetrical lines.",
              tag: "[ SUBCULTURAL SYMMETRY ]",
            },
          ].map(p => (
            <StaggerItem
              key={p.num}
              className="p-8 flex flex-col justify-between"
              style={{ borderRight: "1px solid rgba(10,10,10,0.1)", minHeight: "300px" }}
            >
              <div>
                <span
                  className="text-4xl font-black opacity-15 block mb-4"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {p.num}
                </span>
                <h3
                  className="text-xl font-black uppercase mb-3"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-60" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {p.body}
                </p>
              </div>
              <span
                className="mt-6 text-xs font-black uppercase tracking-widest opacity-40"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {p.tag}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ─── CTA ─── */}
      <FadeUp className="px-5 sm:px-10 py-16 flex flex-col sm:flex-row items-start gap-6">
        <Link
          href="/all-products"
          className="font-black uppercase text-sm tracking-widest px-8 py-4 transition-all hover:bg-[#e8291c] hover:text-white"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            border: "2px solid #0a0a0a",
            letterSpacing: "0.2em",
          }}
        >
          [ SEE COLLECTION ]
        </Link>
        <Link
          href="/contact"
          className="font-black uppercase text-sm tracking-widest px-8 py-4 transition-all hover:opacity-60"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: "0.2em",
            border: "2px solid rgba(10,10,10,0.2)",
          }}
        >
          [ CONTACT US ]
        </Link>
      </FadeUp>

    </div>
    </PageTransition>
  );
}
