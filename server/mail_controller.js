require('dotenv').config();
const nodemailer = require('nodemailer');

module.exports = {
    sendEmail(req, res) {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: process.env.service,
            auth: {
                user: process.env.website_email,
                pass: process.env.website_pass
            }
        });
        console.log("req.body",req.body)
        // setup email data with unicode symbols
        let mailOptions = {
            from: `"Karl North Media" <${process.env.website_email}>`, // sender address
            to: process.env.website_email, // list of receivers
            subject: `New Customer ${req.body.firstName} ${req.body.lastName}`, // Subject line
            // text: 'testing one two on two', // plain text body
            html: `
             <h3> Name:${ req.body.firstName}  ${req.body.lastName}</h3><br><br>
             <span> Email:${req.body.email}</span><br><br>
             <span> Phone:${req.body.phone}</span><br><br>
             <span> Prefered contact method:${req.body.contact}</span><br><br>
             ${ req.body.weddingLocation ? `<span> Wedding Location:  ${req.body.weddingLocation}</span><br><br>` : ''}
             ${ req.body.weddingDate ? `<span> Wedding Date:  ${req.body.weddingDate}</span><br><br>` : ''}
             ${ req.body.bridalLocation ? `<span> Bridal Location:  ${req.body.bridalLocation}</span><br><br>` : ''}
             ${ req.body.bridalDate ? `<span> Bridal Date:  ${req.body.bridalDate}</span><br><br>` : ''}
             ${ req.body.receptionLocation ? `<span> Reception Location:  ${req.body.receptionLocation}</span><br><br>` : ''}
             ${ req.body.receptionDate ? `<span> Reception Date:  ${req.body.receptionDate}</span><br><br>` : ''}
             ${ req.body.culture ? `<span> Wedding Culture:  ${req.body.culture}</span><br><br>` : ''}
             ${ req.body.setting ? `<span> Setting:  ${req.body.setting}</span><br><br>` : ''}
             ${ req.body.bridalLocation ? `<span> Bridal Location:  ${req.body.bridalLocation}</span><br><br>` : ''}
             ${ req.body.audio ? `<span> Audio:  ${req.body.audio}</span><br><br>` : ''}                 
             ${ req.body.message ? `<span> Aditonal Information: <br> ${req.body.message}</span><br><br>` : ''}       
            `
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            }
            // console.log('Message %s send: %s', info);
            res.status(200).send(info);
        });

    }
}