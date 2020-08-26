//jw
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('User')
const KEY = { secretOrKey: process.env.PASSPORT_SECRET_KEY }

const opts = {}
//retrieves the 'Bearer' string
opts.jwtFromRequest =  ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = KEY.secretOrKey

module.exports = passport => {
    passport.use(
        //jwt_payload is sent to login endpoint (controllers/user.js)
        new JwtStrategy(opts, (jwt_payload, done) =>{
            User.findById(jwt_payload.id)
            .then(user =>{
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(error => console.log(error))
        })
    )
}
