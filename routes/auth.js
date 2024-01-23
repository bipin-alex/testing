const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

// CREATE USER
router.post('/register',async (req,res)=>{
    try{
    //    const user = await User(req.body)
                    //OR
        const user = new User(
            {
                username : req.body.username,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10) 
            }
        )
        const save = await user.save()
        res.status(200).json(save)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.post('/login',async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        !user && res.status(400).json("user not found")
        console.log(user)
        const hashpassword = await bcrypt.compare(req.body.password,user.password)
        !hashpassword && res.status(400).json("password not matching")
        
        const {password, ...others} = user._doc
        res.status(200).json(others)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router