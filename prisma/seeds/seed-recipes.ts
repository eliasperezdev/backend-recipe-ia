import { prisma } from '../../src/lib/prisma.ts';

type RecipeData = {
  image: string;
  title: string;
  description: string;
  cooking_type: string;
  cooking_time: string;
  notes: string;
  categories: string[]; 
  conditions: string[];
  steps: string[];
  ingredients: string[];
  macros: {
    calories: string;
    proteins: string;
    fats: string;
    carbohydrates: string;
  };
};

const recipeDataList: RecipeData[] = [
  {
    image: "https://res.cloudinary.com/dymlssv1x/image/upload/v1763124970/Chorizo-a-la-pomarola-300x300_flsmuq.jpg",
    title: "Chorizo a la Pomarola",
    description: "Una salsa italiana clásica con chorizo, tomate y hierbas aromáticas, perfecta para pastas o acompañamientos",
    cooking_type: "Estofado",
    cooking_time: "40 minutos",
    categories: ["Platos Principales", "Italiana"],
    conditions: ["Sin Frutos Secos", "Sin Huevo"],
    macros: {
      calories: "285 kcal por porción",
      proteins: "18g",
      fats: "15g",
      carbohydrates: "12g",
    },
    steps: [
      "Dorar el chorizo en una sartén grande hasta que suelte sus jugos",
      "Añadir la cebolla y el ajo picados, saltear hasta que estén transparentes",
      "Incorporar los tomates triturados y el puré de tomate",
      "Agregar las hierbas aromáticas y salpimentar al gusto",
      "Cocinar a fuego lento durante 25-30 minutos, removiendo ocasionalmente",
      "Rectificar la sazón y servir caliente sobre pasta o con pan"
    ],
    ingredients: [
      "400g de chorizo en rodajas",
      "1 cebolla grande picada",
      "3 dientes de ajo picados",
      "800g de tomates triturados",
      "2 cucharadas de puré de tomate",
      "1 cucharadita de orégano seco",
      "Hojas de albahaca fresca",
      "Sal y pimienta al gusto",
      "Aceite de oliva"
    ],
    notes: "Para mejor resultado, dejar refrigerar toda la noche. Se puede decorar con mermelada de frutos rojos o frutas frescas"
  },
  {
    image: "https://res.cloudinary.com/dymlssv1x/image/upload/v1763124970/milanesa-a-la-napolitana_web.jpg_1_jhlqkv.webp",
    title: "Milanesa Napolitana",
    description: "La clásica milanesa argentina cubierta con salsa de tomate, jamón y queso mozzarella.",
    cooking_type: "Horneado / Frito",
    cooking_time: "30 minutos",
    categories: ["Platos Principales", "Argentina"],
    conditions: ["Sin Frutos Secos", "Baja en Sodio", "Vegetariana"],
    macros: {
      calories: "450 kcal por porción",
      proteins: "35g",
      fats: "25g",
      carbohydrates: "20g",
    },
    steps: [
      "Empanar los filetes de ternera pasándolos por huevo batido y luego por pan rallado.",
      "Freír u hornear las milanesas hasta que estén doradas.",
      "Cubrir cada milanesa con salsa de tomate, una feta de jamón y queso mozzarella.",
      "Gratinar en el horno hasta que el queso se derrita y burbujee.",
      "Servir caliente, usualmente con papas fritas."
    ],
    ingredients: [
      "4 filetes de nalga o peceto",
      "2 huevos batidos",
      "Pan rallado",
      "Salsa de tomate",
      "4 fetas de jamón cocido",
      "200g de queso mozzarella",
      "Sal y pimienta al gusto",
      "Orégano"
    ],
    notes: "Asegúrate de que el horno esté bien caliente para gratinar rápidamente sin secar la carne."
  },
  {
    image: "https://res.cloudinary.com/dymlssv1x/image/upload/v1763124969/images_1_cqoypt.jpg",
    title: "Cheesecake Frío Clásico",
    description: "Un delicioso cheesecake frío con base de galleta y cremosa textura, perfecto para días calurosos",
    cooking_type: "Sin horno",
    cooking_time: "30 minutos (más 4 horas de refrigeración)",
    categories: ["Postres", "Sin horno"],
    conditions: ["Sin Frutos Secos", "Baja en Sodio"],
    macros: {
      calories: "320 kcal por porción",
      proteins: "6g",
      fats: "22g",
      carbohydrates: "25g"
    },
    steps: [
      "Triturar las galletas y mezclar con la mantequilla derretida para la base",
      "Forrar un molde desmontable con la mezcla de galletas y presionar bien",
      "Batir el queso crema con el azúcar hasta obtener una crema suave",
      "Incorporar la nata montada y la esencia de vainilla suavemente",
      "Verter la mezcla sobre la base de galletas y alisar la superficie",
      "Refrigerar por mínimo 4 horas antes de servir"
    ],
    ingredients: [
      "200g de galletas digestivas",
      "100g de mantequilla derretida",
      "500g de queso crema a temperatura ambiente",
      "200ml de nata para montar",
      "150g de azúcar glass",
      "1 cucharadita de esencia de vainilla"
    ],
    notes: "Para mejor resultado, dejar refrigerar toda la noche. Se puede decorar con mermelada de frutos rojos o frutas frescas"
  }
];

export async function main() {
  console.log('Iniciando el seeding de recetas...');

  for (const recipeData of recipeDataList) {
    
    const stepsToCreate = recipeData.steps.map(desc => ({ description: desc }));

    const categoriesToConnectOrCreate = recipeData.categories.map(name => ({
      where: { name },
      create: { name }
    }));

    const ingredientsToConnectOrCreate = recipeData.ingredients.map(name => ({
      where: { name },
      create: { name }
    }));

    const conditionsToConnectOrCreate = recipeData.conditions.map(name => ({
      where: { name },
      create: { name }
    }));

    const recipe = await prisma.recipe.create({
      data: {
        title: recipeData.title,
        description: recipeData.description,
        image: recipeData.image,
        cooking_type: recipeData.cooking_type,
        cooking_time: recipeData.cooking_time,
        notes: recipeData.notes,

        macros: {
          create: recipeData.macros
        },

        steps: {
          create: stepsToCreate
        },

        categories: {
          connectOrCreate: categoriesToConnectOrCreate
        },
        ingredients: {
          connectOrCreate: ingredientsToConnectOrCreate
        },
        conditions: {
          connectOrCreate: conditionsToConnectOrCreate
        }
      }
    });

    console.log(`Receta creada: ${recipe.title} (ID: ${recipe.id})`);
  }
}
