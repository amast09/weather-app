#!/usr/bin/env bash

image_tag=${1}

aws_access_key_id=${2}
aws_secret_access_key=${3}

# Environment variables for app
open_weather_api_key=${4}
api_port=${5}

docker_registery="694576376659.dkr.ecr.us-east-1.amazonaws.com/amast09/weather-app"
app_container_name="weather-app"

AWS_ACCESS_KEY_ID=${aws_access_key_id} AWS_SECRET_ACCESS_KEY=${aws_secret_access_key} \
  aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin ${docker_registery}

docker pull ${docker_registery}:${image_tag}

docker stop ${app_container_name} || true && \
  docker rm ${app_container_name} || true

docker run -d -p ${api_port}:${api_port} \
  --name ${app_container_name} \
  --env API_PORT=${api_port} \
  --env OPEN_WEATHER_API_KEY=${open_weather_api_key} \
  ${docker_registery}:${image_tag}

docker image prune -a -f
