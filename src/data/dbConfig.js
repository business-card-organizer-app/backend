const knex = require('knex');
const config = require('../../knexfile');
const secret = require('../config/secrets');

const env = process.env.DB_ENV || secret.nodeEnvironment;

module.exports = knex(config[env])