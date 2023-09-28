const mon=require('mongoose');
require('../dbo');
const vechile=new mon.Schema({
    make:{type:String},
    no:{type:String},
    model:{type:String},
    seatingcapicity:{type:String},
    type:{type:String},
    ac:{type:String},
    uploadedby:{type:String},
    rcbookfront:{type:String},
    rcbookb:{type:String},
    puc:{type:String},
    licencef:{type:String},
    insurance:{type:String},
    vechilegala:{type:[String],default:[]},
    assigndriver:{type:[String],default:[]}
});

module.exports=mon.model('vechile',vechile);