const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}))

app.get('/test', (req, res) => {
  res.json('test hakdog')
})

app.post('/register', (req, res) => {
  const {name, email, password} = req.body
  res.json({name, email, password})
})

app.listen(4000, () => {
  console.log('listening at port 4000')
})
