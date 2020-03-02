const request = require('supertest')
const app = require('../src/app')

const factory = require('./factories')
const truncate = require('./Util/trucate')

describe('Empresa', () => {
    beforeEach(async()=>{
        await truncate()
    })


   it('Deve ser possivel cadastrar uma empresa', async ()=>{

        const empresa = await factory.attrs('Empresa')

       const response = await request(app)
            .post('/empresa')
            .send(empresa)

        expect(response.body).toHaveProperty('id')
   }) 

   it('O usuário não deve conseguir cadastrar com o cnpj duplicado', async() => {
        const empresa = await factory.attrs('Empresa')

        await request(app)
            .post('/empresa')
            .send(empresa)

        const response = await request(app)
            .post('/empresa')
            .send(empresa)
        expect(response.status).toBe(400)
    
   })

   
})