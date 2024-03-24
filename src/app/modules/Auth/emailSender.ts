import nodemailer from "nodemailer";
import config from "../../../config";
const emailSender = async (email: string ,html:string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.email_app_password,
    },
  });

  const info = await transporter.sendMail({
    from: '"PH Health Care" <farhan.adnan1952@gmail.com>', // sender address
    to: email,

    subject: "Rest Password Link ✔", // Subject line
    // text: "Hello world?", // plain text body
    html
  });
};

export default emailSender;
