const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const Empresa = require('../models/Empresa')

//const authConfig = require('../../configs/auth')

module.exports = async (req, res, next)=>{
    const authHeader = req.headers.authorization    
    if(!authHeader){
        return res.status(400).json({ error: 'Token informado é inválido'})
    }    
    const [, token] = authHeader.split(' ')

    try{        
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET_API) 
        console.log(decoded)
        if(!decoded.cnpj){
            return res.status(400).json({error: 'Token não é inválido'})
        }
        const empresa = await Empresa.findOne({where: {cnpj: decoded.cnpj, token}})
        if(!empresa){
            return res.status(400).json({error: 'Não foi possível autenticar, verifique suas informações!'})
        }
        req.idEmp = empresa.id
        return next()

    }catch(err){
        return res.status(400).json({error: err.message})
    }
}