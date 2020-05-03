FROM node:12  
#-alpine


RUN mkdir -p /srv/app/blockchain-server
WORKDIR /srv/app/blockchain-server

ENV SSH_PASSWD "root:Docker!"
RUN apt-get update \
        && apt-get install -y --no-install-recommends dialog \
        && apt-get update \
  && apt-get install -y --no-install-recommends openssh-server \
  && echo "$SSH_PASSWD" | chpasswd \
  && apt-get install nano


COPY package.json /srv/app/blockchain-server
COPY package-lock.json /srv/app/blockchain-server
COPY . /srv/app/blockchain-server
COPY sshd_config /etc/ssh/
COPY init.sh /usr/local/bin/

RUN npm install

ENTRYPOINT ["init.sh"]
#CMD ["npm", "start"]