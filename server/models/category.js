const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: "Name is Required",
        minlength: [2,"Too short"],
        maxlength :[32 ,'Too long'],
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
},{timestapms: true,});

module.exports = mongoose.model('Category',categorySchema);