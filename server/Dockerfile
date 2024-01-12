FROM node:17-alpine

RUN npm install -g nodemon

RUN mkdir -p /app
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]