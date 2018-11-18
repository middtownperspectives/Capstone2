const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTournementInput(data) {
    let errors = {};


    data.tournament = !isEmpty(data.tournament) ? data.tournament : '';
    data.date = !isEmpty(data.date) ? data.date : '';
    data.location = !isEmpty(data.location) ? data.location : '';
    data.score = !isEmpty(data.score) ? data.score : '';
    data.partner = !isEmpty(data.partner) ? data.partner : '';


    if (!Validator.isEmpty(data.tournament)) {
        errors.tournament = 'tournament field is required';
    }
    if (!Validator.isEmpty(data.date)) {
        errors.date = 'date field is required';
    }
    if (!Validator.isEmpty(data.location)) {
        errors.location = 'location field is required';
    }
    if (!Validator.isEmpty(data.score)) {
        errors.score = 'score field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}