const mon=require('mongoose');
require('../dbo');
const agnecyschema=new mon.Schema({
    name:{type:String},
    number:{type:Number},
    email:{type:String},
    address:{type:String},
    uploadedby:{type:String},
    registrationdocument:{type:[String]}
});

module.exports=mon.model('agency',agnecyschema);