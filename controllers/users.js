const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
//const keys = require(/folder with keys atm .env)


//input validation
const validateRegister = require('./validation/register')
const validatorLogin = require('./validation/login')

//Load User model
const User = require('./controllers/users')

router.post('/register', (req, res) => {
    //Form validation

    const { error, isValid } = validateRegister(req.body)

    //Checks validation
    if (!isValid) {
        return res.status(400).json(errors)
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
