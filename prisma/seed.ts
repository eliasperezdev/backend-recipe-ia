import 'dotenv/config';
// 👇 ¡USA TU SINGLETON! NO IMPORTES 'PrismaClient'
import { prisma } from '../src/lib/prisma.ts'; 
import { main as seedCategories } from './seeds/seed-categories.ts';
import { main as seedConditions } from './seeds/seed-conditions.ts';
import { main as seedRecipes } from './seeds/seed-recipes.ts';

// ❌ ¡NO HAGAS ESTO!
// const prisma = new PrismaClient(); 

async function main() {
  console.log('--- Iniciando Seeding Maestro ---');
  
  console.log('\nEtapa 1: Sincronizando Categorías...');
  await seedCategories();
  console.log('✅ Etapa 1: Completada.');

  
  console.log('\nEtapa 2: Sincronizando Condiciones/Dietas...');
  await seedConditions();
  console.log('✅ Etapa 2: Completada.');

  
  console.log('\nEtapa 3: Creando Recetas...');
  await seedRecipes();
  console.log('✅ Etapa 3: Completada.');

  console.log('\n--- ¡Seeding Maestro Completado Exitosamente! ---');
}

main()
  .catch(async (e) => {
    console.error('Error durante el seeding maestro:', e);
    // 👇 Usa el 'prisma' importado
    await prisma.$disconnect(); 
    process.exit(1);
  })
  .finally(async () => {
    // 👇 Usa el 'prisma' importado
    await prisma.$disconnect(); 
  });