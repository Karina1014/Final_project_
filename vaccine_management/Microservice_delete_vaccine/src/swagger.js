import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/vaccineRouter.js'];

const doc = {
    info: {
        title: 'Vaccine API',
        description: 'API for managing vaccines, including deletion of vaccine records.',
        version: '1.0.0'
    },
    host: 'localhost:3003',
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
        ErrorResponse: {
            type: 'object',
            properties: {
                error: {
                    type: 'string',
                    example: 'Vaccine not found'
                }
            }
        },
        SuccessResponse: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'Vaccine deleted successfully'
                }
            }
        }
    }
};

swaggerAutogen()(outputFile, endpointsFiles, doc);

