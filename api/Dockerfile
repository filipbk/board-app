FROM node:12.16.3

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .
RUN npm ci
COPY . .

EXPOSE 3000

CMD ["npm", "start:dev"]
