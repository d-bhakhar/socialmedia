const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name :{
        typr: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})
exports.module = mongoose.model('User',userSchema);