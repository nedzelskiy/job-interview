#!/bin/bash
eval `grep "^export " ./sh/env.sh` && \
node node_modules/concurrently/src/main.js \
"sh ./sh/build_client.sh" \
"sh ./sh/build_server.sh" \
"sh ./sh/server.sh"