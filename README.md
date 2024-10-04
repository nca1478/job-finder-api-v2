# Jobfinder Api v2.0

`Jobfinder Api v2.0` es la versión 2 del backend para el proyecto `Jobfinder App v2.0`.

## Características

- Endpoints para Ofertas de Trabajo.
- Endpoints para Sectores.
- Endpoints para Habilidades.
- Endpoints para Usuarios.
- Endpoints para Autenticación de Local de Usuarios.
- Endpoints para Autenticación por Google y Facebook.
- Endpoints protegidos con JSON Web Tokens.
- Modelos y Base de Datos en Postgres.
- ORM de Base de Datos: Typeorm.
- Generación de Tablas a través de migraciones.
- Inicialización de tablas a través de seeders.
- Envío de Notificaciones por Email a través de Sendgrid.
- Documentación de endpoints del backend con Swagger.

## Propósito del Proyecto

- Este proyecto fue desarrollado para aplicar las tecnologías de back-end que se muestran a continuación.

## Tech Stack

- Javascript.
- Typescript.
- NodeJS.
- NestJS.
- Postgres.
- Nestjs Openapi (Swagger).
- Typeorm.
- Migraciones y Seeders.

## Librerias y Otras Tecnologías

- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Cloudinary](https://cloudinary.com/)
- [Express Validator](https://express-validator.github.io/docs/)
- [Json Web Token](https://jwt.io/)
- [Nestjs](https://nestjs.com/)
- [Nestjs Sendgrid](https://www.npmjs.com/package/@anchan828/nest-sendgrid)
- [Nestjs Swagger](https://docs.nestjs.com/openapi/introduction)
- [Nodejs](https://nodejs.org/en/)
- [Migrations](https://orkhan.gitbook.io/typeorm/docs/migrations)
- [Postman](https://www.postman.com/)
- [Postgres](https://www.postgresql.org/)
- [Sendgrid](https://sendgrid.com/en-us)
- [Typescript](https://www.typescriptlang.org/)
- [Typeorm](https://typeorm.io/)
- [Vscode](https://code.visualstudio.com/)

## Demo Jobfinder app

- [Jobfinder App](https://jobfinder-app-v2.netlify.app/)

## Repo Jobfinder app

- [Jobfinder app](https://github.com/nca1478/job-finder-app-v2)

## Requerimientos

- Nodejs v20.
- Typeorm v0.3.20.
- PostgreSQL 16.
- Nestjs v10.
- Postman v11.

## Instalación de Api y Base de Datos

## Configuración de Variables de entorno

- Renombrar .env.example a .env.
- Agregar las credenciales al .env.
- Actualizar variable `NODE_ENV` a `dev` o `prod` sea el caso.

## Opción 1: Instalar Api, DB, Migraciones y Seeders

- Copiar todos los archivos de la carpeta docker a la raíz.
- Ejecutar el comando: `docker compose up --build -d`
- Para eliminar: `docker compose down --volumes`

## Opción 2: Instalar solo Base de Datos; Migraciones y Seeders

- Copiar todos los archivos de la carpeta db a la raíz.
- Ejecuta: `docker compose up -d`
- Migraciones: `npm run migration:run`.
- Seeders: `npm run seed`
- Dependencias: `npm install`.
- Ejecutar Api: `npm run start:dev`
- Eliminar DB: `docker compose down --volumes`

## Pruebas de Endpoints en Postman

- Importar endpoints y variables de la carpeta postman.

## Documentación de Endpoints

- En el navegador, ingresar: `http://localhost:4000/api`
- Crearse un usuario e iniciar sesión.
- Copie el token del response body.
- Pegue el token en la opción "Authorize" al principio de la interfaz.
- Así podrá probar los endpoints protegidos.
- Nota: actualice el token cada vez que inicie sesión.

## Archivo de entrada

> src/main.ts
