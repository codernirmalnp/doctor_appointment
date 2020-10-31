
module.exports=(sequelize,Sequelize)=>
{
  const Doctor=sequelize.define('doctors',{
      name:{
          type:Sequelize.STRING,

      },
      image:{
          type:Sequelize.STRING,
      },
      degrees:{
          type:Sequelize.STRING,
      },
      experience:{
          type:Sequelize.INTEGER

      },
      availableDate:{
          type:Sequelize.DATE

      },

      description:{
          type:Sequelize.TEXT

      }
  })
  return Doctor;
}