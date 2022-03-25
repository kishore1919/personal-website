## declare PHONY
.PHONY: build

## typecheck
typecheck-watch:
	node_modules/.bin/tsc -p tsconfig.json --w

## start
start:
	(trap 'kill 0' INT; make build & make typecheck-watch)

## build
pre-build:
	rm -rf build && cp -R public build

## pwa
generate-sw:
	node_modules/.bin/workbox generateSW workbox-config.cjs

transpile:
	node script/esbuild.js && node script/terser.js

build: pre-build
	make generate-sw && make transpile

## clean-up
clean-up:
	rm -rf .eslintrc .gitattributes .gitignore .prettierrc *.json workbox-config.cjs yarn.lock && \
		rm -rf src script public node_modules
