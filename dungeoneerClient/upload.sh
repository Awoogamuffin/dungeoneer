#! /bin/bash

cd ..
docker build --no-cache -t dungeoneer/client:latest -f dungeoneerClient/Dockerfile .
echo "Make sure you have logged into docker hub as dungeoneer to be able to push the image"
docker push dungeoneer/client
