import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/dogRouter.js'];

const doc = {
    info: {
        title: 'Dog API',
        description: 'API for managing dogs, including updating dog details.',
        version: '1.0.0',
    },
    host: 'localhost:4003',
    basePath: '/',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Dogs',
            description: 'Endpoints for managing dog records',
        }
    ],
    definitions: {
        DogUpdate: {
            name: 'Buddy',
            breed: 'Golden Retriever',
            age: 4
        },
        ErrorResponse: {
            error: 'Dog not found'
        }
    },
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
