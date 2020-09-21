#!/usr/bin/env bash

set -e

node_env="$1"
shift
host="$1"
shift
user="$1"
shift
password="$@"

echo "Waiting for mysql"
until mysql -h"$host" -u"$user" -p"$password" &> /dev/null
do
        >&2 echo -n "."
        sleep 1
done

>&2 echo "MySQL is up - executing command"

# run db migration
npm run db:create --env $node_env
npm run db:migrate --env $node_env

# run server
npm run start