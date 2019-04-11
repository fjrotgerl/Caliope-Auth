const jwt       = require('jsonwebtoken');
const constants = require('../constants.js');



function verifytoken(token, decrypt) {
    token = token.replace('Bearer ','');
    try {
        let decode = jwt.verify(token,constants.SECRET_KEY);
        console.log(decode);
        return decode
    }catch (err){
        return false
    }

}

function verifyRefreshToken(token) {
    try {
        let decode = jwt.verify(token,constants.SECRET_KEY_REFRESH);
        console.log(decode);
        return decode
    }catch (err){
        return false
    }

}

module.exports = {
    access: verifytoken,
    refresh: verifyRefreshToken
};
