const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Post = require('../models/Post')

// CREATE POST
router.post('/',async (req,res)=>{
    console.log("request",req.body)
    const post = new Post(req.body)
    console.log("post",post)
    try{
        const savedPost = await post.save()
        console.log("saveed user >>>>",savedPost)
        res.status(200).json(savedPost)
    }
    catch(err){
        console.log("error",err)
        res.status(300).json(err)
    }
})

// UPDATE POST

router.put('/update/:id',async (req,res)=>{
    // console.log(req.body)
    try{
        const post = await Post.findById(req.params.id)
        // console.log(post)
        if(post.username === req.body.username){
            try{
                const username = await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
                res.status(200).json(username)
                console.log(username)
            }
            catch(err){
                res.status(300).json("can't update post")
            }
        }
        else{
            res.status(300).json("you can delete only your post")
        }
    }
    catch(err){
        res.status(300).json("post not found")
    }
})

//DELETE POSTS

router.delete('/delete/:id',async (req,res)=>{
   console.log("delete>>>",req.body)
    try{
        const post = await Post.findById(req.params.id)
        console.log(post)
        if(post.username === req.body.username){
            try{
                const username = await Post.findByIdAndDelete(req.params.id)
                res.status(200).json(username)

            }
            catch(err){
                res.status(300).json("can't delete post")
            }
        }
        else{
            res.status(300).json("you can delete only your post")
        }
    }
    catch(err){
        res.status(300).json("post not found")
    }
})

//GET POST

router.get('/find/:id', async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        
        res.status(200).json(post)
    }
    catch(err){
        res.status(400).json("user not found")
    }
})

// GET POST DATA USING QUERY

router.get('/get', async (req,res)=>{
    const username = req.query.user
    const cateName = req.query.category
    try{
        let data
        if(username){
            data =  await Post.find({username:username})
            
        }else if(cateName){
           data = await Post.find({categories:{$in:[cateName]}})
            

        }
        else{
            data = await Post.find()
            
        }
        res.status(200).json(data)
    }
    catch(err){
        res.status(300).json(err)
    }
})

module.exports = router