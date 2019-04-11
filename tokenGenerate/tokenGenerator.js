const jwt       = require('jsonwebtoken');
const constants = require('../constants.js');

function generateToken(user) {
    
    let userData =
        {
            "username"         : user.username,
            "email"            : user.email,
            "nombre"           : user.nombre,
            "apellidos"        : user.apellidos,
            "permiso"          : user.permiso,
            "numeroSeguidores" : user.numeroSeguidores,
            "numeroSeguidos"   : user.numeroSeguidos,
            "googleId"         : user.googleId
            
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