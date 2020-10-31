const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
   

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.token=require('../models/token.js')(sequelize,Sequelize)
db.doctor=require('../models/doctor.model.js')(sequelize,Sequelize)
db.patient=require('../models/patient.model.js')(sequelize,Sequelize)
db.skill=require('../models/skill.model.js')(sequelize,Sequelize)

db.role.hasMany(db.user, {
  as:"users",
  
});
db.user.belongsTo(db.role, {
 foreignKey:"roleId",
 as:"roles"
});

db.user.hasOne(db.token)
db.token.belongsTo(db.user,{
  foreignKey:'userId'
})

db.doctor.belongsToMany(db.patient, {
  through: "doctor_patient",
  foreignKey: "doctorId",
  otherKey: "patientId"
});
db.patient.belongsToMany(db.doctor, {
  through: "doctor_patient",
  foreignKey: "patientId",
  otherKey: "doctorId"
});

db.doctor.belongsToMany(db.skill,{
  through:'doctor_skill',
  foreignKey:"doctorId",
  otherKey:"skillId"
})
db.skill.belongsToMany(db.doctor,{
  through:'doctor_skill',
  foreignKey:'skillId',
  otherKey:'doctorId'

});


db.ROLES = ["user", "admin"];

module.exports = db;