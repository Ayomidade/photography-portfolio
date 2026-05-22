import { Resend } from 'resend';

const resend = new Resend('re_EGhNUZ6r_5jev7eM5HR7wnqwzSUae4y46');

export const sendContactMessage = async (req, res) => {
resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'ayomikesam@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
}