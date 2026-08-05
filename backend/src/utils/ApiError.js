import { HTTP_STATUS } from '../constants/httpStatus.js';

/**
 * Standardized Custom API Error class extending native Error.
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message summary
   * @param {Array} [errors=[]] - Array of detailed error objects/strings
   * @param {string} [stack=""] - Custom stack trace string
   */
  constructor(
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message = 'Something went wrong',
    errors = [],
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
