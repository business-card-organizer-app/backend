const knex = require('knex');
const config = require('../../knexfile');
const secret = require('../config/secrets');


const env = process.env.DB_TEST || secret.nodeEnvironment;
console.log(env)
module.exports = knex(config[env])