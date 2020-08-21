//==================
//  Dependencies  //
//==================
const express = require('express')
const router = express.Router()
const Vinyl = require('../models/vinyl.js')


//==================
//  Routes        //
//==================

// router.get('/', (req, res) => {
//     res.redirect('/vinyls')
// })

// INDEX
router.get('/', (req, res) => {
  // look up all the vinyls in the mongodb
  // send the vinyls to the Index view as a prop
  Vinyl.find({}, (error, allVinyls) => {
    if(allVinyls){
        res.render('./vinyl/Index', {
          vinyl: allVinyls,
        })
    } else {
        console.log(err)
    }
  })
})

// NEW
router.get('/records/new', (req, res) => {
  res.render('./vinyl/New')
})

// DESTROY
router.delete('/records/:id', (req, res)=>{
    Vinyl.remove({_id: req.params.id}, (error, deletedVinyl)=>{
        if (deletedVinyl) {
            console.log(deletedVinyl)
        } else {
            console.log(error)
        }
        res.redirect('/records')
    })
})

//UPDATE
router.put('/records/:id', (req, res) => {
    Vinyl.findByIdAndUpdate({_id: req.params.id}, {...req.body}, (error, updatedVinyl) => {
        if (updatedVinyl) {
            console.log(updatedVinyl)
        } else {
            console.log(error)
        }
        res.redirect("/records")
    })
})

// CREATE
router.post('/records', (req, res) => {
  // console.log(req.body)

  if (req.body.inStock === 'on') {
    req.body.inStock = true
  } else {
    req.body.inStock = false
  }
  Vinyl.create(req.body, (error, createdVinyl) => {
console.log(error)
    res.redirect('/records')
  })
})

//EDIT
//Can't edit the page as it redirects to itself.
router.get('/records/edit/:id', (req, res) => {
    Vinyl.findById(req.params._d, (error, vinyl) => {
        if (vinyl) {
            console.log(vinyl)
            res.render('./vinyl/Edit', {
                vinyl: vinyl
            })
        } else {
            console.log(error)
        }
    })
})

// SHOW
router.get('/records/:id', (req, res) => {
  Vinyl.findById(req.params.id, (err, foundVinyl) => {
      console.log(Vinyl)
    res.render('vinyl/Show', {
      vinyl: foundVinyl,
    })
  })
})

//export router
module.exports = router
