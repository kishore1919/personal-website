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

## lint
eslint=$(NODE_BIN)eslint
lint-src:
	$(eslint) src/** -f='stylish' --color

lint-test:
	$(eslint) test/**/*.ts -f='stylish' --color

lint:
	(trap 'kill 0' INT; make lint-src & make lint-test)

## format
prettier=$(NODE_BIN)prettier
prettify-src:
	$(prettier) --$(type) src/

prettify-test:
	$(prettier) --$(type) test/

format-check:
	(trap 'kill 0' INT; make prettify-src type=check & make prettify-test type=check)

format:
	(trap 'kill 0' INT; make prettify-src type=write & make prettify-test type=write)

## test
test:
	$(NODE_BIN)esbuild test/index.ts --sourcemap --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		$(NODE_BIN)jest __test__
