const express=require('express')
const cors=require('cors')
const app=express();
const db=require('./app/models')
const Role=db.role;
const Skill=db.skill;
const Doctor=db.doctor;

//Cors Options
var corsOptions={
    origin:"http://localhost:8080"
};
app.use(cors(corsOptions))
app.use((req, res, next) =>{
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token,Origin, Content-Type, Accept"
  );
  next();
});

//url encoding

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//sequelize databse connection
db.sequelize.sync().then(() => {
   console.log("Database Running Successfully")

   
  }).catch((err)=>console.log(`Error ${err}`));

 
  
  function initial(){
    Role.bulkCreate([{
      id:1,
      name:'user',


    },{id:2,name:'admin'}])
  }

//Route List
const authRoute=require('./app/routes/auth.routes');
const userRoute=require('./app/routes/user.routes');
const skillRoute=require('./app/routes/skill.route')
const doctorRoute=require('./app/routes/doctor.routes')
app.use('/api/',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/skill',skillRoute)
app.use('/api/doctor',doctorRoute)

const PORT=process.env.PORT || 8000
  app.get('/',(req,res,next)=>{
      return res.status(200).json({message:"Welcome  to Codernirmal Hospital Api",req:"Request codernirmal to use this api contact email:'codernirmal@gmail.com' phone:'9812880209'"})
  })

app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})