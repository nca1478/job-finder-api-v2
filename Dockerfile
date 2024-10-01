# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.12.0
FROM node:${NODE_VERSION}-alpine
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
CMD npm run build \
  && npm run migration:run \
  && npm run seed \
  && npm run start:dev
