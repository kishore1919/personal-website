## declare PHONY
.PHONY: build test
MAKEFLAGS += --silent

NODE_BIN=node_modules/.bin/

## serve
serve:
	node build

## start
start:
	(trap 'kill 0' INT; make typecheck-watch & make build)

## build
build:
	rm -rf build && node script/esbuild.js

## type-check
typecheck:
	$(NODE_BIN)tsc -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

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
	$(NODE_BIN)esbuild test/index.ts --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		$(NODE_BIN)jest __test__
