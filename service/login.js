const GoogleUser = require('../models/GoogleUser')

const User=require('../models/User')

 const emaillogin=async(password,email)=>{
    try {
        let userdb=await User.findOne({email})

        if(!userdb){
            return {message:'User Not Found'}
        }
        else{
            if(userdb.password === password){
            return userdb
            }
            else{
           return {message:'incorrect Password'}
            }
            
        }
    } catch (error) {
        throw new Error(error)
    }
}

 const googlelogin=async( email,googleid )=>{
   try {
     let userdb=await GoogleUser.findOne({email})
     if(!userdb){
        const googleUser= new GoogleUser({email,googleId:googleid,Userdata:{}})
        await googleUser.save()
        return {message:'login successfuly',newuser:true}
     }
     else{
       if(userdb.googleId===googleid){
           return {message:'login successfuly',newuser:false,user:userdb}
       }
       return {message:'error'}
     }
   } catch (error) {
       throw new Error(error)
   }
}

module.exports={emaillogin,googlelogin}