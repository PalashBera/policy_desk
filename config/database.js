require('dotenv').config();

module.exports  = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    sslmode: process.env.SSL_MODE,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    sslmode: process.env.SSL_MODE,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
