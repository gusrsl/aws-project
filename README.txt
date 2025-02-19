===========================================
SISTEMA DE MICROSERVICIOS (AUTH & TASKS)
===========================================

📋 TABLA DE CONTENIDOS
---------------------
1. Inicialización del Proyecto
2. Estructura del Proyecto
3. Tecnologías Utilizadas
4. Configuración
5. Desarrollo Local
6. API Endpoints
7. Despliegue
8. Base de Datos
9. Seguridad
10. Solución de Problemas
11. Comandos Útiles
12. Monitoreo
13. Ciclo de Desarrollo

1. 🚀 INICIALIZACIÓN DEL PROYECTO
--------------------------------
a) Clonar el repositorio:
   git clone <url-del-repositorio>
   cd <nombre-del-proyecto>

b) Crear estructura de carpetas:
   mkdir auth-service task-service
   cd auth-service
   mkdir src
   cd ../task-service
   mkdir src

c) Inicializar proyectos Node.js:
   # Auth Service
   cd auth-service
   npm init -y
   npm install aws-sdk bcryptjs jsonwebtoken serverless-offline

   # Task Service
   cd ../task-service
   npm init -y
   npm install aws-sdk jsonwebtoken serverless-offline

d) Crear archivos principales:
   touch auth-service/src/auth.js
   touch auth-service/serverless.yml
   touch task-service/src/tasks.js
   touch task-service/serverless.yml

e) Configurar AWS:
   aws configure
   # Ingresar credenciales AWS:
   # - AWS Access Key ID
   # - AWS Secret Access Key
   # - Default region (us-east-1)
   # - Default output format (json)

2. 📁 ESTRUCTURA DEL PROYECTO
----------------------------
/
├── auth-service/
│   ├── src/
│   │   └── auth.js         # Lógica de autenticación
│   ├── package.json
│   └── serverless.yml      # Configuración del servicio de auth
│
└── task-service/
    ├── src/
    │   └── tasks.js        # Lógica de tareas
    ├── package.json
    └── serverless.yml      # Configuración del servicio de tareas

3. 🔧 TECNOLOGÍAS UTILIZADAS
---------------------------
- Node.js (v18+)
- Serverless Framework
- AWS DynamoDB
- JWT (JSON Web Tokens)
- bcryptjs
- AWS SDK

4. ⚙️ CONFIGURACIÓN
------------------
Variables de Entorno:
- JWT_SECRET: Clave para tokens
- USERS_TABLE: Tabla de usuarios
- TASKS_TABLE: Tabla de tareas

Configuración AWS:
- Región: us-east-1
- Credenciales configuradas
- Permisos IAM para DynamoDB

5. 💻 DESARROLLO LOCAL
---------------------
Iniciar servicios:

Auth Service (Puerto 3000):
cd auth-service
serverless offline start

Task Service (Puerto 3004):
cd task-service
serverless offline start

6. 📡 API ENDPOINTS
-----------------
AUTH SERVICE (http://localhost:3000)

Registro:
POST /auth/register
{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
}

Login:
POST /auth/login
{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
}

TASK SERVICE (http://localhost:3004)

Crear Tarea:
POST /tasks
Authorization: Bearer <token>
{
    "title": "Nueva Tarea",
    "description": "Descripción"
}

Obtener Tareas:
GET /tasks
Authorization: Bearer <token>

Actualizar Tarea:
PUT /tasks/{taskId}
Authorization: Bearer <token>
{
    "title": "Tarea Actualizada",
    "description": "Nueva descripción",
    "done": true
}

Eliminar Tarea:
DELETE /tasks/{taskId}
Authorization: Bearer <token>

7. 📦 DESPLIEGUE
---------------
Despliegue inicial:
cd auth-service
serverless deploy

cd task-service
serverless deploy

Actualizar función específica:
serverless deploy function -f nombreFuncion

8. 🗄️ BASE DE DATOS
------------------
Tabla Users:
- userId (String) - Hash Key
- email (String)
- password (String) - Hashed
- createdAt (String)

Tabla Tasks:
- taskId (String) - Hash Key
- userId (String)
- title (String)
- description (String)
- done (Boolean)
- createdAt (String)

9. 🔒 SEGURIDAD
--------------
- JWT con expiración 24h
- Contraseñas hasheadas (bcrypt)
- CORS configurado
- Autenticación requerida
- Validación de propietario de tareas

10. 🐛 SOLUCIÓN DE PROBLEMAS
--------------------------
Error DynamoDB:
- Verificar credenciales AWS
- Confirmar región
- Validar permisos IAM

Error Autenticación:
- Verificar JWT_SECRET
- Confirmar formato token
- Validar expiración

Error CORS:
- Revisar configuración serverless.yml
- Verificar headers
- Confirmar origen permitido

11. 📝 COMANDOS ÚTILES
--------------------
# Logs en tiempo real
serverless logs -f nombreFuncion -t

# Eliminar servicios
serverless remove

# Listar funciones
serverless info

# Invocar función local
serverless invoke local -f nombreFuncion

12. 🔍 MONITOREO
--------------
- CloudWatch Logs
- Métricas DynamoDB
- Tiempos API Gateway
- Errores y excepciones

13. 🔄 CICLO DE DESARROLLO
------------------------
1. Desarrollo local (serverless offline)
2. Pruebas (curl/Postman)
3. Commit cambios
4. Despliegue AWS
5. Verificación producción

===========================================
NOTAS IMPORTANTES
===========================================
- Node.js v18+ requerido
- Tablas DynamoDB autocreadas
- JWT_SECRET debe ser igual en ambos servicios
- Formato respuesta consistente
- Backups recomendados de DynamoDB
- Monitorear costos AWS
- Mantener dependencias actualizadas

===========================================
ACTUALIZACIONES Y MANTENIMIENTO
===========================================
1. Actualizar dependencias:
   npm update

2. Verificar seguridad:
   npm audit

3. Backup periódico:
   aws dynamodb create-backup

4. Monitoreo regular:
   - Revisar CloudWatch
   - Verificar métricas
   - Analizar logs

5. Pruebas después de actualizaciones:
   - Probar endpoints
   - Verificar autenticación
   - Validar CORS

===========================================
CONTACTO Y SOPORTE
===========================================
Para soporte o consultas:
- GitHub: <url-repositorio>
- Email: <email-soporte>
- Documentación: <url-documentación>

Última actualización: [FECHA]
