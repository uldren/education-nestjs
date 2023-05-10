FROM node:18.16-alpine
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm i
COPY . .
RUN npm run build
RUN npm prune --production
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]