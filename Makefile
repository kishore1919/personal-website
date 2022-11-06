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
	pnpm i --frozen-lockfile

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

staging:
	cp .env.staging .env

vercel-staging: staging
	vercel

production:
	cp .env.production .env

vercel-production: production
	vercel --prod

development:
	cp .env.development .env

clear-cache:
	rm -rf .next && make generate

pre-dev: development clear-cache

dev: pre-dev
	$(next) dev

pre-build: check-portfolio-image-asset

## build
build: pre-build
	$(next) build

build-dev: pre-dev pre-build production
	$(next) build

## start
start:
	$(next) start

## format
prettier=$(NODE_BIN)prettier
prettify:
	$(prettier) --ignore-path .gitignore  --$(type) src/ test/

format-check:
	make prettify type=check

format:
	make prettify type=write

## lint
lint:
	$(NODE_BIN)eslint src/ test/ -f='stylish' --color &&\
		make find-unused-exports &&\
		make find-unimported-files

## find unused exports
find-unused-exports:
	$(NODE_BIN)find-unused-exports

## find unimported files
find-unimported-files:
	$(NODE_BIN)unimported

## typecheck
tsc=$(NODE_BIN)tsc

typecheck:
	$(tsc) -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## test
test:
	$(NODE_BIN)vitest
