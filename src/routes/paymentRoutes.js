import express from "express";
import { createPayment } from "../controllers/paymentController.js";
import { VerifyToken } from "../utils/middlewares.js";

const router = express.Router();

router.post("/payments/:orderId", VerifyToken, createPayment);

export default router;
