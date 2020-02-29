const  { Sequelize, Model } = require('sequelize')

class Empresa extends Model{
    static init(sequelize){
        super.init({
            cnpj: Sequelize.toString,
            password: Sequelize.toString,
            razaosocial: Sequelize.toString,
            
        }, {sequelize})
    }
}

module.exports = Empresa