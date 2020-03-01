const Yup = require('yup')
const { cnpj } = require('cpf-cnpj-validator')

module.exports = async (req, res, next)=> {
    try{
        const schema = Yup.object().shape({
            cnpj: Yup.string().required('Campo cnpj obrigatório!'),
            password: Yup.string().required('Campo password obrigatório!')
                                  .min(6,'A senha deve conter no minímo 6 letras')
                                  .max(15,'A senha deve conter no máximo 15 caracteres'),
            razaosocial: Yup.string().required('O campo razaosocial deve ser informado!')
            
        })

        await schema.validate(req.body, {abortEarly: false})


        if(!cnpj.isValid(req.body.cnpj)){
            return res.status(400).json({error: 'O cnpj informado não é válido!'})
        }

        return next();
    }catch(err){
        return res.status(400).json({error: err.message})
    }
} 
