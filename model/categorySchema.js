const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    Category_name: {
        type: String,
        required: true
    }



}, { timestamps: true })


module.exports = mongoose.model('category', schema)