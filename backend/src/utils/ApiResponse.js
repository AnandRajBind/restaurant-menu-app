import { HTTP_STATUS } from '../constants/httpStatus.js';

/**
 * Standardized API Response wrapper for consistent JSON structure.
 */
export class ApiResponse {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {any} data - Payload data returned to client
   * @param {string} [message="Success"] - Optional success message
   */
  constructor(statusCode = HTTP_STATUS.OK, data = null, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < HTTP_STATUS.BAD_REQUEST;
  }
}
