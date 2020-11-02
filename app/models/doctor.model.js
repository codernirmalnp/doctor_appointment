
module.exports=(sequelize,Sequelize)=>
{
  const Doctor=sequelize.define('doctors',{
      name:{
          type:Sequelize.STRING,

      },
      work:{
          type:Sequelize.STRING
           
      },
      workingHospital:{
          type:Sequelize.STRING
             
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
      phone:{
        type:Sequelize.BIGINT

    },
   
  

      description:{
          type:Sequelize.TEXT

      },
   
  })
  return Doctor;
}