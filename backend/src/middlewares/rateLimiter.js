import rateLimit from 'express-rate-limit';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

/**
 * Standard Express IP Rate Limiter middleware to prevent brute force & denial-of-service requests.
 */
export const apiRateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // Default: 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // Default: 100 requests per window
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  handler: (req, res, next) => {
    next(
      new ApiError(
        HTTP_STATUS.TOO_MANY_REQUESTS,
        'Too many requests from this IP address. Please try again later.'
      )
    );
  },
});
