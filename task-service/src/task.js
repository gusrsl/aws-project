// task-service/src/tasks.js
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const { TASKS_TABLE, JWT_SECRET } = process.env;

// Función auxiliar para validar token
async function verifyToken(headers) {
  if (!headers || !headers.Authorization) {
    throw new Error('No token provided');
  }
  const token = headers.Authorization.replace('Bearer ', '');
  return jwt.verify(token, JWT_SECRET); // Devuelve { userId } si es válido
}

// CREATE: Crear una nueva tarea
module.exports.create = async (event) => {
  try {
    const decoded = await verifyToken(event.headers);
    const { title, description } = JSON.parse(event.body);

    const taskId = new Date().getTime().toString();
    const newTask = {
      taskId,
      userId: decoded.userId,
      title,
      description,
      done: false,
    };

    await dynamoDb.put({
      TableName: TASKS_TABLE,
      Item: newTask,
    }).promise();

    return { statusCode: 200, body: JSON.stringify(newTask) };
  } catch (error) {
    return { statusCode: 401, body: JSON.stringify({ error: error.message }) };
  }
};

// GET: Obtener todas las tareas del usuario
module.exports.getAll = async (event) => {
  try {
    const decoded = await verifyToken(event.headers);

    const result = await dynamoDb.scan({
      TableName: TASKS_TABLE,
      FilterExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': decoded.userId },
    }).promise();

    return { statusCode: 200, body: JSON.stringify(result.Items) };
  } catch (error) {
    return { statusCode: 401, body: JSON.stringify({ error: error.message }) };
  }
};

// UPDATE: Actualizar una tarea
module.exports.update = async (event) => {
  try {
    const decoded = await verifyToken(event.headers);
    const { taskId } = event.pathParameters;
    const { title, description, done } = JSON.parse(event.body);

    // Leer la tarea existente para verificar propiedad
    const { Item: existingTask } = await dynamoDb.get({
      TableName: TASKS_TABLE,
      Key: { taskId },
    }).promise();

    if (!existingTask || existingTask.userId !== decoded.userId) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) };
    }

    const updatedTask = {
      ...existingTask,
      title: title ?? existingTask.title,
      description: description ?? existingTask.description,
      done: done ?? existingTask.done,
    };

    await dynamoDb.put({
      TableName: TASKS_TABLE,
      Item: updatedTask,
    }).promise();

    return { statusCode: 200, body: JSON.stringify(updatedTask) };
  } catch (error) {
    return { statusCode: 401, body: JSON.stringify({ error: error.message }) };
  }
};

// DELETE: Eliminar una tarea
module.exports.delete = async (event) => {
  try {
    const decoded = await verifyToken(event.headers);
    const { taskId } = event.pathParameters;

    // Verificar que la tarea exista y pertenezca al usuario
    const { Item: existingTask } = await dynamoDb.get({
      TableName: TASKS_TABLE,
      Key: { taskId },
    }).promise();

    if (!existingTask || existingTask.userId !== decoded.userId) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Forbidden' }) };
    }

    await dynamoDb.delete({
      TableName: TASKS_TABLE,
      Key: { taskId },
    }).promise();

    return { statusCode: 200, body: JSON.stringify({ message: 'Task deleted' }) };
  } catch (error) {
    return { statusCode: 401, body: JSON.stringify({ error: error.message }) };
  }
};
