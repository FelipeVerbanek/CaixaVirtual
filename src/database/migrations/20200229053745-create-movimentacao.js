'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('movimentacao', {
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
      id_categoria: {
        type: Sequelize.INTEGER,
        references: {model: 'categoria', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true    
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      descricao: {
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
 
      return queryInterface.dropTable('movimentacao');
    
  }
};
