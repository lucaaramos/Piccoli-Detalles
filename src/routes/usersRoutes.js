import express from "express";
import {getUsers, createUser, updateUser, deleteUser, loginUser  } from "../controllers/userController.js";
import { VerifyToken } from "../utils/middlewares.js";
import { isAdmin } from "../utils/isAdmin.js";

const router = express.Router();

router.get("/users",  VerifyToken, getUsers);
router.post("/users", VerifyToken, createUser)
router.put("/users/:id", VerifyToken, updateUser)
router.delete("/users/:id", VerifyToken, isAdmin, deleteUser)
router.post("/login", loginUser)




export default router;
