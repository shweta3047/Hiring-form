const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const multer=require('multer');
const {URI}=require("../config/keys");
const Candidate=require('../models/applicant');

const storage = multer.diskStorage({
    destination: (req, file, next)=> {
     next(null, "./public/upload")
    },
    filename: function (req, file, next) {
      next(null, file.fieldname + '-' + Date.now() )
    }
  })
const upload = multer({ 
    storage: storage ,
    preservePath : true
})

router.get("/hiring-form",(req,res)=>{
    res.render("form",{message : null});
})

router.get("/form-submitted",(req,res)=>{
    res.render("form-submitted")
})

router.post("/hiring-form",upload.single('resume'),async(req,res)=>{
    const {name,email,position,qualification}=req.body;
    const candidate={
        name:name,email:email,resume:`${URI}/upload/${req.file.filename} `,position:position,qualification:qualification
    }
   try{
       const alreadyCandidate=await Candidate.findOne({email:email})
       if(alreadyCandidate){
           res.render("form",{message:"Candidature with this email is already present!"})
       }
       else{
           Candidate.create(candidate,(err,candidate)=>{
               if(err)
               {
                console.log(err);
                res.send("Something went wrong! Try again")
               }
               else
               res.redirect('/form-submitted')
           })
       }
   }catch(err){
       console.log(err);
       res.send("Something went wrong! Try again")
   }
})

router.get("*",(req,res)=>{
    res.redirect("/hiring-form");
})

module.exports=router;
