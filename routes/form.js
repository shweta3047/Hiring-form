const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Candidate=require('../models/applicant');

router.get("/hiring-form",(req,res)=>{
    res.render("form");
})

router.post("/hiring-form",async(req,res)=>{
    const {name,email,resume,position,link,qualification}=req.body;
    const candidate={
        name,email,resume,position,link,qualification
    }
   try{
       const alreadyCandidate=await Candidate.findOne({email:email}).exec();
       if(alreadyCandidate){
           res.render("form",{message:"Candidature with this email is already present!"})
       }
       else{
           Candidate.create(candidate,(err,res)=>{
               if(err)
               {
                console.log(err);
                res.send("Something went wrong! Try again")
               }
               else
               res.render("form-submitted");
           })
       }
   }catch(err){
       console.log(err);
       res.send("Something went wrong! Try again")
   }
})


module.exports=router;
