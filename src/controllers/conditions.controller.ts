import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';

export const getConditions = async (req: Request, res: Response) => {
  try {
    const conditions = await prisma.condition.findMany({
      orderBy: {
        name: 'asc' 
      }
    });
    res.status(200).json(conditions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las condiciones' });
  }
};
