import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/vaccineRouter.js'];

const doc = {
    info: {
        title: 'Vaccine API',
        description: 'API for managing vaccine records, including vaccine creation, retrieval, and updates.',
        version: '1.0.0'
    },
    host: 'localhost:3001',
    basePath: '/api',
    tags: [
        {
            name: 'Vaccines',
            description: 'Endpoints for managing vaccine records'
        }
    ],
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        VaccineCreate: {
            type: 'object',
            required: ['name', 'description', 'dose'],
            properties: {
                name: {
                    type: 'string',
                    example: 'Rabies Vaccine'
                },
                description: {
                    type: 'string',
                    example: 'A vaccine to prevent rabies in dogs.'
                },
                dose: {
                    type: 'integer',
                    example: 2
                }
            }
        },
        VaccineResponse: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: '12345'
                },
                name: {
                    type: 'string',
                    example: 'Rabies Vaccine'
                },
                description: {
                    type: 'string',
                    example: 'A vaccine to prevent rabies in dogs.'
                },
                dose: {
                    type: 'integer',
                    example: 2
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                    example: '2025-02-14T12:00:00Z'
                }
            }
        },
        ErrorResponse: {
            type: 'object',
            properties: {
                error: {
                    type: 'string',
                    example: 'Invalid input data'
                }
            }
        }
    }
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
