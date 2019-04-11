const app = require('./app');
const mongoose = require('mongoose');
const constants = require('./constants');
const user = require('./model/user');

mongoose.connect(constants.DB).then(() => {
    app.listen(constants.PORTSERVER, function () {
        console.log('Authentication module listening on port ' + constants.PORTSERVER + '!');
        /*let usr = new user({
            "name": "javi",
            "username": "Javi Rotger",
            "surname": "Rotger",
            "password": "123",
            "rols": [{"tipus": "1"}]
        })
        usr.save(function (err, newUser) {
        });*/

    });
}, err => {
    console.log(err)
});