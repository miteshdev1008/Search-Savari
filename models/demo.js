const mongoose=require('mongoose');
require('../dbo');

const demo=new mongoose.Schema({
    num:{type:Number},
    isdeleted:{type:Boolean,default:false}
});

module.exports=mongoose.model('demo',demo)