#!/bin/bash
docker-compose -f docker-compose.yml -f development.yml up --build --force -d
