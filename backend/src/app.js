import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import {
  configureCors,
  configureHelmet,
  configureMongoSanitize,
} from './middlewares/security.js';
import { apiRateLimiter } from './middlewares/rateLimiter.js';
import { notFoundHandler } from './middlewares/notFound.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { swaggerSpec } from './config/swagger.js';
import v1Router from './routes/index.js';

const app = express();

// Enable Trust Proxy for Reverse Proxies (Render, Vercel, Cloudflare, NGINX)
app.set('trust proxy', 1);

// Security Middlewares
app.use(configureHelmet());
app.use(configureCors());
app.use(configureMongoSanitize());
app.use('/api/', apiRateLimiter);

// General Body Parsers & Cookie Parser
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// HTTP Request Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Static Assets Serving with Cache Headers (Uploads folder)
app.use(
  '/uploads',
  express.static(path.join(process.cwd(), 'uploads'), {
    maxAge: '1y',
    immutable: true,
  })
);

// Swagger API Documentation Endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base Root Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Restaurant Menu Management System API',
    docs: '/api-docs',
    health: '/api/v1/health',
  });
});

// API Routes Mounting
app.use('/api/v1', v1Router);

// 404 Catch-all Middleware
app.use(notFoundHandler);

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
