const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//const keys = require(/folder with keys atm .env)


//input validation
const validateRegister = require('./validation/register')
const validateLogin = require('./validation/login')

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

router.post('/login', (req, res) => {
    //Form Validation
    const { errors, isValid } = validateLogin(req.body)

    //check validation
    if (!isValid) {
        return res.status(400).json(errors)
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
                    keys.secretOrKey,
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
