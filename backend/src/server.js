import dotenv from 'dotenv';

// Load environment variables before any other imports
dotenv.config();

import app from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import { validateEnv } from './config/env.config.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 5000;

let server;

/**
 * Bootstraps the application server and database connection.
 */
const startServer = async () => {
  // Validate Environment Variables on boot
  validateEnv();

  // Connect to MongoDB Database
  await connectDB();

  // Start Express HTTP Server
  server = app.listen(PORT, () => {
    logger.info(
      `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
    );
    logger.info(`API Documentation available at http://localhost:${PORT}/api-docs`);
  });
};

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down process immediately...', err);
  process.exit(1);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (reason) => {
  logger.error('UNHANDLED REJECTION! Shutting down server gracefully...', reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Graceful Shutdown Signals (Render / Docker / Kubernetes)
const gracefulShutdown = (signal) => {
  logger.info(`${signal} signal received. Closing HTTP server and database connections...`);
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed.');
      await disconnectDB();
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();
