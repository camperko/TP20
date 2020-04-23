pgp = require('pg-promise')();
exports.db = pgp('postgres://postgres:postgres@db:5432/blockchain');
exports.db_test = pgp('postgres://postgres:postgres@localhost:5432/blockchain_test');
