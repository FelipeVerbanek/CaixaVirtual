const request = require('supertest')
const app = require('../src/app')

const factory = require('./factories')
const truncate = require('./Util/trucate')

describe('Categoria', () => {
    beforeEach(async()=>{
        await truncate()
    })

    it('Deve ser possível cadastrar uma categoria', async() => {

        const empresa = await factory.attrs('Empresa')
        const responseEmp = await request(app)
            .post('/empresa')
            .send(empresa)

        expect(responseEmp.status).toBe(201)

        const token = await responseEmp.body.token

        const categoria = await factory.attrs('Categoria')

        const response = await request(app)
            .post('/categoria')
            .set('Authorization', 'Bearer ' + token)
            .send(categoria)

        expect(response.body).toHaveProperty('id')

    })

})