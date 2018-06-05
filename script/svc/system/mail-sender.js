const nodemailer = require('nodemailer');

const emailServerUser = process.env.CETC_USER;
const emailServerUserPassword  = process.env.CETC_PASSWORD;

const sendEmail = ({to,subject,messageText,messageHtml}) => {
    return new Promise(resolve => {
        let transporter = nodemailer.createTransport({
            host: 'mail.cetc.ae',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: emailServerUser, // generated ethereal user
                pass: emailServerUserPassword// generated ethereal password
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            }
        });


        let mailOptions = {
            from: '"cetc" <cetcae@cetc.ae>', // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: messageText, // plain text body
            html: messageHtml // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                resolve(error);
                return;
            }
            resolve(info);
        });
    });
};
module.exports = async (req,res) => {
    const to = req.query.to || req.body.to;
    const subject = req.query.subject || req.body.subject;
    const messageText = req.query.text || req.body.text;
    const messageHtml = req.body.html;
    const result = await sendEmail({
        to : to,
        messageHtml : messageHtml,
        messageText : messageText,
        subject : subject
    });
    res.send(JSON.stringify(result));
};