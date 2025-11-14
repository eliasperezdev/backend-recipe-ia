import { Router } from 'express';
import { getConditions } from '../controllers/conditions.controller.js';

const router = Router();

router.get('/conditions', getConditions);

export default router;