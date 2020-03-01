const {startOfDay , endOfDay, parseISO, isAfter,is} = require('date-fns')
const { Op } = require('sequelize')

const Movimentacao = require('../models/Movimentacao')
const Categoria = require('../models/Categoria')

class MovimentacaoController{
    async index(req, res){
        try{
            if(req.query.data_ini && req.query.data_fim){
            
                const dataIni = parseISO(req.query.data_ini)
                const dataFim = parseISO(req.query.data_fim)
                                
                if(!isAfter(endOfDay(dataFim), startOfDay(dataIni))){
                    return res.status(400).json({error: 'Data final não pode ser menor que a data inicial!'})
                }                

                const movimentacoes = await Movimentacao.findAll({
                    attributes: ['data','id','tipo', 'valor', 'descricao'],
                    include:[{
                        model: Categoria,
                        as: 'categoria',
                        attributes: ['id','name' ]
                    }]
                    ,
                    where:{
                        data:{
                            [Op.between]: [
                                startOfDay(dataIni), endOfDay(dataFim)
                            ]
                        },
                        id_empresa: req.idEmp                        
                    }                    
                })
                let valorTotal = 0
                movimentacoes.forEach(element => {
                    valorTotal = element.tipo == 'E' ? valorTotal + element.valor : valorTotal - element.valor
                    
                });

                const retorno = {saldoTotal: valorTotal, movimentacoes}

                return res.json(retorno)
            }else{
                
                const movimentacoes = await Movimentacao.findAll({
                    attributes: ['data','id','tipo', 'valor', 'descricao'],
                    include:[{
                        model: Categoria,
                        as: 'categoria',
                        attributes: ['id','name' ]
                    }]
                    ,
                    where:{
                        id_empresa: req.idEmp                        
                    }                    
                })

                let valorTotal = 0
                movimentacoes.forEach(element => {
                    valorTotal = element.tipo == 'E' ? valorTotal + element.valor : valorTotal - element.valor
                    
                });

                const retorno = {saldoTotal: valorTotal, movimentacoes}

                return res.json(retorno)
            }
        }catch(err){
            return res.status(500).json({error: err.message})
        }


        return res.json({})

    }
    async store(req, res){
        try{
            const {id_categoria, tipo, valor, descricao, data} = req.body
            
            const categoria = await Categoria.findOne({
                where: {
                    id: id_categoria,
                    id_empresa: req.idEmp
                }
            })
            
            if(!categoria){
                return res.json({error: 'id_categoria não localizado!'})
            }

            const movimentacao = await Movimentacao.create({
                id_categoria, 
                tipo, 
                valor, 
                descricao, 
                id_empresa: req.idEmp, 
                data: data ? data:  new Date() 
            })
    
            return res.json(movimentacao)
        }catch(err){
            return res.status().json({error: err.message})
        }

    }
    async update(req, res){

        try{
            
            const {valor, tipo, data, id_categoria, descricao} = req.body
           
            await Movimentacao.update({      
                valor, tipo, data, id_categoria, descricao
            },{
                where: {
                    id: req.params.id,
                    id_empresa: req.idEmp
                }
            })
            I
            return res.json({message: 'Alteração realizada com sucesso!'})           
            
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }
    async delete(req, res){
        try{
            const movimentacao = await Movimentacao.findOne({
                where: {
                    id:req.params.id,
                    id_empresa: req.idEmp
                   }
            })
            if(!movimentacao){
                return res.json({error: 'Movimentação não encontrada!'})
            }
            await Movimentacao.destroy({
                where: {
                    id:req.params.id,
                    id_empresa: req.idEmp
                   }
               })
            
            return res.json({message: 'Dados excluídos com sucesso!'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }



    }
}
module.exports = new MovimentacaoController