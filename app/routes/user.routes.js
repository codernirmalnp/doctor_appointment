const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");
const express=require('express');


const router=express.Router();

router.patch('/changepwd',[authJwt.verifyToken,authJwt.isAdmin],user.changePassword)

module.exports=router
