// auth-service/src/auth.js
const { 
  CognitoIdentityProviderClient, 
  SignUpCommand,
  InitiateAuthCommand,
  AdminConfirmSignUpCommand
} = require("@aws-sdk/client-cognito-identity-provider");

const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const client = new CognitoIdentityProviderClient({ region: 'us-east-1' });
const dynamoClient = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);

const { USERS_TABLE, USER_POOL_ID, USER_POOL_CLIENT_ID } = process.env;
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Definimos los headers CORS
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json'
};

module.exports.registerUser = async (event) => {
    try {
        const { email, password, name } = JSON.parse(event.body);

        // Validar email y password
        if (!email || !password) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Email y password son requeridos' })
            };
        }

        // Registrar usuario en Cognito
        const signUpParams = {
            ClientId: USER_POOL_CLIENT_ID,
            Username: email,
            Password: password,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email
                },
                {
                    Name: 'name',
                    Value: name || email
                }
            ]
        };

        const signUpCommand = new SignUpCommand(signUpParams);
        await client.send(signUpCommand);

        // Auto-confirmar el usuario (en producción, esto normalmente se haría por email)
        const confirmParams = {
            UserPoolId: USER_POOL_ID,
            Username: email
        };

        const confirmCommand = new AdminConfirmSignUpCommand(confirmParams);
        await client.send(confirmCommand);

        // Generar un ID para el usuario
        const userId = new Date().getTime().toString();

        // Guardar información adicional en DynamoDB si es necesario
        const putCommand = new PutCommand({
            TableName: USERS_TABLE,
            Item: {
                userId,
                email,
                name: name || email,
                createdAt: new Date().toISOString()
            }
        });

        await docClient.send(putCommand);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                message: 'Usuario registrado con éxito',
                userId,
                email 
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return { 
            statusCode: error.statusCode || 500,
            headers,
            body: JSON.stringify({ 
                error: error.message || 'Error interno del servidor'
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

        // Autenticar usuario con Cognito
        const authParams = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: USER_POOL_CLIENT_ID,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        };

        const authCommand = new InitiateAuthCommand(authParams);
        const authResponse = await client.send(authCommand);

        // Buscar información adicional del usuario en DynamoDB
        const scanCommand = new ScanCommand({
            TableName: USERS_TABLE,
            FilterExpression: 'email = :email',
            ExpressionAttributeValues: {
                ':email': email
            }
        });

        const userResult = await docClient.send(scanCommand);
        const user = userResult.Items?.[0];

        // Generar token JWT personalizado
        const customToken = jwt.sign(
            {
                userId: user?.userId,
                email: email,
                name: user?.name
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                token: customToken, // Token JWT personalizado
                cognitoTokens: {  // Mantener los tokens de Cognito por si se necesitan
                    accessToken: authResponse.AuthenticationResult.AccessToken,
                    idToken: authResponse.AuthenticationResult.IdToken,
                    refreshToken: authResponse.AuthenticationResult.RefreshToken,
                },
                user: {
                    userId: user?.userId,
                    email: email,
                    name: user?.name
                }
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return { 
            statusCode: error.statusCode || 500,
            headers,
            body: JSON.stringify({ 
                error: error.message || 'Error interno del servidor'
            }) 
        };
    }
};
