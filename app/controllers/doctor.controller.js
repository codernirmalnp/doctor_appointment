
const db=require('../models/')

const Doctor=db.doctor
const Skill=db.skill
const Op=db.Sequelize.Op
exports.createDoctor=(req,res,next)=>
{
    const doctor={
    name:req.body.name,
    degrees:req.body.degrees,
    experience:req.body.experience,
    availableDate:req.body.availableDate,
    description:req.body.description,
    }
    const skills=req.body.skills

    try{
        Doctor.create(doctor).then((result)=>{
          if(skills)
          {
            Skill.findAll({where:{name:{[Op.or]:skills}}}).then((skill)=>{
               result.setSkills(skill).then(()=>{
                res.send({ message: "Doctor registered successfully!" });
               }).catch((err)=>console.log(err.message))
            })
          }
          else{
            res.send({ message: "Skills field is required!" });
          }
         
        }).catch((err)=>console.log(err.message))
 
   }
    catch(err)
    {
        res.status(500).send({success:false,data:err.message})
    }

   
}
exports.createImage=(req,res,next)=>{
  const id=req.params.id;
  try{
   
    if(req.file == undefined)
    {
      return res.send({msg:"You must select a file"});
    }
    Doctor.update({
      image:req.file.filename
    },{
      where:{id:id}
    }
    ).then((data)=>{
      return res.send({msg:"user Image uploaded successfully",data:data});
    }).catch((err)=>console.log(err))
  }
  catch(err)
  {

  }
}