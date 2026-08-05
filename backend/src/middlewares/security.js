import cors from 'cors';
import helmet from 'helmet';

/**
 * Configure dynamic CORS origin options supporting single URL, comma-separated URLs, or wildcard local dev.
 */
export const configureCors = () => {
  return cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, Postman, server-to-server)
      if (!origin) return callback(null, true);

      const allowedOrigins = (process.env.CLIENT_URL || '')
        .split(',')
        .map((url) => url.trim())
        .filter(Boolean);

      // In development or if wildcard is explicitly configured
      if (
        process.env.NODE_ENV === 'development' ||
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error(`CORS Policy Violation: Origin '${origin}' is not allowed by CORS`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  });
};

/**
 * Configure Helmet middleware for secure HTTP headers.
 */
export const configureHelmet = () => {
  return helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production',
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allows uploaded static files to be served across domains
  });
};
