#!/bin/bash
yarn install && yarn build
rsync -a dist/ passanger@lumpen.agency:/home/passanger/lumpen_js --delete-after
