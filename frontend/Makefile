## declare PHONY
.PHONY: build

## type check
tsc=node_modules/.bin/tsc
typecheck:
	$(tsc) --pretty --skipLibCheck --noEmit

## start
start:
	(trap 'kill 0' INT; make typecheck & make build)

start-watch:
	node_modules/.bin/nodemon

## build
build:
	rm -rf build\
		&& cp -R public build\
		&& node script/esbuild.js\
		&& node script/terser.js

## clean-up
clean-up:
	rm -rf src script public && \
		rm -rf node_modules && \
		rm -rf .eslintrc .gitattributes .gitignore .prettierrc *.json craco.config.js yarn.lock
