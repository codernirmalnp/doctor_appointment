const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Token=db.token;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
    roleId:req.body.roleId
  })
    .then(user => {
        return res.status(200).json({success:true,msg:"congrats..User Registration Success.",data:user})} )
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin =async (req, res) => {
   User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(async user => {
     
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      const password=req.body.password

      var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );
   

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 8600 // 24 hours
      });

  
      Role.findOne({where:{id:user.roleId}}).then(async role=>{
         
        const userRole=('ROLE_'+role.name).toUpperCase();
      
    const createtoken=await Token.findOne({where:{userId:user.id}});
    if(createtoken == null)
    {
      Token.create({userId:user.id,token:token})
    }
     Token.update({token:token},{where:{userId:user.id}})
      
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: userRole,
        accessToken: token
      });

       
        
      }
      ).catch((err=>console.log(err.message)));
     
       
      }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};
