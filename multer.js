const exp=require('express');
const app=exp();
const bp=require('body-parser');
const multer=require('multer')
// app.use(bp.json());
//  app.use(bp.urlencoded({extended:false}));

const storage=multer.diskStorage({
        destination:function(req,file,cb){
            if(file.mimtype==='image/png'||file.mimtype==='image/png')
            cb(null,'uploads');
            else
            cb(null,'pdf');
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"-"+Date.now()+".jpg");
        }
});

const upload=multer({
    storage:storage,
}).fields([{name:'insurancepdf',maxCount:1},{name:'rcbookf',maxCount:1},{name:'rcbookb',maxCount:1},{name:'puc',maxCount:1},{name:'licencef',maxCount:1},{name:'insurancep',maxCount:1},{name:'vechilegalary',maxCount:15}])

app.get('/',upload,(req,res)=>{

});
function otpexpires(generatedTime) {
    const currentTime = new Date();
    const timeDiff = currentTime - generatedTime;
    const timeDiffMinutes = Math.floor(timeDiff / 1000 / 60); // Convert milliseconds to minutes
    if (timeDiffMinutes >= 0 && timeDiffMinutes <= 2) {
        // OTP generated within 2 minutes
        const expirationTime = 2; // 2 minutes
        const otpExpiration = 2 * 60 * 1000; // Convert minutes to milliseconds
        const otpExpiresAt = generatedTime.getTime() + otpExpiration;
        if (currentTime.getTime() <= otpExpiresAt) {
          // OTP has not expired
          return true;
        }
      }
      return false;
    }
    // Example usage:
const otp = "123456"; // Example OTP
const generatedTime = new Date('2023-06-09T07:32:33.785+00:00'); // Example generated time

const isValid = otpexpires(generatedTime);
console.log(isValid);
    // isValid();
console.log("Is OTP valid?", isValid);

app.listen(773,()=>{
    //  const date='2023-06-05T09:43:51.760+00:00';
    // const newd=toLocaleDateString(date);
    // console.log(newd); 
    console.log(Date.now());
    console.log("app is live on 773");
});