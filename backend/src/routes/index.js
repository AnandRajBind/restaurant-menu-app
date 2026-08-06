import { Router } from 'express';
import healthRouter from './health.routes.js';
import authRouter from './auth.routes.js';

const router = Router();

// Register System Routes
router.use('/', healthRouter);

// Register Authentication Routes
router.use('/auth', authRouter);

export default router;
