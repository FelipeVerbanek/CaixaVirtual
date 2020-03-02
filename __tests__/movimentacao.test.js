const request = require('supertest')
const app = require('../src/app')

const factory = require('./factories')
const truncate = require('./Util/trucate')

describe('Movimentacao', () => {
    beforeEach(async()=>{
        await truncate()
    })

    it('O valor total das movimentacoes devem estar de acordo com a entrada e saida', async()=>{
        const empresa = await factory.attrs('Empresa')
        const respnseEmp = await request(app)
            .post('/empresa')
            .send(empresa)


        const categoria = await factory.attrs('Categoria')

        const response = await request(app)
            .post('/categoria')
            .set('Authorization', 'Bearer ' + respnseEmp.body.token)
            .send(categoria)

        const idCategoria = await response.body.id

        var valorEntrada = 0

        for (let index = 0; index < 20; index++) {
            let movimentacao = await factory.attrs('Movimentacao', {
                id_categoria: idCategoria,
                tipo: 'E',
                valor: 211221.3
            })
            
             valorEntrada = await valorEntrada + parseFloat(movimentacao.valor)
            
            await request(app)
                .post('/movimentacao')
                .set('Authorization', 'Bearer ' + respnseEmp.body.token)
                .send(movimentacao)

        }

        var valorSaida = 0
        for (let index = 0; index < 20; index++) {
            let movimentacaoS = await factory.attrs('Movimentacao', {
                id_categoria: idCategoria,
                tipo: 'S',
                valor: 12.3
            })
            
            valorSaida = await valorSaida + parseFloat(movimentacaoS.valor)
            
            await request(app)
                .post('/movimentacao')
                .set('Authorization', 'Bearer ' + respnseEmp.body.token)
                .send(movimentacaoS)

        }

    
        const result =  await request(app)
            .get('/movimentacao')
            .set('Authorization', 'Bearer ' + respnseEmp.body.token)
            .send()

        const total = valorEntrada - valorSaida
        const saldoTotal = result.body.saldoTotal
        expect(saldoTotal.toFixed(2)).toBe(total.toFixed(2))   
    })
    
})