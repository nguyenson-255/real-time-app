# FROM node:20-alpine AS development

# WORKDIR /son/src/app

# COPY package*.json ./
# COPY tsconfig.build.json ./
# COPY tsconfig.json ./

# RUN npm ci && npm cache clean --force 

# EXPOSE 3001

# FROM node:20-alpine AS production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /son/src/app

# COPY --from=development /son/src/app/node_modules ./node_modules

# EXPOSE 3001

# CMD [ "npm", "run", "start" ]

FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=development /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main"]

