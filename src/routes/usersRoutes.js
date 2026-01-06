import express from "express";
import {getUsers, createUser, updateUser, deleteUser, loginUser  } from "../controllers/userController.js";
import { VerifyToken } from "../utils/middlewares/middlewares.js";
import { isAdmin } from "../utils/isAdmin.js";
import { validateRequest } from "../utils/middlewares/validateRequest.js";
import { loginSchema } from "../utils/validators/user.schema.js";
import {mongoIdSchema} from "../utils/validators/common.schema.js";

const router = express.Router();

router.get("/users",  VerifyToken, isAdmin, getUsers);
router.post("/users", VerifyToken, createUser);
router.put("/users/:id", VerifyToken, validateRequest(mongoIdSchema, "params"), updateUser);
router.delete("/users/:id", VerifyToken, validateRequest(mongoIdSchema, "params"), isAdmin, deleteUser);
router.post("/login", validateRequest(loginSchema), loginUser);




export default router;
