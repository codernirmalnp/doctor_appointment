
module.exports=(sequelize,Sequelize)=>{
    const Token=sequelize.define("tokens",{
        token:{
            type:Sequelize.STRING,
        },
        userId:{
            type:Sequelize.INTEGER,
            refernces:{
                model:'users',
                key:'id'
            }
           
        }
    })
    return Token;
}