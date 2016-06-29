FROM node:argon

RUN npm install -g bower nodemon

RUN mkdir /app
WORKDIR /app


COPY bower.json .
COPY .bowerrc .
RUN bower install

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
