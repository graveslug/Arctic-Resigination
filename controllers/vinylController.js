const Vinyl = require('../models/vinyl.js')
const router = require('./restController/js')({
    Model: Vinyl,
    ViewPath: 'vinyl',
    Router: require('express').Router(),
    booleanKey: ['inStock']
})
//export router
module.exports = router

//==================
//  Dependencies  //
//==================
// const express = require('express')
// const router = express.Router()
// const Vinyl = require('../models/vinyl.js')
//

// //==================
// //  Routes        //
// //==================
//
//
// // INDEX
// router.get('/', (req, res) => {
//   // look up all the vinyls in the mongodb
//   // send the vinyls to the Index view as a prop
//   Vinyl.find({}, (error, allVinyls) => {
//     if(allVinyls){
//         res.render('vinyl/Index', {
//           vinyl: allVinyls,
//         })
//     } else {
//         console.log('index route:' +error.message)
//     }
//   })
// })
//
// // NEW
// router.get('/new', (req, res) => {
//   res.render('vinyl/New')
// })
//
// // DESTROY
// router.delete('/:id', (req, res)=>{
//     Vinyl.remove({_id: req.params.id}, (error, deletedVinyl)=>{
//         if (deletedVinyl) {
//             console.log(deletedVinyl)
//         } else {
//             console.log('destroy route:' + error.message)
//         }
//         res.redirect('/records')
//     })
// })
//
// //UPDATE
// router.put('/:id', (req, res) => {
//     Vinyl.findByIdAndUpdate({_id: req.params.id}, {...req.body}, (error, updatedVinyl) => {
//         if (updatedVinyl) {
//             console.log(updatedVinyl)
//         } else {
//             console.log('update route:' + error.message)
//         }
//         res.redirect("/records")
//     })
// })
//
// // CREATE
// router.post('/', (req, res) => {
//   // console.log(req.body)
//
//   if (req.body.inStock === 'on') {
//     req.body.inStock = true
//   } else {
//     req.body.inStock = false
//   }
//   Vinyl.create(req.body, (error, createdVinyl) => {
//       error ? res.send('create route:' + error.message) : res.redirect('/records')
//   })
// })
//
// //EDIT
// router.get('/:id/edit', (req, res) => {
//     Vinyl.findById(req.params.id, (error, vinyl) => {
//         if (vinyl) {
//             console.log(vinyl)
//             res.render('vinyl/Edit', {
//                 vinyl: vinyl
//             })
//         } else {
//             console.log('edit route:' + error.message)
//         }
//     })
// })
//
// // SHOW
// router.get('/:id', (req, res) => {
//     console.log(req.params.id)
//   Vinyl.findById(req.params.id, (error, foundVinyl) => {
//       if(error) {
//           console.log('show route:' + error.message)
//           res.sendStatus(500)
//       } else {
//     res.render('vinyl/Show', {
//       vinyl: foundVinyl,
//     })
// }
//   })
// })
//
// //export router
// module.exports = router
