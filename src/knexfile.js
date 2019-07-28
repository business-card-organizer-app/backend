// Update with your config settings.
const dotenv = require('dotenv');

dotenv.config()
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'bussiness-card-app',
      charset: 'utf8'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  testing: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'bussiness-card-testing',
      charset: 'utf8'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};