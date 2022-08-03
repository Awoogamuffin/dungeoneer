#! /bin/bash

cd ..
docker build --no-cache -t dungeoneer/server:latest -f dungeoneerServer/Dockerfile .
echo "Make sure you have logged into docker hub as dungeoneer to be able to push the image"
docker push dungeoneer/server