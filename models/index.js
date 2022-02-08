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
db.policies = require("./policy.js")(sequelize, Sequelize);

// Association between users and clients
db.users.hasMany(db.clients, {
  foreignKey: "user_id"
});
db.clients.belongsTo(db.users, {
  foreignKey: "user_id"
});

// Association between users and policies
db.users.hasMany(db.policies, {
  foreignKey: "user_id"
});
db.policies.belongsTo(db.users, {
  foreignKey: "user_id"
});

// Association between clients and policies
db.clients.hasMany(db.policies, {
  foreignKey: "client_id"
});
db.policies.belongsTo(db.clients, {
  foreignKey: "client_id"
});

module.exports = db;
