# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.12.0
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

FROM base AS dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app
USER node
COPY . .
CMD npm run build \
  && npm run migration:run \
  && npm run seed \
  && npm run start:dev
