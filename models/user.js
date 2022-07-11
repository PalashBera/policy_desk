module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
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
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue('email', value.toLowerCase());
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    indexes: [{ unique: true, fields: ['email'] }],
    underscored: true
  });

  return User;
};
