const db=require('../models/')
const fs=require('fs')
const Patient=db.patient
const Doctor=db.doctor
const Op = db.Sequelize.Op;

exports.createPatient=(req,res,next)=>{
    const name=typeof(req.body.name)=="string" && req.body.name.trim().length >0 ? req.body.name.trim():false
    const address=typeof(req.body.address)=="string" && req.body.address.trim().length >0  ? req.body.address.trim():false
    const phone=typeof(req.body.phone)=="number" && req.body.phone.toString().length ==10 ?req.body.phone:false
    const doctor=req.body.doctor ? req.body.doctor:false;
    try{
     
      if(name==false)
      {
        res.send({msg:"Name must required and must be String"})
      }
      else if(address==false)
      {
        res.send({msg:"Address must required and must be String"})
      }
      else if(phone==false)
      {
        res.send({msg:"Phone must required and must be Number"})
      }
      else if(name && address && phone )
      {

        Patient.create({name:name,address:address,phone:phone}).then((result)=>{
          if(doctor)
          {
            Doctor.findAll({
              where:{
                name:{
                  [Op.or]:req.body.doctor
                }
               
              }
            }).then((doctor)=>{
              result.setDoctors(doctor).then(_=>{
                res.send({msg:"Doctor registerd SuccessFully"})
              }).catch((err)=>
              {
                res.send({msg:err.message})
              })
          
          }).catch((err)=>res.send({err:err.message}))
        }
        else{
          res.send({msg:"Doctor registerd SuccessFully"})
        }
          
        }).catch((err)=>res.send({err:err.message}))

      }
      else{
        res.send({msg:"All filed is required"})
      }
        
      }
    catch(err)
    {
        console.log(err)
    }
   
}

exports.createImage=(req,res,next)=>{
    const id=req.params.id  ? req.params.id :false;
  try{
    if(id)
    {
      if(req.file == undefined)
      {
        return res.send({msg:"You must select a file"});
      }
      Patient.update({
        image:req.file.filename
      },{
        where:{id:id}
      }
      ).then((data)=>{
        return res.send({msg:"Patient Image uploaded successfully",data:data});
      }).catch((err)=>res.send({err:err.message}))

    }
    else{
      res.send({msg:"Please Provide Id"})
    }
   
   
  }
  catch(err)
  {
     console.log(err)
  }
},
exports.updatePatient= async (req,res,next)=>{
  const name=typeof(req.body.name)=="string" && req.body.name.trim().length >0 ? req.body.name.trim():false
  const address=typeof(req.body.address)=="string" && req.body.address.trim().length >0  ? req.body.address.trim():false
  const phone=typeof(req.body.phone)=="number" && req.body.phone.toString().length ==10 ?req.body.phone:false
  const doctor=req.body.doctor ? req.body.doctor :false;
  const id=req.params.id ? req.params.id :false
  const patient=
  {

  }
  try{
    if(name)
    {
      patient.name=name
    }
    if(address)
    {
      patient.address=address
    }
    if(phone)
    {
      patient.phone=phone
    }
    if((name || address || phone) && id)
    {
      await Patient.update({name:name,address:address,phone:phone},{where:{id:id}})
    
    

     
      if(doctor)
      {
        Patient.findOne({where:{id:id}}).then(data=>{

          Doctor.findAll({where:{
            name:{
              [Op.or]:doctor
            }
            
          }}).then(result=>{
            data.addDoctor(result).then((_)=>{
              res.send({msg:"Patient Updated SuccessFully"})
            }).catch(err=>console.log(err))
  
            
          }).catch(err=>console.log(err))
         

        })
       

      }
      else{
        res.send({msg:"patient Updated SuccessFully"})
      }
      
    }
     
    }
    
  catch(err){
console.log(err)
  }

}

exports.updateImage=(req,res,next)=>{
  const id=req.params.id ? req.params.id:false;
 
  try{
    Patient.findOne({where:{id:id}}).then((result)=>{
      const imagepath=__dirname+`../../uploads/${result.image}`
      if(fs.existsSync(imagepath))
      {
      fs.unlink(imagepath,function(err)
      {
        console.log(err)
      })

      }
      
      Patient.update({image:req.file.filename},{where:{id:id}}).then((data)=>{
      res.send({msg:"Image updated Successfully"});
      }).catch((err)=>console.log(err))
    }).catch((err)=>console.log(err))
   

  }
  catch(err)
  {
     console.log(err)
  }

}

exports.deletePatient=(req,res,next)=>{
  const id=req.params.id ? req.params.id:false;
  try{
    if(id)
    {
      Patient.findOne({where:{id:id}}).then((result)=>{
        const imagepath=__dirname+`../../uploads/${result.image}`
        if(fs.existsSync(imagepath))
        {
        fs.unlink(imagepath,function(err)
        {
          console.log(err)
        })
        Patient.destroy({where:{id:id}}).then((result)=>{
          res.send({msg:"Doctor Deleted Successfully",result:result})
        }).catch((err)=>res.send({err:err.message}))
  
        }
      });

    }
    else{
      res.send({msg:"please provide id"})
    }
   

   
    
  }
  catch(err)
  {
    console.log(err)
  }

}
