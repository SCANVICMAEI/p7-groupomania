'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      idMessage: {
        type: Sequelize.INTEGER,
      //   references : {
      //     model:'Messages',
      //     Key:'id'
      // }
    },
      idUser: {
        type: Sequelize.INTEGER,
        // references : {
      //     model:'Users',
      //     Key:'id'
      // }
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};