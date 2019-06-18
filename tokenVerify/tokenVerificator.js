const jwt       = require('jsonwebtoken');
const constants = require('../constants.js');



function verifytoken(token, decrypt) {
    token = token.replace('Bearer ','');
    try {
        let decode = jwt.verify(token,constants.SECRET_KEY);
        return decode
    }catch (err){
        return false
    }

}

function verifyRefreshToken(token) {
    token = token.replace('Bearer ','');

    try {
        let decode = jwt.verify(token,constants.SECRET_KEY_REFRESH);
        return decode
    }catch (err){
        return false
    }

}

module.exports = {
    access: verifytoken,
    refresh: verifyRefreshToken
};
