const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter using environment variables
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || process.env.SMTP_EMAIL || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || process.env.SMTP_PASSWORD || 'your-app-password'
    }
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_FROM || `"Future Forge" <${process.env.EMAIL_USER || process.env.SMTP_EMAIL || 'noreply@futureforge.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;