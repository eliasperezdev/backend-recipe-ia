import 'dotenv/config';
import { prisma } from '../src/lib/prisma.ts'; 
import { main as seedCategories } from './seeds/seed-categories.ts';
import { main as seedConditions } from './seeds/seed-conditions.ts';
import { main as seedRecipes } from './seeds/seed-recipes.ts';

async function main() {
  
  await seedCategories();
  await seedConditions();
  await seedRecipes();

}

main()
  .catch(async (e) => {
    console.error('Error durante el seeding maestro:', e);
    await prisma.$disconnect(); 
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); 
  });