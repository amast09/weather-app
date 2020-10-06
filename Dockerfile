FROM node:14.12.0 AS base
MAINTAINER Aaron Mast <amast09@gmail.com>

# Create app directory
WORKDIR /app

# install our node package dependancies
COPY package.json /app/package.json
RUN npm install

# add everything in our GIT repo to our working directory
COPY / /app

# compile our clientside files
RUN npm run build:client
RUN npm run build:server

FROM node:14.12.0-alpine AS release

WORKDIR /app

COPY --from=base /app/package.json ./
RUN npm install --only=production
COPY --from=base /app ./

ENV NODE_ENV production

# setup our default app launching command
CMD ["node", "build/server.js"]
