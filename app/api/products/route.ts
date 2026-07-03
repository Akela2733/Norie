import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
