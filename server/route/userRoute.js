const express = require("express")
const auth= require("../middlewares/auth.js")
const router = express.Router()
const User = require("../models/User")

router.get('/profile',auth,async(req,res)=>{
    try{
    const userdetail = await User.findById(req.user.id).select("-password")
    if(!userdetail){
        return res.status(404).json(
            {
                message:"user not found"
            }
        )
    }
    res.json({
        message:"user detail",
        userdetail
    })
    }
    catch(err){
      res.status(500).json({ error: err.message })
    }
    

    
})

router.put('/profile',auth,async(req,res)=>{
    try{
       const updates= req.body 
       const updateduser = await User.findByIdAndUpdate(req.user.id,updates,{new:true}).select("-password")
       res.json(updateduser)
    }catch(err){
        res.status(500).json({error:err.message})
    } 
})

router.delete('/profile',auth,async(req,res)=>{
     try{
       const id = req.body
       if(id==req.user.id){
       await User.findByIdAndDelete(req.user.id)
       res.json({message:"user account deleted"})
       }
       
     }
     catch(err){
       res.status(500).json({ error: err.message })
     }  
})

module.exports = router