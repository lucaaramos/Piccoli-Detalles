import express from "express";
import { getProducts, createProduct, deleteProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", createProduct)
router.put("/products/:id", updateProduct)
router.delete("/products/:id", deleteProduct)



export default router;
