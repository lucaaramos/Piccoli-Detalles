import express from "express";
import {getUsers, createUser, updateUser, deleteUser, loginUser  } from "../controllers/userController.js";
import { protect } from "../utils/middlewares.js";

const router = express.Router();

router.get("/users",  protect,getUsers);
router.post("/users", createUser)
router.put("/users/:id", protect, updateUser)
router.delete("/users/:id", protect, deleteUser)
router.post("/login", loginUser)




export default router;
