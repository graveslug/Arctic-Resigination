const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateRegisterInput(data) {
    let error = {}

    //converts empty fields to an empty string so the validator properly works
    data.name = !isEmpty(data.name) ? data.name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    //Checks the name input
    if (Validator.isEmpty(data.name)) {
        error.name = 'Sorry, I didn\'t catch that name.'
    }

    // Checks the email input
    if (Validator.isEmpty(data.email)) {
        error.email = 'What was that email?'
    } else if (!Validator.isEmail(data.email)) {
        error.email = 'Never saw an email like that.'
    }

    //Checks the password
    if (Validator.isEmpty(data.password)) {
        error.password = 'You need a password.'
    }

    if (Validator.isEmpty(data.password2)) {
        error.password2 = 'Passwords are friends. You gotta declare both.'
    }

    if (!Validator.isLength(data.password, {min: 8, max: 30})) {
        error.password = 'Must be bigger than 8 yet less than 30.'
    }

    if (!Validator.equals(data.password, data.password2)) {
        error.password2 = 'Passwords are like mass-produced dumplings.'
    }
    //console.log(error)
    return {
        error,
        isValid: isEmpty(error)
    }

}
