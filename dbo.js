const mon=require('mongoose');
require('dotenv').config('./.env')
mon.connect(process.env.MONGO_URI)
.then(()=>{console.log("app is successsfully connected with db");})
.catch((e)=>{console.log("error while connecting"+e);})