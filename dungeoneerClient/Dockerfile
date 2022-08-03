#stage 1 copy everything over and run npm build (which is just ng build)
FROM node as node
COPY dungeoneerClient /app/dungeoneerClient
COPY dungeoneerCommon /app/dungeoneerCommon
WORKDIR /app/dungeoneerClient
RUN npm install
RUN npm run build --prod
#stage 2 add the created files from stage 1 to a small nginx image
FROM nginx:alpine
COPY --from=node /app/dungeoneerClient/dist/dungeoneer-client /usr/share/nginx/html