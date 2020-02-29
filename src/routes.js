const { Router } = require('express')

const AuthMiddleware = require('./app/middlewares/auth')

const CategoriaController = require('./app/controllers/CategoriaController') 
const EmpresaController = require('./app/controllers/EmpresaController')
const MovimentacaoController = require('./app/controllers/MovimentacaoController')

const routes  = new Router()
//Empresa
routes.get('/empresa', EmpresaController.index)
routes.post('/empresa', EmpresaController.store)

//Autenticação por token
routes.use(AuthMiddleware)

//Categoria
routes.get('/categoria', CategoriaController.index)
routes.post('/categoria', CategoriaController.store)
routes.put('/categoria/:id', CategoriaController.update)
routes.delete('/categoria/:id', CategoriaController.delete)

//Movimentacoes
routes.get('/movimentacao', MovimentacaoController.index)
routes.post('/movimentacao', MovimentacaoController.store)
routes.put('/movimentacao/:id', MovimentacaoController.update)
routes.delete('/movimentacao/:id', MovimentacaoController.delete)

module.exports = routes