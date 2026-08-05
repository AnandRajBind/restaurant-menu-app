import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant Menu Management System API',
      version: '1.0.0',
      description:
        'RESTful API documentation for the Restaurant Menu Management System backend application built with Node.js, Express, and MongoDB.',
      contact: {
        name: 'API Support',
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
    },
  },
  apis: ['./src/routes/*.js', './src/models/*.js', './src/docs/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
