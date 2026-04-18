FROM node:lts-alpine3.22 AS BUILD
WORKDIR /app 

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=BUILD /app/dist /usr/share/nginx/html

EXPOSE 80