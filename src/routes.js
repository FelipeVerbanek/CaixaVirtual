const { Router } = require('express')

const SessionController = require('./app/controllers/SessionController') 


const routes  = new Router()

routes.get('/session', SessionController.store)


module.exports = routes