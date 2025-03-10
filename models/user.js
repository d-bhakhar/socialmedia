const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id :{
        type: Number,
        unique: true,
        required: true,
    },
    name :{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilepicture :{
        type : String,
        required: false,
    },
    about:{
        type: String,
    },
    created_at:{
        type: Date,
        default: Date.now
    },
})
exports.module = mongoose.model('User',userSchema);