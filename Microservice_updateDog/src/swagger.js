import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/dogRouter.js'];

const doc = {
    info: {
        title: 'Dog API',
        description: 'API for update dogs',
    },
    host: 'localhost:4003',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);