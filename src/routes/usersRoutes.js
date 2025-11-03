import express from "express";
import {getUsers, createUsers,updateUsers, deleteUser  } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUsers)
router.put("/users/:id", updateUsers)
router.delete("/users/:id", deleteUser)



export default router;
