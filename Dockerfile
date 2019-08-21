FROM node:8-alpine
LABEL MAINTAINER="Cobbleopolis <cobbleopolis@gmail.com>"
HEALTHCHECK --interval=1m --timeout=5s CMD wget --quiet --tries=1 --spider http://localhost:9000/alive || exit 1
ADD --chown=node:node dist /home/node/
USER node
WORKDIR /home/node
RUN ["npm", "install", "--only=production", "--silent"]
ENV NODE_ENV=production
EXPOSE 9000
VOLUME ["/home/node/config", "/home/node/storeData"]
ENTRYPOINT ["node", "/home/node/server.js"]
