const jwt = require('jsonwebtoken')

const Empresa = require('../models/Empresa')


class EmpresaController {    
    async index(req, res){
        try{
            const {cnpj} = req.body

            const empresa = await Empresa.findOne({where: {cnpj}}) 
            
            if(!empresa){
                return res.status(400).json({error: 'CNPJ não encontrado!'})   
            }


            if(!(await empresa.checkPassword(req.body.password))){                
                return res.status(400).json({ error: 'Senha incorreta!'})
            }
            

            const {id, token} = empresa
            return res.status(200).json({id, token})
        }catch(err){
            return res.json({error: err.message})
        }

    }
    async store(req, res){
        const {cnpj, password, razaosocial} = req.body
        try{
            
            const empresa = await Empresa.findOne({where: {cnpj}})            

            if(empresa){
                return res.status(400).json({error: 'Cnpj já cadastrado!'})            
            }
    
            const {id, token} = await Empresa.create({
                cnpj,
                password, 
                razaosocial, 
                token: jwt.sign(
                    {cnpj},
                    process.env.SECRET_API)
            })
    
            return res.status(201).json({id, token})
        }catch(e){            
            return res.status(500).json({error: e.message})
        }
    }
}


module.exports = new EmpresaController