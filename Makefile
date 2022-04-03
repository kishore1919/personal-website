## declare PHONY
.PHONY: build

serve:
	cd backend && make serve

start:
	(trap 'kill 0' INT; (cd backend && make start) & (cd frontend && make start))

build:
	(trap 'kill 0' INT; (cd backend && yarn build) & (cd frontend && yarn build)) 

clean-up:
	rm -rf node_modules && \
		rm -rf .gitattributes .gitignore  *.json yarn.lock
