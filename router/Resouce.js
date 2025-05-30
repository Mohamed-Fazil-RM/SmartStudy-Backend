const express = require('express')
const { route } = require('./Login')
const Router = express.Router()

Router.route('/resouce/qp')
    .post((req,res)=>{
        res.json({message:'working properly'})
    })

Router.route('/resouce/notes')
    .post((req,res)=>{
       res.json({message:'working properly'})
    })



module.exports = Router