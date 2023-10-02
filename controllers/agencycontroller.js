const agencymodel=require('../models/agency');
const vechilemodel=require('../models/vechile');
const drivermodel=require('../models/driver');
const routemodel=require('../models/routes');
const {mobno,isemail,passcheck}=require('../validate/validate');
const agency = require('../models/agency');
const usermodel = require('../models/usermodel');

const addvechiledetails=async(req,res)=>{
    


    console.log(parseInt(req.body.seatingcap));
    var value = Number(req.body.seatingcap);
    
    // console.log(!Number.Number(parseInt(req.body.seatingcap)));
   if(!Number.isInteger(value))return res.status(417).json({success:false,msg:'please enter only digits'});

   if(req.body.ac!='ac'&&req.body.ac!='Non-ac') return res.status(417).json({success:false,msg:'please select only ac/Non-ac'});
    if(!req.files['rcbookf']) return res.json({success:false,msg:'please enter rcbook front'});
   const rcbookfront=req.files['rcbookf'][0].path;

    //console.log(if(!req.files['insurancepdf'][0]));
    if(!req.files['insurancep']) return res.json({success:false,msg:'please enter insurance pic'});
 var insurance=req.files['insurancep'][0].path;
   
 //else {var insurancep=req.files['insurancep'][0].path}
 if(!req.files['rcbookb']) return res.json({success:false,msg:'please enter rcbook pic'});
 const rcbookb=req.files['rcbookb'][0].path;
 if(!req.files['puc']) return res.json({success:false,msg:'please enter puc'});
 const puc=req.files['puc'][0].path;

    if(!req.files['licencef']) return res.json({success:false,msg:'please enter license pic'});
    const licencef=req.files['licencef'][0].path;
    // const insurancep=req.files['insurance p'][0].path;
    if(!req.files['vechilegalary']) return res.json({success:false,msg:'please enter vechile pic'});
    const vechileg=req.files['vechilegalary'];
    
    const vechilepath=vechileg.map(ele=>ele.path.toString());
    //  console.log(vechilepath);
    // console.log("user is"+req.user[0]._id);
    const vechile=new vechilemodel({vechilegala:vechilepath,insurance:insurance,licencef:licencef,puc:puc,rcbookb:rcbookb,no:req.body.no,make:req.body.make,model:req.body.model,seatingcapicity:req.body.seatingcap,type:req.body.type,ac:req.body.ac,uploadedby:req.user[0]._id,rcbookfront:rcbookfront,});
    // console.log(vechile);
    const vechilesavedetails=await vechile.save();
    if(!vechilesavedetails) return res.status(417).json({success:false,msg:'failed to save vechile'})
    res.status(200).json({success:true,status:200,msg:'vechile added successfully'});
}

const addagency=async(req,res)=>{
//     const prop=['name','number','email','address'];
//     const empty=[];
//    // console.log(req.body.prop[0]);
//      for(var i=0;i<=prop.length;i++){
//           if(req.body.hasOwnProperty(prop[i]))
//           continue;
//           else
//           empty.push(prop[i]); 
//      }
//    console.log(empty);
//      empty.pop(empty.length-1);
//      console.log(empty);
//      const space="please enter field :"+empty.toString();
//     if(empty.length!=0)return res.status(417).json({success:false,status:417,msg:space});
    //  const userid=req.user[0].id;
    //  const checkagnecy=await agencymodel.find({uploadedby:userid});
    //  if(checkagnecy.length>0) return res.status(417).json({success:false,msg:'one user can only make one agency'});

if(!req.body.name)return res.status(417).json({success:false,msg:'please enter name'});
    
    if(!req.body.address)return res.status(417).json({status:417,success:false,msg:'please enter address'});
    
    if(req.body.number.length!=10) return res.status(417).json({status:417,success:false,msg:'please enter 10 digit number'});
    
    if(isNaN(req.body.number)) return res.json({status:417,success:false,msg:'your no contains characters'});

    const emailc=isemail(req.body.email);
        if(emailc!=true) return res.status(417).json({success:false,status:417,msg:emailc});
    //   console.log(req.body.registration_doc);
  console.log(req.files['registration_doc'][0].mimetype!='application/pdf');
    if(!req.files['registration_doc']) return res.status(417).json({success:false,msg:'please add user_files(registration document)'});
        // const img = req.files.map(file => file.path);
        if(req.files['registration_doc'][0].mimetype!='application/pdf') return res.status(417).json({status:417,success:false,msg:'please enter pdf onlly'})
        
        const img=req.files['registration_doc'][0].filename;

        const agencydetails=new agencymodel({name:req.body.name,number:req.body.number,email:req.body.email,address:req.body.address,registrationdocument:img,uploadedby:req.user[0]._id});
   
    const savedetails=await agencydetails.save();
    res.json({success:true,status:200,msg:'agency added successfully'});
}

const editagnecy=async(req,res)=>{
    // if (Object.keys(req.body).length === 0) return res.status(404).json({success:false,msg:'please enter data to update'});
    // res.json(req.user);
    // if(req.body.number){

    // }
    if(req.body.number){
        if(isNaN(req.body.number)) return res.status(417).json({success:false,msg:'please enter no only'})
        if(req.body.number.length!=10) return res.status(417).json({success:false,msg:'please enter 10 digits  only'})

    userid=req.user[0]._id;
    const findagnecy=await agencymodel.updateOne({uploadedby:userid},{$set:req.body},{new:true});
    const agnecy=await agencymodel.find({uploadedby:userid},{_id:0},{uploadedby:0});
    res.json({success:true,status:200,msg:'agnecy updated successfully'}); }
    else if(req.body.email){
        const emailc=isemail(req.body.email);
        if(emailc!=true) return res.status(417).json({success:false,status:417,msg:emailc});
       
        userid=req.user[0]._id;
        const findagnecy=await agencymodel.updateOne({uploadedby:userid},{$set:req.body},{new:true});
        const agnecy=await agencymodel.find({uploadedby:userid},{_id:0},{uploadedby:0});
        res.json({success:true,status:200,msg:'agnecy updated successfully'});
    }
    else{
        userid=req.user[0]._id;
        const findagnecy=await agencymodel.updateOne({uploadedby:userid},{$set:req.body},{new:true});
        const agnecy=await agencymodel.find({uploadedby:userid},{_id:0},{uploadedby:0});
        res.json({success:true,status:200,msg:'agnecy updated successfully'});
    }
}

const editdocuments=async(req,res)=>{
    // res.json('hello wprlds');
    userid=req.user[0]._id;
    console.log(req.files);
    // if(req.files.rcbookf)
    const adf=req.files['aadharcardfront'][0].path;
     //console.log(if(!req.files['insurancepdf'][0]));
  const adb=req.files['aadharcardback'][0].path
     //else {var insurancep=req.files['insurancep'][0].path}
     const pancard=req.files['pancard'][0].path;
    //  const puc=req.files['puc'][0].path;
    //  const licencef=req.files['licencef'][0].path;
    //  // const insurancep=req.files['insurance p'][0].path;
    //  const vechileg=req.files['vechilegalary'];

    const newuser=await usermodel.findByIdAndUpdate(userid,{aadharcardfront:adf,aadharcardback:adb,pancard:pancard},{new:true})
    
    if(!newuser) return res.status(417).json({success:false,})
    res.status(200).json({success:true,msg:'profile document updated successfully'});
}

const vechilelist=async(req,res)=>{
    var allvechile=await vechilemodel.find({uploadedby:req.user[0]._id},{_id:1,assigndriver:1,make:1,model:1,no:1});
    if(allvechile==null) allvechile='empty';
    res.status(200).json({success:true,data:allvechile}); 
}

const adddriver=async(req,res)=>{
//     const prop=['name','no'];
//     const empty=[];
//      for(var i=0;i<=prop.length;i++){
//           if(req.body.hasOwnProperty(prop[i]))
//           continue;
//           else
//           empty.push(prop[i]); 
//      }
//    //  console.log(empty);
//      empty.pop(empty.length-1);
//      const spcae="please enter field :"+empty.toString();   
//      if(empty.length!=0)return res.status(417).json({success:false,status:417,msg:spcae});
   
    // if(isNaN(req.body.no)) return res.json({success:false,msg:'please enter number only'});

    if(req.body.password!=req.body.conformpassword) return res.json({success:false,msg:'password and conformpassword doesn\'t match'});
     const checkpass=passcheck(req.body.password);
     if(checkpass!=true) return res.status(417).json({success:false,msg:checkpass})
    
    if(req.body.no.length!=10) return res.json({success:false,msg:'please enter 10 number only'});

     const userid=req.user[0].id;

    //  userid=req.user[0]._id;
    console.log(req.files);
    // if(req.files.rcbookf)
    const profilepic=req.files['profilepic'][0].path;
    const adf=req.files['aadharcardfront'][0].path;
     //console.log(if(!req.files['insurancepdf'][0]));
  const adb=req.files['aadharcardback'][0].path
     //else {var insurancep=req.files['insurancep'][0].path}:
     const license=req.files['license'][0].path;
     const newdriver=new drivermodel({profilepic:profilepic,aadharfront:adf,aadharback:adb,licence:license,password:req.body.password,number:req.body.no,name:req.body.name,uploadedby:userid});
     
     const savedriver=await newdriver.save();

     res.status(200).json({success:true,msg:'driver add successflly'});

}

const editdriver=async(req,res)=>{

    if(!req.body.updateuserid) return res.status(417).json({success:false,msg:'please enter userid'})
    if(!req.body.number) return res.status(417).json({success:false,status:417,msg:'please enter no to update'});

    if(isNaN(req.body.number))return res.status(417).json({success:false,status:417,msg:'please enter no in digits only'});

    if(req.body.number.length!=10) return res.status(417).json({success:false,status:417,msg:'please enter 10 digit no only'});
    
    const updatedata=await drivermodel.findByIdAndUpdate(req.body.updateuserid,{$set:req.body})

    res.status(200).json({success:true,msg:'driver data hasbeen updated successfully'});

}

const driverlist=async(req,res)=>{
    console.log("object");
    var alldriver=await drivermodel.find({$and:[{uploadedby:req.user[0]._id},{isavilable:true}]},{_id:1,profilepic:1,name:1});
    if(alldriver==null) alldriver='empty';
    return res.status(200).json({success:true,status:200,data:alldriver});
}

const assigneddriver=async(req,res)=>{
    const vechileid=req.body.vechileid;
    const driverid=req.body.driverid;
    const driverdata=await drivermodel.findById(driverid);
    let details=[];
    console.log(driverdata.name+" "+driverdata.profilepic);
    details.push(driverdata.name);
    details.push(driverdata.profilepic);
    console.log(details);
    const vechile=await vechilemodel.findByIdAndUpdate(vechileid,{$push:{assigndriver:details}},{new:true});
    // const updatedriver=await drivermodel.findByIdAndUpdate(driverid,)
    const statusupdate=await drivermodel.findByIdAndUpdate(driverid,{isavilable:false,assigendvechile:vechileid});
    res.json({success:true,msg:'driver assigned successfully'});
}

const addroute=async(req,res)=>{
    const userid=req.user[0]._id;
    const agnecyid=await agencymodel.find({uploadedby:userid});
    // console.log(agnecyid[0]._id);   
    const rout= await new routemodel({from:req.body.from,via:req.body.via,to:req.body.to,agencyid:agnecyid[0]._id}).save();
    res.json({success:true,msg:'routes add successfully',data:rout});
}

const getroute=async(req,res)=>{
    // res.send('hello world');
    const userid=req.user[0]._id;
    const agnecyid=await agencymodel.find({uploadedby:userid});
    console.log(agnecyid);
    if(!agnecyid.length) return res.status(417).json({success:false,msg:'please first create agency'})
    var rout= await routemodel.find({agencyid:agnecyid[0]._id},{agencyid:0,__v:0});
    if(rout==null) rout='empty';
   res.status(200).json({success:true,msg:'all yours route is',data:rout});
}

const editroute=async(req,res)=>{
    //console.log(agnecyid[0]._id);   
    const rout= await routemodel.findByIdAndUpdate(req.body.id,{$set:req.body});
    res.json({success:true,msg:'routes updated successfully',data:rout});
}

const deleteroute=async(req,res)=>{ 
    const rout= await routemodel.findByIdAndDelete(req.body.id);
    res.json({success:true,msg:'routes deleted successfully',data:rout});
}

const deletedriver=async(req,res)=>{
    // res.json('hello world');
    const deletedriver=await drivermodel.findByIdAndDelete(req.body.id);
    res.json({success:true,msg:'driver deleted successfully'});
}

const deletevechile=async(req,res)=>{
    res.json('hello world');
}

module.exports={deletedriver,editdocuments,editroute,deleteroute,getroute,addroute,assigneddriver,addagency,addvechiledetails,editagnecy,vechilelist,adddriver,editdriver,driverlist}
