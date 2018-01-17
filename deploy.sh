#!/bin/bash
npm run build
rsync -a dist deployer@lumpen.agency:/home/lumpen_js
