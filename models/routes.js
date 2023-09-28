
const mon=require('mongoose');
require('../dbo');

const routeschema=new mon.Schema({
    //name:{type:String},
    from:{type:String},
    via:{type:String},
    to:{type:String},
    agencyid:{type:String},
    isavialble:{type:Boolean,default:true},    
});

module.exports=mon.model('routeschema',routeschema);