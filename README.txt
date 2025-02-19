# Task Management System - Microservices Architecture
![Project Banner](./images/banner.png)

<div align="center">

[![Node.js Version](https://img.shields.io/badge/node-v18%2B-brightgreen)](https://nodejs.org/)
[![AWS](https://img.shields.io/badge/AWS-Serverless-orange)](https://aws.amazon.com/)
[![Angular](https://img.shields.io/badge/Angular-Latest-red)](https://angular.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

## 📑 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Services](#services)
  - [Auth Service](#auth-service)
  - [Task Service](#task-service)
  - [Frontend](#frontend)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Security](#security)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

A modern, scalable task management system built with a microservices architecture. The system consists of two backend services (Authentication and Task Management) and a responsive Angular frontend application.

### 📱 User Interface Previews

<div align="center">
  <img src="./images/Screenshot 2025-02-19 at 2.04.13 AM.png" alt="Login Screen" width="400"/>
  <p><em>Login Interface - Modern and User-friendly Design</em></p>
</div>

<div align="center">
  <img src="./images/Screenshot 2025-02-19 at 2.04.13 AM.png" alt="Dashboard" width="400"/>
  <p><em>Dashboard - Task Management Interface</em></p>
</div>

## ✨ Features

- **User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Password encryption
  - Session management

- **Task Management**
  - Create, read, update, and delete tasks
  - Task categorization
  - Priority levels
  - Due dates
  - Progress tracking

- **Frontend Application**
  - Responsive design
  - Modern UI/UX
  - Real-time updates
  - Cross-browser compatibility

## 🏗 Architecture

```mermaid
graph TD
    A[Frontend - Angular] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[Task Service]
    C --> E[(DynamoDB - Users)]
    D --> F[(DynamoDB - Tasks)]
```

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Serverless Framework
- **Database**: AWS DynamoDB
- **Authentication**: JWT + bcryptjs
- **Cloud Provider**: AWS Lambda & API Gateway

### Frontend
- **Framework**: Angular (Latest)
- **UI Library**: Angular Material
- **State Management**: NgRx
- **Styling**: SCSS with CSS Custom Properties

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- AWS CLI configured
- Serverless Framework CLI
- Angular CLI
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd task-management-system
   ```

2. **Auth Service Setup**
   ```bash
   cd auth-service
   npm install
   ```

3. **Task Service Setup**
   ```bash
   cd ../task-service
   npm install
   ```

4. **Frontend Setup**
   ```bash
   cd ../task-manager-frontend
   npm install
   ```

## ⚙️ Configuration

### Environment Variables

```env
# Auth Service
JWT_SECRET=your_jwt_secret
USERS_TABLE=users_table_name
CORS_ORIGIN=http://localhost:4200

# Task Service
TASKS_TABLE=tasks_table_name
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:4200
```

## 🔌 Services

### Auth Service (Port: 3000)

#### Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile

### Task Service (Port: 3004)

#### Endpoints
- `GET /tasks` - List tasks
- `POST /tasks` - Create task
- `PUT /tasks/{id}` - Update task
- `DELETE /tasks/{id}` - Delete task
- `GET /tasks/{id}` - Get task details

## 🎨 Frontend Design System

### Color Palette

```scss
--primary: #4f46e5;    // Main brand color
--secondary: #64748b;  // Supporting color
--success: #22c55e;    // Success states
--danger: #ef4444;     // Error states
--warning: #f59e0b;    // Warning states
--background: #f8fafc; // Page background
--surface: #ffffff;    // Component background
--text-primary: #1e293b;   // Main text
--text-secondary: #64748b; // Secondary text
```

### Typography

- **Headings**: Inter
- **Body**: Roboto
- **Code**: JetBrains Mono

### Components

- Custom buttons with hover effects
- Form inputs with validation states
- Cards with elevation
- Modern navigation bar
- Responsive data tables
- Loading spinners
- Toast notifications

## 📊 Database Schema

### Users Table
```typescript
interface User {
  userId: string;      // Hash Key
  email: string;       // GSI
  password: string;    // Hashed
  createdAt: string;
  updatedAt: string;
  profile?: {
    name: string;
    avatar: string;
  };
}
```

### Tasks Table
```typescript
interface Task {
  taskId: string;      // Hash Key
  userId: string;      // GSI
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

## 🔒 Security

- JWT authentication with 24h expiration
- Password hashing using bcrypt
- CORS configuration
- AWS IAM roles and policies
- Input validation and sanitization
- Rate limiting
- XSS protection

## 📦 Deployment

### Backend Services

```bash
# Deploy Auth Service
cd auth-service
serverless deploy

# Deploy Task Service
cd ../task-service
serverless deploy
```

### Frontend

```bash
# Build for production
ng build --configuration=production

# Deploy to S3 (if using AWS hosting)
aws s3 sync dist/task-manager-frontend s3://your-bucket-name
```

## 🔍 Monitoring

- AWS CloudWatch Logs
- Custom metrics and alarms
- Error tracking
- Performance monitoring
- User analytics

## 🔄 Development Workflow

1. Create feature branch
2. Develop and test locally
3. Run linting and tests
4. Create pull request
5. Code review
6. Merge and deploy

## 🐛 Troubleshooting

Common issues and solutions:

1. **DynamoDB Connection Issues**
   - Check AWS credentials
   - Verify table names
   - Confirm IAM permissions

2. **JWT Authentication Errors**
   - Validate token format
   - Check expiration
   - Verify secret key

3. **CORS Issues**
   - Check allowed origins
   - Verify HTTP methods
   - Validate headers

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with ❤️ by Your Team</p>
  <p>
    <a href="https://github.com/yourusername">GitHub</a> •
    <a href="https://your-demo-url.com">Live Demo</a> •
    <a href="mailto:your@email.com">Contact</a>
  </p>
</div>





