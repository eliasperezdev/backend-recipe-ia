import 'dotenv/config'; 
import express, { Request, Response } from 'express';
import conditionRoute from './routes/conditions.routes.js'
import categoryRoute from './routes/categories.routes.js'
import recipeRoutes from './routes/recipe.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola Mundo con TypeScript y Módulos!');
});

app.use('/api', conditionRoute);
app.use('/api', categoryRoute);
app.use('/api/recipes', recipeRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});