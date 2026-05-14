import nodemailer from 'nodemailer';

const DEFAULT_TO = 'hello@tamilnadudroptaxi.com';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || '465');
  const secure = process.env.SMTP_SECURE !== 'false';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('Missing SMTP configuration (SMTP_HOST, SMTP_USER, SMTP_PASS)');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

/**
 * @param {{ subject: string; html: string; text: string; replyTo?: string }} opts
 */
export async function sendFormEmail({ subject, html, text, replyTo }) {
  const transporter = getTransporter();
  const to = process.env.MAIL_TO || DEFAULT_TO;
  const from =
    process.env.MAIL_FROM || `TamilNadu Drop Taxi <${process.env.SMTP_USER}>`;

  await transporter.sendMail({
    from,
    to,
    replyTo: replyTo || undefined,
    subject,
    text,
    html,
  });
}
