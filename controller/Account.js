const Accountservice=require('../service/Account')

const getuserdetails=async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}

const getalluserdata=async(req,res,next)=>{
   try {
     const userdata=await Accountservice.getalluserdata()
     res.status(200).json(userdata)
   } catch (error) {
     console.log(error)
   }
}

module.exports={getuserdetails,getalluserdata}