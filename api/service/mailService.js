const mailer = require("nodemailer");

class MailService {
  constructor() {
    this.config = {
      pool: true,
      name: process.env.SERVER_NAME,
      host: process.env.SMTP_HOST,
      secure: true, 
      secureConnection: false,
      tls: {
         ciphers: "SSLv3",
      },
      requireTLS: true,
      port: 465,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      dkim: {
        domainName: 'astayhome.com',
        keySelector: 'hostingermail1',
        privateKey: process.env.DKIM_PRIVATEKEY,
      }
    };
    this.transporter = mailer.createTransport(this.config);
  }

  async sendActivationMail(to, email) {  

    console.log(to);

    return await new Promise((res, rej) => {
      this.transporter.sendMail({
        form: process.env.SMTP_USER,
        to,
        envelope: {
          from: process.env.SMTP_USER, // used as MAIL FROM: address for SMTP
          to // used as RCPT TO: address for SMTP
      },
        subject: "Astay Test Mail",
        text: "",
        html: `
          <div>
              ${email}
          </div>
        `,
        headers: {
          "From": process.env.SMTP_USER
        }
      }, (err, info) => {

        console.log(err, info);

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
