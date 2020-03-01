const  { Sequelize, Model } = require('sequelize')

class Movimentacao extends Model{
    static init(sequelize) {
        super.init({
            data: Sequelize.DATE,
            tipo: Sequelize.STRING,   
            valor: Sequelize.DOUBLE,       
            descricao: Sequelize.STRING,  
        },
        {
            sequelize,
            tableName: 'movimentacao'
        })

        return this
    }
    static associate(models){
        this.belongsTo(models.Empresa, {foreignKey: 'id_empresa', as: 'empresa'})        
        this.belongsTo(models.Categoria, {foreignKey: 'id_categoria', as: 'categoria'}) 
    }

    static checkTipo(tipo){
        return tipo == 'E' || tipo == 'S' ? true : false
    }

    
}

module.exports = Movimentacao