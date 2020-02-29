const  { Sequelize, Model } = require('sequelize')

class Categoria extends Model{
    static init(sequelize) {
        super.init({            
            name: Sequelize.STRING,            
        },
        {
            sequelize,
        })

        return this
    }

    static associate(models){
        this.belongsTo(models.Empresa, {foreignKey: 'id_empresa', as: 'empresa'})        
    }
}

module.exports = Categoria