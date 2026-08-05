import dotenv from 'dotenv';

// Load environment variables before any other imports
dotenv.config();

import app from './app.js';
import { connectDB, disconnectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

let server;

/**
 * Bootstraps the application server and database connection.
 */
const startServer = async () => {
  // Connect to MongoDB Database
  await connectDB();

  // Start Express HTTP Server
  server = app.listen(PORT, () => {
    console.log(
      `[Server] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
    );
    console.log(`[Server] API Documentation available at http://localhost:${PORT}/api-docs`);
  });
};

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error('[Process] UNCAUGHT EXCEPTION! Shutting down process immediately...', err);
  process.exit(1);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (reason) => {
  console.error('[Process] UNHANDLED REJECTION! Shutting down server gracefully...', reason);
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
  console.log(`[Process] ${signal} signal received. Closing HTTP server and database connections...`);
  if (server) {
    server.close(async () => {
      console.log('[Process] HTTP server closed.');
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
