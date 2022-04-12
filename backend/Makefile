## declare PHONY
.PHONY: build test

## serve
serve:
	node build

## start
start:
	(trap 'kill 0' INT; make typecheck & make build)

## build
build:
	rm -rf build && node script/esbuild.js

## clean-up
clean-up:
	rm -rf .eslintrc .gitattributes .gitignore .prettierrc *.json yarn.lock && \
		rm -rf src script node_modules

## type-check
typecheck:
	node_modules/.bin/tsc -p tsconfig.json $(arguments) 

typecheck-watch:
	make typecheck arguments=--w

## lint
lint:
	node_modules/.bin/eslint src/** -f='stylish' --color

## format
prettier=node_modules/.bin/prettier
format:
	$(prettier) --write src/

format-check:
	$(prettier) --check src/

## test
test:
	node_modules/.bin/esbuild test/index.ts --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		node_modules/.bin/jest __test__
