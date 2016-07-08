FROM node:argon

RUN npm install -g bower nodemon

COPY package.json /opt/
RUN cd /opt && npm install
ENV NODE_PATH=/opt/node_modules

COPY bower.json /opt
COPY .bowerrc /opt
RUN cd /opt && bower install

RUN mkdir /app
WORKDIR /app

COPY . .

RUN rm -rf public/bower_components && ln -s /opt/bower_components/ public/

EXPOSE 3000
CMD [ "npm", "start" ]
