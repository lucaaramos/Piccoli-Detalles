import express from "express";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../controllers/productController.js";
import { VerifyToken } from "../utils/middlewares.js";
const router = express.Router();

router.get("/products", VerifyToken ,getProducts);
router.post("/products", VerifyToken,createProduct)
router.put("/products/:id",  VerifyToken,updateProduct)
router.delete("/products/:id", VerifyToken,deleteProduct)



export default router;
