import express from "express"
import { createOrder, getAllOrders, getMyOrders, cancelOrder, payOrder, shipOrder } from "../controllers/ordersController.js";
import { VerifyToken } from "../utils/middlewares/middlewares.js";
import { isAdmin } from "../utils/isAdmin.js";
import { validateRequest } from "../utils/middlewares/validateRequest.js";
import { createOrderSchema } from "../utils/validators/order.schema.js";
import { mongoIdSchema } from "../utils/validators/common.schema.js";

const router = express.Router();

router.post("/orders", VerifyToken, validateRequest(createOrderSchema), createOrder);
router.get("/orders/my/:id", VerifyToken, getMyOrders);
router.get("/orders", VerifyToken, isAdmin, getAllOrders);
router.post("/cancel-order/:id", VerifyToken, validateRequest(mongoIdSchema, "params"), cancelOrder);
router.patch("/orders/:id/pay", VerifyToken, validateRequest(mongoIdSchema, "params"), payOrder);
router.patch("/orders/:id/ship", VerifyToken, isAdmin, validateRequest(mongoIdSchema, "params"), shipOrder);



export default router