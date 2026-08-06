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
 *     description: Returns operational status, uptime, system memory metrics, and MongoDB connection state.
 *     tags: [System]
 *     responses:
 *       200:
 *         description: System is operational and healthy
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               statusCode: 200
 *               message: "Server is healthy"
 *               data:
 *                 status: "UP"
 *                 uptime: 124.5
 *                 timestamp: "2026-08-06T05:00:00.000Z"
 *                 environment: "development"
 *                 database: "connected"
 *                 memoryUsage:
 *                   rss: 45000000
 *                   heapTotal: 30000000
 *                   heapUsed: 22000000
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
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
