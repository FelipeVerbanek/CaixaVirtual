const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const Empresa = require('../models/Empresa')

//const authConfig = require('../../configs/auth')

module.exports = async (req, res, next)=>{
    const authHeader = req.headers.authorization    
    if(!authHeader){
        return res.status(401).json({ error: 'Token inválido'})
    }    
    const [, token] = authHeader.split(' ')

    try{        
        const decoded = await promisify(jwt.verify)(token, 'teste')   
        
        if(!decoded.cnpj){
            return res.status(401).json({error: 'Token inválido'})
        }
        const empresa = await Empresa.findOne({where: {cnpj: decoded.cnpj}})
        if(!empresa){
            return res.status(401).json({error: 'Token inválido'})
        }
        req.idEmp = empresa.id
        return next()

    }catch(err){
        return res.status(401).json({error: err.message})
    }
}