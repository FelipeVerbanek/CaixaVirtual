const faker = require('faker')
const { factory } = require('factory-girl')
const {cnpj} = require('cpf-cnpj-validator')

const Empresa = require('../src/app/models/Empresa')
const Categoria = require('../src/app/models/Categoria')
const Movimentacao = require('../src/app/models/Movimentacao')

factory.define('Empresa', Empresa, {
    cnpj: cnpj.generate(),
    password: '123456',
    razaosocial: 'Teste'

})

factory.define('Categoria', Categoria, {
    name: 'teste'
})

factory.define('Movimentacao', Movimentacao, {
    tipo: 'S',
    valor: faker.finance.amount(),
    descricao: 'teste'
})

module.exports = factory

