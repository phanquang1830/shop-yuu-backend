import express from "express";
import {
  addToCart,
  getCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cart.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getCartItem);
router.post("/addtocart", protect, addToCart);
router.delete("/remove-cart-item/:id", protect, removeCartItem);
router.delete("/deletecart", protect, clearCart);

export default router
