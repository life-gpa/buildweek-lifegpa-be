// Update with your config settings.
require('dotenv').config();
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lifegpa.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    }
  }
};


