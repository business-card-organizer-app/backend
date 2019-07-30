// Update with your config settings.
const secret = require('./src/config/secrets');

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: secret.dbUsername,
      password: secret.dbPassword,
      database: 'bussiness-card-app',
      charset: 'utf8'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
    }
  },

  testing: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: secret.dbUsername,
      password: secret.dbPassword,
      database: 'bussiness-card-testing',
      charset: 'utf8'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
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
    connection: secret.herokuDb,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
    }
  }

};