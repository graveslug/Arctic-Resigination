const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const KEY = { secretOrKey: process.env.PASSPORT_SECRET_KEY }//What secrets do you hold?
const User = require('../models/user')

//input validation routes
const validateRegisterInput = require('../validation/register')
const validateLoginInputInput = require('../validation/login')

//registration route that is seprerated from the main routes.
router.post('/register', (req, res) => {
    //Form validation
    //retrieves the error and isValid variables from the validateRegisterInput function
    const { error, isValid } = validateRegisterInput(req.body)

    //Checks validation
    if (!isValid) {
        //if not isValid then error out with a badsyntax error.
        return res.status(400).json(error)
    }

    User.findOne({ email : req.body.email }).then(user => {
        if (user) {
            return res.status(400)
            .json({
                email: 'Email already exists'
            })
        } else {
            //if all passes then creates a new user preparing the data into the schema through the defined framework.
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
        //Hash password before pushing to database
        bcrypt.genSalt(10, (error, salt) =>{
            //takes the newUser variable and password and hashes it, applies the salt
            bcrypt.hash(newUser.password, salt, (error, hash) =>{
                if (error) throw error
                //we assign a "new" password that is made out of the hash/genSalt
                newUser.password = hash
                //save it
                newUser
                .save()
                .then(user => res.json(user))
                //just in case it errors out it can catch it and send that error over
                .catch(error => console.log(error))
            })
        })
        }
    })
})

//login route seperated from the main servers.
router.post('/login', (req, res) => {
    //Takes the validateLoginInput variable and applies it as an error, isValid
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
        //compares passwords.
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {

                //create JWT payload that is of the users id and their name. Though I think the use of user.id might be a security flaw. I will have to look into this further.
                const payload = {
                    id: user.id,
                    name: user.name
                }
                //Signs the authetication token for the user to use their account with the privilages assigned to them using the HS256 algorithm
                jwt.sign(
                    //generates string section two based on payload
                    payload,
                    //generates 3rd part of the string based on my key
                    KEY.secretOrKey,
                    {
                        //when the token expires. I'm not sure what best practice is.
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (error, token) => {
                        //successful
                        res.json({
                            success: true,
                            //assigns Bearer to the token.
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
