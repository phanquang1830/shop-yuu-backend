import express from "express";
import { 
    loginUser ,
    registerUser, 
    verifyOtp, 
    forgotPassword, 
    resetPassword 
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
