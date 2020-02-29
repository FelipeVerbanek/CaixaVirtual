'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.createTable('empresas', {
         id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
         },
         cnpj: {
           type: Sequelize.STRING,
           allowNull: false,
           unique: true
         },
         password: {
           type: Sequelize.STRING,
           allowNull: false
        },
         razaosocial: {
           type: Sequelize.STRING,
           allowNull: false
         },
         token:{
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

  down: (queryInterface) => {
    
      return queryInterface.dropTable('empresas');
    
  }
};
