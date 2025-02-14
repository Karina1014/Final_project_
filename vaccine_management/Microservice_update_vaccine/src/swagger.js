import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/vaccineRouter.js'];

const doc = {
    info: {
        title: 'Vaccine API',
        description: 'API for updating vaccines.',
        version: '1.0.0'
    },
    host: 'localhost:3004',
    basePath: '/api',
    tags: [
        {
            name: 'Vaccines',
            description: 'Endpoints for managing vaccines'
        }
    ],
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        VaccineUpdate: {
            type: 'object',
            properties: {
                id: { type: 'string', example: 'abc123' },
                name: { type: 'string', example: 'COVID-19 Vaccine' },
                description: { type: 'string', example: 'Updated description' },
                dose: { type: 'integer', example: 2 }
            }
        },
        ErrorResponse: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Bad Request' }
            }
        }
    }
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
