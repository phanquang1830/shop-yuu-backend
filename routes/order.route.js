import express from "express";
import {
  createOrder,
  getOrderById,
  getOrdersByUser,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder); // Tạo đơn hàng
router.get("/:order_id", getOrderById); // Lấy chi tiết đơn
router.get("/user/:user_id", getOrdersByUser); // Danh sách đơn của user

export default router;
