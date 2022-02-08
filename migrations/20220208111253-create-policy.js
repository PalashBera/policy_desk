module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('policies', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      policy_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      policy_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      policy_holder_name: {
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
      commencement_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      maturity_date: {
        type: Sequelize.DATEONLY
      },
      client_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "clients"
          },
          key: "id"
        },
        allowNull: false
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users"
          },
          key: "id"
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
