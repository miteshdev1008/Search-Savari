const agnecyrouter=require('express').Router();
const {auth}=require('../middleware/auth');
const multer=require('multer');
const {addagency,addvechiledetails,editagnecy, vechilelist, adddriver, driverlist, editdriver, assigneddriver, addroute, getroute, editroute, deleteroute, editdocuments, deletedriver}=require('../controllers/agencycontroller')

const upload = multer({ dest: "public/files" });
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        if(file.mimtype==='image/png'||file.mimtype==='image/png')
        cb(null,'uploads');
        else
        cb(null,'pdf');
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split('/')[1];
        // console.log(ext);
        cb(null,file.fieldname+"-"+Date.now()+"."+ext);
        // console.log(file.mimetype);
    }
});
const uploadp=multer({
storage:storage,
}).fields([{name:'insurancepdf',maxCount:1},{name:'rcbookf',maxCount:1},{name:'rcbookb',maxCount:1},{name:'puc',maxCount:1},{name:'licencef',maxCount:1},{name:'insurancep',maxCount:1},{name:'vechilegalary',maxCount:15}])

const storagea=multer.diskStorage({
    destination:function(req,file,cb){
        
        cb(null,'uploads');
      
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split('/')[1];
        // console.log(ext);
        cb(null,file.fieldname+"-"+Date.now()+"."+ext);
    }
});
const uploadpa=multer({
storage:storagea,
}).fields([{name:'aadharcardfront',maxCount:1},{name:'aadharcardback',maxCount:1},{name:'pancard',maxCount:2}])



const storagedriv=multer.diskStorage({
    destination:function(req,file,cb){
       
        cb(null,'uploads');
       
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split('/')[1];
        // console.log(ext);
        cb(null,file.fieldname+"-"+Date.now()+"."+ext);
    }
});
const uploaddriver=multer({
storage:storagedriv,
}).fields([{name:'profilepic',maxCount:1},{name:'license',maxCount:1},{name:'aadharcardfront',maxCount:1},{name:'aadharcardback',maxCount:2}])


const storageregister=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads');
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split('/')[1];
        // console.log(ext);
        cb(null,file.fieldname+"-"+Date.now()+"."+ext);
    }
});

const uploadregister=multer({
    storage:storageregister,
    }).fields([{name:'registration_doc',maxCount:1}])
   
//foor editing driver
const storagedrive=multer.diskStorage({
    destination:function(req,file,cb){
       
        cb(null,'uploads');
       
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split('/')[1];
        // console.log(ext);
        cb(null,file.fieldname+"-"+Date.now()+"."+ext);
    }
});
const updatedriver=multer({
storage:storagedrive,
}).fields([{name:'license',maxCount:1},{name:'aadharcardfront',maxCount:1},{name:'aadharcardback',maxCount:2}])


agnecyrouter.post('/addagency-details', uploadregister,auth,addagency);

agnecyrouter.post('/addvechiledetails',uploadp,auth,addvechiledetails);

agnecyrouter.put('/editagency',auth,editagnecy);

agnecyrouter.get('/getvechile',auth,vechilelist);

agnecyrouter.get('/getdriver',auth,driverlist);

agnecyrouter.post('/adddriver',uploaddriver,auth,adddriver);

agnecyrouter.put('/editdriver',auth,editdriver);

agnecyrouter.post('/assigndriver',auth,assigneddriver);

agnecyrouter.post('/addroute',auth,addroute);

agnecyrouter.get('/getroute',auth,getroute);

agnecyrouter.put('/editroute',auth,editroute);

agnecyrouter.delete('/deleteroute',auth,deleteroute);

agnecyrouter.post('/editdocuments',updatedriver,auth,editdocuments);

 agnecyrouter.delete('/deletedriver',auth,deletedriver);

module.exports=agnecyrouter;