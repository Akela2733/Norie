import { PrismaClient } from '@prisma/client';
import { products } from '../data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice ?? null,
        image: product.image,
        slug: product.slug,
        category: product.category,
        description: product.description,
        details: JSON.stringify(product.details),
        care: JSON.stringify(product.care),
        sizes: JSON.stringify(product.sizes),
        isNewArrival: product.isNewArrival ?? false,
        isBestSeller: product.isBestSeller ?? false,
      },
    });
  }
  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
