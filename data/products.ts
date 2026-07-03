export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  category: string;
  description: string;
  details: string[];
  care: string[];
  sizes: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  // ================= CORSETS =================
  {
    id: "norie-01",
    name: "lumina satin corset",
    price: 180,
    image: "/categories/corsets1.jpg",
    slug: "lumina-satin-corset",
    category: "CORSETS",
    description: "a structured, high-fashion corset top made from premium heavy satin, featuring steel-boned architecture and back lace detailing.",
    details: ["steel-boned internal construction", "premium heavy satin fabric", "adjustable eyelet ribbon lacing"],
    care: ["dry clean only"],
    sizes: ["XS", "S", "M", "L"],
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: "norie-02",
    name: "obsidian lace corset",
    price: 195,
    image: "/categories/corsets2.webp",
    slug: "obsidian-lace-corset",
    category: "CORSETS",
    description: "dark, romantic lace corset with semi-sheer panels and structural boning. perfect for evening wear.",
    details: ["french lace overlay", "semi-sheer mesh panels", "hook-and-eye front closure"],
    care: ["hand wash cold", "lay flat to dry"],
    sizes: ["XS", "S", "M"],
    isBestSeller: true
  },
  {
    id: "norie-03",
    name: "velvet structure corset",
    price: 210,
    image: "/categories/corsets3.jpg",
    slug: "velvet-structure-corset",
    category: "CORSETS",
    description: "plush velvet corset with a dramatic deep-v neckline and architectural shaping.",
    details: ["crushed velvet exterior", "deep-v plunge neckline", "side zip closure"],
    care: ["dry clean only"],
    sizes: ["S", "M", "L"]
  },

  // ================= DRESSES =================
  {
    id: "norie-04",
    name: "cowl velvet dress",
    price: 260,
    image: "/categories/dresses1.webp",
    slug: "cowl-velvet-dress",
    category: "DRESSES",
    description: "a flowing cowl-neck slip dress crafted from luxurious deep purple velvet with a subtle metallic sheen.",
    details: ["luxurious mid-weight velvet", "draped cowl neckline", "high leg split"],
    care: ["dry clean only", "steam gently"],
    sizes: ["XS", "S", "M", "L"],
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: "norie-05",
    name: "asymmetric silk slip",
    price: 240,
    image: "/categories/dresses2.jpg",
    slug: "asymmetric-silk-slip",
    category: "DRESSES",
    description: "pure silk slip dress featuring an asymmetric hem and delicate raw edges for an undone elegance.",
    details: ["100% pure silk", "asymmetric raw hem", "adjustable delicate straps"],
    care: ["dry clean only"],
    sizes: ["S", "M", "L"]
  },
  {
    id: "norie-06",
    name: "midnight mesh maxi",
    price: 290,
    image: "/categories/dresses3.jpg",
    slug: "midnight-mesh-maxi",
    category: "DRESSES",
    description: "floor-length double-layered mesh dress with subtle ruching and a body-skimming fit.",
    details: ["double-layered power mesh", "strategic ruching", "floor-sweeping length"],
    care: ["hand wash cold"],
    sizes: ["XS", "S", "M"]
  },

  // ================= PANTS =================
  {
    id: "norie-07",
    name: "structure cargo trousers",
    price: 220,
    image: "/categories/pants1.webp",
    slug: "structure-cargo-trousers",
    category: "PANTS",
    description: "wide-leg structured cargo pants designed with double-pleat knees, modular utility pockets, and adjustable tab ankles.",
    details: ["heavyweight cotton canvas", "modular utility pockets", "adjustable buckle tabs"],
    care: ["machine wash cold", "hang dry"],
    sizes: ["S", "M", "L"],
    isBestSeller: true
  },
  {
    id: "norie-08",
    name: "pleated wide-leg pants",
    price: 190,
    image: "/categories/pants2.webp",
    slug: "pleated-wide-leg-pants",
    category: "PANTS",
    description: "fluid, perfectly tailored wide-leg trousers with deep front pleats and a high-waisted fit.",
    details: ["tailored suiting fabric", "deep front pleats", "high-rise waistband"],
    care: ["dry clean recommended"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "norie-09",
    name: "leather flare trousers",
    price: 340,
    image: "/categories/pants3.jpg",
    slug: "leather-flare-trousers",
    category: "PANTS",
    description: "genuine leather pants with a sleek fit through the thigh and a dramatic flared hem.",
    details: ["100% genuine leather", "dramatic flare hem", "matte black hardware"],
    care: ["specialist leather clean only"],
    sizes: ["S", "M", "L"],
    isNewArrival: true
  },

  // ================= JACKETS =================
  {
    id: "norie-10",
    name: "metallic leather jacket",
    price: 480,
    originalPrice: 620,
    image: "/categories/jackets1.jpg",
    slug: "metallic-leather-jacket",
    category: "JACKETS",
    description: "an avant-garde biker jacket made from textured distressed lambskin, finished with a subtle violet metallic wax coating.",
    details: ["genuine lambskin leather", "metallic wax coating", "asymmetrical front closure"],
    care: ["specialist leather clean only"],
    sizes: ["XS", "S", "M", "L"],
    isNewArrival: true
  },
  {
    id: "norie-11",
    name: "cropped utility bomber",
    price: 280,
    image: "/categories/jackets2.jpg",
    slug: "cropped-utility-bomber",
    category: "JACKETS",
    description: "exaggerated oversized sleeves paired with a severely cropped body for a striking silhouette.",
    details: ["water-resistant nylon shell", "exaggerated sleeve volume", "rib-knit trims"],
    care: ["machine wash cold gentle"],
    sizes: ["S", "M", "L"]
  },
  {
    id: "norie-12",
    name: "oversized wool blazer",
    price: 320,
    image: "/categories/jackets3.jpg",
    slug: "oversized-wool-blazer",
    category: "JACKETS",
    description: "heavyweight structured wool blazer with strong shoulders and an intentionally oversized, boxy fit.",
    details: ["heavyweight wool blend", "structured shoulder pads", "double-breasted closure"],
    care: ["dry clean only"],
    sizes: ["XS", "S", "M"]
  },

  // ================= TOPS =================
  {
    id: "norie-13",
    name: "distressed knit sweater",
    price: 195,
    originalPrice: 280,
    image: "/categories/tops1.jpg",
    slug: "distressed-knit-sweater",
    category: "TOPS",
    description: "an oversized knit sweater featuring laddered stitch details, raw edges, and a cozy mohair-blend texture.",
    details: ["mohair-wool blend", "laddered drop-stitch distressing", "dropped shoulders"],
    care: ["hand wash cold"],
    sizes: ["S", "M", "L"]
  },
  {
    id: "norie-14",
    name: "sheer organza blouse",
    price: 150,
    image: "/categories/tops2.jpg",
    slug: "sheer-organza-blouse",
    category: "TOPS",
    description: "translucent silk-organza blouse with exaggerated cuffs and a sharp pointed collar.",
    details: ["100% silk organza", "exaggerated split cuffs", "hidden button placket"],
    care: ["dry clean only"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: "norie-15",
    name: "ribbed asymmetric tank",
    price: 85,
    image: "/categories/tops3.jpg",
    slug: "ribbed-asymmetric-tank",
    category: "TOPS",
    description: "form-fitting ribbed cotton tank with a completely asymmetric cutout neckline.",
    details: ["heavyweight ribbed cotton", "asymmetric neckline cutout", "raw hem detailing"],
    care: ["machine wash cold"],
    sizes: ["XS", "S", "M", "L"],
    isBestSeller: true
  }
];

export const categoriesList = ["ALL", "CORSETS", "DRESSES", "PANTS", "JACKETS", "TOPS"];
