import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cosmik',
      version: '1.0.0',
      description: 'A Movie Catalog API with OpenAPI docs',
    },
    servers: [
      { url: 'http://localhost:5000/api/auth', description: 'Authentication' },
      { url: 'http://localhost:5000/api/profile', description: 'Profile' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT access token (obtained from /login or /refresh)'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);