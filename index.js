const exp=require('express');

const app=exp();
const bp=require('body-parser');
const dotenv=require('dotenv').config('./env');
// app.use('./dbo');
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
const port=process.env.PORT||9898;
app.use('/api/v1/user',require('./routes/userroutes'));
app.use('/api/v1/agnecy',require('./routes/agency'));
app.all('*',(req,res)=>{
    res.json('sorry wrong route')
});
// console.log(process.env.PORT);
app.listen(port,()=>{
    console.log("app is live on "+port);
});