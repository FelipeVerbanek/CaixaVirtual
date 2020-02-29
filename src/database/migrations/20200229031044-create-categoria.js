'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('categoria', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        id_empresa: {
          type: Sequelize.INTEGER,
          references: {model: 'empresas', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true    
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,           
        },
        updated_at: {
        type: Sequelize.DATE,
        allowNull:false,
        }
      });
    
  },

  down: (queryInterface ) => {

      return queryInterface.dropTable('categoria');
    
  }
};
