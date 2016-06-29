FROM node:argon

RUN npm install -g bower nodemon

RUN mkdir /app
WORKDIR /app

COPY . .

RUN bower install
RUN npm install
