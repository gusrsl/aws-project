// auth-service/src/auth.js
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Configuración para DynamoDB de AWS
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'  // o la región que prefieras
});

const { USERS_TABLE, JWT_SECRET } = process.env;

// Definimos los headers CORS
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json'
};

module.exports.registerUser = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);

        // Validar email y password
        if (!email || !password) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Email y password son requeridos' })
            };
        }

        // Verificar si el usuario ya existe
        const existingUser = await dynamoDb.scan({
            TableName: USERS_TABLE,
            FilterExpression: 'email = :email',
            ExpressionAttributeValues: { ':email': email }
        }).promise();

        if (existingUser.Items && existingUser.Items.length > 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'El email ya está registrado' })
            };
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generar un ID para el usuario
        const userId = new Date().getTime().toString();

        // Guardar en DynamoDB
        await dynamoDb.put({
            TableName: USERS_TABLE,
            Item: {
                userId,
                email,
                password: hashedPassword,
                createdAt: new Date().toISOString()
            },
        }).promise();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                message: 'Usuario registrado con éxito',
                userId,
                email 
            }),
        };
    } catch (error) {
        console.error('Error:', error);
        return { 
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Error interno del servidor',
                details: error.message 
            }) 
        };
    }
};

module.exports.loginUser = async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);

        if (!email || !password) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Email y password son requeridos' })
            };
        }

        // Buscar usuario por email
        const result = await dynamoDb.scan({
            TableName: USERS_TABLE,
            FilterExpression: 'email = :email',
            ExpressionAttributeValues: { ':email': email },
        }).promise();

        if (!result.Items || result.Items.length === 0) {
            return { 
                statusCode: 401,
                headers,
                body: JSON.stringify({ error: 'Credenciales inválidas' }) 
            };
        }

        const user = result.Items[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return { 
                statusCode: 401,
                headers,
                body: JSON.stringify({ error: 'Credenciales inválidas' }) 
            };
        }

        const token = jwt.sign(
            { 
                userId: user.userId,
                email: user.email
            }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                token,
                user: {
                    userId: user.userId,
                    email: user.email
                }
            }),
        };
    } catch (error) {
        console.error('Error:', error);
        return { 
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Error interno del servidor',
                details: error.message 
            }) 
        };
    }
};
