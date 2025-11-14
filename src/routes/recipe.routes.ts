import { Router } from 'express';
import {
  getAllRecipes,
  getRecipeById,
} from '../controllers/recipe.controller.js';

const router = Router();

// api/recipes
// api/recipes?category=Postres
router.get('/', getAllRecipes);

// api/recipes/1
router.get('/:id', getRecipeById);

export default router;