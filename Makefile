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
	$(NODE_BIN)esbuild script/portfolio/generate-portfolio-data.ts --sourcemap --bundle --minify --target=node16.3.1 --platform=node --outfile=script/portfolio/generate-portfolio-data.generated.js &&\
		node script/portfolio/generate-portfolio-data.generated.js ${arguments}

generate-force:
	make generate arguments=-f

check-portfolio-image-asset:
	$(NODE_BIN)esbuild script/portfolio/ensure-background-has-logo-vice-versa.ts --sourcemap --bundle --minify --target=node16.3.1 --platform=node --outfile=script/portfolio/ensure-background-has-logo-vice-versa.generated.js &&\
		node script/portfolio/ensure-background-has-logo-vice-versa.generated.js ${arguments}

## dev
next=$(NODE_BIN)next

clear-cache:
	rm -rf .next && make generate

dev: clear-cache
	$(next) dev

pre-build: clear-cache check-portfolio-image-asset

## build
build: pre-build
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
