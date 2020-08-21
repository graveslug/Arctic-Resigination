//==================
//  Dependencies  //
//==================
const express = require('express')
const router = express.Router()
const Vinyl = require('../models/vinyl.js')


//==================
//  Routes        //
//==================

router.get('/', (req, res) => {
    res.redirect('/arcticresigination')
})

// INDEX
router.get('/arcticresigination', (req, res) => {
  // look up all the arcticresigination in the mongodb
  // send the arcticresigination to the Index view as a prop
  Vinyl.find({}, (error, allVinyls) => {
    if(allVinyls){
        res.render('vinyls/Index', {
          arcticresigination: allVinyls,
        })
    } else {
        console.log(err)
    }
  })
})

// NEW
router.get('/arcticresigination/new', (req, res) => {
  res.render('New')
})
// DESTROY
router.delete('/arcticresigination/:id', (req, res)=>{
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
router.put('/arcticresigination/:id', (req, res) => {
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
router.post('/arcticresigination', (req, res) => {
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
router.get('/arcticresigination/edit/:id', (req, res) => {
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
router.get('/arcticresigination/:id', (req, res) => {
  Vinyl.findById(req.params.id, (err, foundVinyl) => {
    res.render('Show', {
      vinyl: foundVinyl,
    })
  })
})

//export router
module.exports = router
