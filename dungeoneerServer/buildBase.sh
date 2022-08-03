#! /bin/bash

cd ..
docker build --no-cache -t dungeoneerserverbase -f dungeoneerServer/Dockerfile-base .