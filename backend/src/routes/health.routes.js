import { Router } from 'express';
import mongoose from 'mongoose';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: System Health Check Endpoint
 *     description: Returns the operational status of the API service and MongoDB database connection.
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Health check successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Server is healthy
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: UP
 *                     uptime:
 *                       type: number
 *                       example: 124.5
 *                     timestamp:
 *                       type: string
 *                       example: 2026-08-05T20:05:00.000Z
 *                     database:
 *                       type: string
 *                       example: connected
 */
router.get(
  '/health',
  asyncHandler(async (req, res) => {
    const dbStateMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    const dbState = dbStateMap[mongoose.connection.readyState] || 'unknown';

    const healthInfo = {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: dbState,
      memoryUsage: process.memoryUsage(),
    };

    return res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(HTTP_STATUS.OK, healthInfo, 'Server is healthy'));
  })
);

export default router;
