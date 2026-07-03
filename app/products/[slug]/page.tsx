import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailsClient from "./product-details-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Statically generate the paths for products at build time
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}
