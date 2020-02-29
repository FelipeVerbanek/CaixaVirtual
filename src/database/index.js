const Sequelize = require('sequelize')

const Empresa = require('../app/models/Empresa')
const Categoria = require('../app/models/Categoria')
const Movimentacao = require('../app/models/Movimentacao')

const databaseConfig = require('../configs/database')

const models = [Empresa, Categoria, Movimentacao]

class Database {
    constructor(){
        this.init()        
    }
    init(){
        this.connection = new Sequelize(databaseConfig)
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))
    }

}

module.exports = new Database()