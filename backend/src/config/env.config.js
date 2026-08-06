import { logger } from '../utils/logger.js';

/**
 * Validates essential application environment variables on boot.
 * Fails fast with descriptive error messages if critical variables are missing.
 */
export const validateEnv = () => {
  const requiredEnvVars = [
    'MONGODB_URI',
    'CLIENT_URL',
  ];

  const recommendedEnvVars = [
    'JWT_SECRET',
    'ACCESS_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET',
  ];

  const missingRequired = requiredEnvVars.filter((key) => !process.env[key]);
  const missingRecommended = recommendedEnvVars.filter((key) => !process.env[key]);

  if (missingRequired.length > 0) {
    logger.error(
      `CRITICAL: Missing required environment variables: ${missingRequired.join(', ')}`
    );
    logger.error('Please configure missing variables in your .env file or deployment environment.');
    process.exit(1);
  }

  if (missingRecommended.length > 0) {
    logger.warn(
      `Security Warning: Missing recommended secret variables: ${missingRecommended.join(', ')}. Default fallback keys will be used in development mode.`
    );
  }

  logger.info(
    `Environment validated successfully. Mode: ${process.env.NODE_ENV || 'development'}, Port: ${process.env.PORT || 5000}`
  );
};
