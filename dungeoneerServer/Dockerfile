FROM dungeoneerserverbase
# we could make a two-stage build here where we compile the tsc separately, but I see no need... maybe a bad idea what I'm doing
COPY dungeoneerServer/dist /app/dungeoneerServer/dist
WORKDIR /app
CMD [ "node", "dungeoneerServer/dist/index.js" ]