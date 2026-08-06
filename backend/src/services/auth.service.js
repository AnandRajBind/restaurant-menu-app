import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.util.js';

class AuthService {
  /**
   * Registers a new user in the system.
   * @param {object} userData - { name, email, password, role }
   * @returns {Promise<{user: object, accessToken: string, refreshToken: string}>}
   */
  async registerUser(userData) {
    const { name, email, password, role } = userData;

    // 1. Check if user with given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        'User with this email address already exists.'
      );
    }

    // 2. Create new user document
    const user = await User.create({
      name,
      email,
      password,
      role: role || undefined, // Defaults to 'User' if not specified
    });

    // 3. Generate Access & Refresh tokens
    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({ id: user._id });

    // 4. Save refresh token to user document
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { user, accessToken, refreshToken };
  }

  /**
   * Authenticates user credentials and returns tokens.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{user: object, accessToken: string, refreshToken: string}>}
   */
  async loginUser(email, password) {
    // 1. Find user by email and explicitly select password & refreshToken fields
    const user = await User.findOne({ email }).select('+password +refreshToken');
    if (!user) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        'Invalid email or password.'
      );
    }

    // 2. Compare password
    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        'Invalid email or password.'
      );
    }

    // 3. Generate tokens
    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = generateRefreshToken({ id: user._id });

    // 4. Update stored refresh token in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { user, accessToken, refreshToken };
  }

  /**
   * Refreshes JWT access token using valid refresh token (with token rotation).
   * @param {string} tokenFromReq
   * @returns {Promise<{accessToken: string, newRefreshToken: string}>}
   */
  async refreshAccessToken(tokenFromReq) {
    if (!tokenFromReq) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        'Refresh token is required.'
      );
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(tokenFromReq);
    } catch (error) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        'Invalid or expired refresh token. Please log in again.'
      );
    }

    // Find user and compare stored refresh token
    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user || user.refreshToken !== tokenFromReq) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        'Refresh token is invalid or has been revoked.'
      );
    }

    // Generate new Access & Refresh tokens (Token Rotation)
    const newAccessToken = generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    const newRefreshToken = generateRefreshToken({ id: user._id });

    // Update stored refresh token
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken: newAccessToken, newRefreshToken };
  }

  /**
   * Logs out user by clearing stored refresh token in DB.
   * @param {string} userId
   */
  async logoutUser(userId) {
    await User.findByIdAndUpdate(
      userId,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );
  }

  /**
   * Fetches user profile by ID.
   * @param {string} userId
   * @returns {Promise<object>}
   */
  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found.');
    }
    return user;
  }
}

export const authService = new AuthService();
