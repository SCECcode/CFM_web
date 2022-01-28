#!/bin/bash
# Script to start production CFM on SCEC.org server
docker-compose -f docker-compose.yml -f docker-compose-resource-limits.yml up -d
