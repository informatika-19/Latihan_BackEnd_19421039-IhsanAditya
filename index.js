const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/latihan', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('berhasil connect ke database')
}).catch((e) => {
  console.log(e)
  console.log('gagal koneksi ke database')
})

app.use(bodyParser.json({
  extended: true,
  limit:'20mb'
}))

app.use(bodyParser.urlencoded({
  extended: true,
  limit:'20mb'
}))

app.get('/', (req, res) => {
    res.send('hello word')
  })

//app.get('/profile/:username/:id', (req, res) => {
//console.log(req.params)
//res.send('username anda' + req.params.username)
//})

app.use('/user', require('./routes/user'))
app.use('/kegiatan', require('./routes/kegiatan'))

  app.listen(3000, () =>{
      console.log('server started')
  })