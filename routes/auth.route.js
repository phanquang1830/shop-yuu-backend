import express from "express";
import { loginUser ,registerUser, verifyOtp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser)

export default router;
