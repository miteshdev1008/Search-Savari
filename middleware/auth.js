const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
require('dotenv').config('../.env');
const seckey=process.env.JWTSECKEY;
// console.log(seckey);
const usermodel=require('../models/usermodel');

const createtoken=(id)=>{
    return jwt.sign({id:id},seckey)
}

const sendemail=(email,link)=>{
    // var tk=token;
   
    //console.log(emails);
    //console.log(email+link+"in email");
    try{
        var transporter=  nodemailer.createTransport({
              host:process.env.MAIL_HOST,
              port:process.env.MAIL_PORT,
              auth:{
                  user:process.env.MAIL_USER,
                  pass:process.env.MAIL_PASSKEY,
              }
          });
          var mailoptions={
              from:process.env.MAIL_USER,
              to:email,
              subject:'reset password',
              html:link,
          }
          transporter.sendMail(mailoptions,(err,info)=>{
            if(err)console.log(err);
            else console.log(info);
          });
          res.json('please check your in bocx')
  }
  catch(e){return('sorry wrong number'+e)}
}

const auth=async(req,res,next)=>{
        if(!req.headers.authorization) return res.json({success:false,msg:'sorry u r not authorised to do so'});
        const token=req.headers.authorization.split(" ")[1];
        if(token){
            const decode=jwt.verify(token,seckey);
            console.log(decode);
            const id=decode.id;
            const user=await usermodel.find({_id:id});
            if(user.length>0) 
            {req.user=user;
            next();}
            else  res.status(417).json({success:false,msg:'please provide valid token'});
    }
    
    else{
        res.status(417).json({success:false,msg:'this route is protected please enter token '})
    }
}

const genreferal=async(req,res)=>{
    const LowerCaseAlphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const  UpperCaseAlphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

// const no=[1,2,3,4,5,6,7,8,9,0];
var referalcode='';
for (let i=0;i<=8;i++){
    if(i==0||i==1)
    {
            referalcode+=UpperCaseAlphabet[Math.floor(Math.random() * 10)];
          //  console.log(Math.rand()*10);
    }
    else
    {
        referalcode+=Math.floor(Math.random() * 10);
       // console.log(referalcode);
    }
}
return referalcode;
}

function otpexpires(generatedTime) {
    const currentTime = new Date();
    console.log("generated time is"+generatedTime);
    console.log("current time is"+currentTime);
    const timeDiff = currentTime - generatedTime;//Jun 10 2023 17:42:09 GMT+0530 (India Standard Time)
    //Sat Jun 10 2023 17:44:50 GMT+0530 (India Standard Time)
    console.log(timeDiff);
    const timeDiffMinutes = Math.floor(timeDiff / 1000 / 60); // Convert milliseconds to minutes
    console.log(timeDiffMinutes);
    if (timeDiffMinutes >= 0 && timeDiffMinutes <= 2.5) {
        // OTP generated within 2 minutes
        const otpExpiration = 2.5 * 60 * 1000; // Convert minutes to milliseconds
        console.log("is"+otpExpiration);
        const otpExpiresAt = generatedTime.getTime() + otpExpiration;
        console.log(otpExpiresAt);
        if (currentTime.getTime() <= otpExpiresAt) {
          // OTP has not expired
          return true;
        }
      }
      return false;
}

module.exports={otpexpires,genreferal,createtoken,sendemail,auth};