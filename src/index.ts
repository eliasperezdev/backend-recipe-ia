import 'dotenv/config'; 
import express, { Request, Response } from 'express';
import conditionRoute from './routes/conditions.routes.js'
import conditionCategory from './routes/categories.routes.js'

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola Mundo con TypeScript y Módulos!');
});

app.use('/api', conditionRoute);
app.use('/api', conditionCategory);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});