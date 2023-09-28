const usermodel=require('../models/usermodel');
const agnecymodel=require('../models/usermodel');
const vechilemodel=require('../models/vechile');
const otpmodel=require('../models/otp');
const demomodel=require('../models/demo');
require('dotenv').config('../.env');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const {passcheck,mobno,isemail}=require('../validate/validate');
const {otpexpires,genreferal,createtoken,sendemail}=require('../middleware/auth');
const agency = require('../models/agency');

const forgotpasswordbymobile=async(req,res)=>{
  // res.json('hello');
  const user=req.user[0].mobile;
  const no=req.body.no;
  if(user!=no) return res.status(417).json({success:false,msg:'please enter valid no'});

  const finduser=await usermodel.find({number:no});
  console.log(finduser.length);
  if(finduser.length=0) return res.status(417).json({success:false,msg:'please enter phone no which is related to this account'});

  res.json({success:true,msg:'otp sent successfully'});

  // const token=createtoken(finduser._id);
  //   res.json({tokenis:token});
}

const deleteuser=async(req,res)=>{
  // res.json('hello from delete user');
  const userid=req.user[0]._id;
  const deleteuser=await usermodel.findByIdAndDelete(userid);
  res.json({success:true,msg:'deleted user successfully'});
}

const resetpasswordbymobile=async(req,res)=>{
  // res.json('hello');
  // res.json(req.user[0]);
  if(!req.body.newpass&&!req.body.conformpass) return res.json('please enter both pass');

  const passc=passcheck(req.body.newpass);
  if(passc!=true) return res.status(417).json({success:false,status:417,msg:passc});
 
  if(req.body.newpass!=req.body.conformpass) return res.json({success:false,status:417,msg:'new and conform pass isn\'t match'});

const updateuser=await usermodel.findByIdAndUpdate(req.user[0]._id,{$set:{password:req.body.newpass}},{new:true});
 //console.log(updateuser);
res.status(200).json({success:true,msg:'password change successfully'});

}

const signup=async(req,res)=>{
    
  // const {otp,mobile}=req.body;
  // const no=mobile;
  // const verifyuser=await otpmodel.find({no:no});
  // time=verifyuser[0].updatedAt;
  // console.log(time);
  // const checklimit=otpexpires(time);
  // console.log(checklimit);
  // if(checklimit==false) return res.status(401).json({success:false,msg:'your otp has been expires'});

  // console.log(verifyuser[0].otp+" "+otp);
  // if(verifyuser[0].otp!=otp) return res.status(417).json({success:false,data:'sorry wrong user'});

     //  if(!req.body.name&&!req.body.email&&!req.body.password&&!req.body.mobile) return res.status(400).json('please enter all fields')
       const prop=['name','email','password','mobile','conformpassword'];
      const empty=[];
       for(var i=0;i<=prop.length;i++){
            if(req.body.hasOwnProperty(prop[i]))
            continue;
            else
            empty.push(prop[i]); 
       }
     //  console.log(empty);

       empty.pop(empty.length-1);
       const spcae="please enter field :"+empty.toString();
       if(empty.length!=0) return res.status(417).json({success:false,status:417,msg:spcae});
      
      //  if(req.body.email==null) return res.status(404).json({success:false,status:404,msg:'please enter email'}); 
        const emailc=isemail(req.body.email);
        if(emailc!=true) return res.status(417).json({success:false,status:417,msg:emailc});
        
        //if(req.body.password==null) return res.status(404).json({success:false,status:404,msg:'please enter pass'});
      
        const passc=passcheck(req.body.password);
        if(passc!=true) return res.status(417).json({success:false,status:417,msg:passc});
          
      //  if(req.body.conformpassword==null) return res.status(404).json({success:false,status:404,msg:'please enter conform password'});
        
        if(req.body.conformpassword!=req.body.password) return res.status(417).json({success:false,status:417,msg:'conform and  password doesn\'t match'});

       // if(req.body.mobile==null) return res.status(404).json({success:false,status:404,msg:'please enter mobile'});
        
       if(req.body.mobile.length!=10) return res.status(417).json({success:false,status:417,msg:'please enter 10 digit mobile no'})
       if(isNaN(req.body.mobile)) return res.status(417).json({success:false,status:417,msg:'your no contains characters'});
       const user=req.body;
       
       var userregister=await usermodel.find({email:user.email});
        
       if(userregister.length>0) return res.status(409).json({success:false,status:409,msg:'user already register'});
    var referalcodea=await genreferal();
    console.log(referalcodea);
         
        if(req.body.referal){
          console.log("yes in referal");
        const finduserbyreferal=await usermodel.findOne({referalcode:req.body.referal});
        console.log(finduserbyreferal);
          if(!finduserbyreferal) return res.status(417).json({status:false,msg:'don\'t able to verify otp'});
          const newuser=new usermodel({name:user.name,password:user.password,mobile:user.mobile,email:user.email,referalcode:referalcodea});
          var usersave=await newuser.save();
          if(!usersave) return res.status(417).json({success:false,msg:'failed to save details'});
       
          finduserbyreferal.joined.push(usersave._id);
          finduserbyreferal.balanceofcoin+=100;
          await finduserbyreferal.save();
       
        var response=await usermodel.findOne({_id:usersave._id},{ _id:0,name: 1, email: 1,mobile: 1,referalcode:1 });
        
        const tk=createtoken(usersave._id);
        res.json({success:true,status:200,data:{response,token:tk}});}
        else{
          const newuser=new usermodel({name:user.name,password:user.password,mobile:user.mobile,email:user.email,referalcode:referalcodea});
        var usersave=await newuser.save();
        var response=await usermodel.findOne({_id:usersave._id},{ _id:0,name: 1, email: 1,mobile: 1,referalcode:1 });
        if(!usersave) return res.status(417).json({success:false,msg:'failed to save details'});
       
          const tk=createtoken(usersave._id);
        res.json({success:true,status:200,data:{response,token:tk}});}
}

const referalhistory=async(req,res)=>{
  const userid=req.user[0]._id;
  const findusers=await usermodel.findById(userid)
  console.log(findusers);
  // res.json(findusers);
  const balance=findusers.balanceofcoin;
  if(findusers.joined.length==0)return res.json({success:true,msg:'sorry u havenot any referel coins',balance:{balance}})
  var username=[];
  var dateformate=[];
  var type='add';
 for (var i=0;i<findusers.joined.length;i++){
 // console.log("id is"+findusers.joined[i]);
 
    var userjoinedlist=await usermodel.findById(findusers.joined[i]);
      const date=userjoinedlist.createdAt.toLocaleDateString();
      const time=userjoinedlist.createdAt.toLocaleString({ timeZone: 'local' });
      console.log("date"+time);
      const monthnumber=date.split('/')[1];
    //  console.log(monthnumber);
      const monthName = new Date(Date.UTC(2023, monthnumber - 1)).toLocaleString('en-US', { month: 'long' });
 // console.log(monthName);
  const dateuser=date.split('/')[0];
const year=date.split('/')[2];
 dateformate.push(monthName+" "+dateuser+" "+year)
    username.push({name:userjoinedlist.name,at:dateformate[i],type:type,money:100});
    // username.push({});
    // username.push({});
    // finalarray.push(name:username.userjoinedlist)

    console.log(username);
 }

res.json({success:true,msg:'here is your details',data:{username,balance}});
}

const sendotp=async(req,res)=>{

  const {phone_no}=req.body;
 console.log("object");
  if(!phone_no) return res.status(417).json({success:false,msg:'please enter cell number'});

  if(isNaN(phone_no)) return res.status(417).json({success:false,msg:'please enter digits only'});

  if(phone_no.length!=10) return res.status(417).json({success:false,msg:'please enter 10 digit number'});

  //const finduser=await usermodel.find({mobile:no});
  // res.json(finduser.length);

 //if(finduser.length>0) return res.json({success:false,msg:'user already registered'});

  
  let otp="";
  for(i=0;i<=3;i++){
    otp+=Math.floor(Math.random() * 10);
  }
  // console.log(otp+no);
  const accountSid = process.env.SMS_KEY_ID;
  const authToken = process.env.SMS_AUTHTOKEN;
  const client = require('twilio')(accountSid, authToken);
  const msg=`your otp for verify your account is${otp} it's expires in 2 min`;
  const reciverno=`+91${phone_no}`;
  const sendmsg=await client.messages
      .create({
          body:msg,
                  to: reciverno,
                  from:process.env.SMS_FROMNO,
      }).catch(e=>{console.log("yes  "+e);});
       if(sendmsg){
        // const saveotp=await new otpmodel({no:no,otp:otp}).upsert();
        const updt = await otpmodel.updateOne(
          {no:phone_no},
          { $set: { otp:otp } },
          { upsert: true },
          {new:true}, // Make this update into an upsert
        );
        console.log(updt);
        // console.log(Date.now());
        res.status(200).json({success:true,msg:'otp sent successfully',data:phone_no});
      }
      else{
        res.json({success:true,msg:'error while generating otp'});
      }
}

const verifyotp=async(req,res)=>{
   const phone_no=req.body.phone_no;
   const otp=req.body.otp;
   console.log(!otp);
   //if(!phone_no||!otp) return res.json({success:false,msg:'please enter no and otp'});
 
  const verifyuser=await otpmodel.find({no:phone_no});
  console.log(verifyuser);
  if(!verifyuser.length>0) return res.status(417).json({success:false,msg:'please enter valid no'});
  
    time=verifyuser[0].updatedAt;
    console.log(time);
    const checklimit=otpexpires(time);
    console.log(checklimit);
    if(checklimit==false) return res.status(401).json({success:false,msg:'your otp has been expires'});
  // console.log(verifyuser[0].otp+" "+otp);
  if(verifyuser[0].otp!=otp) return res.status(417).json({success:false,data:'sorry your otp has not been matched'});

  const finduserid=await usermodel.find({mobile:phone_no})
  const tk=createtoken(finduserid[0]._id)
  console.log(finduserid[0]._id);
  return res.status(200).json({success:true,data:tk});
}

const login=async(req,res)=>{
    const user=req.body;
   
    if(!user.email&&!user.password) return res.json({success:false,status:417,msg:'please enter email and password'})
    if(!user.email) return res.status(417).json({success:false,status:417,msg:'please enter email'});
    const emailc=isemail(req.body.email);
    if(emailc!=true) return res.status(417).json({success:false,status:417,msg:emailc});
   
    if(!user.password) return res.status(404).json({success:false,status:404,msg:'please enter password'});

const userfind=await usermodel.find({email:user.email});
    if(userfind.length==0) return res.status(417).json({success:false,status:417,msg:'please signup'})

if(userfind.length>0&&userfind[0].password==user.password){
  var response=await usermodel.findOne({_id:userfind[0]._id},{ _id:0,name: 1, email: 1,mobile: 1,referalcode:1 });
        
  const token=createtoken(userfind[0]._id);
    res.json({success:true,status:200,data:{response,token:token}})
}
else{res.status(417).json({success:false,status:417,data:'sorry wrong password'});}
}

const forgotpassword=async(req,res)=>{
    if(!req.body.email) return res.status(417).json({success:false,status:417,msg:'please enter email'});
    const emailc=isemail(req.body.email);
    if(emailc!=true) return res.status(417).json({success:false,status:417,msg:emailc});
   
    var finduser=await usermodel.find({email:req.body.email})
    if(finduser.length>0){
        const gentoken=createtoken(finduser[0]._id);
        const link=`http://localhost:9898/api/v1/user/reset-password/:${finduser[0]._id}/${gentoken}`
        console.log(link);
        sendemail(req.body.email,link);
        res.status(200).json({success:true,msg:link});
    }
    else{
        res.status(417).json({success:false,status:417,msg:'usernot found'});
    }
}

const resetpass=async(req,res)=>{
if(!req.body.pass&&!req.body.conformpass) return res.json({success:false,status:404,msg:'please enter both password'})
     const userid=req.params.id.slice(1);
     const usertoken=req.params.token;

 
  if(userid!=null&&usertoken!=null){
     if(!req.body.pass) return res.json({success:false,status:404,msg:'please enter pass'});
     
     const passc=passcheck(req.body.pass);
     if(passc!=true) return res.status(417).json({success:false,status:417,msg:passc});
     if(!req.body.conformpass) return res.json({success:false,status:417,msg:'please enter conform pass'});
     if(req.body.pass===req.body.conformpass){
     const userupdate=await usermodel.findByIdAndUpdate(userid,{password:req.body.pass},{new:true}).catch((e)=>{console.log(e);});
     res.json({success:true,status:200,data:'password reset successfully'});}
     else res.json({success:false,status:417,msg:'password dont match'})
  }
  else{res.json({success:false,status:417,msg:'something went wrong'});}

}

const getmyprofile=async(req,res)=>{
    const profile=await usermodel.findOne({_id:req.user[0]._id},{email:1,mobile:1,address:1,city:1,pincode:1,referalcode:1,aadharcardback:1,aadharcardfront:1,pancard:1});
    //console.log(profile);
    var agnecydetails=await agency.findOne({uploadedby:profile._id},{name:1,number:1,email:1,address:1});
   // const vechile=await vechilemodel.find({uploadedby:profile._id});
   if(agnecydetails==null) agnecydetails='empty';
    res.json({success:true,status:200,data:{profile:profile,agnecydetails:agnecydetails}});    
}

const editprofile=async(req,res)=>{
    // res.json("hello world");
   // if (Object.keys(req.body).length === 0) return res.status(404).json({success:false,msg:'please enter all fields'});
    //console.log(req.user);
    if(req.body.mobile){
        if(isNaN(req.body.mobile)) return res.status(417).json({success:false,msg:'please enter no only'})
        if(req.body.mobile.length!=10) return res.status(417).json({success:flse,msg:'please enter no only'})
        console.log("in if");
        const user=req.body;
        const id=req.user[0]._id;
        // console.log(req.body);
      // const updateprofile=await usermodel.findByIdAndUpdate(id,{name:user.name,password:user.password,mobile:user.mobile,email:user.email});
       const updateprofile=await usermodel.findByIdAndUpdate(id,{$set:user},{new:true});
       res.json({success:true,status:200,data:'profile updated successfully'});
       console.log(updateprofile);
    }
   
        else if(req.body.email){
            const emailc=isemail(req.body.email);
            if(emailc!=true) return res.status(417).json({success:false,status:417,msg:emailc});
           
            console.log("in else");
            const user=req.body;
            const id=req.user[0]._id;
            console.log(user);
          // const updateprofile=await usermodel.findByIdAndUpdate(id,{name:user.name,password:user.password,mobile:user.mobile,email:user.email});
           const updateprofile=await usermodel.findByIdAndUpdate(id,{$set:user},{new:true});
           res.json({success:true,status:200,data:updateprofile})
    }
    else{
        console.log("in else");
        const user=req.body;
        const id=req.user[0]._id;
        console.log(user);
      // const updateprofile=await usermodel.findByIdAndUpdate(id,{name:user.name,password:user.password,mobile:user.mobile,email:user.email});
       const updateprofile=await usermodel.findByIdAndUpdate(id,{$set:user},{new:true});
       res.json({success:true,status:200,data:updateprofile})
   }
}

const changepass=async(req,res)=>{
    const prop=['oldpassword','newpassword','conformpassword'];
    const empty=[];
     for(var i=0;i<=prop.length;i++){
          if(req.body.hasOwnProperty(prop[i]))
          continue;
          else
          empty.push(prop[i]); 
     }
   //  console.log(empty);
     empty.pop(empty.length-1);
     const spcae="please enter field :"+empty.toString();
     if(empty.length!=0)return res.status(417).json({success:false,status:417,msg:spcae});
    
    //  console.log(req.user);
     if(req.body.oldpassword==req.user[0].password)
     {
      if(req.body.newpassword!==req.body.conformpassword) return res.status(417).json({success:false,msg:'newpassword and conform password don\'t match'})
        const passc=passcheck(req.body.newpassword);
     if(passc!=true) return res.status(417).json({success:false,status:417,msg:passc});
   
     if(req.body.newpassword!=req.body.conformpassword) return res.json({status:417,success:false,msg:'new and conform password doesn\'t match'})
    
     const updatepass=await usermodel.findByIdAndUpdate(req.user[0]._id,{$set:{password:req.body.newpassword}},{new:true});
        res.status(200).json({success:true,msg:'password changes successfully'});
    }
     else{
            res.json({status:417,success:false,msg:'your old password is wrong'});
     }
}

const alluser=async(req,res)=>{
  const alluser=await demomodel.find({isdeleted:false}).select('num');
  res.json(alluser);
}

const deleteusersoft=async(req,res)=>{
  const no=req.body.no;
  console.log(no);
  const checkuser=await demomodel.find({num:no});
  console.log(checkuser);
  if(!checkuser.length>0) return res.json({msg:'provide user not found'})
  const alluser=await demomodel.updateOne({num:no},{$set:{isdeleted:true}},{new:true});
  console.log(alluser);
  res.json({success:true,msg:'ok deleted user'});
}

const deleteduser=async(req,res)=>{
  const deleteuser=await demomodel.find({isdeleted:true});
  res.json(deleteuser);
}

const harddelete=async(req,res)=>{
  const no=req.body.no;
  console.log(no);
  const checkuser=await demomodel.find({num:no});
  console.log(checkuser);
  if(!checkuser.length>0) return res.json({msg:'provide user not found'})
  const alluser=await demomodel.deleteOne({num:no});
  console.log(alluser);
  res.json({success:true,msg:'ok deleted user'});
}

const createuserno=async(req,res)=>{
  // res.json('createuser');
  const no=req.body.no;
  console.log(no);
  const newno=new demomodel({num:no});
  console.log(newno);
  const saveno=await newno.save();
  console.log(saveno);
  res.json({success:true,msg:'data added successfully'});
}

const retriveruser=async(req,res)=>{
  const {no}=req.body;
  const finduser=await demomodel.find({num:no});
  
  if(!finduser.length>0) return res.json({msg:'provide user not found'});

  if(finduser.isdeleted==false) return res.json({msg:'sorry you can\'t retrive this user'});

  const retriveuser=await demomodel.updateOne({num:no},{$set:{isdeleted:false}},{new:true});
  res.json({msg:'user retrived successfully'});
}

module.exports={retriveruser,createuserno,alluser,deleteusersoft,harddelete,deleteduser,deleteuser,referalhistory,resetpasswordbymobile,forgotpasswordbymobile,verifyotp,signup,login,forgotpassword,resetpass,getmyprofile,editprofile,changepass,sendotp}