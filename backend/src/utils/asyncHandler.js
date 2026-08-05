/**
 * Higher-Order Function wrapper for Express async controllers to catch unhandled promise rejections.
 * Eliminates repetitive try-catch blocks in controller endpoints.
 *
 * @param {Function} requestHandler - Controller function (req, res, next)
 * @returns {Function} Express middleware function
 */
export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
