const Yup = require('yup')

module.exports = async (req, res, next)=> {
    try{
        const schema = Yup.object().shape({
            id_categoria: Yup.string().required('Campo id_categoria é obrigatório!'),
            tipo: Yup.string().required('Campo tipo é obrigatório!'),                                  
            valor: Yup.number().required('Campo valor é obrigatório!'),
            descricao: Yup.string().max(250,'Descrição deve conter no máximo 250 caracteres!')
                                   .required('Campo descricao é obrigatório!'),
            data: Yup.date()                                   
        })

        await schema.validate(req.body, {abortEarly: false})
        console.log('passou')

        return next();
    }catch(err){
        const message = err.inner.map(element => element.message)
        return res.status(400).json({error: message })
    }
} 
