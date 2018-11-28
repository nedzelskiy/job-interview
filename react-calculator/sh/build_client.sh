#!/bin/bash
eval `grep "^export " ./sh/env.sh` && \
node node_modules/webpack/bin/webpack.js