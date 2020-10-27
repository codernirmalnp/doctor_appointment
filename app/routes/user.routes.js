const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const express=require('express');
const router=express.Router();



  router.get("/test/all", controller.allAccess);

  router.get(
    "/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

 

router.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

module.exports=router
