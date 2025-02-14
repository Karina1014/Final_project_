import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/dogRouter.js'];

const doc = {
    info: {
        title: 'Dog API',
        description: 'API for removing dogs',
    },
    host: 'localhost:4002',
    schemes: ['http', 'https'],
    paths: {
        "/remove/{id}": {
            "delete": {
                "description": "Deletes a dog by its ID",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "description": "ID of the dog to delete",
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Dog successfully deleted"
                    },
                    "400": {
                        "description": "Invalid ID supplied"
                    },
                    "404": {
                        "description": "Dog not found"
                    }
                }
            }
        }
    }
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
