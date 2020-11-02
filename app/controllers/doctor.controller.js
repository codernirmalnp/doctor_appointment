
const db=require('../models/')
const fs=require('fs')



const Doctor=db.doctor
const Op=db.Sequelize.Op
exports.createDoctor=(req,res,next)=>
{
  const name=typeof(req.body.name)=="string" && req.body.name.trim().length > 0 ? req.body.name.trim():false;
  const degres=typeof(req.body.degres)=="string" && req.body.degres.trim().length >0 ?req.body.degres.trim() :false;
  const experience=typeof(req.body.experience)=="number" &&  req.body.experience.toString().trim().length >0  ? req.body.experience :false;
  const phone=typeof(req.body.phone)=="number" && req.body.phone.toString().trim().length==10 ? req.body.phone:false;
  const work=typeof(req.body.work)=="string" && req.body.work.trim().length > 0 ? req.body.work.trim():false;
  const workingHospital= typeof(req.body.workingHospital)=="string" && req.body.workingHospital.trim().length > 0 ?req.body.workingHospital.trim():false;
  const description=typeof(req.body.description)=="string" && req.body.description.trim().length >0 ? req.body.description.trim():false;
    const doctor={
    name:name,
    degrees:degres,
    experience:experience,
    phone:phone,
    work:work,
    workingHospital: workingHospital,
    description:description,
    }

  try{

    if(name==false)
    {
      return  res.send({ message:"Name must required and be letter",err:"name" });
    }
    else if(degres==false)
    {
      return  res.send({ message:"Degree must required and be letter",err:"degree" });
    }
    else if(experience==false)
    {
      return  res.send({ message:"Experience must required and be Number",err:"experience" });

    }
    else if(phone == false){
      return  res.send({ message:"Phone must required and be Number of 10 ",err:"phone" });

    }
    else if(work==false){
      return  res.send({ message:"Work must required and be letter ",err:"work" });
    }
    else if(workingHospital==false)
    {
      return  res.send({ message:"Working Hospital  must required and be letter ",err:"workingHospital" });
    }
    else if(description==false)
    {
      return  res.send({ message:"Description  must required and be letter " ,err:"description"});
    }
     else if(name && degres &&  experience  &&  phone &&  work && workingHospital && description)
     {
      Doctor.create(doctor).then((result)=>{
         
        res.send({ message: "Doctor registerd SuccessFully!" });

     
    }).catch((err)=>console.log(err.message))
  
     }
     else{
      return  res.send({ message:"ALl field is required" });
     }
  
      
        
       
    
       
   }
    catch(err)
    {
        res.status(500).send({success:false,data:err.message})
    }

   
}
exports.createImage=(req,res,next)=>{
  const id=req.params.id ? req.params.id:false;
  try{
    if(id)
    {
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
    else{
      res.send({msg:"Id doesnot Found"})
    }
   
  }
  catch(err)
  {
     console.log(err)
  }
}

exports.updateDoctor=(req,res,next)=>{

  
  

  try{
    const name=typeof(req.body.name)=="string" && req.body.name.trim().length > 0 ? req.body.name.trim():false;
    const degres=typeof(req.body.degres)=="string" && req.body.degres.trim().length >0 ?req.body.degres.trim() :false;
    const experience=typeof(req.body.experience)=="number" &&  req.body.experience.toString().trim().length >0  ? req.body.experience :false;
    const phone=typeof(req.body.phone)=="number" && req.body.phone.toString().trim().length==10 ? req.body.phone:false;
    const work=typeof(req.body.work)=="string" && req.body.work.trim().length > 0 ? req.body.work.trim():false;
    const workingHospital= typeof(req.body.workingHospital)=="string" && req.body.workingHospital.trim().length > 0 ?req.body.workingHospital.trim():false;
    const description=typeof(req.body.description)=="string" && req.body.description.trim().length >0 ? req.body.description.trim():false;
    const id=req.params.id ? req.params.id:false
      const doctor={
    
      }
      if(id)
      {
       
          if(name)  doctor.name=name;
          if(degres) doctor.degres=degres
          if(experience)  doctor.experience=experience
          if(phone)  doctor.phone=phone
          if(work) doctor.work=work
          if(workingHospital)  doctor.workingHospital=workingHospital
          if(description) doctor.description=description


          Doctor.update(doctor,{where:{id:id}}).then(()=>{
            res.send({msg:"Doctor updated SuccessFully"})
          }).catch((err)=>{
            res.send({msg:`Error in updating SuccessFully ${err.message}` })
          })
        }
      else{
        res.send({msg:"Id is not found and some field is invalid"})
      }

  
     
     
    
     
     
  }   
 

  catch(err){
      console.log(err)
  }
}

exports.updateImage=(req,res,next)=>{
  const id=req.params.id ? req.params.id:false;
 
  try{
    if(id)
    {
      Doctor.findOne({where:{id:id}}).then((result)=>{
        const imagepath=__dirname+`../../uploads/${result.image}`
        if(fs.existsSync(imagepath))
        {
        fs.unlink(imagepath,function(err)
        {
          console.log(err)
        })
  
        }
        
        Doctor.update({image:req.file.filename},{where:{id:id}}).then((data)=>{
        res.send({msg:"Image updated Successfully"});
        }).catch((err)=>res.send({err:err.message}))
      }).catch((err)=>res.send({err:err.message}))

    }
    else{
      res.send({msg:"Please Provide id"});
    }
  
   

  }
  catch(err)
  {
     console.log(err)
  }
}


exports.deleteDoctor=(req,res,next)=>{
  const id=req.params.id ? req.params.id:false;
  try{
    if(id)
    {
      Doctor.findOne({where:{id:id}}).then((result)=>{
        const imagepath=__dirname+`../../uploads/${result.image}`
        if(fs.existsSync(imagepath))
        {
        fs.unlink(imagepath,function(err)
        {
          console.log(err)
        })
        }
        Doctor.destroy({where:{id:id}}).then((result)=>{
          res.send({msg:"Doctor Deleted Successfully",result:result})
        }).catch((err)=>res.send({msg:err.message}))
      }).catch((err)=>res.send({msg:err.message}));

    }
    else{
      res.send({msg:"id not found"})
    }
   

   
    
  }
  catch(err)
  {
    console.log(err)
  }
}
