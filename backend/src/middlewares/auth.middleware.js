import { verifyAccessToken } from '../utils/jwt.util.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Authentication Middleware: Verifies JWT Access Token from Authorization Header or Cookie.
 * Attaches authenticated user object to `req.user`.
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Extract Bearer token from Authorization Header
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
  // 2. Fallback to cookies if token not provided in Authorization Header
  else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      'Authentication required. Please provide a valid Bearer token.'
    );
  }

  try {
    // 3. Verify JWT Access Token
    const decoded = verifyAccessToken(token);

    // 4. Check if user still exists in database
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        'The user belonging to this token no longer exists.'
      );
    }

    // 5. Attach authenticated user to request context
    req.user = currentUser;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error.name === 'TokenExpiredError') {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        'Access token has expired. Please refresh token or log in again.'
      );
    }
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      'Invalid authentication token. Please log in again.'
    );
  }
});

/**
 * Authorization Middleware (RBAC): Restricts endpoint access to specific user roles.
 * @param {...string} allowedRoles - List of authorized roles (e.g., 'Admin', 'User')
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new ApiError(
          HTTP_STATUS.UNAUTHORIZED,
          'Authentication required prior to authorization check.'
        )
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ApiError(
          HTTP_STATUS.FORBIDDEN,
          `Access Forbidden: Role '${req.user.role}' is not authorized to access this resource.`
        )
      );
    }

    next();
  };
};
