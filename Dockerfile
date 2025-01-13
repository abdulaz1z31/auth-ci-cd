ARG NODE_VERSION=22.11.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]


