import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/dogRouter.js'];

const doc = {
    info: {
        title: 'Dog API',
        description: 'API for managing and retrieving dog records',
    },
    host: 'localhost:4001',
    schemes: ['http', 'https'],
    paths: {
        "/list": {
            "get": {
                "summary": "Retrieve a list of dogs",
                "operationId": "getDogs",
                "tags": ["Dogs"],
                "produces": ["application/json"],
                "responses": {
                    "200": {
                        "description": "List of dogs retrieved successfully",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Dog"
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        }
    },
    definitions: {
        Dog: {
            type: "object",
            required: ["nameDog", "breed", "age"],
            properties: {
                nameDog: {
                    type: "string",
                    example: "Buddy",
                    description: "Name of the dog"
                },
                breed: {
                    type: "string",
                    example: "Labrador",
                    description: "Breed of the dog"
                },
                age: {
                    type: "integer",
                    example: 3,
                    description: "Age of the dog in years"
                },
                gender: {
                    type: "string",
                    enum: ["Male", "Female"],
                    example: "Male",
                    description: "Gender of the dog"
                }
            }
        }
    }
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
