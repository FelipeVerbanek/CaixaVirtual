const  { Sequelize, Model } = require('sequelize')

class Empresa extends Model{
    static init(sequelize) {
        super.init({
            cnpj: Sequelize.STRING,
            password: Sequelize.STRING,
            razaosocial: Sequelize.STRING,          
            token: Sequelize.STRING,  
        },
        {
            sequelize,
        })

        return this
    }

    
}

module.exports = Empresa