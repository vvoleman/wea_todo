FROM node:16 as build-stage

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copying packages first helps take advantage of docker layers
COPY package*.json ./
COPY ./node_modules ./node_modules

RUN npm install\
        && npm install typescript -g

RUN npm ci

COPY . .
RUN npm run build
CMD [ "node", "dist/index.js" ]
#CMD ["npm", "run", "dev"]
#EXPOSE 3000


