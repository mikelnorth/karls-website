const nodemailer = require('nodemailer')
, config = require('./config');

module.exports = {
    sendEmail(req, res) {
        console.log('req.body', req.body)


        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: process.env.service,
            auth: {
                user: process.env.user_email,
                pass: process.env.user_pass
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: `"J 👻" <${process.env.user_email}>`, // sender address
            to: req.body.to, // list of receivers
            subject: req.body.subject, // Subject line
            text: 'Making breadsticks', // plain text body
            html: `<b>${ req.body.body }</b>` // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send(error)
            }
            console.log('Message %s send: %s', info.messageId, info.response);
            res.status(200).send(info);
        });

    }
}