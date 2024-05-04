const nodemailer = require("nodemailer");

class EmailService {
  static init() {
    this.transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secureConnection: false, // TLS requires secureConnection to be false
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
  }
  static async sendMail(from, to, subject, text) {
    await this.transporter.sendMail({ from, to, subject, text });
  }
}
module.exports = EmailService;
