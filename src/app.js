const express = require('express')
const cors = require('cors')
require('./database/index')
const routes = require('./routes')

class App{
    constructor(){
        this.server = express()
        this.moddlewares()
        this.routes()
       
    }

    moddlewares(){
        this.server.use(cors())
        this.server.use(express.json())
    }

    routes(){
        this.server.use(routes)
    }
}

module.exports = new App().server