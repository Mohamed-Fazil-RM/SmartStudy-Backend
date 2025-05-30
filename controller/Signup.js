const signupservice=require('../service/Signup')

const Signup=async(req,res,next)=>{
    try {
        const reqdata=req?.body
        
        const user=await signupservice.Signup(reqdata.email,reqdata.password)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}

module.exports={Signup}