#!/bin/bash
if [ "$1" == "--no-db" ]; then
  docker-compose -f docker-compose.yml -f development.yml up --build -d web altweb rupweb old53web
else
  docker-compose -f docker-compose.yml -f development.yml up --build -d
fi