import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { logger } from '../utils/logger.js';

/**
 * Centralized Error Handling Middleware for Express applications.
 * Transforms database, validation, authorization, and unexpected runtime errors into standard ApiError responses.
 */
export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Check if error is an instance of ApiError; if not, wrap/convert it
  if (!(error instanceof ApiError)) {
    let statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message = error.message || 'Internal Server Error';
    let errors = [];

    // Mongoose Validation Error (Schema field constraints failed)
    if (err.name === 'ValidationError') {
      statusCode = HTTP_STATUS.BAD_REQUEST;
      message = 'Validation Error';
      errors = Object.values(err.errors).map((val) => val.message);
    }

    // Mongoose Cast Error (Invalid MongoDB ObjectId format)
    else if (err.name === 'CastError') {
      statusCode = HTTP_STATUS.BAD_REQUEST;
      message = `Invalid format for field: ${err.path}`;
      errors = [`Value '${err.value}' is not a valid ${err.kind}`];
    }

    // Mongoose Duplicate Key Error (Unique index violation - e.g., duplicate email)
    else if (err.code === 11000) {
      statusCode = HTTP_STATUS.CONFLICT;
      const fields = Object.keys(err.keyValue || {}).join(', ');
      message = `Duplicate field value entered: ${fields}`;
      errors = [`An entry with this ${fields} already exists.`];
    }

    // JWT Authorization Errors
    else if (err.name === 'JsonWebTokenError') {
      statusCode = HTTP_STATUS.UNAUTHORIZED;
      message = 'Invalid authentication token';
    } else if (err.name === 'TokenExpiredError') {
      statusCode = HTTP_STATUS.UNAUTHORIZED;
      message = 'Authentication token has expired';
    }

    error = new ApiError(statusCode, message, errors, err.stack);
  }

  // Production-safe response formatting
  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  // Log server errors (5xx) or warnings using centralized logger
  if (error.statusCode >= 500) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${error.message}`, error);
  } else {
    logger.warn(`[${req.method}] ${req.originalUrl} - StatusCode: ${error.statusCode} - ${error.message}`);
  }

  return res.status(error.statusCode).json(response);
};
