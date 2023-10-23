const mailer = require("nodemailer");

class MailService {
  constructor() {
    this.config = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    };
    this.transporter = mailer.createTransport(this.config);
  }

  async sendActivationMail(to, link) {

    return await new Promise((res, rej) => {
      this.transporter.sendMail({
        form: process.env.SMTP_USER,
        to,
        subject: "Activation account on Bess Website",
        text: "",
        html: `
          <div>
              <h1>For activation go to the link bellow</h1>
              <a href="${link}">Activation</a>
          </div>
        `,
      }, (err, info) => {

        if (err) {
          console.error(err, info);
          rej({ err });
        } else {
          const answer = info.response.split(' ');
          res({ code: answer[0], status: answer[2] });
        }
      });
    });
  }
}

module.exports = new MailService();
