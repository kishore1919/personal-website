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

install-mongo:
	node script/mongo-setup/install.js

setup-mongo:
	sudo systemctl unmask mongod
	sudo systemctl start mongod
	sudo systemctl stop mongod
	sudo systemctl restart mongod
	mongosh < script/mongo-setup/document.js

## generate
generate: generate-portfolio-data generate-resume

generate-portfolio-data:
	$(NODE_BIN)vite-node script/projects/generate-data.ts ${arguments}

generate-resume:
	git clone https://github.com/GervinFung/resume.git --depth 1 &&\
		cd resume && make install &&\
		mv dist/GervinFungDaXuen-Résumé.pdf ../public/files/GervinFungDaXuen-Résumé.pdf &&\
		cd ../ && rm -rf resume

generate-portfolio-data-force:
	make generate-portfolio-data arguments="-- --f"

check-projects-image-asset:
	$(NODE_BIN)vite-node script/projects/ensure-background-has-logo-vice-versa.ts

## dev
next=$(NODE_BIN)next

## env
development:
	cp .env.development .env

staging:
	cp .env.staging .env

production:
	cp .env.production .env

testing:
	cp .env.testing .env

## deployment
deploy-staging: build-staging
	vercel

deploy-production: build-production
	vercel --prod

clear-cache:
	rm -rf .next

start-development: development clear-cache
	$(next) dev

start-staging: staging clear-cache start

start-production: production clear-cache start

## build
build-production: clear-cache check-projects-image-asset production
	$(next) build

build-staging: clear-cache check-projects-image-asset staging
	$(next) build

build-testing: clear-cache check-projects-image-asset testing
	$(next) build

## start
start:
	$(next) start $(arguments)

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
test-type:
	$(NODE_BIN)vitest test/$(path)/**.test.ts

test-unit:
	make test-type path="unit"

test-integration:
	make build-testing && make test-type path="integration"

test-snapshots:
	make build-testing && make test-type path="snapshots"

test: test-unit test-integration test-snapshots
