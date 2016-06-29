FROM node:argon

RUN npm install -g bower

RUN mkdir /app
WORKDIR /app

COPY . .

RUN bower install
