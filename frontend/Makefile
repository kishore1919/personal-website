## declare PHONY
.PHONY: build test
MAKEFLAGS += --silent

NODE_BIN=node_modules/.bin/

## typecheck
typecheck:
	$(NODE_BIN)tsc -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## start
start:
	(trap 'kill 0' INT; make build & make typecheck-watch)

## build
pre-build:
	rm -rf build && cp -R public build

## pwa
generate-sw:
	$(NODE_BIN)workbox generateSW workbox-config.cjs

transpile:
	node script/esbuild.js && node script/terser.js

build: pre-build
	make generate-sw && make transpile

## format
prettier=$(NODE_BIN)prettier
prettify:
	$(prettier) --$(type) src/ test/

format-check:
	make prettify type=check

format:
	make prettify type=write

## lint
lint:
	$(NODE_BIN)eslint src/ test/ -f='stylish' --color

## test
test:
	$(NODE_BIN)esbuild test/index.ts --sourcemap --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		$(NODE_BIN)jest __test__
