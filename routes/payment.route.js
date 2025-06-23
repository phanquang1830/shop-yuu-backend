import express from "express";
import getQRPaymentLink from "../controllers/payment.controller.js";

const router = express.Router();

router.get("/qr", getQRPaymentLink);

export default router;



    