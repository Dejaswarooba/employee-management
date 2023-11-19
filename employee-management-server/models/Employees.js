const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    dob: String,
    salary: Number,
    department: String
})

const UserModel = mongoose.model("employees",UserSchema)
module.exports = UserModel