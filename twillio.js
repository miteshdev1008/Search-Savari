const digits="0123456789";
  let otp="";
  for(i=0;i<=3;i++){
    otp+=digits[Math.floor(Math.random() * 10)];
  }
  console.log(otp);