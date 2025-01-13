ARG NODE_VERSION=22.11.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY .env .env
RUN npm install


COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main" ]

