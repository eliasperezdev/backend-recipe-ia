import 'dotenv/config'; 
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('¡Hola Mundo con TypeScript y Módulos!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});