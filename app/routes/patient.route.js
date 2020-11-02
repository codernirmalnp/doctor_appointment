const patient=require('../controllers/patient.controller')
const express=require('express')
const router=express.Router();
const {authJwt}=require('../middleware/')
const upload=require('../middleware/upload')

router.post('/',[authJwt.verifyToken,authJwt.isAdmin],patient.createPatient)
router.post('/:id/image',[authJwt.verifyToken,authJwt.isAdmin,upload.single('image')],patient.createImage)
router.patch('/:id/image',[authJwt.verifyToken,authJwt.isAdmin,upload.single('image')],patient.updateImage)
router.patch('/:id',[authJwt.verifyToken,authJwt.isAdmin],patient.updatePatient);
router.delete('/:id',[authJwt.verifyToken,authJwt.isAdmin],patient.deletePatient)
module.exports=router