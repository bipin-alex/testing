const express = require('express')
const router = express.Router()

const Category = require('../models/Category')

// CREATE POST
router.post('/',async (req,res)=>{
    const category = new Category(req.body)
    try{
        const savedcategory = await category.save()
        console.log("saveed user >>>>",savedcategory)
        res.status(200).json(savedcategory)
    }
    catch(err){
        res.status(300).json(err)
    }
})



//GET Category

router.get('/find', async (req,res)=>{
    try{
        const category = await Category.find()
        
        res.status(200).json(category)
    }
    catch(err){
        res.status(400).json("user not found")
    }
})





module.exports = router