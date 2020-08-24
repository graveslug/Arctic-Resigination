//==================
//  Dependencies  //
//==================
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const db = mongoose.connection
const bodyParser = require('body-parser')

//==================
//  Port          //
//==================
//Allow use of heroku's port or your own depending on the enviroment
const PORT = process.env.PORT || 3000

//==================
//  Database`     //
//==================
const mongoURI = process.env.MONGO_URI
//|| 'mongodb://localhost' + 'arcticresigination'

//mongodb connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

//checks error&&success
db.on('error', (err) => console.log(err.message + 'Is mongodb not running?'))
db.on('connected', ()=> console.log('Your mongod has connected'))
db.on('disconnected', ()=> console.log('Your mongod has disconnected'))

//opens connection to mongod
db.on('open', ()=>{})

//==================
//  Middleware    //
//==================
//bodyparser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//use public folder for static assests
app.use(express.static('public'))
// populates req.body with parsed info from forms. If no data comes from the forms it will return an empty object {}
//The extended: false does not allow nested objected in query strings
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
//allows for POST,PUT, and DELETE
app.use(methodOverride('_method'))

//==================
//  Controller    //
//==================
//calls for the vinylController
const vinylControl = require('./controllers/vinylController.js')
//sets vinyls as the ViewPath
app.use('/vinyls', vinylControl)


//==================
//  Listener      //
//==================
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
