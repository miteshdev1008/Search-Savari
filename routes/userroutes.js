const userrouter=require('express').Router();
// const usermodel=require('../models/usermodel');
// const randomstring=require('randomstring');
// const jwt=require('jsonwebtoken');
// const nodemailer=require('nodemailer');
// const {verifytoken}=require('../mid/mid');
const {auth}=require('../middleware/auth');
const {deleteuser,signup,login,forgotpassword,resetpass,getmyprofile, editprofile, changepass, sendotp, verifyotp, forgotpasswordbymobile, resetpasswordbymobile, referalhistory, alluser, deleteusersoft, softdeleteduser, harddelete, createuserno, deleteduser}=require('../controllers/usercntrl');


//userrouter.get('/',(req,res)=>{res.json("hello")})

userrouter.post('/signup',signup);

userrouter.post('/forgot-password',forgotpassword);

userrouter.post('/reset-password/:id/:token',resetpass);

userrouter.post('/login',login);

userrouter.get('/getmyprofile',auth,getmyprofile);

userrouter.put('/editprofile',auth,editprofile);

// userrouter.put('/editprofile');

userrouter.post('/changepassword',auth,changepass);

userrouter.post('/sendotp',sendotp);

userrouter.post('/verifyotp',verifyotp);

userrouter.post('/referalhistory',auth,referalhistory);

userrouter.post('/forgotpasswordbymobile',auth,forgotpasswordbymobile);

userrouter.post('/resetpasswordbymobile',auth,resetpasswordbymobile);

userrouter.delete('/deleteuser',auth,deleteuser);

userrouter.get('/alluser',alluser);
userrouter.put('/deleteusersoft',deleteusersoft);
userrouter.get('/softdeleteduser',deleteduser);
userrouter.delete('/deletehard',harddelete);
userrouter.post('/createuser',createuserno);
module.exports=userrouter;