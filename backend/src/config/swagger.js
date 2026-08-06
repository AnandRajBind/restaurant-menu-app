import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant Menu Management System API',
      version: '1.0.0',
      description:
        'Production-grade RESTful API documentation for the Restaurant Menu Management System backend application built with Node.js, Express, MongoDB Atlas, JWT Authentication, and Multer file storage.',
      contact: {
        name: 'Technical Assessment Support',
      },
    },
    servers: [
      {
        url: '/api/v1',
        description: 'V1 API Base Endpoint',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Provide JWT token in Authorization header (Format: Bearer <token>)',
        },
      },
      schemas: {
        ApiSuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            statusCode: { type: 'integer', example: 200 },
            message: { type: 'string', example: 'Operation completed successfully' },
            data: { type: 'object' },
          },
        },
        ApiErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            statusCode: { type: 'integer', example: 400 },
            message: { type: 'string', example: 'Bad Request' },
            errors: {
              type: 'array',
              items: { type: 'string' },
              example: [],
            },
          },
        },
        ValidationErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            statusCode: { type: 'integer', example: 400 },
            message: { type: 'string', example: 'Validation failed. Please check input data.' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string', example: 'email' },
                  message: { type: 'string', example: 'Please enter a valid email address' },
                },
              },
            },
          },
        },
      },
      responses: {
        BadRequest: {
          description: 'Bad Request / Validation Error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationErrorResponse' },
            },
          },
        },
        Unauthorized: {
          description: 'Unauthorized Access - Missing or Invalid Token',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApiErrorResponse' },
              example: {
                success: false,
                statusCode: 401,
                message: 'Authentication required. Please provide a valid Bearer token.',
                errors: [],
              },
            },
          },
        },
        Forbidden: {
          description: 'Forbidden - Insufficient Permissions',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApiErrorResponse' },
              example: {
                success: false,
                statusCode: 403,
                message: "Access Forbidden: Role 'User' is not authorized to access this resource.",
                errors: [],
              },
            },
          },
        },
        NotFound: {
          description: 'Resource Not Found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApiErrorResponse' },
              example: {
                success: false,
                statusCode: 404,
                message: 'Resource not found.',
                errors: [],
              },
            },
          },
        },
        Conflict: {
          description: 'Conflict - Duplicate Entry',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApiErrorResponse' },
              example: {
                success: false,
                statusCode: 409,
                message: 'User with this email address already exists.',
                errors: [],
              },
            },
          },
        },
        TooManyRequests: {
          description: 'Rate Limit Exceeded',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApiErrorResponse' },
              example: {
                success: false,
                statusCode: 429,
                message: 'Too many requests from this IP address. Please try again later.',
                errors: [],
              },
            },
          },
        },
        InternalServerError: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ApiErrorResponse' },
              example: {
                success: false,
                statusCode: 500,
                message: 'Internal Server Error',
                errors: [],
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/models/*.js', './src/docs/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
