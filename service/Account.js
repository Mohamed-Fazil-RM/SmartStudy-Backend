const GoogleUser = require("../models/GoogleUser")
const User = require("../models/User")


const getuserdata=async(email)=>{
    try {
        const googleuser= await GoogleUser.findOne({email})
        const emailuser=await  User.findOne({email})
        if(googleuser & !emailuser){
            return googleuser
        }
        else if(emailuser & !googleuser){
            return emailuser
        }
        else{
            return {message:"user not found"}
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getalluserdata=async()=>{
   try {
      const googleuser=await GoogleUser.find()
      const emailuser=await User.find()

      if( googleuser || emailuser){
         return {Users:[...googleuser,...emailuser]}
      }else{
        return {message:"User not found"}
      }
   } catch (error) {
      throw new Error(error)
   }
}

module.exports={getuserdata,getalluserdata}