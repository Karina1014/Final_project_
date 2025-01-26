import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/vaccineRouter.js'];

const doc = {
    info: {
        title: 'Vaccine API',
        description: 'API for update vaccines',
    },
    host: 'localhost:3004',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);