const { Router } = require('express')

const SessionController = require('./app/controllers/SessionController') 
const EmpresaController = require('./app/controllers/EmpresaController')

const routes  = new Router()

routes.get('/empresa', EmpresaController.index)
routes.post('/empresa', EmpresaController.store)

module.exports = routes