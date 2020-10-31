const express=require('express')
const router=express.Router();

const {authJwt}=require('../middleware/')
const skill=require('../controllers/skill.controller.js')


router.post('/',[authJwt.verifyToken,authJwt.isAdmin],skill.createSkill)
router.get('/',skill.getSkill);
router.patch('/:id',[authJwt.verifyToken,authJwt.isAdmin],skill.updateSkill);
router.delete('/:id',[authJwt.verifyToken,authJwt.isAdmin],skill.deleteSkill);


module.exports=router