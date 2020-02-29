const Sequelize = require('sequelize')

const Empresa = require('../models/Empresa')

const databaseConfig = require('../configs/database')

const models = [Empresa]

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