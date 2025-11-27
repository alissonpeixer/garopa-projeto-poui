#!/bin/bash

CONTAINER_NAME="garopa-projeto-poui"
DOCKER_IMAGE_NAME="garopa:poui"

docker build -t $DOCKER_IMAGE_NAME

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  docker stop $CONTAINER_NAME
  docker rm $CONTAINER_NAME
fi

docker run -d -p 7778:80 --name $CONTAINER_NAME $DOCKER_IMAGE_NAME
