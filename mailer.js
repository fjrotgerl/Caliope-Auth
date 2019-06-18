const nodemailer       = require('nodemailer');

function sendMail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'caliope.no.reply@gmail.com',
            pass: 'caliope123'
        }
    });

    let mailOptions = {
        from: 'caliope.no.reply@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = sendMail;