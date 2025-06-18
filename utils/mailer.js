import nodemailer from "nodemailer";

// Cấu hình gửi gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER, // email dùng gửi otp
    pass: process.env.SMTP_PASS, // app password
  },
});

export default transporter