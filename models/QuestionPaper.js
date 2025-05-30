const { Schema } = require('mongoose')
const mongoose=require('../config/Mongodb_config')

const QuestionSchema=new Schema({
    sub_name:{type:String ,required:true},
    Sub_code:{type:String ,required:true },
    File_name:{type:String ,require:true},
    Issu_date:{type:Date ,require},
    Sem_month_year:{type:String ,required:true},
    College_name:{type:String,require:true}
})

module.exports=mongoose.model("QuestionPaper",QuestionSchema)