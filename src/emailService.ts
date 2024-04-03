import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.TRANSPORTER_USER, // Replace with your email
      pass: process.env.TRANSPORTER_PASSWORD // Replace with your password or app-specific password if using Gmail
    }
  });
  
function sendEmail(name: String, email: String, message: String) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: process.env.SENDER, // Sender address
        to: process.env.RECIEVER, // List of receivers
        subject: 'New message from your website', // Subject line
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // Plain text body
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject('Error sending email');
        } else {
          console.log('Email sent: ' + info.response);
          resolve('Email sent successfully');
        }
      });
    });
  }

export default sendEmail;