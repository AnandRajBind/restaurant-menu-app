import jwt from 'jsonwebtoken';

/**
 * Generates short-lived Access Token for authenticating user requests.
 * @param {object} payload - { id, email, role }
 * @returns {string} Signed JWT Access Token
 */
export const generateAccessToken = (payload) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';

  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Generates long-lived Refresh Token for obtaining new access tokens.
 * @param {object} payload - { id }
 * @returns {string} Signed JWT Refresh Token
 */
export const generateRefreshToken = (payload) => {
  const secret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Verifies JWT Access Token.
 * @param {string} token
 * @returns {object} Decoded token payload
 */
export const verifyAccessToken = (token) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

/**
 * Verifies JWT Refresh Token.
 * @param {string} token
 * @returns {object} Decoded token payload
 */
export const verifyRefreshToken = (token) => {
  const secret = process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

/**
 * Returns security-hardened options for setting HTTP-only refresh token cookie.
 */
export const getRefreshTokenCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true, // Prevents XSS access to cookie
    secure: isProduction, // Requires HTTPS in production
    sameSite: isProduction ? 'none' : 'lax', // Supports cross-site Vercel -> Render requests in prod
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/',
  };
};

/**
 * Sets refresh token as HTTP-only secure cookie on response object.
 */
export const setRefreshTokenCookie = (res, token) => {
  res.cookie('refreshToken', token, getRefreshTokenCookieOptions());
};

/**
 * Clears refresh token cookie from client response.
 */
export const clearRefreshTokenCookie = (res) => {
  const options = getRefreshTokenCookieOptions();
  res.clearCookie('refreshToken', { ...options, maxAge: 0 });
};
