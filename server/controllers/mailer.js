import nodemailer from 'nodemailer';
import mailgen from 'mailgen';

import ENV from '../config.js';

// https://ethereal.email/create
const nodeConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: ENV.EMAIL,
    pass: ENV.MAIL_PASSWORD
  }
};

let transporter = nodemailer.createTransport(nodeConfig);
let MailGenerator = new mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/'
  }
});

/** POST: http://localhost:8080/api/registeremail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : ""
}
*/
export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;
  // body of the email
  let email = {
    body: {
      name: username,
      intro: text || 'Welcome learner JS MERN',
      outro: 'Need help, or have questions? Just reply to this email'
    }
  };

  let emailBody = MailGenerator.generate(email);

  let message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: subject || 'Signup Successful',
    html: emailBody
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res
        .status(201)
        .send({ msg: 'You should recieve an email from us.' });
    })
    .catch((error) => res.status(500).send({ error }));
};
