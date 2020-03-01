const Yup = require('yup')

module.exports = async (req, res, next)=> {
    try{
        const schema = Yup.object().shape({
            id_categoria: Yup.string('Campo id_categoria não é válido!'),
            tipo: Yup.string('Campo tipo não é válido!'),                                  
            valor: Yup.number('Campo valor não é válido!'),
            descricao: Yup.string('Campo descricao não é válido').max(250,'Descrição deve conter no máximo 250 caracteres!'),                                   
            data: Yup.date('O campo data deve ser uma data válida!')                                   
        })

        await schema.validate(req.body, {abortEarly: false})


        return next();
    }catch(err){
        const message = err.inner.map(element => element.message)
        return res.status(400).json({error: message })
    }
} 
