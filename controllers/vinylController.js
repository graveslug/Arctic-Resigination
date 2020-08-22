//==================
//  Dependencies  //
//==================
const express = require('express')
const router = express.Router()
const Vinyl = require('../models/vinyl.js')


//==================
//  Routes        //
//==================
//
// router.get('/', (req, res) => {
//     res.redirect('/records')
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
router.get('/new', (req, res) => {
  res.render('./vinyl/New')
})

// DESTROY
router.delete('/:id', (req, res)=>{
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
router.put('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
router.get('/edit/:id', (req, res) => {
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
router.get('/:id', (req, res) => {
    console.log(req.params.id)
  Vinyl.findById(req.params.id, (err, foundVinyl) => {
      if(err) {
          console.log('There was an error')
          res.sendStatus(500)
      } else {
    res.render('vinyl/Show', {
      vinyl: foundVinyl,
    })
}
  })
})

//export router
module.exports = router
