FROM node:argon

RUN npm install -g bower nodemon grunt-cli grunt

COPY package.json /opt/
RUN cd /opt && npm install
ENV NODE_PATH=/opt/node_modules

COPY bower.json /opt
COPY .bowerrc /opt
RUN cd /opt && bower install

RUN mkdir /app
WORKDIR /app

COPY . .

RUN grunt

COPY docker-entrypoint /
RUN chmod +x /docker-entrypoint
ENTRYPOINT ["/docker-entrypoint"]

EXPOSE 3000
CMD [ "npm", "start" ]
