const Empresa = require('../models/Empresa')


class EmpresaController {    
    async store(req, res){

        
        return res.json({'teste':'teste'})
    }
}


module.exports = new EmpresaController