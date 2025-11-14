import { prisma } from '../../src/lib/prisma.ts';

const conditionList = [
  "Vegetariana",
  "Vegana",
  "Sin Gluten (Sin TACC)",
  "Baja en Calorías",
  "Keto o Cetogénica",
  "Paleo",
  "Mediterránea",
  "Baja en Carbohidratos",
  "Alta en Proteínas",
  "Baja en Sodio",
  "Diabética",
  "Baja en Grasas",
  "Sin Lactosa",
  "Baja en FODMAP",
  "Renal (Baja en Potasio)",
  "Antiinflamatoria",
  "Sin Azúcar",
  "Ayuno Intermitente",
  "DASH (Para hipertensión)",
  "Sin Frutos Secos",
  "Sin Mariscos",
  "Sin Huevo",
  "Flexitariana"
];

export async function main() {
  console.log('Iniciando el seeding de condiciones/dietas...');

  const conditionsData = conditionList.map(name => ({
    name: name
  }));

  const result = await prisma.condition.createMany({
    data: conditionsData,
    skipDuplicates: true,
  });

  console.log(`¡Seeding completado!`);
  console.log(`Se crearon ${result.count} nuevas condiciones/dietas.`);
}
