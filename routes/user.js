const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')
const { json } = require('express')

// UPDATE USER
router.put('/update/:id',async (req,res)=>{
    console.log("userid",req.body.userId);
    console.log("paramsid",req.params.id);
    console.log("request",req.body)
    if(req.body.userId === req.params.id){
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            const {password, ...others} = updatedUser._doc
            res.status(200).json(others)
        }
        catch(err){
            res.status(300).json(err)
        }
    }
    else{
        res.status(400).json("invalid user")
    }
})

//DELETE USEWR AND HIS POSTS

router.delete('/delete/:id', async (req,res)=>{
    console.log(req.params.id)
    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id)
            console.log(user)
            try{
                await Post.deleteMany({username:user.username})
                const deletedUser = await User.findByIdAndDelete(req.params.id)
                res.status(200).json("user has been deleted")
            }
            catch(err){
                res.status(300).json(err)
            }

        }
        catch(err){
            res.status(400).json("user not found")
        }
    }
    else{
        res.status(400).json("invalid user")
    }
})

//GET USER

router.get('/find/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    }
    catch(err){
        res.status(400).json("user not found")
    }
})

module.exports = router