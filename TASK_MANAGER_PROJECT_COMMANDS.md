# DOCUMENTACIÓN COMPLETA DE COMANDOS - TASK MANAGER PROJECT

## INFORMACIÓN DEL PROYECTO
Fecha de documentación: Febrero 2025

### DESCRIPCIÓN GENERAL
El proyecto Task Manager es una aplicación web basada en una arquitectura de microservicios desplegada en AWS, con los siguientes componentes:

1. Auth Service: Servicio de autenticación basado en Lambda y Cognito
2. Task Service: Servicio de gestión de tareas implementado en Lambda
3. Frontend: Aplicación React desplegada en AWS S3

### ARQUITECTURA DEL PROYECTO
- Frontend: React/TypeScript con Vite, Redux, Material UI
- Backend: Servicios serverless desplegados en AWS Lambda
- Base de datos: DynamoDB
- APIs: AWS API Gateway
- Hosting: S3 para el frontend, Lambda para el backend

## 1. SERVICIOS DESPLEGADOS

### AUTH SERVICE
URL Base: https://ccemnbnre1.execute-api.us-east-1.amazonaws.com/dev
Endpoints:
- POST /auth/register - Registro de usuarios
- POST /auth/login - Autenticación de usuarios

### TASK SERVICE
URL Base: https://2g5jn00wzg.execute-api.us-east-1.amazonaws.com/dev
Endpoints:
- GET /tasks - Listar tareas del usuario
- POST /tasks - Crear nueva tarea
- PUT /tasks/{taskId} - Actualizar tarea existente
- DELETE /tasks/{taskId} - Eliminar tarea

### FRONTEND
URL: http://task-manager-frontend-grm.s3-website-us-east-1.amazonaws.com
Estructura:
- /assets/ - Recursos estáticos
- index.html - Punto de entrada de la aplicación
- vite.svg - Icono del sitio

## 2. COMANDOS PARA AUTH SERVICE

### INFORMACIÓN Y ESTADO
```bash
# Ver información general del servicio desplegado
cd auth-service && npx serverless info
# Muestra los endpoints, funciones, y región desplegada

# Ver información de un entorno específico
npx serverless info --stage prod
# Muestra la información del servicio en el entorno de producción
```

### DESARROLLO LOCAL
```bash
# Iniciar el servicio localmente (entorno de desarrollo)
cd auth-service
npx serverless offline start --stage dev
# Levanta un servidor local que simula Lambda y API Gateway en tu máquina

# Iniciar el servicio en puertos específicos
npx serverless offline start --httpPort 3000 --lambdaPort 3002 --stage dev
# Permite especificar puertos personalizados para evitar conflictos
```

### DESPLIEGUE
```bash
# Desplegar el servicio completo en entorno de desarrollo
cd auth-service
npx serverless deploy --stage dev
# Empaqueta y despliega todos los recursos definidos en serverless.yml

# Desplegar en entorno de producción
npx serverless deploy --stage prod
# Realiza el mismo proceso pero usando la configuración de producción

# Desplegar sólo una función específica (más rápido para cambios pequeños)
npx serverless deploy function --function registerUser --stage dev
npx serverless deploy function --function loginUser --stage prod
# Actualiza sólo la función especificada sin redesplegar toda la infraestructura
```

### LOGS Y MONITOREO
```bash
# Ver logs de una función específica
cd auth-service
npx serverless logs -f registerUser --stage dev
# Muestra los logs de CloudWatch para la función especificada

# Ver logs en tiempo real (útil para debugging)
npx serverless logs -f loginUser --stage dev --tail
# Muestra logs de forma continua a medida que se generan
```

### PRUEBAS LOCALES
```bash
# Invocar función localmente con datos de prueba
cd auth-service
npx serverless invoke local --function registerUser --path tests/mock-data/register.json --stage dev
# Ejecuta la función Lambda localmente con los datos de prueba proporcionados

# Invocar función desplegada en AWS
npx serverless invoke --function loginUser --path tests/mock-data/login.json --stage dev
# Ejecuta la función ya desplegada en AWS (útil para pruebas de integración)
```

### LIMPIEZA Y ELIMINACIÓN
```bash
# Eliminar todo el servicio de un entorno
cd auth-service
npx serverless remove --stage dev
# Elimina todos los recursos AWS creados para este servicio en el entorno especificado

# Mostrar la configuración completa (para debug)
npx serverless print --stage dev
# Muestra toda la configuración resuelta, útil para verificar variables de entorno
```

## 3. COMANDOS PARA TASK SERVICE

### INFORMACIÓN Y ESTADO
```bash
# Ver información general del servicio desplegado
cd task-service && npx serverless info
# Muestra los endpoints, funciones, y región desplegada

# Ver información de un entorno específico
npx serverless info --stage prod
# Muestra la información del servicio en el entorno de producción
```

### DESARROLLO LOCAL
```bash
# Iniciar el servicio localmente (entorno de desarrollo)
cd task-service
npx serverless offline start --stage dev
# Levanta un servidor local que simula Lambda y API Gateway

# Iniciar el servicio en puertos específicos
# Nota: Se usan puertos diferentes al auth-service para evitar conflictos
npx serverless offline start --httpPort 3004 --lambdaPort 3005 --stage dev
# La API estará disponible en http://localhost:3004
```

### DESPLIEGUE
```bash
# Desplegar el servicio completo en entorno de desarrollo
cd task-service
npx serverless deploy --stage dev
# Empaqueta y despliega todos los recursos definidos

# Desplegar en entorno de producción
npx serverless deploy --stage prod
# Usa la configuración de producción

# Desplegar sólo una función específica
npx serverless deploy function --function createTask --stage dev
npx serverless deploy function --function getTasks --stage prod
# Actualiza sólo la función especificada
```

### LOGS Y MONITOREO
```bash
# Ver logs de funciones específicas
cd task-service
npx serverless logs -f createTask --stage dev
npx serverless logs -f getTasks --stage prod
# Muestra los logs de CloudWatch para la función

# Ver logs en tiempo real
npx serverless logs -f updateTask --stage dev --tail
# Útil durante pruebas para ver el comportamiento
```

### PRUEBAS LOCALES
```bash
# Invocar funciones localmente con datos de prueba
cd task-service
npx serverless invoke local --function createTask --path tests/mock-data/create-task.json --stage dev
# Prueba la creación de tareas localmente

# Invocar función de listado con datos de prueba que incluyen token JWT
npx serverless invoke local --function getTasks --path tests/mock-data/get-tasks.json --stage dev
# El archivo JSON debe incluir un evento con headers de autorización
```

### LIMPIEZA Y ELIMINACIÓN
```bash
# Eliminar el servicio completo de un entorno
cd task-service
npx serverless remove --stage dev
npx serverless remove --stage prod
# Elimina recursos para reducir costos cuando no se necesiten
```

## 4. COMANDOS PARA FRONTEND

### DESARROLLO LOCAL
```bash
# Iniciar el servidor de desarrollo
cd frontend
npm run dev
# Inicia el servidor de desarrollo de Vite en http://localhost:5173

# Configurar variables de entorno para desarrollo local
echo "VITE_AUTH_API=http://localhost:3000\nVITE_TASK_API=http://localhost:3004" > .env.development
# Conecta el frontend con los servicios locales
```

### CONSTRUCCIÓN Y PREVISUALIZACIÓN
```bash
# Construir el frontend para producción
cd frontend
npm run build
# Genera los archivos optimizados en la carpeta dist/

# Previsualizar la versión de producción localmente
npm run preview
# Útil para verificar la versión de producción antes de desplegar

# Actualizar variables para entorno de producción
echo "VITE_AUTH_API=https://ccemnbnre1.execute-api.us-east-1.amazonaws.com/prod\nVITE_TASK_API=https://2g5jn00wzg.execute-api.us-east-1.amazonaws.com/prod" > .env.production
# Conecta con los endpoints de producción
```

### LINT Y FORMATO
```bash
# Ejecutar el linter para encontrar problemas
cd frontend
npm run lint
# Revisa el código en busca de problemas de estilo o errores

# Formatear el código automáticamente
npm run format
# Aplica reglas de formato a todo el código
```

### PRUEBAS
```bash
# Ejecutar las pruebas
cd frontend
npm test
# Ejecuta las pruebas con Vitest
```

## 5. COMANDOS PARA AWS S3 (FRONTEND DEPLOYMENT)

### VERIFICACIÓN DEL BUCKET
```bash
# Listar el contenido actual del bucket
aws s3 ls s3://task-manager-frontend-grm
# Muestra archivos y carpetas en el bucket

# Verificar la configuración de sitio web estático
aws s3api get-bucket-website --bucket task-manager-frontend-grm
# Confirma que el bucket está configurado como sitio web

# Verificar la política del bucket (permisos públicos)
aws s3api get-bucket-policy --bucket task-manager-frontend-grm
# Muestra la política JSON que permite el acceso público

# Verificar configuración CORS
aws s3api get-bucket-cors --bucket task-manager-frontend-grm
# Muestra reglas CORS configuradas
```

### DESPLIEGUE A S3
```bash
# Desplegar todo el contenido de la carpeta dist/
cd frontend
npm run build
aws s3 sync dist/ s3://task-manager-frontend-grm --delete
# El flag --delete elimina archivos en S3 que ya no existen en dist/

# Despliegue optimizado con configuración de caché
# Para recursos estáticos (que cambian con cada build)
aws s3 sync dist/assets/ s3://task-manager-frontend-grm/assets/ --cache-control "max-age=31536000,public"
# Establece un año de caché para archivos estáticos

# Para el archivo index.html (que debe actualizarse inmediatamente)
aws s3 cp dist/index.html s3://task-manager-frontend-grm/index.html --cache-control "max-age=0,no-cache,no-store,must-revalidate" --content-type "text/html"
# Evita que el navegador cachee el index.html
```

### MANEJO DE MÚLTIPLES ENTORNOS
```bash
# Crear y configurar bucket para entorno de desarrollo/staging
aws s3 mb s3://task-manager-frontend-grm-dev --region us-east-1
aws s3 website s3://task-manager-frontend-grm-dev --index-document index.html --error-document index.html

# Crear archivo de política para el nuevo bucket
cat > bucket-policy-dev.json << EOL
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::task-manager-frontend-grm-dev/*"
        }
    ]
}
EOL

# Aplicar política al bucket de desarrollo
aws s3api put-bucket-policy --bucket task-manager-frontend-grm-dev --policy file://bucket-policy-dev.json
```

### CONFIGURACIÓN CORS MEJORADA
```bash
# Crear archivo de configuración CORS más completo
cat > cors.json << EOL
{
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "HEAD", "PUT", "POST", "DELETE"],
            "AllowedOrigins": ["*"],
            "ExposeHeaders": ["ETag"]
        }
    ]
}
EOL

# Aplicar nueva configuración CORS
aws s3api put-bucket-cors --bucket task-manager-frontend-grm --cors-configuration file://cors.json
```

### OPERACIONES DE MANTENIMIENTO
```bash
# Crear una copia de seguridad del bucket
aws s3 sync s3://task-manager-frontend-grm s3://task-manager-frontend-backup

# Limpiar versiones antiguas (si el versionamiento está habilitado)
aws s3api delete-objects --bucket task-manager-frontend-grm --delete "$(aws s3api list-object-versions --bucket task-manager-frontend-grm --query '{Objects: Versions[].{Key:Key,VersionId:VersionId}}')"

# Habilitar logs de acceso
aws s3api put-bucket-logging --bucket task-manager-frontend-grm --bucket-logging-status '{
  "LoggingEnabled": {
    "TargetBucket": "my-logs-bucket",
    "TargetPrefix": "task-manager-access-logs/"
  }
}'
```

## 6. OPERACIONES CON CLOUDFRONT (OPCIONAL)

```bash
# Listar distribuciones CloudFront existentes
aws cloudfront list-distributions

# Crear distribución CloudFront para el frontend
aws cloudfront create-distribution \
  --origin-domain-name task-manager-frontend-grm.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html \
  --origins "{ \"Quantity\": 1, \"Items\": [{ \"Id\": \"S3-Website\", \"DomainName\": \"task-manager-frontend-grm.s3-website-us-east-1.amazonaws.com\", \"CustomOriginConfig\": { \"HTTPPort\": 80, \"HTTPSPort\": 443, \"OriginProtocolPolicy\": \"http-only\" } }] }" \
  --default-cache-behavior "{ \"TargetOriginId\": \"S3-Website\", \"ViewerProtocolPolicy\": \"redirect-to-https\", \"AllowedMethods\": { \"Quantity\": 2, \"Items\": [\"GET\", \"HEAD\"], \"CachedMethods\": { \"Quantity\": 2, \"Items\": [\"GET\", \"HEAD\"] } }, \"ForwardedValues\": { \"QueryString\": false, \"Cookies\": { \"Forward\": \"none\" } } }"

# Invalidar caché después de una actualización
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
```

## 7. COMANDOS ÚTILES PARA TRABAJAR CON EL PROYECTO

### CICLO COMPLETO DE DESARROLLO Y PRUEBA
```bash
# Iniciar todos los servicios localmente (en diferentes terminales)
cd auth-service && npx serverless offline start --httpPort 3000
cd task-service && npx serverless offline start --httpPort 3004
cd frontend && npm run dev

# Ejecutar un ciclo completo de pruebas
cd auth-service && npx serverless invoke local --function registerUser --path tests/mock-data/register.json
cd task-service && npx serverless invoke local --function createTask --path tests/mock-data/create-task.json
cd frontend && npm test
```

### CICLO COMPLETO DE DESPLIEGUE
```bash
# Desplegar los servicios backend
cd auth-service && npx serverless deploy --stage prod
cd task-service && npx serverless deploy --stage prod

# Desplegar el frontend con configuraciones actualizadas
cd frontend
echo "VITE_AUTH_API=https://ccemnbnre1.execute-api.us-east-1.amazonaws.com/prod\nVITE_TASK_API=https://2g5jn00wzg.execute-api.us-east-1.amazonaws.com/prod" > .env.production
npm run build
aws s3 sync dist/ s3://task-manager-frontend-grm --delete

# Invalidar caché de CloudFront (si se usa)
aws cloudfront create-invalidation --distribution-id DISTRIBUTION_ID --paths "/*"
```

## 8. MEJORES PRÁCTICAS Y RECOMENDACIONES

### SEGURIDAD
- Utilizar variables de entorno o AWS SSM Parameter Store para secretos:
  ```bash
  aws ssm put-parameter --name "/task-manager/prod/jwt-secret" --value "your-secure-secret" --type SecureString
  ```

- Configurar políticas IAM restrictivas para cada servicio
- Implementar validación de entrada en todos los endpoints
- Considerar AWS WAF para protección adicional

### OPTIMIZACIÓN DE COSTOS
- Eliminar recursos no utilizados:
  ```bash
  npx serverless remove --stage dev  # Para ambientes de prueba que no se usen
  ```

- Monitorear el uso con CloudWatch:
  ```bash
  aws cloudwatch get-metric-statistics --namespace AWS/Lambda --metric-name Invocations --dimensions Name=FunctionName,Value=auth-service-dev-loginUser --start-time 2025-02-01T00:00:00Z --end-time 2025-02-20T00:00:00Z --period 86400 --statistics Sum
  ```

### DESPLIEGUE CONTINUO
- Configurar GitHub Actions o AWS CodePipeline para automatizar:
  - Construcción
  - Pruebas
  - Despliegue
  - Invalidación de caché

### MONITOREO
- Configurar alarmas de CloudWatch para errores y latencia
- Implementar rastreo con AWS X-Ray
- Configurar dashboards personalizados

## 9. CONFIGURACIÓN ACTUAL DEL FRONTEND EN S3

### ESTRUCTURA DE ARCHIVOS
- Directorio `assets/` (contiene recursos estáticos)
- `index.html` (página principal)
- `vite.svg` (icono de Vite)

### CONFIGURACIÓN DE SITIO WEB ESTÁTICO
- Documento índice: `index.html`
- Documento de error: `index.html` (correcto para SPA)

### POLÍTICA DE BUCKET
- Permite lectura pública (`s3:GetObject`) a todos los recursos

### CONFIGURACIÓN CORS
- Permite headers: `*`
- Permite métodos: `GET`
- Permite orígenes: `*`

## 10. SOLUCIÓN DE PROBLEMAS COMUNES

### ERRORES DE CORS
- Verificar la configuración CORS del bucket S3
- Asegurar que API Gateway tiene CORS habilitado
- Revisar los métodos HTTP permitidos

### PROBLEMAS DE AUTENTICACIÓN
- Verificar el formato del token JWT
- Comprobar la expiración del token
- Confirmar que SECRET_KEY es la misma en todos los servicios

### ERRORES DE DESPLIEGUE
- Limpiar la carpeta `.serverless` y volver a intentar
- Verificar permisos IAM
- Revisar límites de servicio de AWS

### PROBLEMAS DE RENDIMIENTO
- Implementar CloudFront para distribución global
- Optimizar configuración de caché
- Reducir el tamaño de los bundles JavaScript con code-splitting 