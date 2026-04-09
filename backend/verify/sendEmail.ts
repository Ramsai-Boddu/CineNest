import nodemailer from "nodemailer";
import dns from "dns";
import "dotenv/config";

// ✅ Force IPv4 (IMPORTANT FIX)
dns.setDefaultResultOrder("ipv4first");

export const sendOTPMail = async (otp: string, email: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",   
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `<p>Your OTP for password reset is: <b>${otp}</b></p>`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("OTP Sent Successfully");
    console.log(info.response);

    return true;
  } catch (error: any) {
    console.error("Error sending OTP:", error.message);
    return false;
  }
};

export const sendAddUserMail = async (email: string, name: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",   
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Welcome to CineNest",
      html: `<h1><b>Welcome to CineNest ${name}!</b></h1><h4>Quickly find movies using powerful search and filters.</h4> <p>Please set your password using the "Forgot Password" option on the login page.</p>`,
    };

    const info = await transporter.sendMail(mailConfigurations);

    console.log("Welcome Email Sent Successfully");
    console.log(info.response);

    return true;
  } catch (error: any) {
    console.error("Error sending welcome email:", error.message);
    return false;
  }
};

