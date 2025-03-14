FROM node:20-alpine

WORKDIR /son/src/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3001

CMD [ "npm", "run", "start" ]