import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full select-none" style={{ background: "#e0d8cc" }}>

      {/* ── Torn paper top edge using SVG ── */}
      <div className="w-full overflow-hidden leading-none" style={{ height: "32px", background: "#f0ece4" }}>
        <svg
          viewBox="0 0 1440 32"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ display: "block" }}
        >
          <path
            d="M0,32 L0,18 L12,4 L24,20 L36,6 L48,22 L60,8 L72,24 L84,10 L96,26 L108,5 L120,20 L132,7 L144,23 L156,9 L168,25 L180,11 L192,27 L204,6 L216,22 L228,8 L240,24 L252,10 L264,26 L276,5 L288,21 L300,7 L312,23 L324,9 L336,25 L348,11 L360,27 L372,6 L384,22 L396,8 L408,24 L420,10 L432,26 L444,5 L456,21 L468,7 L480,23 L492,9 L504,25 L516,11 L528,27 L540,6 L552,22 L564,8 L576,24 L588,10 L600,26 L612,5 L624,21 L636,7 L648,23 L660,9 L672,25 L684,11 L696,27 L708,6 L720,22 L732,8 L744,24 L756,10 L768,26 L780,5 L792,21 L804,7 L816,23 L828,9 L840,25 L852,11 L864,27 L876,6 L888,22 L900,8 L912,24 L924,10 L936,26 L948,5 L960,21 L972,7 L984,23 L996,9 L1008,25 L1020,11 L1032,27 L1044,6 L1056,22 L1068,8 L1080,24 L1092,10 L1104,26 L1116,5 L1128,21 L1140,7 L1152,23 L1164,9 L1176,25 L1188,11 L1200,27 L1212,6 L1224,22 L1236,8 L1248,24 L1260,10 L1272,26 L1284,5 L1296,21 L1308,7 L1320,23 L1332,9 L1344,25 L1356,11 L1368,27 L1380,6 L1392,22 L1404,8 L1416,24 L1428,10 L1440,26 L1440,32 Z"
            fill="#e0d8cc"
          />
        </svg>
      </div>

      {/* ── Footer content ── */}
      <div className="px-6 sm:px-10 pt-10 pb-8">

        {/* Main link grid */}
        <div className="flex flex-wrap gap-x-12 gap-y-2 mb-8">
          <Link
            href="/all-products"
            className="text-xs font-bold uppercase tracking-widest hover:text-[#e8291c] transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            SHOP ALL
          </Link>
          <Link
            href="/all-products"
            className="text-xs font-bold uppercase tracking-widest hover:text-[#e8291c] transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            CATEGORIES
          </Link>
          <Link
            href="/who-are-we"
            className="text-xs font-bold uppercase tracking-widest hover:text-[#e8291c] transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            WHO WE ARE
          </Link>
          <Link
            href="/all-products"
            className="text-xs font-bold uppercase tracking-widest hover:text-[#e8291c] transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            CAMPAIGN
          </Link>
          <Link
            href="/contact"
            className="text-xs font-bold uppercase tracking-widest hover:text-[#e8291c] transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            CONTACT
          </Link>
          <Link
            href="/all-products?sale=true"
            className="text-xs font-bold uppercase tracking-widest transition-colors"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
          >
            SALE
          </Link>
        </div>

        {/* Secondary links row */}
        <div className="flex flex-wrap gap-x-10 gap-y-1 mb-10">
          <span
            className="text-xs font-bold uppercase tracking-widest opacity-50 cursor-default"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            RETURN
          </span>
          <span
            className="text-xs font-bold uppercase tracking-widest opacity-50 cursor-default"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            IMPRESSUM
          </span>
          <span
            className="text-xs font-bold uppercase tracking-widest opacity-50 cursor-default"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            SHIPPING AND PAYMENT
          </span>
          <span
            className="text-xs font-bold uppercase tracking-widest opacity-50 cursor-default"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            FAQ
          </span>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t flex justify-between items-center pt-5 text-xs font-bold uppercase tracking-widest opacity-40"
          style={{ borderColor: "rgba(10,10,10,0.2)", fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          <span>© NORIE 2026</span>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:opacity-80">INSTAGRAM</span>
            <span className="cursor-pointer hover:opacity-80">TIKTOK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
