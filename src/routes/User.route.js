import express from "express";
import {
    register,
    getList,
    searchById,
    deleteUser,
    login,
} from "../controllers/User.controller.js";
import authorizeRoles from "../middleware/Authorizerole.js";
const userRoute = express.Router();

// ============= Public
userRoute.post("/register", register);
userRoute.post("/login", login);

// ============= Private 
userRoute.get("/",authorizeRoles('admin'), getList);
userRoute.get("/:id",authorizeRoles('admin'), searchById);
userRoute.delete("/:id",authorizeRoles('admin'),deleteUser);

export default userRoute;
