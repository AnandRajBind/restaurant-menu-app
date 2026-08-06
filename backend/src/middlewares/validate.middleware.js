import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

/**
 * Middleware that inspects express-validator results.
 * If validation fails, throws an ApiError with HTTP 400 Bad Request and field error details.
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const formattedErrors = errors.array().map((err) => ({
    field: err.path || err.param,
    message: err.msg,
  }));

  throw new ApiError(
    HTTP_STATUS.BAD_REQUEST,
    'Validation failed. Please check input data.',
    formattedErrors
  );
};
