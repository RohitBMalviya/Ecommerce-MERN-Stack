import nodemailer from "nodemailer";
import { MailOption } from "../interface/interface.js";

export const sendEmail = async (options: MailOption) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPTHOST,
    port: 465,
    service: process.env.SMPTSERVICE,
    auth: {
      user: process.env.SMPTMAIL,
      pass: process.env.SMPTPASSWORD,
    },
  });

  const mailOptions: MailOption = {
    from: process.env.SMPTMAIL!,
    to: options.email!,
    subject: options.subject,
    text: options.message!,
  };

  await transporter.sendMail(mailOptions);
};
