const express=require("express")
const Router=express.Router()
const Accountcontrol=require('../controller/Account')

Router.route('/user/profile/:email').get(Accountcontrol.getuserdetails)

Router.route('/admin/userdata').get(Accountcontrol.getalluserdata)

module.exports=Router