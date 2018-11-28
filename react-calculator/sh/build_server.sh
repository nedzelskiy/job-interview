#!/bin/bash
eval `grep "^export " ./sh/env.sh` && \
node node_modules/typescript/bin/tsc -p tsconfig-server.json