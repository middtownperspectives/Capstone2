const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    dominantHand: {
        type: String
    },
    location: {
        type: String
    },
    NTRP: {
        type: Number
    },
    strengths: {
        type: [String]
    },
    areasOfOpp: {
        type: [String]
    },
    tournaments: [
        {
            tournament: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            location: {
                type: String,
                required: true
            },
            score: {
                type: [String],
                required: true
            },
            partner: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        instagram: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);