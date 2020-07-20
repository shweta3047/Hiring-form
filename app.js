const express=require('express');
const app=express();
const PORT=process.env.PORT || 3000;
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const formRoute=require('./routes/form');
const {MONGOURI}=require('./config/keys');

mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology: true})
mongoose.connection.on('connected',()=>{
    console.log('Database connected!!')
})
mongoose.connection.on('error',(err)=>{
    console.log('error in connecting to database ',err)
})

app.use(express.static(__dirname + '/public'));
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit : '1mb'}))

app.use(formRoute);

app.listen(PORT,()=>{
    console.log("Server is listening!")
})