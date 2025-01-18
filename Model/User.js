const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    name:  String,
    email:String,
    password:String,
    role: {
        type: String,
        default: 'visitor'
    }
})


const usermodel= mongoose.model('users',UserSchema)
module.exports = usermodel