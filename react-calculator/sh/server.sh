#!/bin/bash
eval `grep "^export " ./sh/env.sh` && \
node node_modules/nodemon/bin/nodemon.js src/build/server/server.js