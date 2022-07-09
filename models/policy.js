module.exports = (sequelize, Sequelize) => {
  const Policy = sequelize.define('policy', {
    policyName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    policyNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    policyHolderName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tenure: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    mode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    premium: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    commencementDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    maturityDate: {
      type: Sequelize.DATEONLY
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
