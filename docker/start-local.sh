#!/bin/bash

#####################################################################
# Modifications to this script do not require an image rebuild.     #
#####################################################################
echo Running start script for local development at `date` ...

ls 

cd /usr/local/app

echo installing yarn ...
npm install --force yarn -g

#only run npm install if the node_modules directory doesn't exist or is empty
if [ ! -d node_modules ] || [ $(ls -l node_modules | wc -l) -lt 2 ]
then
    echo installing dependencies..
    yarn
fi

echo building dist...
yarn build

echo luke-test-v10 container ready for local development at `date`...
#start node repl to keep the container from exiting
cross-env NODE_ENV=production node dist/app.js