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
    payableMonths: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
      defaultValue: []
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: true,
    underscored: true,
    hooks: {
      beforeSave: (policy, options) => {
        policy.payableMonths = generatePayableMonths(policy);
      }
    }
  });

  return Policy;
};

const generatePayableMonths = (policy) => {
  if (policy.policyMode == 'yearly') {
    const [year, month, day] = policy.commencementDate.split('-');
    return [month];
  } else if (policy.policyMode == 'half_yearly') {
    const [year, month, day] = policy.commencementDate.split('-');
    return [month, monthNumber(parseInt(month) + 6)];
  } else if (policy.policyMode == 'quarterly') {
    const [year, month, day] = policy.commencementDate.split('-');
    return [month, monthNumber(parseInt(month) + 3), monthNumber(parseInt(month) + 6), monthNumber(parseInt(month) + 9)]
  } else if (policy.policyMode == 'monthly') {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  } else {
    return [];
  }
};

const monthNumber = (month) => {
  const remainder = month % 12;
  return remainder == 0 ? 12 : remainder;
};
