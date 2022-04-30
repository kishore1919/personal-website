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

## clean-up
clean-up:
	rm -rf .eslintrc .gitattributes .gitignore .prettierrc *.json yarn.lock && \
		rm -rf src script node_modules

## type-check
typecheck:
	$(NODE_BIN)tsc -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## lint
lint:
	$(NODE_BIN)eslint src/** -f='stylish' --color

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
