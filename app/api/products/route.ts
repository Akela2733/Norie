import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { products as fallbackProducts } from '@/data/products';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    // Parse the JSON string arrays back to objects
    const formattedProducts = products.map((p) => ({
      ...p,
      details: JSON.parse(p.details),
      care: JSON.parse(p.care),
      sizes: JSON.parse(p.sizes),
    }));
    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products from Prisma, falling back to static data:', error);
    return NextResponse.json(fallbackProducts);
  }
}
