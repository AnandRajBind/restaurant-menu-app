import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

/**
 * 404 Not Found Middleware for capturing unhandled endpoint requests.
 */
export const notFoundHandler = (req, res, next) => {
  const error = new ApiError(
    HTTP_STATUS.NOT_FOUND,
    `Route Not Found - [${req.method}] ${req.originalUrl}`
  );
  next(error);
};
