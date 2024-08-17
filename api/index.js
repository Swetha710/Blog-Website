const express=require('express');
const cors=require('cors');
const app=express();
const User = require('./models/User')
const bcrypt= require('bcryptjs')
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const upload=multer({dest:'uploads/'})
const fs= require('fs')
const Post = require('./models/Post')

const salt = bcrypt.genSaltSync(10)
const secret= 'abgdjiwyoyhbhbnx'

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname +'/uploads'))
 

app.post('/register',async (req,res)=>{
    const {username,password} = req.body;
    const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt)
    })
    res.json(userDoc);
})

app.post('/login',async (req,res)=>{
    const {username, password} = req.body;
    const userDoc = await User.findOne({username})
    const passok = bcrypt.compareSync(password, userDoc.password)
    if (passok){
        res.json(userDoc)}
    else {
            res.status(400).json('wrong credentials');
          }
})

app.get('/profile',(req,res)=>{
    res.json('ok')
});

app.post('/logout', (req,res) =>{
    res.cookie('token', '').json('ok')
})

app.post('/post', upload.single('file'), async(req,res)=>{
    const {originalname,path}=req.file
    const parts=originalname.split('.')
    const ext=parts[parts.length -1]
    const newPath=path+'.'+ext
    fs.renameSync(path,newPath)

    const {title,summary,content} = req.body
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover:newPath,
    })
    res.json(postDoc)
})

app.put('/post', upload.single('file'),async(req,res)=>{
    let newPath=null
    if (req.file){
        const {originalname,path}=req.file
        const parts=originalname.split('.')
        const ext=parts[parts.length -1]
        const newPath=path+'.'+ext
        fs.renameSync(path,newPath) 
    }
    const {id,title,summary,content} = req.body
    const postDoc = await Post.findById(id)
    await postDoc.updateOne({
        title,
        summary,
        content,
        cover:newPath ? newPath : postDoc.cover
    })
    res.json(postDoc)
})

app.get('/post', async(req,res)=>{
    const postDoc = await Post.find().sort({createdAt: -1}).limit(20)
    res.json(postDoc)
})

app.get('/post/:id', async(req,res)=>{
    const {id}=req.params
    const postDoc = await Post.findById(id)
    res.json(postDoc)
})
app.listen(4000,()=>{
    console.log("Port connected on 4000")
  });

//SKVarfikhrVvVbxS
//mongodb+srv://vswetha020:SKVarfikhrVvVbxS@cluster0.i8v5bai.mongodb.net/?retryWrites=true&w=majority