const app        = require('express')()
const routes     = require('./routes/routes')
const bodyParser = require('body-parser')
const passport   = require('./config/passport')
const constants  = require('./constants');

app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', routes)

app.listen(3001, function () {
    console.log('Servidor de autenticación iniciado en el puerto ' + constants.PORTSERVER + '.');
});