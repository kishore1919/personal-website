## declare PHONY
.PHONY: build

## start
start:
	node build/index.js

start-watch:
	node_modules/.bin/nodemon

start-dev:
	make build && make start

## build
clean-up:
	rm -rf .eslintrc .gitattributes .gitignore .prettierrc tsconfig.json nodemon.json package.json yarn.lock && \
		rm -rf src script && \
		rm -rf node_modules

build:
	rm -rf build && \
		node script/esbuild.js

## type-check
tsc=node_modules/.bin/tsc
typecheck:
	$(tsc) --pretty --skipLibCheck --noEmit
