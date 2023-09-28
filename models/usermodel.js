const mongoose=require('mongoose');
require('../dbo');
const userschema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    mobile:{type:Number},
    address:{type:String},
    pincode:{type:String},
    city:{type:String},
    referalcode:{type:String},
    joined:{type:[String]},
    balanceofcoin:{type:Number,default:0},
    aadharcardfront:{type:String},
    aadharcardback:{type:String},
    pancard:{type:String}
},{timestamps:true});
module.exports=mongoose.model('userofsearchsavari',userschema);