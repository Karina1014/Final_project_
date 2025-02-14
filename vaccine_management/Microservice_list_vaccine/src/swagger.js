import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/vaccineRouter.js'];

const doc = {
    info: {
        title: 'Vaccine API',
        description: 'API to retrieve a list of vaccines.',
        version: '1.0.0'
    },
    host: 'localhost:3002',
    basePath: '/api',
    tags: [
        {
            name: 'Vaccines',
            description: 'Endpoints related to vaccines'
        }
    ],
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    definitions: {
        Vaccine: {
            type: 'object',
            properties: {
                id: { type: 'string', example: 'abc123' },
                name: { type: 'string', example: 'COVID-19 Vaccine' },
                description: { type: 'string', example: 'A vaccine for COVID-19 prevention' },
                dose: { type: 'integer', example: 2 }
            }
        },
        VaccineListResponse: {
            type: 'array',
            items: { $ref: '#/definitions/Vaccine' }
        },
        ErrorResponse: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Internal Server Error' }
            }
        }
    }
};

swaggerAutogen()(outputFile, endpointsFiles, doc);

