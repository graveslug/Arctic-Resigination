const Validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validatorLogin(data) {
    let errors = {}

    //convert empty fields to an empty string so we use the validator properly
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    // Checks the email
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Almost had it! Try again.'
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Are you sure that is your email?'
    }

    // Password Checks
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Its your secret. Do you remember it?'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
