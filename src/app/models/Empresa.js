const  { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')

class Empresa extends Model{
    static init(sequelize) {
        super.init({
            cnpj: Sequelize.STRING,
            password: Sequelize.STRING,
            razaosocial: Sequelize.STRING,          
            token: Sequelize.STRING,  
        },
        {
            sequelize,
        })

        this.addHook('beforeSave', async (empresa )=> {
            if(empresa.password){
                empresa.password = await bcrypt.hash(empresa.password, 8)
            }
        })

        return this
    }

    checkPassword(password){             
        return bcrypt.compare(password, this.password)
    }

    
}

module.exports = Empresa