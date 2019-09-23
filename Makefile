deploy:
	docker run -it -v ~/code/ljs:/app -w /app node:lts-jessie bash -c "yarn install && yarn build"
	rsync -a dist/ passanger@lumpen.agency:/home/passanger/lumpen_js --delete-after

bash:
	docker run -it -p 3000:3000 -v ~/code/ljs:/app -w /app node:lts-jessie bash
