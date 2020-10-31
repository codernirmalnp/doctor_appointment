const express=require('express')
const router=express.Router();
const upload=require('../middleware/upload')

const {authJwt}=require('../middleware/')
const doctor=require('../controllers/doctor.controller.js')

router.post('/',[authJwt.verifyToken,authJwt.isAdmin],doctor.createDoctor);
router.post('/:id/image',[authJwt.verifyToken,authJwt.isAdmin,upload.single('image')],doctor.createImage)

module.exports=router