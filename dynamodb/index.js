require('dotenv').config();
const AWS = require('aws-sdk');

// Configurar AWS SDK con variables de entorno
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.AWS_REGION
});

const dynamoDB = new AWS.DynamoDB();

// Crear una tabla llamada "Users"
const createTable = async () => {
    const params = {
        TableName: "Users",
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }], 
        AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
    };

    try {
        await dynamoDB.createTable(params).promise();
        console.log("Tabla creada correctamente.");
    } catch (error) {
        console.error("Error creando la tabla:", error.message);
    }
};

// Insertar un usuario en la tabla
const insertUser = async () => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: "Users",
        Item: {
            id: "2",
            name: "Kari",
            email: "Kari@example.com"
        }
    };

    try {
        await docClient.put(params).promise();
        console.log("Usuario insertado correctamente.");
    } catch (error) {
        console.error("Error insertando usuario:", error.message);
    }
};

// Obtener el usuario
const getUser = async () => {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: "Users",
        Key: { id: "1" }
    };

    try {
        const data = await docClient.get(params).promise();
        console.log("Usuario obtenido:", data.Item);
    } catch (error) {
        console.error("Error obteniendo usuario:", error.message);
    }
};

// Ejecutar las funciones en orden
const run = async () => {
    await createTable();
    console.log("⏳ Esperando 10 segundos para que la tabla esté disponible...");
    setTimeout(async () => {
        await insertUser();
        setTimeout(async () => {
            await getUser();
        }, 3000);
    }, 10000);
};


run();
