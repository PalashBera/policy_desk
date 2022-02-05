const databaseConfig = require("../config/database.js")[global.env];
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: databaseConfig.dialect,

  pool: {
    max: databaseConfig.pool.max,
    min: databaseConfig.pool.min,
    acquire: databaseConfig.pool.acquire,
    idle: databaseConfig.pool.idle
  }
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize
};

db.users = require("./user.js")(sequelize, Sequelize);

module.exports = db;
