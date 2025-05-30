const { Schema } = require('mongoose')
const mongoose=require('../config/Mongodb_config')


const NotesSchema=new Schema({
    Sub_name:{type:String,required:true},
    Sub_code:{type:String,required:true},
    File_name:{type:String,required:true},
    Issue_date:{type:Date,required:true},
    Sem_month_year:{type:String,required:true},
    College_name:{type:String,required:true}
})

module.exports=mongoose.model("Notes",NotesSchema)