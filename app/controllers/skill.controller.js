const { paginate } = require('../helper/paginate');
const db=require('../models/')
const Skill=db.skill
const Op = db.Sequelize.Op;
const moment=require('moment');
const { skill } = require('../models/');
const User = db.user

  
  
exports.createSkill=(req,res,next)=>
{
   const name=req.body.name;
   
   try{
    Skill.create({name:name}).then((data)=>{
        res.status(200).send({success:true,msg:"Skill Created Successfully",data:data});
    }).catch((err)=>{
        res.status(403).send({success:false,msg:"Cannot create Skill",data:err.message})
    });

   }
   catch(err){
       return err;
   }
  

}
exports.getSkill=async (req,res,next)=>{
    try {
        // get the query params
        const { q, page, limit, order_by, order_direction } = req.query;

        let search = {};
        let order = [];

        // add the search term to the search object
        if (q) {
            search = {
                where: {
                    name: {
                        [Op.like]: `%${q}%`
                    }
                }
            };
        }

        // add the order parameters to the order
        if (order_by && order_direction) {
            order.push([order_by, order_direction]);
        }

        // transform function that can be passed to the  paginate method
        const transform = (records) => {
            return records.map(record => {
                return {
                    id: record.id,
                    name: record.name,
                    date: moment(record.createdAt).format('D-M-Y H:mm A')
                }
            });
        }

        // paginate method that takes in the model, page, limit, search object, order and transform
        const skills = await paginate(Skill, page, limit, search, order, transform);

        return res.status(200).send({
            success: true,
            message: 'Skill List',
            data: skills
        })
    } catch (error) {
        console.log('Failed to fetch skill', error);
        return res.status(500).send({
            success: false,
            message: 'Failed to fetch skill'
        });
}
}

exports.updateSkill=(req,res,next)=>{
    const id=req.params.id;
    const name=req.body.name;
    try{
        if(name && id)
        {
            User.update({name:name},{where:{id:id}}).then((_)=>{
                res.status(200).send({success:true,message:"User Updated Successfully"})
            }).catch((err)=>{
                res.status(400).send({success:false,message:"fail to update user",msg:err.message})
            })
        }
        else{
            res.status(500).send({success:false,message:"update field is not provided"})  
        }
    

    }
    catch(err){
       console.log(err.message)
    }


}

exports.deleteSkill=async function(req,res,next)
{

    const id=req.params.id;
    try{
        if(id)
        {
            const skill=await Skill.findOne({where:{id:id}})
          if(skill)
          {
            Skill.destroy({where:{id:id}}).then((_)=>{
                res.status(200).send({success:true,message:"User deleted Successfully"})
            }).catch((err)=>{
                res.status(400).send({success:false,msg:err.message})
            })
          }
          else{
            res.status(400).send({success:false,msg:"skill does not exist"})
          }
          
        
            
        }
        else{
            res.status(500).send({success:false,message:"update field is not provided"})  
        }
    

    }
    catch(err){
       console.log(err.message)
    }


}