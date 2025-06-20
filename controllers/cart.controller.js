import asyncHandler from "express-async-handler";
import {
  Account,
  AccountGIDetail,
  AccountLQDetail,
  AccountWWDetail,
  Cart,
} from "../models/index.model.js";

// @desc AddToCart
// @route /api/cart/addtocart
// @access Private
const addToCart = asyncHandler(async (req, res) => {
  const { account_id } = req.body;
  const user_id = req.user.id; // Nhận user_id từ req.user ở token trả về
  console.log("user_id", user_id)

  const existed = await Cart.findOne({ where: { account_id, user_id } });

  if (existed) {
    return res
      .status(400)
      .json({ message: "Tài khoản đã tồn tại trong giỏ hàng!" });
  }

  const item = await Cart.create({ account_id, user_id });
  res.status(200).json({ message: "Đã thêm vào giỏ hàng", item });
});

// @desc Fetch Cart
// @route /api/cart
// @access Private
const getCartItem = asyncHandler(async (req, res) => {
  const user_id = req.user.id;

  const items = await Cart.findAll({
    where: { user_id },
    include: [
      {
        model: Account,
      },
    ],
  });

  res.status(200).json({
    statusCode: 200,
    message: "Lấy giỏ hàng thành công",
    cartItem: items,
  });
});

// @desc Remove Cart Item
// @route /api/cart/removecartitem
// @access Private
const removeCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const item = await Cart.findOne({ where: { cart_item_id: id, user_id } });
  if (!item) {
    return res.status(400).json({ message: "Không tìm thấy sản phẩm!" });
  }

  await item.destroy();
  res.status(200).json({ message: "Sản phẩm đã được xóa khỏi giỏ hàng!" });
});

// @desc Remove Cart
// @route /api/cart/deletecart
// @access Private
const clearCart = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  await Cart.destroy({ where: { user_id } });
  res.status(200).json({ message: "Đã xóa toàn bộ giỏ hàng!" });
});

export {
    addToCart,
    getCartItem,
    removeCartItem,
    clearCart
}