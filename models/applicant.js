const mongoose=require('mongoose');

const candidateSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    resume:{
        type:String,
    },
    link:{
        type:String
    },
    position:{
        type:String,
    },
    qualification:{
        type:String,
    }
})

module.exports= mongoose.model("Candidate",candidateSchema);