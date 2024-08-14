const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true
    },
    isBlocked: { 
        type: Boolean, 
        default: false },
    }, 
    { timestamps: true })
module.exports = mongoose.model('user', schema)