import nodemailer from "nodemailer";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.

// Send an email using async/await
let senderMail = async (message, to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mironshohasadov1603@gmail.com", // Your Gmail Address
      pass: "lkbc nucp zoaf ncdz", // 16-character App Password (no spaces)
    },
  });

  const info = await transporter.sendMail({
    from: '"Teacher Mironshoh" <mironshohasadov1603@gmail.com>',
    to,
    subject: "Hello ✔",
    html: `<!DOCTYPE html>
    <html>
    <head>
    <title>${process.env.APP_NAME}</title>
    </head>
    <body>
    <section class="container">
    <h1>Hello Dear our user</h1>
    <p>${message}</p>
    <a href='http://localhost:3000/api/v1/auth/otp?otp=${otp}'><button type="button">bosish</button></a>
    </section>
    </body>
    </html> `, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};
export default senderMail;
