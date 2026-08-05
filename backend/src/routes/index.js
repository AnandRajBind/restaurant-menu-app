import { Router } from 'express';
import healthRouter from './health.routes.js';

const router = Router();

// Register System Routes
router.use('/', healthRouter);

export default router;
