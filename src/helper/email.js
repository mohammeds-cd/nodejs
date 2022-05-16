const nodemailer = require("nodemailer");

let SMTP_EMAIL="cloudsmtptest440@gmail.com"
let SMTP_PASS="cloud@Email22"
let SMTP_SERVER="smtp.gmail.com"
let SMTP_PORT=587

module.exports = nodemailer.createTransport({
  host: SMTP_SERVER,
  port: SMTP_PORT,
  secure: false, 
  auth: {
    user: SMTP_EMAIL, 
    pass: SMTP_PASS 
  }
});