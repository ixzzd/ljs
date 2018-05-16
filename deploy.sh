#!/bin/bash
npm run build
rsync -a dist/ deployer@46.101.192.130:/home/lumpen_js --delete-after
