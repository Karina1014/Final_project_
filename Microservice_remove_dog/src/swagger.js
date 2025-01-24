import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/dogRouter.js'];

const doc = {
    info: {
        title: 'Dog API',
        description: 'API for remove dogs',
    },
    host: 'localhost:4002',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);