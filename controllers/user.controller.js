import asyncHandler from "express-async-handler";
import { User } from "../models/index.model.js";
import { where } from "sequelize";
import { Op } from 'sequelize';


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
  const { username, email} = req.body ?? {};

  const avatarPath = req.file ? `/uploads/${req.file.filename}` : null


  if(!username && !email && !avatarPath) {
    return res.status(400).json({
        statusCode: 400,
        message: "Vui lòng nhập ít nhất một thông tin để cập nhật!"
    })
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
  user.avatar_url = avatarPath || user.avatar_url

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

export { getProfile, updateProfile };
