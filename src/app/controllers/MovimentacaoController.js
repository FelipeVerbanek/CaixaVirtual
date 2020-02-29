const {startOfDay , endOfDay, parseISO} = require('date-fns')
const { Op } = require('sequelize')

const Movimentacao = require('../models/Movimentacao')

class MovimentacaoController{
    async index(req, res){
        try{
            if(req.query.data_ini && req.query.data_fim){
            
                const dataIni = parseISO(req.query.data_ini)
                const dataFim = parseISO(req.query.data_fim)
                console.log(dataIni)
                console.log(dataFim)
                const retorno = await Movimentacao.findAll({
                    where:{
                        data:{
                            [Op.between]: [
                                startOfDay(dataIni), endOfDay(dataFim)
                            ]
                        }
                        
                    }
                })
    
                return res.json(retorno)
            }else{
    
            }
        }catch(err){
            return res.status(500).json({error: err.message})
        }


        return res.json({})

    }
    async store(req, res){
        try{
            const {id_categoria, tipo, valor, descricao} = req.body

            const movimentacao = await Movimentacao.create({id_categoria, tipo, valor, descricao, id_empresa: req.idEmp, data: new Date() })
    
            return res.json(movimentacao)
        }catch(err){
            return res.status().json({error: err.message})
        }

    }
    async update(req, res){

    }
    async delete(req, res){

    }
}
module.exports = new MovimentacaoController