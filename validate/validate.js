
const passcheck=(pass)=>{
        const count =new RegExp('(?=.{8,})');
        const numeric=new RegExp('(?=.*[0-9])');
        const uppercase=new RegExp('(?=.*[A-Z])');
        const lowercase=new RegExp('(?=.*[a-z])');
        const specialcase=new RegExp('(?=.*[!@#\$%\^&\*])');

        console.log(count.test(pass));

        if (!count.test(pass)) {
            return "Your password must be at least 8 characters"; 
        }
        if (!numeric.test(pass)) {
            console.log(yes);
            return "Your password must contain numeric.";
        }
        if (!uppercase.test(pass)) {
            return "Your password must uppercase."; 
        }
       if(!lowercase.test(pass))
        {
            return "your password contains lowercase"
        }
        
        if(!specialcase.test(pass)) return "your password contains specialcase"

        return true;    
}
const mobno=(no)=>{
    const numeric=new RegExp('(?=.*[0-9])');

    if(isNaN(no)) return "sorry your no contains charaters";

    if (!numeric.test(no)) {
        return "Your no must contain numeric.";
    }
    
    return true
}
const isemail=(email)=>{
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //return regex.test(email);
    if (!regex.test(email))   return "Your emali is not proper.";
    
    return true;
}

module.exports={isemail,mobno,passcheck}