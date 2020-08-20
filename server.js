const express = require('express')
const app = express()

const mongoose = require('mongoose')

const mongoURI = 



mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

const Product = require('./models/product.js')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// INDEX
app.get('/arcticresigination', (req, res) => {
  // look up all the arcticresigination in the mongodb
  // send the arcticresigination to the Index view as a prop
  Product.find({}, (error, allProducts) => {
    if(allProducts){
        res.render('Index', {
          arcticresigination: allProducts,
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
    Product.remove({_id: req.params.id}, (error, deletedProduct)=>{
        if (deletedProduct) {
            console.log(deletedProduct)
        } else {
            console.log(error)
        }
        res.redirect('/arcticresigination')
    })
})

//UPDATE
app.put('/arcticresigination/:id', (req, res) => {
    Product.findByIdAndUpdate({_id: req.params.id}, {...req.body}, (error, updatedProduct) => {
        if (updatedProduct) {
            console.log(updatedProduct)
        } else {
            console.log(error)
        }
        res.redirect("/products")
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
  Product.create(req.body, (error, createdProduct) => {

    res.redirect('/arcticresigination')
  })
})

//EDIT
//Can't edit the page as it redirects to itself.
app.get('/arcticresigination/edit/:id', (req, res) => {
    Product.findById(req.params._d, (error, product) => {
        if (product) {
            console.log(product)
            res.render('Edit', {
                product: product
            })
        } else {
            console.log(error)
        }
    })
})

// SHOW
app.get('/arcticresigination/:id', (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render('Show', {
      product: foundProduct,
    })
  })
})

app.listen(3000, () => {
  console.log('listening')
})
