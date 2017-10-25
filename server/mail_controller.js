require('dotenv').config();
const nodemailer = require('nodemailer');

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
            from: `"Karl North Media" <${process.env.user_email}>`, // sender address
            to: process.env.admin_email, // list of receivers
            subject: 'New Customer', // Subject line
            // text: 'testing one two on two', // plain text body
            html: `<h1>${ req.body.firstName}  ${req.body.lastName}</h1> `// html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return  res.status(400).send(error)
            }
            console.log('Message %s send: %s', info);
            res.status(200).send(info);
        });

    }
}