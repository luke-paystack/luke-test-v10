#!/bin/sh

# cross-env NODE_ENV=production nps db.migrate
# cross-env NODE_ENV=production node dist/app.js
$(yarn bin cross-env) NODE_ENV=production node dist/app.js