FROM node:argon

RUN npm install -g bower nodemon

COPY package.json /opt/
RUN cd /opt && npm install
ENV NODE_PATH=/opt/node_modules

RUN mkdir /app
WORKDIR /app

COPY bower.json .
COPY .bowerrc .
RUN bower install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
