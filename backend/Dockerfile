FROM node:20-alpine AS development

WORKDIR /son/src/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm ci
RUN npm run build && npm cache clean --force 

EXPOSE 3001

FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /son/src/app

COPY --from=development /son/src/app .

EXPOSE 3001

CMD [ "npm", "run", "start" ]
# CMD [ "node", "dist/main" ]