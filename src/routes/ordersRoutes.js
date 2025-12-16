import express from "express"
import { createOrder, getAllOrders, getMyOrders } from "../controllers/ordersController.js";
import { VerifyToken } from "../utils/middlewares.js";
import { isAdmin } from "../utils/isAdmin.js";

const router = express.Router();

router.post("/orders", VerifyToken, createOrder);
router.get("/orders/my", VerifyToken, getMyOrders);
router.get("/orders", VerifyToken, isAdmin, getAllOrders);


export default router