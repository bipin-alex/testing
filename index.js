const express = require('express')
const app  = express()
const mongoose = require('mongoose')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const postRouter = require('./routes/post')
const categoryRouter = require('./routes/category')
const dotenv = require('dotenv')
const multer = require('multer')
const { diskStorage } = require('multer')
const cors = require('cors')
const path = require('path')

app.use(cors())
dotenv.config()
app.use("/images", express.static(path.join(__dirname,"/images")))

mongoose.connect('mongodb://localhost:27017/blog').then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
})

const storage = diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    }
    
})

const uploads = multer({storage:storage})
app.use("/api/upload",uploads.single('file'),(req,res)=>{
    console.log("files",req.files)
    res.status(200).json("file has been uploaded")
})


app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/category', categoryRouter)

app.listen(5000, ()=>{
    console.log('listening at port 5000')
})