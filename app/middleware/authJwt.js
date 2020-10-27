const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const jwt=require('jsonwebtoken');
const Role = db.role
const Token=db.token

verifyToken =(req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }


  jwt.verify(token, config.secret,async (err, decoded) => {
    if (err) {
      await Token.destroy({where:{token:token}})
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    else{
      const to= await Token.findOne({where:{token:token}})
      if(to != null)
      {
        req.userId=decoded
        next();
    
      }
    else{
      return res.status(401).send({
        message: "Your token has been expire!"
      });
    }}
  
  
    
  });
};


isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    Role.findByPk(user.roleId).then(roles => {
      
        if (roles.name === "admin") {
          next();
          return;
        }
      

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

  






const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,

};
module.exports = authJwt