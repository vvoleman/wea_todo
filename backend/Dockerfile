# dev stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY dist dist
COPY node_modules node_modules
COPY .env .env
#RUN npm install
#COPY . .
#RUN npm run build

# production stage
FROM node:lts-alpine as production-stage
COPY --from=build-stage /app/dist dist
COPY --from=build-stage /app/node_modules node_modules
COPY --from=build-stage /app/package.json package.json
COPY --from=build-stage /app/.env .env
EXPOSE 3000
CMD ["node", "dist/index.js"]