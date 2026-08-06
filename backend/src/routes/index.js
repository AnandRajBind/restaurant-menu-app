import { Router } from 'express';
import healthRouter from './health.routes.js';
import authRouter from './auth.routes.js';
import menuRouter from './menu.routes.js';
import uploadRouter from './upload.routes.js';

const router = Router();

// Register System Routes
router.use('/', healthRouter);

// Register Authentication Routes
router.use('/auth', authRouter);

// Register Menu CRUD Routes
router.use('/menu', menuRouter);

// Register File Upload Routes
router.use('/upload', uploadRouter);

export default router;
