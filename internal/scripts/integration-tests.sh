#!/usr/bin/env bash
docker-compose -f docker-compose.e2e.yml up -d

until $(curl --output /dev/null --silent --head --fail http://localhost:11337); do
    printf '.'
    sleep 5
done

cd ./node_modules/nightwatch-xhr
npm run build
cd ../../

nightwatch --test

RESULT=$?

docker-compose -f docker-compose.e2e.yml down -v

exit ${RESULT}
