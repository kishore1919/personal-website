## declare PHONY
.PHONY: build test

serve:
	cd backend && make serve

## install
sub-install:
	cd $(dir) && yarn

install:
	(make sub-install dir=backend) && (make sub-install dir=frontend) && (make sub-install dir=common)

## start
sub-start:
	cd $(dir) && make start

start:
	(trap 'kill 0' INT; (make sub-start dir=backend) & (make sub-start dir=frontend))

## build
sub-build:
	cd $(dir) && yarn build

build:
	(trap 'kill 0' INT; (make sub-build dir=backend) & (make sub-build dir=frontend))

## test
sub-test:
	cd $(dir) && make test

test:
	(trap 'kill 0' INT; (make sub-test dir=backend) & (make sub-test dir=common) & (make sub-test dir=frontend))

## typecheck
sub-typecheck:
	cd $(dir) && make typecheck

typecheck:
	(trap 'kill 0' INT; (make sub-typecheck dir=backend) & (make sub-typecheck dir=common) & (make sub-typecheck dir=frontend))

## lint
sub-lint:
	cd $(dir) && make lint

lint:
	(trap 'kill 0' INT; (make sub-lint dir=backend) & (make sub-lint dir=common)  & (make sub-lint dir=frontend))

## format
sub-format-check:
	cd $(dir) && make format-check

format-check:
	(trap 'kill 0' INT; (make sub-format-check dir=backend) & (make sub-format-check dir=common)  & (make sub-format-check dir=frontend))

## clean-up
clean-up:
	rm -rf common && rm -rf node_modules && \
		rm -rf .gitattributes .gitignore  *.json yarn.lock
