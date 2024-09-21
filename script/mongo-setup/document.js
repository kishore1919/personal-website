#!/usr/bin/sh
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

db = db.getSiblingDB('admin');

db.createUser({
	user: 'runner',
	pwd: 'mongodb',
	roles: [{ role: 'root', db: 'admin' }, 'readWrite'],
});

db.auth('runner', 'mongodb');

db = db.getSiblingDB('personal-website');
db.createCollection('contact-form-message');

db = db.getSiblingDB('test-personal-website');
db.createCollection('contact-form-message');
