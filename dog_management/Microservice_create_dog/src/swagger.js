import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/dogRouter.js'];

const doc = {
    swagger: '2.0', 
    info: {
        title: 'Dog API',
        description: 'API for managing dog records',
        version: '1.0.0',
    },
    host: 'localhost:4000',
    basePath: '/api/dogs',
    schemes: ['http', 'https'],
    definitions: {
        Dog: {
            type: 'object',
            required: ['name', 'breed', 'age', 'gender'],
            properties: {
                name: { type: 'string', example: 'Buddy' },
                breed: { type: 'string', example: 'Labrador' },
                age: { type: 'integer', example: 3 },
                gender: { type: 'string', enum: ['Male', 'Female'], example: 'Male' }
            }
        }
    }
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
