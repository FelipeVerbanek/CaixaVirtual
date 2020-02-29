const jwt = require('jsonwebtoken')

const Empresa = require('../models/Empresa')

class SessionController{
    async store(req, res){
        //const {userName, password} = req.body
        const {cnpj,  password} = req.body

        const empresa = await Empresa.findOne({where: {cnpj}})

        if(!empresa){
            return res.status(401).json({error: 'Empresa não encontrada!'})
        }
        if(!password){
            return res.status(401).json({error:'Senha incorreta!'})
        }
        const {id, cnpj, }
        return res.json({token: jwt.sign(
            {id},
            'teste',
            {expiresIn: '7d'})
        })
    }
}

module.exports = new SessionController