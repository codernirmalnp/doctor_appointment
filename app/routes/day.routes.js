const express=require('express')
const router=express.Router();
const {authJwt}=require('../middleware/')
const day=require('../controllers/day.controller.js')
router.post('/',day.createDay)
router.patch('/:id',day.updateDay)
router.delete('/:id',day.deleteDay)


module.exports=router
