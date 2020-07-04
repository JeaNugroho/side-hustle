const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    description: {
        type: String,
        required: false
    },
    skills: {
        type: [String],
        required: false
    },
    address: {
        type: String,
        required: true
    },
    // location : {
    //     type: {
    //         type: String,
    //         enum: ["Point"],
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },
    // city: {
    //     type: String,
    //     required: true
    // },
    // state: {
    //     type: String,
    //     required: true
    // },
    social: {
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        youtube: {
            type: String
        },
        linkedin: {
            type: String
        }
    },
    rateroot: {
        ratings: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users"
                },
                rate: {
                    type: Number,
                    min: [1, "Min. Rating: 1"],
                    max: [5, "Max. Rating: 5"]
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        sum: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        },
        final: {
            type: Number,
            default: 0
        }
    }
    // date: {
    //     type: Date,
    //     default: Date.now
    // } 
    // profile pic, rating, reviews
});

module.exports = mongoose.model("profile", ProfileSchema);