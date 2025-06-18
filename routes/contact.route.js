import express from "express";
import contact from "../controllers/contact.controller";

const router = express.Router();

router.post('/', contact)

export default router;