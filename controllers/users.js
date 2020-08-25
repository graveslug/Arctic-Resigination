const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const KEY = { secretOrKey: process.env.PASSPORT_SECRET_KEY }
const User = require('../models/user')

//input validation
const validateRegisterInput = require('../validation/register')
const validateLoginInputInput = require('../validation/login')

router.post('/register', (req, res) => {
    //Form validation

    const { error, isValid } = validateRegisterInput(req.body)

    //Checks validation
    if (!isValid) {
        return res.status(400).json(error)
    }

    User.findOne({ email : req.body.email }).then(user => {
        if (user) {
            return res.status(400)
            .json({
                email: 'Email exists'
            })
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
        //Has password before pushing to database
        bcrypt.genSalt(10, (error, salt) =>{
            bcrypt.hash(newUser.password, salt, (error, hash) =>{
                if (error) throw error
                newUser.password = hash
                newUser
                .save()
                .then(user => res.json(user))
                .catch(error => console.log(error))
            })
        })
        }
    })
})

router.post('/login', (req, res) => {
    //Form Validation
    const { error, isValid } = validateLoginInput(req.body)

    //check validation
    if (!isValid) {
        return res.status(400).json(error)
    }

    const email = req.body.email
    const password = req.body.password

    //find user by email
    User.findOne({ email }).then(user => {
        //checks if user exists
        if (!user) {
            return res.status(400).json({ emailNotFound : 'I can\'t find your email'
        })
        }
        //checks password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //User matched
                //create JWT payload
                const payload = {
                    id: user.id,
                    name: user.name
                }
                //sign token
                jwt.sign(
                    payload,
                    KEY.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (error, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                    }
                )
            } else {
                return res
                    .status(400)
                    .json({ passwordIncorrect: 'Passwords incorrect'})
            }
        })
    })
})

module.exports = router
