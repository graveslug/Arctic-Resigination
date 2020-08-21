//==================
//  Dependencies  //
//==================
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const db = mongoose.connection

//==================
//  Port          //
//==================
//Allow use of Keroku's port or your own depending on the enviroment
const PORT = process.env.PORT || 3000

//==================
//  Database`     //
//==================
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost' + 'arcticresigination'

//mongodb connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

//checks error&&success
db.on('error', (err) => console.log(err.message + 'Is mongodb not running?'))
db.on('connected', ()=> console.log('mongod connected'))
db.on('disconnected', ()=> console.log('mongo disconnected'))

//opens connection to mongod
db.on('open', ()=>{})

//==================
//  Middleware    //
//==================
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
//  Routes        //
//==================
//idk what this was for.
const Vinyl = require('./models/vinyl.js')

app.get('/', (req, res) => {
    res.redirect('/arcticresigination')
})

// INDEX
app.get('/arcticresigination', (req, res) => {
  // look up all the arcticresigination in the mongodb
  // send the arcticresigination to the Index view as a prop
  Vinyl.find({}, (error, allVinyls) => {
    if(allVinyls){
        res.render('Index', {
          arcticresigination: allVinyls,
        })
    } else {
        console.log(err)
    }
  })
})

// NEW
app.get('/arcticresigination/new', (req, res) => {
  res.render('New')
})
// DESTROY
app.delete('/arcticresigination/:id', (req, res)=>{
    Vinyl.remove({_id: req.params.id}, (error, deletedVinyl)=>{
        if (deletedVinyl) {
            console.log(deletedVinyl)
        } else {
            console.log(error)
        }
        res.redirect('/arcticresigination')
    })
})

//UPDATE
app.put('/arcticresigination/:id', (req, res) => {
    Vinyl.findByIdAndUpdate({_id: req.params.id}, {...req.body}, (error, updatedVinyl) => {
        if (updatedVinyl) {
            console.log(updatedVinyl)
        } else {
            console.log(error)
        }
        res.redirect("/vinyls")
    })
})

// CREATE
app.post('/arcticresigination', (req, res) => {
  // console.log(req.body)

  if (req.body.inStock === 'on') {
    req.body.inStock = true
  } else {
    req.body.inStock = false
  }
  Vinyl.create(req.body, (error, createdVinyl) => {
console.log(error)
    res.redirect('/arcticresigination')
  })
})

//EDIT
//Can't edit the page as it redirects to itself.
app.get('/arcticresigination/edit/:id', (req, res) => {
    Vinyl.findById(req.params._d, (error, vinyl) => {
        if (vinyl) {
            console.log(vinyl)
            res.render('Edit', {
                vinyl: vinyl
            })
        } else {
            console.log(error)
        }
    })
})

// SHOW
app.get('/arcticresigination/:id', (req, res) => {
  Vinyl.findById(req.params.id, (err, foundVinyl) => {
    res.render('Show', {
      vinyl: foundVinyl,
    })
  })
})


//==================
//  Listener      //
//==================
app.listen(PORT, () => {
  console.log('listening on port:', PORT)
})
