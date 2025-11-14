import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    let whereClause = {};

    if (category) {
      const categories = Array.isArray(category)
        ? (category as string[])
        : [category as string];

      whereClause = {
        categories: {
          some: {
            name: {
              in: categories,
            },
          },
        },
      };
    }

    const recipes = await prisma.recipe.findMany({
      where: whereClause,
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        categories: {
          select: { name: true },
        },
        conditions: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: 'desc', 
      },
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las recetas' });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipeId = parseInt(id);

    if (isNaN(recipeId)) {
      return res.status(400).json({ error: 'ID de receta inválido' });
    }

    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        macros: true,
        steps: {
          orderBy: { id: 'asc' },
        },
        ingredients: true,
        categories: true,
        conditions: true,
      },
    });

    if (!recipe) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la receta' });
  }
};