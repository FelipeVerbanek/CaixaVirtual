const { Router } = require('express')
const routes  = new Router()

const AuthMiddleware = require('./app/middlewares/auth')

const CategoriaController = require('./app/controllers/CategoriaController') 
const EmpresaController = require('./app/controllers/EmpresaController')
const MovimentacaoController = require('./app/controllers/MovimentacaoController')

//validacoes
const ValidarCategoria = require('./app/validators/CategoriaStore')
const ValidarEmpresa = require('./app/validators/EmpresaStore')
const ValidarMovimentacao = require('./app/validators/MovimentacaoStore')
const ValidarMovimentacaoUpdate =require('./app/validators/MovimentacaoUpdate')
//Empresa

routes.get('/empresa', EmpresaController.index)
routes.post('/empresa', ValidarEmpresa, EmpresaController.store)

//Autenticação por token
routes.use(AuthMiddleware)

//Categoria
routes.get('/categoria', CategoriaController.index)
routes.post('/categoria', ValidarCategoria, CategoriaController.store)
routes.put('/categoria/:id', ValidarCategoria, CategoriaController.update)
routes.delete('/categoria/:id', CategoriaController.delete)

//Movimentacoes
routes.get('/movimentacao', MovimentacaoController.index)
routes.post('/movimentacao', ValidarMovimentacao, MovimentacaoController.store)
routes.put('/movimentacao/:id', ValidarMovimentacaoUpdate, MovimentacaoController.update)
routes.delete('/movimentacao/:id', MovimentacaoController.delete)

module.exports = routes