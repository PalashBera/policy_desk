import database from "./index";

module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true,
      isLowercase: true,
      set(value) {
        this.setDataValue("email", value.toLowerCase());
      }
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true
  });

  Client.associate = function (models) {
    models.Client.belongsTo(models.User, {
      foreignKey: "user_id"
    });
  };

  return Client;
};
