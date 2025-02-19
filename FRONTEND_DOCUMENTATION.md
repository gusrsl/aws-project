# Documentación del Frontend: Task Manager Frontend

## Tabla de Contenidos
1. [Visión General](#visión-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Requisitos y Configuración](#requisitos-y-configuración)
4. [Instalación y Desarrollo](#instalación-y-desarrollo)
5. [Construcción y Despliegue](#construcción-y-despliegue)
6. [Consideraciones Adicionales](#consideraciones-adicionales)
7. [Conclusiones](#conclusiones)

## Visión General

El proyecto del frontend de Task Manager es una aplicación desarrollada con Angular. Su objetivo es proporcionar una interfaz de usuario moderna y responsiva que permite la gestión de tareas, aprovechando tecnologías como Angular Material para la UI y NgRx para el manejo del estado de la aplicación.

## Estructura del Proyecto

La raíz del proyecto se encuentra en la carpeta `task-manager-frontend` y contiene los siguientes elementos clave:

- **.angular/**: Carpeta de configuración y archivos generados por Angular CLI para el manejo del workspace.
- **node_modules/**: Dependencias instaladas del proyecto.
- **public/**: Archivos públicos, tales como assets (imágenes, iconos, etc.) que se sirven de forma estática.
- **src/**: Contiene todo el código fuente de la aplicación.
  - **src/app/**: Directorio principal donde se alojan los componentes, servicios, módulos, y otros artefactos de la aplicación.
  - **src/assets/**: Archivos de recursos como estilos, imágenes, y más.
- **angular.json**: Archivo de configuración principal de Angular CLI, donde se define la estructura del proyecto, arquitecturas de build, y más.
- **package.json**: Define las dependencias del proyecto, scripts de desarrollo y configuración general de npm.
- **tsconfig*.json**: Configuraciones de compilación para TypeScript.
- **.gitignore** y **.editorconfig**: Archivos de configuración para Git y editores de código.

## Requisitos y Configuración

Para trabajar con el frontend se necesita tener instalado:

- Node.js (v18 o superior recomendado)
- Angular CLI
- npm (gestor de paquetes de Node.js)

Además, se recomienda configurar las variables de entorno si la aplicación utiliza configuraciones externas o si se integrará con otros servicios.

## Instalación y Desarrollo

1. **Instalación de dependencias**
   Desde la raíz del proyecto, ejecuta:
   ```bash
   npm install
   ```

2. **Ejecución en modo desarrollo**
   Para iniciar el servidor de desarrollo, utiliza:
   ```bash
   ng serve
   ```
   La aplicación se iniciará en el puerto por defecto (generalmente http://localhost:4200).

3. **Ejecutar Tests**
   Para correr tests unitarios:
   ```bash
   ng test
   ```
   Y para tests end-to-end:
   ```bash
   ng e2e
   ```

## Construcción y Despliegue

1. **Construir para producción**
   Ejecuta el siguiente comando para generar el build optimizado:
   ```bash
   ng build --configuration=production
   ```
   Esto creará una versión optimizada y lista para desplegar en la carpeta `dist/`.

2. **Despliegue**
   La aplicación construida se puede desplegar en un servidor web o en servicios de hosting estático (como AWS S3, Netlify, Vercel, etc.).

## Consideraciones Adicionales

- **Angular Material y estilos:**
   La aplicación utiliza Angular Material para proporcionar componentes UI modernos y responsivos. Los estilos se gestionan mediante SCSS y se emplean variables CSS para mantener la coherencia en el diseño.

- **Gestión de estado con NgRx:**
   Se usa NgRx para manejar el estado global de forma predecible, lo cual es fundamental para aplicaciones complejas con múltiples interacciones.

- **Configuración de rutas y módulos:**
   El enrutamiento se configura en los módulos de Angular para mantener una navegación fluida y modular.

- **Eficiencia en el desarrollo:**
   Angular CLI ofrece herramientas robustas para facilitar el desarrollo, compilación y pruebas de la aplicación, lo que permite iterar rápidamente durante el desarrollo.

## Conclusiones

El frontend del Task Manager es una aplicación Angular bien estructurada que se beneficia de poderosas herramientas y librerías como Angular Material y NgRx. Su arquitectura modular y el uso de Angular CLI facilitan el desarrollo y despliegue, asegurando una experiencia de usuario optimizada y escalable. 