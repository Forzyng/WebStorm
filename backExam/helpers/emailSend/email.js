const nodemailer = require("nodemailer");
const Config = require('../../config')
var handlebars = require('handlebars');
var fs = require('fs');


const sendEmail = async (email, subject, URL, template) => {
    try {
        const transporter = nodemailer.createTransport({
            host: Config.sender.connect,
            port: Config.sender.port,
            secure: Config.sender.secure,
            auth: {
                user: Config.sender.email,
                pass: Config.sender.ukrNet_pswd,
            },
        });

        fs.readFile(__dirname + '/templates/' + template + '.html', {encoding: 'utf-8'}, async function (err, html) {
            if (err) {
                console.log(err);
            } else {
                let result = html.replace("URL_CONFIRMATION", URL);

                await transporter.sendMail({
                    from: Config.sender.email,
                    to: email,
                    subject: subject,
                    text: result,
                });
            }
        })


        console.log("email sent successfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }
};

module.exports = sendEmail;