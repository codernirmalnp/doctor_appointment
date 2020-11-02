var bcrypt = require("bcryptjs");
const db=require('../models/')
const User=db.user

exports.changePassword = (req, res,next) => {
  const id=req.userId ? req.userId:false;
  const oldpassword=req.body.oldpassword && req.body.oldpassword.trim().length>0 ?req.body.oldpassword.trim():false;
  const newpassword=req.body.password && req.body.password.trim().length > 0 ? bcrypt.hashSync(req.body.password.trim(), 12):false
if(id && oldpassword && newpassword )
{
  User.findOne({
    where:{
      id:id
    }
 
  }).then((result)=>{
   var passwordIsValid = bcrypt.compareSync(
     oldpassword,
    result.password
   )
   if(passwordIsValid)
   {
     User.update({password:newpassword},{where:{id:id}}).then((_)=>res.send({msg:"user updated successfully"})).catch((err)=>{
       res.send({msg:"Error while Updating password"})
     })
    
   }
   else{
     res.send({msg:"password is Invalid"})
   }

  })


}
else{
  res.send({msg:"Please Fill all the Fields"})
}
}
