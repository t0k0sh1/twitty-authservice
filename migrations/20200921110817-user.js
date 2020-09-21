'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("users", "username", {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("users", "username", {
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING
    })
    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING
    })
  }
};
