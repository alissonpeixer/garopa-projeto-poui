#!/bin/bash

CONTAINER_NAME="central-frontend"


if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
  docker stop $CONTAINER_NAME
  docker rm $CONTAINER_NAME
fi

docker build -t central:front-end .

docker run -d -p 7778:80 --name $CONTAINER_NAME central:front-end
