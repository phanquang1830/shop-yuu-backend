import asyncHandler from "express-async-handler";
import { Order, Account, User } from "../models/index.model.js";
import { v4 as uuidv4 } from "uuid";

// [POST] /api/orders - Tạo đơn hàng mới
export const createOrder = asyncHandler(async (req, res) => {
  const { user_id, total_amount } = req.body;

  if (!user_id || !total_amount) {
    return res.status(400).json({ message: "Thiếu thông tin đơn hàng!" });
  }

  const order_code = "ORD_" + uuidv4().slice(0, 8).toUpperCase();

  const newOrder = await Order.create({
    order_code,
    user_id,
    total_amount,
    status: "pending",
  });

  res.status(201).json(newOrder);
});

// [GET] /api/orders/:order_id - Lấy chi tiết đơn hàng
export const getOrderById = asyncHandler(async (req, res) => {
  const { order_id } = req.params;

  const order = await Order.findByPk(order_id, {
    include: [{ model: User, attributes: ["username", "email"] }],
  });

  if (!order) {
    return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
  }

  res.json(order);
});

// [GET] /api/orders/user/:user_id - Lấy danh sách đơn hàng theo user
export const getOrdersByUser = asyncHandler(async (req, res) => {
  const { user_id } = req.params;

  const orders = await Order.findAll({
    where: { user_id },
    order: [["created_at", "DESC"]],
  });

  res.json(orders);
});
