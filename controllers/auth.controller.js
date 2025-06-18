import bcrypt from "bcrypt";
import { Op} from "sequelize";
import asyncHandler from "express-async-handler";

import { User, OtpCode } from "../models/index.model.js";
import { generateToken} from "../utils/jwt.js";
import transporter from "../utils/mailer.js";

// Tạo mẫ Otp ngẫn nhiên từ 100000 => 900000 trả về dưới dạng String
const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// @desc Register User
// @route POST /api/auth/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  const existing = await User.findOne({ where: { email } });
  if (existing) return res.status(400).json({ message: "Email đã tồn tại!" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    username,
    password: hashedPassword,
    email,
    is_active: false,
  });

  // Tạo mã Otp
  const code = generateOtp();

  // Date tính bằng mili giây
  // 1 giây = 1000 mili giây
  // 1 phút = 60 giây
  // Date.now() là lấy thời gian hiện tại + 10 phút * 60 giây * 1000 , phải nhân vậy để đổi ra mili giây
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 phút

  await OtpCode.create({
    email,
    code,
    expires_at: expiresAt,
  });

  // Gửi mã xác minh
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Xác minh tài khoản",
    text: `Mã xác minh của bạn là ${code}`,
  });

  res.status(200).json({
    message: "Đăng kí thành công, vui lòng kiểm tra email để xác minh!",
  });
});

// @desc Verify OTP
// @route POST /api/auth/verify-otp
// @access Public
const verifyOtp = asyncHandler(async (req, res) => {
  const { email, code } = req.body;

  const otpEntry = await OtpCode.findOne({
    where: {
      email,
      code,
      expires_at: { [Op.gt]: new Date() }, //Op.gt : phép so sánh lớn hơn, tức là expires_at > thời gian hiện tại thì hợp lệ
    },
  });

  if (!otpEntry) {
    return res
      .status(400)
      .json({ message: "Mã OTP không hợp lệ hoặc đã hết hạn!" });
  }

  // Kích hoạt user
  await User.update({ is_active: true }, { where: { email } });

  // Xóa mã otp đã dùng
  await OtpCode.destroy({ where: { email } });

  res.status(200).json({ message: "Tài khoản đã được xác minh!" });
});

// @desc Login User
// @route POST /api/auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
  }

  if (!user.is_active) {
    return res.status(400).json({
      message:
        "Tài khoản chưa được xác minh, vui lòng xác minh tài khoản của bạn!",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Email hoặc mật khẩu không đúng!" });
  }

  const token = generateToken(user.user_id);

  res.status(200).json({
    statusCode: 200,
    message: "Đăng nhập thành công!",
    token: token,
    user: {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      avatar_url: user.avatar_url,
    },
  });
});

// @desc send OTP to reset password
// @route /api/auth/forgot-password
// @access Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    res
      .status(400)
      .json({ message: "Không tìm thấy tài khoản với email này!" });
  }

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await OtpCode.destroy({ where: { email } }); // xóa mã cũ nếu có

  await OtpCode.create({
    email,
    code,
    expires_at: expiresAt,
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Đặt lại mật khẩu",
    text: `Mã OTP để đặt lại mật khẩu của bạn là ${code}. Có hiệu lực trong 10 phút!`,
  });

  res.status(200).json({
    message: `Mã OTP đặt lại mật khẩu đã được gửi tới email ${email}`,
  });
});

// @desc set new password
// @route /api/auth/reset-password
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
  const { email, code, newPassword } = req.body;

  const otpEntry = await OtpCode.findOne({
    where: {
      email,
      code,
      //Op.gt: viết tắt của greater than (lớn hơn) thời điểm hiện tại
      //Op.lt: nhỏ hơn hiện tại
      //Op.eq: bằng
      //Op.ne: khác
      expires_at: { [Op.gt]: new Date() }, // Chưa hết hạn
    },
  });

  if (!otpEntry) {
    return res
      .status(400)
      .json({ message: "Mã OTP không hợp lệ hoặc đã hết hạn!" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.update({ password: hashedPassword }, { where: { email } });

  await OtpCode.destroy({ where: { email } });

  res.status(200).json({ message: "Mật khẩu đã được đặt lại thành công!" });
});

export { registerUser, verifyOtp, loginUser, forgotPassword, resetPassword };
