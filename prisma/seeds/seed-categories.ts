import { PrismaClient } from '@prisma/client';

import { prisma } from '../../src/lib/prisma';

const categoryList = [
  "Postres",
  "Sin horno",
  "Vegano",
  "Sin Gluten",
  "Ensaladas",
  "Plato Principal",
  "Sopas",
  "Desayunos",
  "Bebidas",
  "Panadería",
  "Carnes Rojas",
  "Aves",
  "Pescados y Mariscos",
  "Pastas",
  "Comida Rápida Saludable",
];

export async function main() {
  console.log('Iniciando el seeding de categorías...');

  const categoriesData = categoryList.map(name => ({
    name: name
  }));

  const result = await prisma.category.createMany({
    data: categoriesData,
    skipDuplicates: true, 
  });

  console.log(`¡Seeding completado!`);
  console.log(`Se crearon ${result.count} nuevas categorías.`);
}

main()
  .catch(async (e) => {
    console.error('Error durante el seeding de categorías:', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });