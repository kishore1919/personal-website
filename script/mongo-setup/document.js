#!/usr/bin/sh

db = db.getSiblingDB('admin');

db.createUser({
    user: 'runner',
    pwd: 'mongodb',
    roles: [{ role: 'root', db: 'admin' }, 'readWrite'],
});

db.auth('runner', 'mongodb');

db = db.getSiblingDB('myWeb');
db.createCollection('contactFormMessage');

db = db.getSiblingDB('testMyWeb');
db.createCollection('contactFormMessage');
