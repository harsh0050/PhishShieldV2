const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    name : String,
    email: String,
    password : String

})

const UserModel = mongoose.model("Users", Userschema)
module.exports = UserModel