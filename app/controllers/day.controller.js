

const db=require('../models/')
const Day=db.day


exports.createDay=(req,res,next)=>{
    const isAvailableOnSunday=typeof(req.body.isAvailableOnSunday)=="boolean" ? req.body.isAvailableOnSunday :false
    const SunFromTime=typeof(req.body.SunFromTime instanceof Date) ? req.body.SunFromTime:false
    const SunToTime=typeof(req.body.SunToTime instanceof Date) ? req.body.SunToTime:false
    const isAvailableOnMondey=typeof(req.body.isAvailableOnMondey)=="boolean" ? req.body.isAvailableOnMondey:false
    const MonFromTime=typeof(req.body.MonFromTime instanceof Date) ? req.body.MonFromTime:false

    const MonToTime=typeof(req.body.MonToTime instanceof Date) ? req.body.MonToTime:false
    const isAvailabelOnTuesday=typeof(req.body.isAvailabelOnTuesday) =="boolean" ?req.body.isAvailabelOnTuesday:false
    const TueFromTime=typeof(req.body.TueFromTime instanceof Date) ? req.body.TueFromTime:false
    const TueToTime=typeof(req.body.TueFromTime instanceof Date) ? req.body.TueToTime:false
    const isAvailabelOnWednesday=typeof(req.body.isAvailabelOnWednesday)=="boolean" ? req.body.isAvailabelOnWednesday:false
    const WedFromTime=typeof(req.body.WedFromTime instanceof Date) ? req.body.WedFromTime:false
    const WedToTime=typeof(req.body.WedToTime instanceof Date) ? req.body.WedToTime:false
    const isAvailableOnThrusday=typeof(req.body.isAvailableOnThrusday)=="boolean" ? req.body.isAvailableOnThrusday:false
    const ThuFromTime=typeof(req.body.ThuFromTime instanceof Date) ? req.body.ThuFromTime:false
    const ThuToTime=typeof(req.body.ThuToTime instanceof Date) ? req.body.ThuFromTime:false
    const isAvailableOnFriday=typeof(req.body.isAvailabelOnFriday)=="boolean" ? req.body.isAvailabelOnFriday:false
    const FriFromTime=typeof(req.body.FriFromTime instanceof Date) ? req.body.FriFromTime:false;
    const FriToTime=typeof(req.body.FriToTime instanceof Date) ? req.body.FriFromTime:false
    const isAvailableOnSaturday=typeof(req.body.isAvailableOnSaturday)=="boolean" ? req.body.isAvailabelOnFriday:false
    const SatFromTime=typeof(req.body.SatFromTime instanceof Date) ? req.body.SatFromTime:false
    const SatToTime=typeof(req.body.SatToTime instanceof Date)?req.body.SatFromTime:false


    

    const day={
        doctorId:req.body.doctorId ? req.body.doctorId:null

    }
    try{
        
        if(isAvailableOnSunday && SunFromTime && SunToTime) {
         day.isAvailableOnSunday=isAvailableOnSunday
         day.SunFromTime=SunFromTime
         day.SunToTime=SunToTime
        }
        if(isAvailableOnMondey && MonFromTime && MonToTime)
        {
            day.isAvailableOnMondey=isAvailableOnMondey
            day.MonFromTime=MonFromTime
            day.MonToTime=MonToTime
        }
        if(isAvailabelOnTuesday && TueFromTime && TueToTime)
        {
            day.isAvailabelOnTuesday=isAvailabelOnTuesday
            day.TueFromTime=TueFromTime
            day.TueToTime=TueToTime
        }
        if(isAvailabelOnWednesday && WedFromTime && WedToTime)
        {
            day.isAvailabelOnWednesday=isAvailabelOnWednesday
            day.WedFromTime=WedFromTime
            day.WedToTime=WedToTime
        }
        if(isAvailableOnThrusday && ThuFromTime && ThuToTime)
        {
            day.isAvailableOnThrusday=isAvailableOnThrusday
            day.ThuFromTime=ThuFromTime
            day.ThuToTime=ThuToTime

        }
        if(isAvailableOnFriday && FriFromTime && FriToTime)
        {
            day.isAvailabelOnFriday=isAvailableOnFriday
            day.FriFromTime=FriFromTime
            day.FriToTime=FriToTime
        }
        if(isAvailableOnSaturday && SatFromTime && SatToTime)
        {
            day.isAvailableOnSaturday=isAvailableOnSaturday
            day.SatFromTime=SatFromTime
            day.SatToTime=SatToTime
        }
        
        if((isAvailableOnSunday && SunFromTime && SunToTime)||(isAvailableOnMondey && MonFromTime && MonToTime) || (isAvailabelOnWednesday && WedFromTime && WedToTime) || (isAvailabelOnTuesday && TueFromTime && TueToTime) || (isAvailableOnThrusday&& ThuFromTime && ThuToTime) || (isAvailableOnFriday&& FriFromTime && FriToTime) || (isAvailableOnSaturday&& SatFromTime && SatToTime) ) 
        {
            Day.create(day).then((_)=>{
                res.send({msg:"Doctor day registred SuccessFully"})
            }).catch(err=>console.log(err))
        } 
        else{
            res.send({msg:"Please Fill any field"})
        }
        
           
            

        
    }
    catch(err)
    {
        console.log(err)
    }
}
exports.updateDay=(req,res,next)=>{
    const id=req.params.id ? req.params.id:false;
    const isAvailableOnSunday=typeof(req.body.isAvailableOnSunday)=="boolean" ? req.body.isAvailableOnSunday :false
    const SunFromTime=typeof(req.body.SunFromTime instanceof Date) ? req.body.SunFromTime:false
    const SunToTime=typeof(req.body.SunToTime instanceof Date) ? req.body.SunToTime:false
    const isAvailableOnMondey=typeof(req.body.isAvailableOnMondey)=="boolean" ? req.body.isAvailableOnMondey:false
    const MonFromTime=typeof(req.body.MonFromTime instanceof Date) ? req.body.MonFromTime:false

    const MonToTime=typeof(req.body.MonToTime instanceof Date) ? req.body.MonToTime:false
    const isAvailabelOnTuesday=typeof(req.body.isAvailabelOnTuesday) =="boolean" ?req.body.isAvailabelOnTuesday:false
    const TueFromTime=typeof(req.body.TueFromTime instanceof Date) ? req.body.TueFromTime:false
    const TueToTime=typeof(req.body.TueFromTime instanceof Date) ? req.body.TueToTime:false
    const isAvailabelOnWednesday=typeof(req.body.isAvailabelOnWednesday)=="boolean" ? req.body.isAvailabelOnWednesday:false
    const WedFromTime=typeof(req.body.WedFromTime instanceof Date) ? req.body.WedFromTime:false
    const WedToTime=typeof(req.body.WedToTime instanceof Date) ? req.body.WedToTime:false
    const isAvailableOnThrusday=typeof(req.body.isAvailableOnThrusday)=="boolean" ? req.body.isAvailableOnThrusday:false
    const ThuFromTime=typeof(req.body.ThuFromTime instanceof Date) ? req.body.ThuFromTime:false
    const ThuToTime=typeof(req.body.ThuToTime instanceof Date) ? req.body.ThuFromTime:false
    const isAvailableOnFriday=typeof(req.body.isAvailabelOnFriday)=="boolean" ? req.body.isAvailabelOnFriday:false
    const FriFromTime=typeof(req.body.FriFromTime instanceof Date) ? req.body.FriFromTime:false;
    const FriToTime=typeof(req.body.FriToTime instanceof Date) ? req.body.FriFromTime:false
    const isAvailableOnSaturday=typeof(req.body.isAvailableOnSaturday)=="boolean" ? req.body.isAvailabelOnFriday:false
    const SatFromTime=typeof(req.body.SatFromTime instanceof Date) ? req.body.SatFromTime:false
    const SatToTime=typeof(req.body.SatToTime instanceof Date)?req.body.SatFromTime:false


    

    const day={
        doctorId:req.body.doctorId

    }
    try{
        
        if(isAvailableOnSunday && SunFromTime && SunToTime) {
         day.isAvailableOnSunday=isAvailableOnSunday
         day.SunFromTime=SunFromTime
         day.SunToTime=SunToTime
        }
        if(isAvailableOnMondey && MonFromTime && MonToTime)
        {
            day.isAvailableOnMondey=isAvailableOnMondey
            day.MonFromTime=MonFromTime
            day.MonToTime=MonToTime
        }
        if(isAvailabelOnTuesday && TueFromTime && TueToTime)
        {
            day.isAvailabelOnTuesday=isAvailabelOnTuesday
            day.TueFromTime=TueFromTime
            day.TueToTime=TueToTime
        }
        if(isAvailabelOnWednesday && WedFromTime && WedToTime)
        {
            day.isAvailabelOnWednesday=isAvailabelOnWednesday
            day.WedFromTime=WedFromTime
            day.WedToTime=WedToTime
        }
        if(isAvailableOnThrusday && ThuFromTime && ThuToTime)
        {
            day.isAvailableOnThrusday=isAvailableOnThrusday
            day.ThuFromTime=ThuFromTime
            day.ThuToTime=ThuToTime

        }
        if(isAvailableOnFriday && FriFromTime && FriToTime)
        {
            day.isAvailabelOnFriday=isAvailableOnFriday
            day.FriFromTime=FriFromTime
            day.FriToTime=FriToTime
        }
        if(isAvailableOnSaturday && SatFromTime && SatToTime)
        {
            day.isAvailableOnSaturday=isAvailableOnSaturday
            day.SatFromTime=SatFromTime
            day.SatToTime=SatToTime
        }
       
        if((isAvailableOnSunday && SunFromTime && SunToTime)||(isAvailableOnMondey && MonFromTime && MonToTime) || (isAvailabelOnWednesday && WedFromTime && WedToTime) || (isAvailabelOnTuesday && TueFromTime && TueToTime) || (isAvailableOnThrusday&& ThuFromTime && ThuToTime) || (isAvailableOnFriday&& FriFromTime && FriToTime) || (isAvailableOnSaturday&& SatFromTime && SatToTime) ) 
        {
            if(id)
            {
                Day.update(day,{where:{id:id}}).then((_)=>{
                    res.send({msg:"Doctor day registred SuccessFully"})
                }).catch(err=>res.send({msg:err.message}))

            }
            else{
                res.send({msg:"Please provide id"})
            }
          
        } 
        else{
            res.send({msg:"Please Fill any field"})
        }
        
           
            

        
    }
    catch(err)
    {
        console.log(err)
    }
}
exports.deleteDay=(req,res,next)=>
{
    const id=req.params.id  ? req.params.id:false;
    if(id){
        Day.destroy({where:{id:id}}).then((_)=>{
            res.send({msg:"Delete of data SuccessFull"})
        }).catch((err)=>{
            res.send({msg:`${err.message}`})
        })
    }
    else{
        res.send({msg:`Please Provide id`})
    }

}