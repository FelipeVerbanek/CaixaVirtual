
const Categoria = require('../models/Categoria')

class CategoriaController{
    async index(req,res){
        try{
            const categorias = await Categoria.findAll({
                where: {id_empresa: req.idEmp},
                attributes: ['id','name', 'created_at', 'updated_at'],            
                order: ['id']
            })
    
            return res.json(categorias)
        }catch(err){
            return res.status(500).json({erro: err.message})
        }

    }
    async store(req, res){

        try{                        
            const categoria = await Categoria.create({
                name: req.body.name,
                id_empresa: req.idEmp
            })            

            return res.json(categoria)
        }catch(err){
            return res.status(500).json({error: err.message})
        }

        
    }
    async update(req, res){
        try{            

            const valid = await Categoria.findOne({
                where:{
                    id: req.params.id,
                    id_empresa: req.idEmp
                }
            })

            if(valid)
            {
                await Categoria.update({
                        name: req.body.name
                },{
                    where:{   id: req.params.id, id_empresa: req.idEmp}
                })
            }else{
                return res.status(401).json({error: 'Categoria não localizada para ser alterada!'})
            }

            return res.json({message: 'Categoria alterada com sucesso!'})
        }catch(err){
            return res.status(500).json({error: err.message})
        }

    }
    async delete(req, res){
        try{
            const categoria = await Categoria.destroy({
                 where: {
                     id:req.params.id,
                     id_empresa: req.idEmp
                    }
                })
            
            return categoria ? res.json({message: 'Categoria removida com sucesso!'}) : res.status(401).json({message: 'Categoria não localizada!'})
            
        }catch(err){
            return res.status(500).json({error: err.message})
        }
    }
}

module.exports = new CategoriaController