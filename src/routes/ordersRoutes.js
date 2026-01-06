import express from "express"
import { createOrder, getAllOrders, getMyOrders, cancelOrder, payOrder, shipOrder } from "../controllers/ordersController.js";
import { VerifyToken } from "../utils/middlewares.js";
import { isAdmin } from "../utils/isAdmin.js";

const router = express.Router();

router.post("/orders", VerifyToken, createOrder);
router.get("/orders/my/:id", VerifyToken, getMyOrders);
router.get("/orders", VerifyToken, isAdmin, getAllOrders);
router.post("/cancel-order/:id", VerifyToken, cancelOrder);
router.patch("/orders/:id/pay", VerifyToken, payOrder);
router.patch("/orders/:id/ship", VerifyToken, isAdmin, shipOrder);



export default router