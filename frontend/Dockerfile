FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY packages/shared/package.json ./packages/shared/
COPY frontend/package.json ./frontend/

RUN npm install

COPY packages/shared ./packages/shared
COPY frontend ./frontend

WORKDIR /app/frontend

CMD ["npm", "run", "dev"]
