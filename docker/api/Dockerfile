FROM node:20.12-alpine3.19 as dev
WORKDIR /app
COPY package.json ./
RUN npm install
CMD npm run migration:run && npm run start:dev
# CMD [ "npm", "run", "start:dev" ]

FROM node:20.12-alpine3.19 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --frozen-lockfile

FROM node:20.12-alpine3.19 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20.12-alpine3.19 as prod-deps
WORKDIR /app
COPY package.json package.json
RUN npm install --only=production --frozen-lockfile

FROM node:20.12-alpine3.19 as prod
EXPOSE 3000
WORKDIR /app
ENV APP_VERSION=${APPVERSION}
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD npm run migration:run && node dist/main.js
# CMD [ "node", "dist/main.js" ]
