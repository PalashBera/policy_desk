module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('policies', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      policy_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      commencement_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      policy_holder: {
        type: Sequelize.STRING,
        allowNull: false
      },
      premium_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      policy_mode: {
        type: Sequelize.STRING,
        allowNull: false
      },
      policy_type: {
        type: Sequelize.STRING
      },
      phone_number: {
        type: Sequelize.STRING
      },
      surrendered: {
        type: Sequelize.BOOLEAN
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'users' },
          key: 'id'
        },
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('policies');
  }
};
