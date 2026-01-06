import express from "express";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../controllers/productController.js";
import { VerifyToken } from "../utils/middlewares/middlewares.js";
import { validateRequest } from "../utils/middlewares/validateRequest.js";
import { productCreateSchema, productUpdateSchema } from "../utils/validators/product.schema.js";
import { mongoIdSchema } from "../utils/validators/common.schema.js";

const router = express.Router();

router.get("/products", VerifyToken, getProducts);
router.post("/products", VerifyToken, validateRequest(productCreateSchema), createProduct);
router.put("/products/:id", VerifyToken, validateRequest(mongoIdSchema, "params"), validateRequest(productUpdateSchema), updateProduct);
router.delete("/products/:id", VerifyToken, validateRequest(mongoIdSchema, "params"), deleteProduct);

export default router;
