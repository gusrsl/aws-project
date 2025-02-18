// auth-service/src/auth.js
const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { USERS_TABLE, JWT_SECRET } = process.env;

module.exports.registerUser = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

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
      },
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuario registrado con éxito', userId }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

module.exports.loginUser = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    // Buscar usuario por email (scan para simplificar; en prod es mejor index secundario)
    const result = await dynamoDb.scan({
      TableName: USERS_TABLE,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    }).promise();

    if (!result.Items || result.Items.length === 0) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Credenciales inválidas' }) };
    }

    const user = result.Items[0];
    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Credenciales inválidas' }) };
    }

    // Crear token JWT
    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
