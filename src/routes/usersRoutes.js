import express from "express";
import {getUsers, createUsers  } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUsers)
// router.put("/users/:id", updateProduct)
// router.delete("/users/:id", deleteProduct)



export default router;
