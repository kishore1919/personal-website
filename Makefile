.PHONY: build test all
MAKEFLAGS += --silent

all:
	make lint &&\
		make typecheck &&\
		make format-check &&\
		make test &&\
		make build

NODE_BIN=node_modules/.bin/

## install
install:
	yarn install --frozen-lockfile

## generate
generate:
	$(NODE_BIN)esbuild script/portfolio/index.ts --sourcemap --bundle --minify --target=node16.3.1 --platform=node --outfile=script/portfolio/index.generated.js &&\
		node script/portfolio/index.generated.js ${arguments}

generate-force:
	make generate arguments=-f

## dev
next=$(NODE_BIN)next

clear-cache:
	rm -rf .next && make generate

dev: clear-cache
	$(next) dev

## build
build: clear-cache
	$(next) build

## start
start:
	$(next) start

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

## typecheck
tsc=$(NODE_BIN)tsc

typecheck:
	$(tsc) -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## test
test:
	$(NODE_BIN)esbuild test/index.ts --sourcemap --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		$(NODE_BIN)jest __test__
