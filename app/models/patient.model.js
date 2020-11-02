

module.exports=(sequelize,Sequelize)=>
{
  const Patient=sequelize.define('patients',{
      name:{
          type:Sequelize.STRING,

      },
      image:{
          type:Sequelize.STRING,
      },
      phone:{
          type:Sequelize.BIGINT

      },
      address:{
          type:Sequelize.STRING,
      }
  })
  return Patient;
}
