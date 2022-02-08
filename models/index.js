const databaseConfig = require("../config/database.js")[process.env.NODE_ENV || "development"];
import Sequelize from "sequelize";

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
db.clients = require("./client.js")(sequelize, Sequelize);

db.users.hasMany(db.clients, {
  foreignKey: "user_id"
});
db.clients.belongsTo(db.users, {
  foreignKey: "user_id"
});

module.exports = db;
