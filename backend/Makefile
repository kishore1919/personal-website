## declare PHONY
.PHONY: build

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
typecheck-watch:
	node_modules/.bin/tsc -p tsconfig.json --w
