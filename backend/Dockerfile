FROM node:11-alpine

#Create app directory and use it as the working directory
RUN mkdir -p /srv/app/blockchain-server
WORKDIR /srv/app/blockchain-server

COPY package.json /srv/app/blockchain-server
COPY package-lock.json /srv/app/blockchain-server

RUN npm install

COPY . /srv/app/blockchain-server

CMD ["npm", "start"]