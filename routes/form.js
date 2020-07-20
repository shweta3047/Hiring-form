const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Candidate=require('../models/applicant');

router.get("/hiring-form",(req,res)=>{
    res.render("form",{message : null});
})

router.get("/form-submitted",(req,res)=>{
    res.render("form-submitted")
})

router.post("/hiring-form",async(req,res)=>{
    const {name,email,resume,link,position,qualification}=req.body;
    const candidate={
        name:name,email:email,resume:resume,position:position,link:link,qualification:qualification
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
       res.send("Something went wrong in catch! Try again")
   }
})

router.get("*",(req,res)=>{
    res.redirect("/hiring-form");
})

module.exports=router;
