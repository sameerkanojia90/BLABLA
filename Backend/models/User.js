const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: Number,
        require: true,


    },
    profilePic: {
        type: String,
        default: ""
    },
    resetpassword: {
        type: String,
        default: ""
    },
    expirepassword: {
        type: Date,
        default: Date.now

    },


    cardetails: {
        carName: {
            type: String,
            required: true
        },
        carNumber: {
            type: String,
            required: true
        }
    },
    ratingOverall: {
        type: String,
        required: true,
    },




}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);