const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLogInput(data) {
    let errors = {};

    data.location = !isEmpty(data.location) ? data.location : '';
    data.sessionDate = !isEmpty(data.sessionDate) ? data.sessionDate : '';
    data.sessionType = !isEmpty(data.sessionType) ? data.sessionType : '';
    data.sessionFocus = !isEmpty(data.sessionFocus) ? data.sessionFocus : '';
    data.coach = !isEmpty(data.coach) ? data.coach : '';
    data.otherParticipants = !isEmpty(data.otherParticipants) ? data.otherParticipants : '';
    data.positiveTakeAways = !isEmpty(data.positiveTakeAways) ? data.positiveTakeAways : '';
    data.areasOfOpportunity = !isEmpty(data.areasOfOpportunity) ? data.areasOfOpportunity : '';

    if (!Validator.isLength(data.positiveTakeAways, { min: 10, max: 500 })) {
        errors.positiveTakeAways = 'This field must bebetween 10 and 500 characters.';
    }

    if (Validator.isEmpty(data.positiveTakeAways)) {
        errors.positiveTakeAways = 'Be Positive..something went right today!';
    }

    if (!Validator.isLength(data.areasOfOpportunity, { min: 10, max: 500 })) {
        errors.areasOfOpportunity = 'This field must bebetween 10 and 500 characters.';
    }

    if (Validator.isEmpty(data.areasOfOpportunity)) {
        errors.areasOfOpportunity = 'We all have something to work on my friend...';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
