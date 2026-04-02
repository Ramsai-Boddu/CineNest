import nodemailer from "nodemailer";
import dns from "dns";
import "dotenv/config";

// ✅ Force IPv4 (IMPORTANT FIX)
dns.setDefaultResultOrder("ipv4first");

export const sendOTPMail = async (otp: string, email: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",   // ✅ use host instead of service
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