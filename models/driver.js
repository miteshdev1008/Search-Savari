const mon=require('mongoose');
require('../dbo');

const driverschema=new mon.Schema({
    name:{type:String},
    number:{type:Number},
    isavilable:{type:Boolean,default:true},
    assigendvechile:{type:String,default:''},
    profilepic:{type:String,default:''},
    licence:{type:String},
    aadharfront:{type:String},
    aadharback:{type:String},
    password:{type:String},
    uploadedby:{type:String}
});

module.exports=mon.model('driver',driverschema);