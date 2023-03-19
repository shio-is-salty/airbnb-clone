const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs')
const app = express()
require('dotenv').config()
const User = require('./Models/User')

const bcryptSalt = bcrypt.genSaltSync(10) 
const jwtSecret = 'asdhqwiuhcznd124o124'

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}))
app.use('/uploads', express.static(__dirname+'/uploads'))

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
  res.json('test hakdog')
})

app.post('/register', async (req, res) => {
  const {name, email, password} = req.body

  try{
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(userDoc)
  }catch(e){
    res.status(422).json(e)
  }
})

app.post('/login', async (req, res) => {
  const {email, password} = req.body
  const userDoc = await User.findOne({email})

  if(!userDoc){
    res.status(422).json('not found')
    return
  }

  const passOk = bcrypt.compareSync(password, userDoc.password)

  if(!passOk){
    res.status(422).json('pass not ok')
    return
  }

  if(passOk){
    jwt.sign({email:userDoc.email,id:userDoc._id}, jwtSecret, {}, (err, token) => {
      if(err) throw err
      res.cookie('token', token).json(userDoc)
  })

  }


  })

app.get('/profile', (req, res) => {
  const {token} = req.cookies

  if(!token){
    res.json(null)
  }

  if(token){
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if(err) throw err
      const {name, email, id} = await User.findById(userData.id)
      res.json({name, email, id})
    })
  }
  
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
})

app.post('/upload-by-link', async (req, res) => {
  const {link} = req.body
  const newName = 'photo'+Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname+'/uploads/'+newName
  })

  res.json(newName)
})

const photosMiddleware = multer({dest: 'uploads/'}) 
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = []
  for (let i=0; i<req.files.length; i++){
    const {path, originalname} = req.files[i]
    const parts = originalname.split('.')
    const ext = parts[parts.length - 1]
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace('uploads/', ''))

  }
  res.json(uploadedFiles)
})
app.listen(4000, () => {
  console.log('listening at port 4000')
})

