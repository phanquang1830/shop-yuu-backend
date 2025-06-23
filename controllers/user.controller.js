import asyncHandler from "express-async-handler";
import { User } from "../models/index.model.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// @desc get Profile User
// @route GET api/users/profile
// @access public
const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const user = await User.findByPk(id, {
    attributes: ["user_id", "username", "email", "avatar_url"],
  });

  if (!user) {
    return res.status(401).json("Không tìm thấy tài khoản người dùng!");
  }

  res.json({
    statusCode: 200,
    message: "Lấy thông tin người dùng thành công!",
    user: {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      avatar: user.avatar_url,
    },
  });
});

// @desc Update Profile User
// @desc POST /api/users/update_profile
// @access Private
const updateProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { username, email } = req.body ?? {};

  const avatarPath = req.file?.path ?? null;

  if (!username && !email && !avatarPath) {
    return res.status(400).json({
      statusCode: 400,
      message: "Vui lòng nhập ít nhất một thông tin để cập nhật!",
    });
  }

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      statusCode: 404,
      message: "Không tìm thấy người dùng!",
    });
  }

  // Kiểm tra username đã tồn tại chưa (ngoại trừ user hiện tại)
  if (username) {
    const existingUsername = await User.findOne({
      where: {
        username,
        user_id: { [Op.ne]: id }, // Khác id hiện tại
      },
    });

    if (existingUsername) {
      return res.status(400).json({
        statusCode: 400,
        message: "Tên người dùng đã được sử dụng!",
      });
    }
  }

  //Kiểm tra email đã tồn tại chưa (ngoại trừ user hiện tại)
  if (email) {
    const existingEmail = await User.findOne({
      where: {
        email,
        user_id: { [Op.ne]: id },
      },
    });

    if (existingEmail) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email đã được sử dụng!",
      });
    }
  }

  // Cập nhật thông tin
  user.username = username || user.username;
  user.email = email || user.email;
  user.avatar_url = avatarPath || user.avatar_url;

  await user.save();

  res.json({
    statusCode: 200,
    message: "Cập nhật thông tin người dùng thành công!",
    user: {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      avatar_url: user.avatar_url,
    },
  });
});

// @desc Fetch all user account
// @route /api/users
// @access Private
// Lấy danh sách user (có phân trang)
const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { count, rows } = await User.findAndCountAll({
    offset,
    limit,
    order: [["created_at", "DESC"]],
    attributes: {
      exclude: ["password"],
    },
  });

  res.json({
    users: rows,
    totalPage: Math.ceil(count / limit),
  });
});

// Lấy chi tiết 1 user
const getUserById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy tài khoản này!" });
  }

  res.json({ user });
});

// Tạo mới user (admin tạo user mới)
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  const avatarPath = req.file?.path ?? null;

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return res.status(400).json({ message: "Email đã được sử dụng!" });
  }

  // Mã hóa mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // Tạo user mới
  const user = await User.create({
    username,
    avatar_url: avatarPath,
    email,
    password: hashedPassword,
    isAdmin: !!isAdmin,
  });

  res.status(201).json({ user });
});

// Cập nhật user
const updateUser = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy tài khoản này!" });
  }

  const { username, email, isAdmin, is_active, locked_at } = req.body;
    const avatarPath = req.file?.path ?? null;

  user.username = username ?? user.username;
  user.email = email ?? user.email;
  user.isAdmin = isAdmin ?? user.isAdmin;
  user.is_active = is_active ?? user.is_active;
  user.locked_at = locked_at ?? user.locked_at;
  user.avatar_url = avatarPath ?? user.avatar_url;

  await user.save();

  res.json({ message: "Tài khoản đã được cập nhật!", user });
});

// Xoá user
const deleteUser = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy tài khoản này!" });
  }

  await user.destroy();
  res.json({ message: "Xóa tài khoản thành công!" });
});

export {
  getProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
};
