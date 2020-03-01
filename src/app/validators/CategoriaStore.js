const Yup = require('yup')

module.exports = async (req, res, next)=> {
    try{
        const schema = Yup.object().shape({
            name: Yup.string().required('O campo name é obrigatório!')            
        })

        await schema.validate(req.body, {abortEarly: false})

        return next();
    }catch(err){
        return res.status(400).json({error: err.message})
    }
} 
