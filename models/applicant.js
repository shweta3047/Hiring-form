const mongoose=require('mongoose');

const candidateSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    resume:{
        type:String,
    },
    link:{
        type:String
    },
    position:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model("Candidate",candidateSchema);