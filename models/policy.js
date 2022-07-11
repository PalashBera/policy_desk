module.exports = (sequelize, Sequelize) => {
  const Policy = sequelize.define('policy', {
    policyNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    commencementDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    policyHolder: {
      type: Sequelize.STRING,
      allowNull: false
    },
    premiumAmount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    policyMode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    policyType: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    surrendered: {
      type: Sequelize.BOOLEAN
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true
  });

  return Policy;
};
