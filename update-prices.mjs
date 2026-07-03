import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const productsFilePath = path.join(process.cwd(), 'data', 'products.ts');
  let productsFileContent = fs.readFileSync(productsFilePath, 'utf8');

  // Randomly generate prices between 2000 and 4990, in increments of 10
  const generatePrice = () => Math.floor(Math.random() * 300) * 10 + 2000;

  let currentId = '';
  let newPrice = 0;

  // We'll replace price: \d+ with a new price under 5000
  // And originalPrice: \d+ with a new original price under 5000 (but higher than price)
  
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    const price = generatePrice();
    let originalPrice = null;
    
    if (product.originalPrice) {
      originalPrice = price + (Math.floor(Math.random() * 50) * 10 + 500); // 500 to 1000 more
      if (originalPrice >= 5000) {
          originalPrice = 4990;
      }
    }

    // Update DB
    await prisma.product.update({
      where: { id: product.id },
      data: {
        price,
        originalPrice: originalPrice || undefined,
      }
    });

    // Update file content using regex for this specific product ID
    // Find the block for this product
    const idRegex = new RegExp(`id:\\s*["']${product.id}["'],[\\s\\S]*?price:\\s*\\d+,`, 'g');
    productsFileContent = productsFileContent.replace(idRegex, (match) => {
      return match.replace(/price:\s*\d+,/, `price: ${price},`);
    });

    if (originalPrice) {
      const origRegex = new RegExp(`id:\\s*["']${product.id}["'],[\\s\\S]*?originalPrice:\\s*\\d+,`, 'g');
      productsFileContent = productsFileContent.replace(origRegex, (match) => {
        return match.replace(/originalPrice:\s*\d+,/, `originalPrice: ${originalPrice},`);
      });
    }
  }

  fs.writeFileSync(productsFilePath, productsFileContent);
  console.log('Prices successfully updated to be under 5000 LKR in both data/products.ts and the database!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
