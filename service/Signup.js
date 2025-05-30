const GoogleUser = require("../models/GoogleUser")
const User = require("../models/User")

const Signup=async(email,password)=>{
    try {
        const data=await User.findOne({email})
        const gdata=await GoogleUser.findOne({email})
        if(data || gdata){
            return {message:"email is already used"}
        }else if(!data & !gdata){
            const neswuaer=new User({email,password,Userdata:{}})
            await neswuaer.save()
            return {message:"User Created Successfuly"}
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports={Signup}