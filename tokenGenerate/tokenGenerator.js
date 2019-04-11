const jwt       = require('jsonwebtoken');
const constants = require('../constants.js');

function generateToken(user) {

    let userData =
        {
            "name": user.name,
            "surname": user.surname,
            "username": user.username,
            "rols": user.rols
        }

    return jwt.sign(userData,constants.SECRET_KEY, {expiresIn: constants.TOKEN_EXPIRE});
}

function generateRefreshToken(token) {
    let data = {
        "access_token": token
    };
    return jwt.sign(data,constants.SECRET_KEY_REFRESH, {expiresIn: constants.TOKEN_REFRESH_EXPIRE});
}

module.exports = {
    access: generateToken,
    refresh: generateRefreshToken
}