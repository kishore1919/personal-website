## declare PHONY
.PHONY: build test all
MAKEFLAGS += --silent

all:
	make install &&\
		make lint &&\
		make typecheck &&\
		make format-check &&\
		make test &&\
		make build

serve:
	cd backend && make serve

## install
sub-install:
	cd $(dir) && yarn install --frozen-lockfile

install:
	(make sub-install dir=backend) && (make sub-install dir=frontend) && (make sub-install dir=common)

## start
sub-start:
	cd $(dir) && make start

start:
	(trap 'kill 0' INT; (make sub-start dir=backend) & (make sub-start dir=frontend))

## build
sub-build:
	cd $(dir) && make build

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
	(trap 'kill 0' INT; (make sub-lint dir=backend) & (make sub-lint dir=common) & (make sub-lint dir=frontend))

## format
sub-format-check:
	cd $(dir) && make format-check

format-check:
	(trap 'kill 0' INT; (make sub-format-check dir=backend) & (make sub-format-check dir=common) & (make sub-format-check dir=frontend))

sub-format:
	cd $(dir) && make format

format:
	(trap 'kill 0' INT; (make sub-format dir=backend) & (make sub-format dir=common) & (make sub-format dir=frontend))

## clean-up
sub-clean-up:
	mkdir temp-$(dir) && cd $(dir) && mv build Makefile ../temp-$(dir) && cd ../ && rm -rf $(dir) && mv temp-$(dir) $(dir) && rm -rf temp-$(dir)

clean-up:
	(trap 'kill 0' INT; (make sub-clean-up dir=backend) & (make sub-clean-up dir=frontend) & (rm -rf common .git* .prettierrc  *.json yarn.lock LICENSE README.md docs))
	
