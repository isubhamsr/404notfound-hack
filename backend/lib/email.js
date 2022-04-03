var nodemailer = require("nodemailer");
const ejs = require("ejs");
const sgTransport = require('nodemailer-sendgrid-transport');
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// console.log(process.env.MAIL_USER_PASSWORD);

const mailer = {};

const options = {
  auth: {
      api_key: process.env.SENDGRID_API_KEY
  }
}

mailer.transporter = nodemailer.createTransport(sgTransport(options));

mailer.email = function (data, to, pageName, subject, callback) {
  ejs.renderFile(`${__dirname}/${pageName}`, data, function (err, data) {
    if (err) {
      console.log("ejs. render ==== > ", err.message);
    } else {
      mailer.transporter.sendMail(
        {
          to,
          from: '"Subham Roy" shubhamroy12345@gmail.com',

          subject: subject,
          html: data,
        },
        function (err, info) {
          if (err) {
            //  console.log("mail error ==== > ",err.message);
            callback({ status: false, message: err.message });
          } else {
            //  console.log('Message sent ====> ' + info);
            callback({ status: true, message: info });
          }
        }
      );
    }
  });
};

module.exports = mailer;