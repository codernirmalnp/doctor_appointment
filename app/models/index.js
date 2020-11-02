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
db.day=require('../models/day.model.js')(sequelize,Sequelize)

//defining user role
db.role.hasMany(db.user, {
  as:"users",
  
});

db.user.belongsTo(db.role, {
  foreignKey:"roleId",
  as:"roles"
 });

 //defining doctor day
 db.doctor.hasOne(db.day, {
  as:"doctors",
  
});

db.day.belongsTo(db.doctor, {
  foreignKey:"doctorId",
  as:"days"
 });
 

 //defining user token
db.user.hasOne(db.token)
db.token.belongsTo(db.user,{
  foreignKey:'userId'
})


//defining doctor patient  relation
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

 //defining doctor dayoff







db.ROLES = ["user", "admin"];

module.exports = db;