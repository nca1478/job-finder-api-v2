<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Installation (dev y prod)

1. Clonar el proyecto.
2. Clonar el archivo **.env.example** y renombrarlo a **.env**.
3. Cambiar las variables de entorno.

- Modo Dev

```bash
# Creación de Base de Datos, Migraciones y Seeders
$ docker-compose up -d
$ npm install
$ npm run migration:run
$ npm run seed

# Ejecución de Api
$ npm run start:dev

# Eliminar container de Datos de Datos
$ docker compose down --volumes

```

- Modo Prod

```bash
# Creación y Ejecución del Container de la Base de Datos y Api.
$ docker-compose -f docker-compose-prod.yml --env-file .env.prod up -d

# Migraciones y Seeders
$ docker compose exec id_container npm run migration:run
$ docker compose exec id_container npm run seed

# Eliminar container de Datos de Datos
$ docker compose -f docker-compose-prod.yml down --volumes
```
