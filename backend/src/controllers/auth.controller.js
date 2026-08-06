import { authService } from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from '../utils/jwt.util.js';

class AuthController {
  /**
   * Register a new user
   * POST /api/v1/auth/register
   */
  register = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.registerUser(
      req.body
    );

    // Set refresh token in HTTP-only secure cookie
    setRefreshTokenCookie(res, refreshToken);

    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse(
        HTTP_STATUS.CREATED,
        {
          user,
          accessToken,
        },
        'User registered successfully'
      )
    );
  });

  /**
   * Authenticate existing user
   * POST /api/v1/auth/login
   */
  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(
      email,
      password
    );

    // Set refresh token in HTTP-only secure cookie
    setRefreshTokenCookie(res, refreshToken);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        {
          user,
          accessToken,
        },
        'User logged in successfully'
      )
    );
  });

  /**
   * Refresh JWT access token
   * POST /api/v1/auth/refresh-token
   */
  refreshToken = asyncHandler(async (req, res) => {
    // Read refresh token from HTTP-only cookie or fallback to request body
    const tokenFromReq =
      req.cookies?.refreshToken || req.body?.refreshToken;

    const { accessToken, newRefreshToken } =
      await authService.refreshAccessToken(tokenFromReq);

    // Rotate refresh token cookie
    setRefreshTokenCookie(res, newRefreshToken);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        { accessToken },
        'Access token refreshed successfully'
      )
    );
  });

  /**
   * Logout user and invalidate refresh token
   * POST /api/v1/auth/logout
   */
  logout = asyncHandler(async (req, res) => {
    if (req.user?._id) {
      await authService.logoutUser(req.user._id);
    }

    // Clear refresh token cookie
    clearRefreshTokenCookie(res);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(HTTP_STATUS.OK, null, 'Logged out successfully')
    );
  });

  /**
   * Get current authenticated user profile
   * GET /api/v1/auth/me
   */
  getMe = asyncHandler(async (req, res) => {
    const user = await authService.getUserProfile(req.user._id);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        HTTP_STATUS.OK,
        { user },
        'Current user profile retrieved successfully'
      )
    );
  });
}

export const authController = new AuthController();
