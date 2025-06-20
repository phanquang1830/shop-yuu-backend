import asyncHandler from "express-async-handler";
import transporter from "../utils/mailer.js";
import { ContactMessage } from "../models/index.model.js";

const contact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body ?? {};

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
  }

  // Save contact message to database
  await ContactMessage.create({ name, email, message });

  // Send email to admin
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `Tin nhắn mới từ khách hàng: ${name}`,
    text: `📨 Bạn nhận được tin nhắn mới:\n\n👤 Tên: ${name}\n📧 Email: ${email}\n\n💬 Nội dung:\n${message}`,
  });

  // Success response
  return res.status(200).json({ message: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất!" });
});

export default contact;
