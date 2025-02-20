# Project Documentation: Task Management System - Microservices Architecture

## Table of Contents
1. [Project Overview](#project-overview)
2. [Documentation Overview](#documentation-overview)
3. [AWS and Serverless Architecture](#aws-and-serverless-architecture)
   - [Lambda Functions](#lambda-functions)
   - [DynamoDB Tables](#dynamodb-tables)
4. [Service Configurations](#service-configurations)
   - [Auth Service](#auth-service)
   - [Task Service](#task-service)
5. [Lambda Endpoints Guide](#lambda-endpoints-guide)
6. [Testing Guide](#testing-guide)
7. [Frontend Documentation](#frontend-documentation)
8. [Conclusion](#conclusion)

## Project Overview

The project **Task Management System - Microservices Architecture** comprises multiple components:

- **Auth Service:** Handles user authentication (registration, login, and profile management) using JWT and secure password encryption.
- **Task Service:** Manages tasks with full CRUD operations, including categorization, priority, and status tracking.
- **Frontend:** A React-based Single Page Application (SPA) hosted on AWS S3 and distributed through CloudFront, providing a modern and responsive interface for task management.

The backend is powered by AWS Lambda, API Gateway, and DynamoDB, forming a serverless architecture that supports scalability and efficiency.

## Documentation Overview

This document aggregates all key documentation related to the project:

- **README:** Detailed explanation of the project, features, tech stack, installation, and deployment instructions.
- **Lambda Endpoints Guide:** Best practices for managing multiple endpoints in serverless architectures.
- **Serverless Configurations:** Deployment definitions for both Auth and Task services.
- **AWS Resources:** Explanation of AWS components like Lambda, API Gateway, and DynamoDB used in the project.

## AWS and Serverless Architecture

### Lambda Functions
AWS Lambda is used to run the business logic for our microservices. Each endpoint defined in our serverless configuration becomes a Lambda function, enabling scalability and cost efficiency.

### DynamoDB Tables
- **Users Table:** Stores user records with hashed passwords.
- **Tasks Table:** Stores task records associated with users, along with statuses and priorities.

## Service Configurations

### Auth Service
The following is an excerpt from the `auth-service/serverless.yml` configuration:

```yaml
service: auth-service
provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    USERS_TABLE: ${param:usersTableName}
    JWT_SECRET: ${param:jwtSecret}
functions:
  registerUser:
    handler: src/auth.registerUser
    events:
      - http:
          path: auth/register
          method: post
  loginUser:
    handler: src/auth.loginUser
    events:
      - http:
          path: auth/login
          method: post
```

### Task Service
Below is an excerpt from the `task-service/serverless.yml` configuration:

```yaml
service: task-service
provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    TASKS_TABLE: ${param:tasksTableName}
    JWT_SECRET: ${param:jwtSecret}
functions:
  createTask:
    handler: src/tasks.create
    events:
      - http:
          path: /tasks
          method: post
  getTasks:
    handler: src/tasks.getAll
    events:
      - http:
          path: /tasks
          method: get
  updateTask:
    handler: src/tasks.update
    events:
      - http:
          path: /tasks/{taskId}
          method: put
  deleteTask:
    handler: src/tasks.delete
    events:
      - http:
          path: /tasks/{taskId}
          method: delete
```

## Lambda Endpoints Guide

For managing large numbers of endpoints, consider the following best practices:

- **Separation by Files:** Divide your serverless configuration into separate files for better maintainability.
- **Single Lambda Router:** Use a single Lambda function with a framework like Express to route multiple endpoints, reducing the number of Lambda functions.
- **API Gateway Integration:** Leverage API Gateway with OpenAPI/Swagger documentation to manage and document your endpoints.

For more details, please refer to the [LAMBDA_ENDPOINTS_GUIDE.md](LAMBDA_ENDPOINTS_GUIDE.md) file in the project.

## Testing Guide

### Deployment and Service Information

1. **Deploy Auth Service:**
```bash
cd auth-service
serverless deploy
```

2. **Get Auth Service Information:**
```bash
serverless info
```
Example output:
```
service: auth-service
stage: dev
region: us-east-1
stack: auth-service-dev
endpoints:
  POST - https://ccemnbnre1.execute-api.us-east-1.amazonaws.com/dev/auth/register
  POST - https://ccemnbnre1.execute-api.us-east-1.amazonaws.com/dev/auth/login
```

3. **Deploy Task Service:**
```bash
cd ../task-service
serverless deploy
```

4. **Get Task Service Information:**
```bash
serverless info
```
Example output:
```
service: task-service
stage: dev
region: us-east-1
stack: task-service-dev
endpoints:
  POST - https://2g5jn00wzg.execute-api.us-east-1.amazonaws.com/dev/tasks
  GET - https://2g5jn00wzg.execute-api.us-east-1.amazonaws.com/dev/tasks
  PUT - https://2g5jn00wzg.execute-api.us-east-1.amazonaws.com/dev/tasks/{taskId}
  DELETE - https://2g5jn00wzg.execute-api.us-east-1.amazonaws.com/dev/tasks/{taskId}
```

### Testing Endpoints with cURL

#### Auth Service Testing

1. **Register a New User:**
```bash
curl -X POST https://[YOUR_AUTH_API]/dev/auth/register \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com", "password": "Test1234!", "name": "Test User"}'
```
Expected response:
```json
{
  "message": "Usuario registrado con éxito",
  "userId": "1234567890",
  "email": "test@example.com"
}
```

2. **Login User:**
```bash
curl -X POST https://[YOUR_AUTH_API]/dev/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com", "password": "Test1234!"}'
```
Expected response:
```json
{
  "token": "eyJhbG...", // JWT token
  "cognitoTokens": {
    "accessToken": "eyJraW...",
    "idToken": "eyJraW...",
    "refreshToken": "eyJjdH..."
  },
  "user": {
    "userId": "1234567890",
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

3. **Store Token for Task Service:**
```bash
TOKEN=$(curl -s -X POST https://[YOUR_AUTH_API]/dev/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com", "password": "Test1234!"}' | jq -r .token)
```

#### Task Service Testing

1. **Create a New Task:**
```bash
curl -X POST https://[YOUR_TASK_API]/dev/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{"title": "Mi primera tarea", "description": "Esta es una tarea de prueba"}'
```
Expected response:
```json
{
  "taskId": "1234567890",
  "userId": "1234567890",
  "title": "Mi primera tarea",
  "description": "Esta es una tarea de prueba",
  "done": false,
  "createdAt": "2025-02-20T05:34:52.237Z"
}
```

2. **Get All Tasks:**
```bash
curl -X GET https://[YOUR_TASK_API]/dev/tasks \
-H "Authorization: Bearer $TOKEN"
```
Expected response:
```json
[
  {
    "taskId": "1234567890",
    "userId": "1234567890",
    "title": "Mi primera tarea",
    "description": "Esta es una tarea de prueba",
    "done": false,
    "createdAt": "2025-02-20T05:34:52.237Z"
  }
]
```

3. **Update a Task:**
```bash
curl -X PUT https://[YOUR_TASK_API]/dev/tasks/[TASK_ID] \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{"done": true, "title": "Mi primera tarea (completada)"}'
```
Expected response:
```json
{
  "taskId": "1234567890",
  "userId": "1234567890",
  "title": "Mi primera tarea (completada)",
  "description": "Esta es una tarea de prueba",
  "done": true,
  "createdAt": "2025-02-20T05:34:52.237Z"
}
```

4. **Delete a Task:**
```bash
curl -X DELETE https://[YOUR_TASK_API]/dev/tasks/[TASK_ID] \
-H "Authorization: Bearer $TOKEN"
```
Expected response:
```json
{
  "message": "Task deleted"
}
```

### Important Notes

1. Replace `[YOUR_AUTH_API]` and `[YOUR_TASK_API]` with your actual API endpoints from the `serverless info` command output.
2. Replace `[TASK_ID]` with the actual taskId returned when creating a task.
3. The JWT token is valid for 1 hour. After expiration, you'll need to login again to get a new token.
4. All task operations require a valid JWT token in the Authorization header.
5. The task service validates token ownership - users can only manage their own tasks.

## Frontend Documentation

### Technology Stack

- **Framework:** React 18 with TypeScript
- **State Management:** Redux Toolkit
- **UI Components:** Material-UI (MUI)
- **Routing:** React Router v6
- **API Integration:** Axios
- **Form Handling:** React Hook Form
- **AWS Services:**
  - S3 for static hosting
  - CloudFront for content distribution
  - Route 53 for domain management (optional)

### Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── tasks/
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskForm.tsx
│   │   │   ├── TaskItem.tsx
│   │   │   └── TaskFilters.tsx
│   │   └── common/
│   ├── store/
│   │   ├── auth/
│   │   └── tasks/
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   └── tasks.service.ts
│   ├── utils/
│   └── App.tsx
└── package.json
```

### Features

1. **Authentication:**
   - Login/Register forms with validation
   - JWT token management
   - Protected routes
   - Persistent session

2. **Task Management:**
   - Task creation with title and description
   - Task list with filtering and sorting
   - Task status updates
   - Task deletion with confirmation
   - Responsive task cards

3. **User Experience:**
   - Loading states and spinners
   - Error handling and notifications
   - Responsive design for mobile/desktop
   - Dark/Light theme support

### AWS Deployment Configuration

1. **S3 Configuration:**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

2. **CloudFront Settings:**
   - Origin: S3 bucket
   - Behaviors: Default (*)
   - Price Class: Use Only North America and Europe
   - SSL Certificate: ACM Certificate (optional)
   - Custom Domain: Via Route 53 (optional)

### Deployment Steps

1. **Build the Frontend:**
```bash
npm run build
```

2. **Create S3 Bucket:**
```bash
aws s3 mb s3://your-bucket-name
```

3. **Configure S3 for Static Website:**
```bash
aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
```

4. **Upload Build Files:**
```bash
aws s3 sync build/ s3://your-bucket-name
```

5. **Create CloudFront Distribution:**
```bash
aws cloudfront create-distribution \
  --origin-domain-name your-bucket-name.s3.amazonaws.com \
  --default-root-object index.html
```

### Development Setup

1. **Install Dependencies:**
```bash
npm install
```

2. **Configure Environment:**
```bash
cp .env.example .env
# Edit .env with your API endpoints
```

3. **Start Development Server:**
```bash
npm start
```

4. **Run Tests:**
```bash
npm test
```

### Environment Variables

```env
REACT_APP_AUTH_API=https://[YOUR_AUTH_API]/dev
REACT_APP_TASK_API=https://[YOUR_TASK_API]/dev
REACT_APP_STAGE=development
```

### Best Practices

1. **Security:**
   - Store JWT in HttpOnly cookies
   - Implement refresh token logic
   - Sanitize user inputs
   - Use environment variables for sensitive data

2. **Performance:**
   - Implement lazy loading for routes
   - Use React.memo for expensive components
   - Optimize images and assets
   - Enable Gzip compression in CloudFront

3. **Maintenance:**
   - Follow consistent code style (ESLint/Prettier)
   - Write unit tests for components
   - Document component props with TypeScript
   - Use conventional commits

### Monitoring and Analytics

1. **CloudWatch Metrics:**
   - CloudFront distribution statistics
   - S3 bucket metrics
   - Error rates and latency

2. **Application Monitoring:**
   - React Error Boundary implementation
   - Console error tracking
   - User interaction analytics

## Conclusion

This documentation provides a comprehensive overview of the Task Management System project, including its architecture, AWS components, Lambda functions, and best practices for managing multiple endpoints. It serves as a single source of truth for developers working on the project. 