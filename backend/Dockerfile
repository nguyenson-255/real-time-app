FROM node:20-alpine

WORKDIR /son/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start" ]