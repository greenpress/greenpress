#!bin/bash

helm repo add bitnami https://charts.bitnami.com/bitnami

helm install mongodb bitnami/mongodb
echo "version 5.0.5"

helm install redis bitnami/redis
echo "version 6.2.6"

helm dependency update