const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const LogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    date: {
        type: Date,
        default: Date.now
    },

    location: {
        type: String
    },

    sessionDate: {
        type: String
    },

    sessionType: {
        type: String
    },

    coach: {
        type: String
    },

    sessionFocus: {
        type: String
    },

    otherParticipants: {
        type: String,
    },

    positiveTakeAways: {
        type: String,
        required: true
    },

    areasOfOpportunity: {
        type: String,
        required: true
    }
});

module.exports = Log = mongoose.model('log', LogSchema);
