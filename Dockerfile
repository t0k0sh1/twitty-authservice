FROM node:14.11.0

ENV PORT 80

WORKDIR /opt/app

RUN apt-get update && apt-get install -y mysql-client

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 80
CMD sh /opt/app/startup.sh ${NODE_ENV} ${DB_HOST} ${DB_USER} ${DB_PASSWORD}