FROM node:17.0.1-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["node", "server.js"]