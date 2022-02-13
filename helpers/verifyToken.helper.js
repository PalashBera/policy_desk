require('dotenv').config();

import sgMail from '@sendgrid/mail';

export function sendToken(email, token) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const validity = parseInt(process.env.CONFIRMATION_TOKEN_VALIDITY) / 60000;
  const mailMessage = `Your OTP is valid for ${validity}minutes. Your verification OTP is ${token}.`

  const msg = {
    to: email,
    from: process.env.EMAIL_SENT_FROM,
    subject: 'OTP - Policy Desk',
    text: mailMessage,
    html: mailMessage
  }

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error) => {
      console.error(error)
    })
};

export function generateToken() {
  return Math.floor(100000 + Math.random() * 900000);
};
