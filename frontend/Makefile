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

## clean-up
clean-up:
	rm -rf .eslintrc .gitattributes .gitignore .prettierrc *.json workbox-config.cjs yarn.lock && \
		rm -rf src script public node_modules

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
format:
	$(prettier) --write src/

format-check:
	$(prettier) --check src/

## test
test:
	$(NODE_BIN)esbuild test/index.ts --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		$(NODE_BIN)jest __test__
