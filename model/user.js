const mongoose = require('mongoose')
const Schema = mongoose.Schema
const authenticator = require('../authenticate/authenticator')

const UserSchema = new Schema({
    googleId: String,
    name: String,
    username: String,
    password: String,
    surname: String,
    rols: []
})

UserSchema.methods.validPassword = function (password) {
    return authenticator(password, this)
}

module.exports = mongoose.model('User', UserSchema)
