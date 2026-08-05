import mongoose from 'mongoose';

/**
 * Connects to MongoDB Atlas using Mongoose with production-ready options & connection event listeners.
 */
export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: process.env.NODE_ENV !== 'production', // Disable autoIndex build in production for performance
    });

    console.log(
      `[Database] MongoDB connected successfully! Host: ${connectionInstance.connection.host}`
    );

    // Monitor Mongoose connection state events
    mongoose.connection.on('error', (err) => {
      console.error(`[Database] MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database] MongoDB connection disconnected.');
    });
  } catch (error) {
    console.error(`[Database] MongoDB connection failed: ${error.message}`);
    // Exit process with failure code if initial database connection fails
    process.exit(1);
  }
};

/**
 * Graceful database disconnect helper for process signals.
 */
export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('[Database] MongoDB connection closed gracefully.');
  } catch (error) {
    console.error(`[Database] Error while closing MongoDB connection: ${error.message}`);
  }
};
