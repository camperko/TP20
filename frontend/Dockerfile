FROM node:12-alpine

#Create app directory and use it as the working directory
RUN mkdir -p /srv/app/blockchain-client
WORKDIR /srv/app/blockchain-client

COPY package.json /srv/app/blockchain-client
COPY package-lock.json /srv/app/blockchain-client

COPY . /srv/app/blockchain-client

RUN npm install



CMD ["npm", "start"]