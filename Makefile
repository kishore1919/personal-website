.PHONY: build test
MAKEFLAGS += --silent

## docker setup ubuntu
install-docker:
	sh script/docker/install.sh

## install
install:
	pnpm i --frozen-lockfile

install-mongo:
	docker pull mongo

start-mongo:
	docker-compose up --detach mongodb

stop-mongo:
	docker-compose down mongodb

migrate-mongo:
	mongosh < script/mongo-setup/document.js

## telemetry
opt-out-telemetry:
	pnpm next telemetry disable

## generate
generate: generate-webmanifest generate-sitemap

generate-webmanifest:
	pnpm vite-node script/site/webmanifest.ts

generate-sitemap:
	pnpm next-sitemap

## env
generate-environment-type-definition:
	pnpm vite-node script/env/type-def.ts

copy-env:
	cp config/.env.${environment} .env

copy-env-development:
	make copy-env environment="development"

copy-env-staging:
	make copy-env environment="staging"

copy-env-production:
	make copy-env environment="production"

copy-env-testing:
	make copy-env environment="testing"

## deployment
deploy-staging: build-staging
	vercel

deploy-production: build-production
	vercel --prod

clear-cache:
	rm -rf .next

start-development: copy-env-development clear-cache dev

start-testing: copy-env-testing clear-cache dev

start-staging: copy-env-staging clear-cache dev

start-production: copy-env-production clear-cache dev

## build
build-development: clear-cache copy-env-development build

build-production: clear-cache copy-env-production build generate

build-staging: clear-cache copy-env-staging build

build-testing: clear-cache copy-env-testing build

build:
	pnpm next build

## start
start:
	pnpm next start $(arguments)

## dev
dev:
	pnpm next dev

## format
format-generate-config:
	pnpm prettier-config-generate

format:
	pnpm prettier --$(type) .

format-check:
	make format type=check

format-write:
	make format type=write

## lint
lint:
	pnpm eslint . --color && pnpm knip

lint-workflows:
	actionlint

## typecheck
typecheck:
	pnpm tsc -p tsconfig.json --noEmit $(arguments)

## test
test-type:
	pnpm vitest test/$(path)/**.test.ts $(arguments)

test-unit:
	make test-type path="unit" arguments="$(arguments)"

test-integration:
	make test-type path="integration" arguments="$(arguments)"

test-snapshot:
	make test-type path="snapshot" arguments="$(arguments)"

pretest-ci:
	node node_modules/puppeteer/install.mjs

test: build-testing test-unit test-integration test-snapshot


