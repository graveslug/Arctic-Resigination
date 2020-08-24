const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
// const keys = require('//folder for keys')

const opts = {}
opts.jwtFromRequest =  ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
    passport.use(
        //jwt_payload is sent to login endpoint
        new JwtStrategy(opts, (jwt_payload, done) =>{
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
