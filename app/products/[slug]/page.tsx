import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductDetailsClient from "./product-details-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Statically generate the paths for products at build time
export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const rawProduct = await prisma.product.findUnique({ where: { slug } });
  
  if (!rawProduct) {
    notFound();
  }

  const product = {
    ...rawProduct,
    originalPrice: rawProduct.originalPrice ?? undefined,
    details: JSON.parse(rawProduct.details),
    care: JSON.parse(rawProduct.care),
    sizes: JSON.parse(rawProduct.sizes),
  };

  if (!product) {
    notFound();
  }

  const relatedRaw = await prisma.product.findMany({
    where: { id: { not: product.id } },
    take: 4,
  });

  const relatedProducts = relatedRaw.map((p) => ({
    ...p,
    originalPrice: p.originalPrice ?? undefined,
    details: JSON.parse(p.details),
    care: JSON.parse(p.care),
    sizes: JSON.parse(p.sizes),
  }));

  return <ProductDetailsClient product={product} relatedProducts={relatedProducts} />;
}
